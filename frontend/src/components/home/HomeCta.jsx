import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IMAGES } from "../../lib/constants";

const HomeCta = () => {
  return (
    <section data-testid="home-cta" className="relative overflow-hidden bg-ink py-28 lg:py-36">
      <div className="absolute inset-0 opacity-25">
        <img src={IMAGES.custom} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-ink/70" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <p className="font-script text-4xl text-gold">Let's create something</p>
        <h2 className="mt-1 font-serif text-4xl font-light leading-tight text-cream sm:text-6xl">
          beautiful together.
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-cream/75">
          Book a free, no-obligation consultation. Tell us about your windows and we'll
          recommend the perfect fit for your home and budget.
        </p>
        <Link
          to="/get-a-quote"
          data-testid="cta-quote-btn"
          className="mt-9 inline-block rounded-full bg-gold px-10 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-ink transition-colors duration-300 hover:bg-champagne"
        >
          Get a Free Quote
        </Link>
      </motion.div>
    </section>
  );
};

export default HomeCta;
