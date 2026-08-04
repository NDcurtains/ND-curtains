import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Upload, X, CheckCircle2 } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "../components/ui/select";
import { BUSINESS, IMAGES } from "../lib/constants";

const isDev = process.env.NODE_ENV === "development";
const API =
  isDev && process.env.REACT_APP_BACKEND_URL
    ? `${process.env.REACT_APP_BACKEND_URL}/api`
    : "/api";

const PRODUCTS = ["Sheer Curtains", "Blockout Curtains", "Sheer + Blockout", "Blinds", "Not Sure"];
const STYLES = ["S-Fold / Wave", "Pinch Pleat", "Other", "Not Sure"];
const BUDGETS = ["Under $1,000", "$1,000 – $3,000", "$3,000 – $6,000", "$6,000+", "Not Sure"];

const MAX_FILES = 5;

// Downscale + compress an image so photo attachments stay small and reliable.
function compressImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) return reject(new Error("Not an image"));
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const max = 1600;
        let { width, height } = img;
        if (width > max || height > max) {
          const scale = Math.min(max / width, max / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.72);
        const base64 = dataUrl.split(",")[1];
        resolve({
          filename: (file.name || "photo").replace(/\.[^.]+$/, "") + ".jpg",
          content: base64,
          contentType: "image/jpeg",
          preview: dataUrl,
        });
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const initial = {
  name: "", phone: "", email: "", suburb: "", product: "", windows: "",
  style: "", measurements: "", budget: "", message: "", company: "",
};

const GetAQuote = () => {
  const [form, setForm] = useState(initial);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const room = MAX_FILES - photos.length;
    if (room <= 0) { toast.error(`You can attach up to ${MAX_FILES} photos.`); return; }
    try {
      const compressed = await Promise.all(files.slice(0, room).map(compressImage));
      setPhotos((p) => [...p, ...compressed]);
    } catch {
      toast.error("One of the files couldn't be processed. Please use image files.");
    }
    e.target.value = "";
  };

  const removePhoto = (i) => setPhotos((p) => p.filter((_, idx) => idx !== i));

  const submit = async (e) => {
    e.preventDefault();
    if (form.company) return; // honeypot: silently drop bots
    if (!form.name || !form.email || !form.phone || !form.suburb || !form.product) {
      toast.error("Please fill in your name, phone, email, suburb and product required.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        attachments: photos.map(({ filename, content, contentType }) => ({ filename, content, contentType })),
      };
      await axios.post(`${API}/consultations`, payload);
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error("Something went wrong. Please call us on 0487 930 023.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "border-0 border-b border-gold/30 rounded-none bg-transparent px-0 font-sans text-ink placeholder:text-ink/40 focus-visible:ring-0 focus-visible:border-gold";
  const triggerCls =
    "rounded-none border-0 border-b border-gold/30 bg-transparent px-0 font-sans text-ink focus:ring-0";
  const labelCls = "font-sans text-xs uppercase tracking-widest text-ink/60";

  return (
    <>
      <Seo
        title="Get a Free Curtain & Blind Quote — Melbourne"
        description="Request your free quote for custom curtains and blinds in Melbourne. Tell us about your windows, fabrics and preferred style. Servicing Officer South and South East Melbourne."
        path="/get-a-quote"
      />
      <PageHero
        overline="Free & no obligation"
        title="Get Your Free Curtain & Blind Quote"
        subtitle="Tell us a little about your windows and what you're looking for. Our team will contact you to discuss fabric options, measurements and your preferred curtain or blind style."
        image={IMAGES.custom}
      />

      <section data-testid="quote-section" className="relative grain bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {done ? (
            <motion.div
              data-testid="quote-confirmation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-sm border border-gold/30 bg-paper p-10 text-center lg:p-14"
            >
              <CheckCircle2 className="mx-auto h-14 w-14 text-gold" strokeWidth={1.3} />
              <h2 className="mt-6 font-serif text-3xl font-light text-ink sm:text-4xl">Thank you for contacting ND Curtains.</h2>
              <p className="mx-auto mt-4 max-w-lg font-sans text-base leading-relaxed text-ink/70">
                We have received your quote request and will be in touch shortly.
              </p>
              <p className="mt-6 font-sans text-sm text-ink/60">
                Prefer to chat now? Call or WhatsApp us on{" "}
                <a href={`tel:${BUSINESS.phoneIntl}`} className="text-gold hover:underline">{BUSINESS.phone}</a>.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={submit}
              data-testid="quote-form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-sm border border-gold/20 bg-paper p-8 lg:p-12"
            >
              {/* Honeypot (hidden from users) */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                data-testid="hp-company"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className={labelCls}>Full Name *</Label>
                  <Input id="name" data-testid="input-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className={inputCls} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className={labelCls}>Phone Number *</Label>
                  <Input id="phone" data-testid="input-phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="04XX XXX XXX" className={inputCls} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className={labelCls}>Email *</Label>
                  <Input id="email" type="email" data-testid="input-email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className={inputCls} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="suburb" className={labelCls}>Suburb / Postcode *</Label>
                  <Input id="suburb" data-testid="input-suburb" value={form.suburb} onChange={(e) => update("suburb", e.target.value)} placeholder="e.g. Officer South 3809" className={inputCls} />
                </div>
                <div className="space-y-2">
                  <Label className={labelCls}>Product Required *</Label>
                  <Select value={form.product} onValueChange={(v) => update("product", v)}>
                    <SelectTrigger data-testid="select-product" className={triggerCls}><SelectValue placeholder="Choose a product" /></SelectTrigger>
                    <SelectContent>
                      {PRODUCTS.map((p) => <SelectItem key={p} value={p} data-testid={`product-option-${p}`}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="windows" className={labelCls}>Number of Windows</Label>
                  <Input id="windows" type="number" min="0" data-testid="input-windows" value={form.windows} onChange={(e) => update("windows", e.target.value)} placeholder="e.g. 4" className={inputCls} />
                </div>
                <div className="space-y-2">
                  <Label className={labelCls}>Preferred Curtain Style</Label>
                  <Select value={form.style} onValueChange={(v) => update("style", v)}>
                    <SelectTrigger data-testid="select-style" className={triggerCls}><SelectValue placeholder="Choose a style" /></SelectTrigger>
                    <SelectContent>
                      {STYLES.map((s) => <SelectItem key={s} value={s} data-testid={`style-option-${s}`}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className={labelCls}>Budget Range (optional)</Label>
                  <Select value={form.budget} onValueChange={(v) => update("budget", v)}>
                    <SelectTrigger data-testid="select-budget" className={triggerCls}><SelectValue placeholder="Select a range" /></SelectTrigger>
                    <SelectContent>
                      {BUDGETS.map((b) => <SelectItem key={b} value={b} data-testid={`budget-option-${b}`}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <Label htmlFor="measurements" className={labelCls}>Approximate Measurements (optional)</Label>
                <Input id="measurements" data-testid="input-measurements" value={form.measurements} onChange={(e) => update("measurements", e.target.value)} placeholder="e.g. Living room window ~2.4m wide x 2.1m high" className={inputCls} />
              </div>

              <div className="mt-8 space-y-2">
                <Label htmlFor="message" className={labelCls}>Message / Additional Information</Label>
                <Textarea id="message" data-testid="input-message" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your windows, rooms or fabrics you love..." rows={4} className="resize-none rounded-none border-0 border-b border-gold/30 bg-transparent px-0 font-sans text-ink placeholder:text-ink/40 focus-visible:ring-0 focus-visible:border-gold" />
              </div>

              {/* Photo upload */}
              <div className="mt-8 space-y-3">
                <Label className={labelCls}>Photos of Your Windows (optional · up to {MAX_FILES})</Label>
                <label htmlFor="photos" data-testid="photo-upload-label" className="flex cursor-pointer items-center justify-center gap-3 rounded-sm border border-dashed border-gold/40 bg-cream px-4 py-6 text-ink/60 transition-colors hover:border-gold">
                  <Upload className="h-5 w-5 text-gold" />
                  <span className="font-sans text-sm">Tap to add photos</span>
                  <input id="photos" type="file" accept="image/*" multiple capture="environment" onChange={onFiles} data-testid="input-photos" className="hidden" />
                </label>
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5" data-testid="photo-previews">
                    {photos.map((p, i) => (
                      <div key={i} className="group relative overflow-hidden rounded-sm border border-gold/20">
                        <img src={p.preview} alt={`Upload ${i + 1}`} className="h-20 w-full object-cover" />
                        <button type="button" onClick={() => removePhoto(i)} data-testid={`remove-photo-${i}`} className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-cream">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                data-testid="submit-quote-btn"
                className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-cream transition-colors duration-300 hover:bg-gold hover:text-ink disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Sending..." : "Submit Quote Request"}
              </button>
              <p className="mt-4 text-center font-sans text-xs text-ink/50">
                We'll only use your details to prepare your quote. No spam, ever.
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </>
  );
};

export default GetAQuote;
