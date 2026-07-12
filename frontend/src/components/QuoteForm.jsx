import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const serviceOptions = [
  "Custom Curtains",
  "Sheer Curtains",
  "Blockout Curtains",
  "Blinds",
  "Measure, Supply & Install",
  "Not sure yet",
];

const QuoteForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.service) {
      toast.error("Please fill in your name, email, phone and service.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/consultations`, form);
      toast.success("Thank you! We'll be in touch shortly to arrange your free consultation.");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please call us on 0487 930 023.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "border-0 border-b border-gold/30 rounded-none bg-transparent px-0 font-sans text-ink placeholder:text-ink/40 focus-visible:ring-0 focus-visible:border-gold";

  return (
    <section id="quote" data-testid="quote-section" className="relative bg-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">
        {/* Left: info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <p className="font-script text-4xl text-gold">Let's create something</p>
          <h2 className="mt-1 font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
            beautiful together.
          </h2>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-ink/70">
            Book a free, no-obligation consultation. Tell us about your windows and we'll
            recommend the perfect fit for your home and budget.
          </p>

          <div className="mt-10 space-y-5">
            <a href="tel:0487930023" data-testid="contact-phone" className="flex items-center gap-4 text-ink transition-colors hover:text-gold">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40"><Phone className="h-4 w-4 text-gold" /></span>
              <span className="font-sans text-sm tracking-wide">0487 930 023</span>
            </a>
            <a href="mailto:info@ndcurtains.com.au" data-testid="contact-email" className="flex items-center gap-4 text-ink transition-colors hover:text-gold">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40"><Mail className="h-4 w-4 text-gold" /></span>
              <span className="font-sans text-sm tracking-wide">info@ndcurtains.com.au</span>
            </a>
            <div data-testid="contact-location" className="flex items-center gap-4 text-ink">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40"><MapPin className="h-4 w-4 text-gold" /></span>
              <span className="font-sans text-sm tracking-wide">Officer South, Victoria</span>
            </div>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.form
          onSubmit={submit}
          data-testid="quote-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="rounded-sm border border-gold/20 bg-cream p-8 lg:col-span-7 lg:p-12"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-sans text-xs uppercase tracking-widest text-ink/60">Name</Label>
              <Input id="name" data-testid="input-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className={inputCls} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-sans text-xs uppercase tracking-widest text-ink/60">Phone</Label>
              <Input id="phone" data-testid="input-phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="04XX XXX XXX" className={inputCls} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans text-xs uppercase tracking-widest text-ink/60">Email</Label>
              <Input id="email" type="email" data-testid="input-email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className={inputCls} />
            </div>
            <div className="space-y-2">
              <Label className="font-sans text-xs uppercase tracking-widest text-ink/60">Service</Label>
              <Select value={form.service} onValueChange={(v) => update("service", v)}>
                <SelectTrigger data-testid="select-service" className="rounded-none border-0 border-b border-gold/30 bg-transparent px-0 font-sans text-ink focus:ring-0">
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent data-testid="select-service-content">
                  {serviceOptions.map((s) => (
                    <SelectItem key={s} value={s} data-testid={`service-option-${s}`}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <Label htmlFor="message" className="font-sans text-xs uppercase tracking-widest text-ink/60">Message</Label>
            <Textarea id="message" data-testid="input-message" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your windows, rooms or fabrics you love..." rows={4} className="rounded-none border-0 border-b border-gold/30 bg-transparent px-0 font-sans text-ink placeholder:text-ink/40 focus-visible:ring-0 focus-visible:border-gold resize-none" />
          </div>

          <button
            type="submit"
            disabled={loading}
            data-testid="submit-quote-btn"
            className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-cream transition-colors duration-300 hover:bg-gold hover:text-ink disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Sending..." : "Request My Free Quote"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default QuoteForm;
