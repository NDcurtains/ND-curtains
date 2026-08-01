// Vercel Serverless Function — Consultation form handler
// Route: POST /api/consultations  (also GET to list, when a DB is configured)
//
// This replaces the standalone FastAPI backend for the Vercel deployment.
// It ALWAYS tries to email the business a lead notification, and OPTIONALLY
// stores the submission in MongoDB (only if MONGODB_URI is set).
//
// Required env vars (set in Vercel → Project → Settings → Environment Variables):
//   EMAIL PROVIDER (choose ONE):
//     - EMERGENT_EMAIL_KEY   (recommended: Emergent managed email, delivers to any inbox)
//       + EMAIL_FROM_NAME    (sender display name, e.g. "ND Curtains")
//     - RESEND_API_KEY       (alternative: your own Resend account)
//       + SENDER_EMAIL       (verified "from", e.g. "ND Curtains <hello@yourdomain>")
//   NOTIFY_EMAIL             (where leads are sent, e.g. info@ndcurtains.com.au)
//   OPTIONAL STORAGE:
//     - MONGODB_URI          (MongoDB Atlas connection string)
//     - DB_NAME              (defaults to "nd_curtains")

const EMAIL_BASE_URL = "https://integrations.emergentagent.com";

// ---- MongoDB (optional, connection reused across warm invocations) ----
async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!global._ndMongoPromise) {
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(uri, { maxPoolSize: 5 });
    global._ndMongoPromise = client
      .connect()
      .then((c) => c.db(process.env.DB_NAME || "nd_curtains"));
  }
  return global._ndMongoPromise;
}

// ---- Email helpers ----
async function sendManagedEmail({ to, subject, html, replyTo }) {
  const payload = {
    to: [to],
    subject,
    html,
    from_name: process.env.EMAIL_FROM_NAME || "ND Curtains",
  };
  if (replyTo) payload.contact_email = replyTo;

  const resp = await fetch(`${EMAIL_BASE_URL}/api/v1/email/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Email-Key": process.env.EMERGENT_EMAIL_KEY,
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Managed email failed: ${resp.status} ${text}`);
  }
}

async function sendResendEmail({ to, subject, html, replyTo }) {
  const { Resend } = require("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.SENDER_EMAIL || "ND Curtains <onboarding@resend.dev>",
    to: [to],
    reply_to: replyTo,
    subject,
    html,
  });
  if (error) throw new Error(`Resend failed: ${JSON.stringify(error)}`);
}

async function sendNotification(record) {
  const to = process.env.NOTIFY_EMAIL || "info@ndcurtains.com.au";
  const subject = `New consultation request from ${record.name}`;
  const html = `
    <table role="presentation" width="100%" style="font-family:Arial,Helvetica,sans-serif;color:#1A1A1A">
      <tr><td style="padding:8px 0"><h2 style="margin:0;color:#C5A059">New Consultation Request — ND Curtains</h2></td></tr>
      <tr><td>
        <table role="presentation" style="border-collapse:collapse">
          <tr><td style="padding:6px 14px 6px 0"><b>Name</b></td><td style="padding:6px 0">${record.name}</td></tr>
          <tr><td style="padding:6px 14px 6px 0"><b>Email</b></td><td style="padding:6px 0">${record.email}</td></tr>
          <tr><td style="padding:6px 14px 6px 0"><b>Phone</b></td><td style="padding:6px 0">${record.phone}</td></tr>
          <tr><td style="padding:6px 14px 6px 0"><b>Service</b></td><td style="padding:6px 0">${record.service}</td></tr>
          <tr><td style="padding:6px 14px 6px 0;vertical-align:top"><b>Message</b></td><td style="padding:6px 0">${(record.message || "").replace(/</g, "&lt;")}</td></tr>
        </table>
      </td></tr>
    </table>`;

  if (process.env.EMERGENT_EMAIL_KEY) {
    await sendManagedEmail({ to, subject, html, replyTo: record.email });
  } else if (process.env.RESEND_API_KEY) {
    await sendResendEmail({ to, subject, html, replyTo: record.email });
  } else {
    console.warn("No email provider configured (set EMERGENT_EMAIL_KEY or RESEND_API_KEY).");
  }
}

// ---- Handler ----
module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    try {
      const db = await getDb();
      if (!db) return res.status(200).json([]);
      const docs = await db
        .collection("consultations")
        .find({}, { projection: { _id: 0 } })
        .sort({ created_at: -1 })
        .limit(1000)
        .toArray();
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
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const service = (body.service || "").trim();
    const message = (body.message || "").trim();

    if (!name || !email || !phone || !service) {
      return res.status(422).json({ error: "Name, email, phone and service are required." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(422).json({ error: "Please provide a valid email address." });
    }

    const record = {
      id: require("crypto").randomUUID(),
      name,
      email,
      phone,
      service,
      message,
      created_at: new Date().toISOString(),
    };

    // Persist (optional) — never block the response on storage failures.
    try {
      const db = await getDb();
      if (db) await db.collection("consultations").insertOne({ ...record });
    } catch (e) {
      console.error("DB store failed (continuing):", e);
    }

    // Notify by email — do not fail the submission if email hiccups.
    try {
      await sendNotification(record);
    } catch (e) {
      console.error("Email notification failed (continuing):", e);
    }

    return res.status(200).json(record);
  } catch (e) {
    console.error("Submission failed:", e);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
