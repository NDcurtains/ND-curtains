import React from "react";
import { motion } from "framer-motion";

const chapters = [
  {
    no: "01",
    title: "In-Home Measure",
    desc: "We visit your home to measure precisely and help you choose the right fabrics, styles and finishes for each room.",
  },
  {
    no: "02",
    title: "Custom Design",
    desc: "Your curtains and blinds are made to order — sheer, blockout or double, in S-Fold/Wave, Pinch Pleat and more.",
  },
  {
    no: "03",
    title: "Professional Install",
    desc: "Our team installs everything cleanly and precisely, so your windows look considered and finished.",
  },
];

const HomeManifesto = () => {
  return (
    <section data-testid="home-manifesto" className="relative grain bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">How we work</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-cream sm:text-5xl">
            A considered process, end to end.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {chapters.map((c, i) => (
            <motion.div
              key={c.no}
              data-testid={`manifesto-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="border-t border-gold/25 py-8 md:border-l md:border-t-0 md:px-8 md:first:pl-0"
            >
              <span className="font-serif text-6xl text-gold/80 lg:text-7xl">{c.no}</span>
              <h3 className="mt-5 font-serif text-2xl text-cream">{c.title}</h3>
              <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-cream/65">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeManifesto;
