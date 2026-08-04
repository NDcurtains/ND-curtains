import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Ruler, Package, Wrench } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { BLIND_SUPPLIERS, IMAGES } from "../lib/constants";

const services = [
  { icon: Ruler, title: "In-Home Measure", desc: "We measure your windows precisely and help you select fabrics and finishes." },
  { icon: Package, title: "Quality Supply", desc: `Custom blinds supplied through trusted suppliers including ${BLIND_SUPPLIERS.join(" and ")}.` },
  { icon: Wrench, title: "Professional Install", desc: "Clean, precise installation so your blinds look and function beautifully." },
];

const Blinds = () => {
  return (
    <>
      <Seo
        title="Custom Blinds Melbourne — Measure, Supply & Install"
        description="Custom-made blinds in Melbourne from ND Curtains. Made-to-measure blinds through trusted suppliers Shaw and Ocean Fabrics, with in-home measure and professional installation across South East Melbourne."
        path="/blinds"
      />
      <PageHero
        overline="Blinds"
        title="Custom-Made Blinds for Your Windows"
        subtitle="Made-to-measure blinds, supplied and professionally installed for Melbourne homes."
        image={IMAGES.blinds}
      />

      <section data-testid="blinds-section" className="relative grain bg-cream py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="overflow-hidden rounded-sm"
            style={{ clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)" }}
          >
            <img src={IMAGES.blinds} alt="Custom blinds by ND Curtains Melbourne" loading="lazy" decoding="async" className="h-full min-h-[380px] w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl font-light text-ink sm:text-4xl">Blinds, tailored to your home</h2>
            <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-ink/70">
              ND Curtains supplies and installs custom-made blinds to suit your windows, style and
              budget. We measure in your home, help you choose the right option, and install
              everything professionally — the same considered service we bring to our curtains.
            </p>
            <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-ink/70">
              Our blinds are sourced through trusted suppliers including {BLIND_SUPPLIERS.join(" and ")}.
              For the full range available for your project, get in touch and we'll guide you through the options.
            </p>
            <Link to="/get-a-quote" className="mt-8 inline-block rounded-full bg-ink px-9 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-gold hover:text-ink">
              Enquire About Blinds
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="rounded-sm border border-gold/20 bg-cream p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink/65">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blinds;
