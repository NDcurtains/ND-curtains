import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Homes Dressed" },
  { value: "12+", label: "Years Craft" },
  { value: "100%", label: "Custom Made" },
];

const About = () => {
  return (
    <section id="about" data-testid="about-section" className="relative grain bg-cream py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="relative lg:col-span-6"
        >
          <div className="overflow-hidden rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000"
              alt="Sheer curtains in a luxury living room"
              data-testid="about-image"
              className="h-[420px] w-full object-cover transition-transform duration-[1.2s] hover:scale-105 lg:h-[560px]"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden rounded-sm border border-gold/40 bg-ink px-8 py-6 sm:block">
            <p className="font-script text-3xl text-gold">Curate. Design.</p>
            <p className="font-serif text-2xl tracking-widest text-cream">ELEVATE.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="lg:col-span-6"
        >
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">Welcome to ND Curtains</p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
            Beautiful, custom window furnishings — crafted for the way you live.
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-ink/70">
            We create bespoke curtains and blinds that bring style, comfort and privacy
            to your home. From the first measure to the final install, our Melbourne team
            handles every detail so your windows feel effortlessly considered.
          </p>
          <p className="mt-4 font-sans text-base leading-relaxed text-ink/70">
            Premium fabrics, honest pricing, and a finish that looks like it was always
            meant to be there. That's where luxury meets affordability.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-gold/20 pt-8" data-testid="about-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-4xl text-gold">{s.value}</p>
                <p className="mt-1 font-sans text-xs uppercase tracking-widest text-ink/60">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
