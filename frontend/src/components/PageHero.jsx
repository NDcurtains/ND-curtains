import React from "react";
import { motion } from "framer-motion";

const PageHero = ({ overline, title, subtitle, image }) => {
  return (
    <section data-testid="page-hero" className="relative overflow-hidden bg-ink pt-32 pb-16 lg:pt-40 lg:pb-24">
      {image && (
        <>
          <div className="absolute inset-0 opacity-30">
            <img src={image} alt="" aria-hidden fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink" />
        </>
      )}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-10">
        {overline && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 font-sans text-[11px] uppercase tracking-[0.4em] text-gold"
          >
            {overline}
          </motion.p>
        )}
        <h1 className="overflow-hidden font-serif text-4xl font-light leading-[1.02] tracking-tight text-cream sm:text-5xl lg:text-6xl">
          <motion.span
            className="block"
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.span>
        </h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-cream/75"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
