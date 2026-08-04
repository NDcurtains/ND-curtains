import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IMAGES } from "../../lib/constants";

const HomeIntro = () => {
  return (
    <section data-testid="home-intro" className="relative grain bg-cream py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-6"
        >
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">Welcome to ND Curtains</p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
            Beautiful, custom window furnishings — crafted for the way you live.
          </h2>
          <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-ink/70">
            With 10+ years of industry experience, ND Curtains creates made-to-measure sheer
            curtains, blockout curtains and blinds for Melbourne homes — from affordable everyday
            fabrics to premium designer collections.
          </p>
          <Link
            to="/about"
            data-testid="home-learn-more"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/20 px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-widest text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Learn More About Us
            <span aria-hidden>&rarr;</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative lg:col-span-6"
        >
          <div className="overflow-hidden rounded-sm" style={{ clipPath: "polygon(0 0, 100% 4%, 100% 100%, 0 96%)" }}>
            <img
              src={IMAGES.interior}
              alt="Custom curtains in a luxury Melbourne living room"
              loading="lazy"
              decoding="async"
              className="h-[420px] w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105 lg:h-[560px]"
            />
          </div>
          <div className="absolute -bottom-7 -left-4 hidden rounded-sm border border-gold/40 bg-ink px-8 py-6 sm:block">
            <p className="font-script text-3xl text-gold">Curate. Design.</p>
            <p className="font-serif text-2xl tracking-widest text-cream">ELEVATE.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeIntro;
