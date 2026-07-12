import React from "react";
import { motion } from "framer-motion";
import { Gem, Ruler, HandCoins, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Gem,
    title: "Luxury, Made Affordable",
    desc: "Designer-grade fabrics and a premium finish — priced so beautiful windows aren’t a splurge.",
  },
  {
    icon: Ruler,
    title: "Made to Measure",
    desc: "Every curtain and blind is custom cut to your exact windows for a flawless, tailored fit.",
  },
  {
    icon: HandCoins,
    title: "Honest, Upfront Pricing",
    desc: "Transparent quotes with no hidden costs — you’ll always know exactly what you’re paying for.",
  },
  {
    icon: ShieldCheck,
    title: "Measured, Supplied & Installed",
    desc: "One trusted local team handles it all, from free on-site consult to a clean professional install.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" data-testid="why-us-section" className="relative grain bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">Why choose us</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-cream sm:text-5xl">
            Where luxury meets <span className="italic text-champagne">affordability</span>.
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-cream/70">
            We believe a beautifully dressed home shouldn’t cost a fortune. ND Curtains brings you
            high-end curtains and blinds at genuinely accessible prices — the luxury look, without the luxury markup.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.article
                key={r.title}
                data-testid={`why-us-card-${i}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group rounded-sm border border-gold/20 bg-charcoal/50 p-8 transition-colors duration-300 hover:border-gold/60"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-serif text-2xl text-cream">{r.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-cream/65">{r.desc}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="#quote"
            data-testid="why-us-cta"
            className="rounded-full bg-gold px-9 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-ink transition-colors duration-300 hover:bg-champagne"
          >
            Get Your Free Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
