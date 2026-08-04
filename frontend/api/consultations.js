// Vercel Serverless Function — Quote/consultation handler
// Route: POST /api/consultations
//
// Emails each quote request (with photo attachments) to the business, and
// OPTIONALLY stores metadata in MongoDB (only if MONGODB_URI is set).
//
// Env vars (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY, SENDER_EMAIL, NOTIFY_EMAIL   (email)
//   MONGODB_URI, DB_NAME                          (optional storage)

async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!global._ndMongoPromise) {
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(uri, { maxPoolSize: 5 });
    global._ndMongoPromise = client.connect().then((c) => c.db(process.env.DB_NAME || "nd_curtains"));
  }
  return global._ndMongoPromise;
}

const row = (label, value) => {
  if (!value) return "";
  const safe = String(value).replace(/</g, "&lt;");
  return `<tr><td style="padding:6px 14px 6px 0;vertical-align:top"><b>${label}</b></td><td style="padding:6px 0">${safe}</td></tr>`;
};

async function sendEmail(record, attachments) {
  const to = process.env.NOTIFY_EMAIL || "info@ndcurtains.com.au";
  const subject = `New quote request from ${record.name} (${record.suburb || "Melbourne"})`;
  const rows = [
    row("Name", record.name), row("Email", record.email), row("Phone", record.phone),
    row("Suburb/Postcode", record.suburb), row("Product", record.product),
    row("No. of Windows", record.windows), row("Preferred Style", record.style),
    row("Measurements", record.measurements), row("Budget", record.budget),
    row("Message", record.message), row("Photos", record.photo_count || ""),
  ].join("");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#1A1A1A">
    <h2 style="color:#C5A059">New Quote Request — ND Curtains</h2>
    <table style="border-collapse:collapse">${rows}</table></div>`;

  if (process.env.RESEND_API_KEY) {
    const { Resend } = require("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const payload = {
      from: process.env.SENDER_EMAIL || "ND Curtains <onboarding@resend.dev>",
      to: [to],
      reply_to: record.email,
      subject,
      html,
    };
    if (attachments && attachments.length) {
      payload.attachments = attachments.slice(0, 5).map((a) => ({ filename: a.filename, content: a.content }));
    }
    const { error } = await resend.emails.send(payload);
    if (error) throw new Error(`Resend failed: ${JSON.stringify(error)}`);
  } else if (process.env.EMERGENT_EMAIL_KEY) {
    const resp = await fetch("https://integrations.emergentagent.com/api/v1/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Email-Key": process.env.EMERGENT_EMAIL_KEY },
      body: JSON.stringify({ to: [to], subject, html, from_name: process.env.EMAIL_FROM_NAME || "ND Curtains" }),
    });
    if (!resp.ok) throw new Error(`Managed email failed: ${resp.status} ${await resp.text()}`);
  } else {
    console.warn("No email provider configured (set RESEND_API_KEY).");
  }
}

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") { res.status(204).end(); return; }

  if (req.method === "GET") {
    try {
      const db = await getDb();
      if (!db) return res.status(200).json([]);
      const docs = await db.collection("consultations").find({}, { projection: { _id: 0 } }).sort({ created_at: -1 }).limit(1000).toArray();
      return res.status(200).json(docs);
    } catch (e) {
      console.error("List failed:", e);
      return res.status(500).json({ error: "Could not list consultations" });
    }
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    // Honeypot: pretend success, drop bots.
    if (b.company) return res.status(200).json({ ok: true });

    const name = (b.name || "").trim();
    const email = (b.email || "").trim();
    const phone = (b.phone || "").trim();
    if (!name || !email || !phone || !(b.suburb || "").trim() || !(b.product || "").trim()) {
      return res.status(422).json({ error: "Name, email, phone, suburb and product are required." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(422).json({ error: "Please provide a valid email address." });
    }

    const attachments = Array.isArray(b.attachments) ? b.attachments.slice(0, 5) : [];
    const record = {
      id: require("crypto").randomUUID(),
      name, email, phone,
      suburb: (b.suburb || "").trim(),
      product: (b.product || "").trim(),
      windows: (b.windows || "").toString().trim(),
      style: (b.style || "").trim(),
      measurements: (b.measurements || "").trim(),
      budget: (b.budget || "").trim(),
      message: (b.message || "").trim(),
      photo_count: attachments.length,
      photo_names: attachments.map((a) => a.filename),
      created_at: new Date().toISOString(),
    };

    try { const db = await getDb(); if (db) await db.collection("consultations").insertOne({ ...record }); }
    catch (e) { console.error("DB store failed (continuing):", e); }

    try { await sendEmail(record, attachments); }
    catch (e) { console.error("Email failed (continuing):", e); }

    return res.status(200).json(record);
  } catch (e) {
    console.error("Submission failed:", e);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
