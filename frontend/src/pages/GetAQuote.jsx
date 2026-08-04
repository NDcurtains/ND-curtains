import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
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

const SERVICES = [
  "Sheer Curtains",
  "Blockout Curtains",
  "Sheer + Blockout Curtains",
  "Blinds",
  "Curtains & Blinds",
  "Not Sure / Need Advice",
];
const BUDGETS = ["Under $1,000", "$1,000 – $3,000", "$3,000 – $6,000", "$6,000+", "Prefer not to say"];

const initial = { name: "", phone: "", email: "", service: "", budget: "", message: "", company: "" };

const GetAQuote = () => {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.company) return; // honeypot
    if (!form.name || !form.phone || !form.service) {
      toast.error("Please add your name, phone number and the service you need.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/consultations`, { ...form, product: form.service });
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
        description="Request your free quote for custom curtains and blinds in Melbourne. Quick and easy — tell us what you're looking for and our team will be in touch. Servicing Officer South and South East Melbourne."
        path="/get-a-quote"
      />
      <PageHero
        overline="Free & no obligation"
        title="Get Your Free Curtain & Blind Quote"
        subtitle="Tell us a little about what you're looking for and our team will contact you to discuss fabrics, measurements and styles. It only takes a minute."
        image={IMAGES.custom}
      />

      <section data-testid="quote-section" className="relative grain bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
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
              {/* Honeypot */}
              <input
                type="text" tabIndex={-1} autoComplete="off"
                value={form.company} onChange={(e) => update("company", e.target.value)}
                data-testid="hp-company" className="hidden" aria-hidden="true"
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
                  <Label htmlFor="email" className={labelCls}>Email</Label>
                  <Input id="email" type="email" data-testid="input-email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className={inputCls} />
                </div>
                <div className="space-y-2">
                  <Label className={labelCls}>Service Needed *</Label>
                  <Select value={form.service} onValueChange={(v) => update("service", v)}>
                    <SelectTrigger data-testid="select-service" className={triggerCls}><SelectValue placeholder="Choose a service" /></SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((s) => <SelectItem key={s} value={s} data-testid={`service-option-${s}`}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className={labelCls}>Budget (optional)</Label>
                  <Select value={form.budget} onValueChange={(v) => update("budget", v)}>
                    <SelectTrigger data-testid="select-budget" className={triggerCls}><SelectValue placeholder="Select a range" /></SelectTrigger>
                    <SelectContent>
                      {BUDGETS.map((b) => <SelectItem key={b} value={b} data-testid={`budget-option-${b}`}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <Label htmlFor="message" className={labelCls}>Tell Us What You're Looking For</Label>
                <Textarea id="message" data-testid="input-message" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="e.g. Sheer curtains for the living room and blockout in two bedrooms..." rows={4} className="resize-none rounded-none border-0 border-b border-gold/30 bg-transparent px-0 font-sans text-ink placeholder:text-ink/40 focus-visible:ring-0 focus-visible:border-gold" />
              </div>

              <button
                type="submit" disabled={loading} data-testid="submit-quote-btn"
                className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-cream transition-colors duration-300 hover:bg-gold hover:text-ink disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Sending..." : "Get My Free Quote"}
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
