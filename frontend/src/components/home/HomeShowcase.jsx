import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IMAGES } from "../../lib/constants";

const items = [
  {
    title: "Sheer Curtains",
    desc: "Soft, light-filtering elegance with daytime privacy.",
    img: IMAGES.sheer,
    to: "/curtains",
  },
  {
    title: "Blockout Curtains",
    desc: "Room-darkening comfort for restful bedrooms and living spaces.",
    img: IMAGES.blockout,
    to: "/curtains",
  },
  {
    title: "Custom Blinds",
    desc: "Made-to-measure blinds for sleek control over light and privacy.",
    img: IMAGES.blinds,
    to: "/blinds",
  },
];

const HomeShowcase = () => {
  return (
    <section data-testid="home-showcase" className="relative bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">What we make</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
              Curtains &amp; blinds, made to measure.
            </h2>
          </div>
          <Link to="/curtains" className="font-sans text-xs uppercase tracking-widest text-ink/60 transition-colors hover:text-gold">
            View all curtains &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((s, i) => (
            <motion.div
              key={s.title}
              data-testid={`showcase-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Link to={s.to} className="group block">
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={s.img}
                    alt={`${s.title} by ND Curtains Melbourne`}
                    loading="lazy"
                    decoding="async"
                    className="h-[420px] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  />
                  {/* spotlight sweep */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 50% 30%, rgba(197,160,89,0.28), transparent 60%)" }} />
                  <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-cream/40 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100">&rarr;</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl text-ink transition-colors group-hover:text-gold">{s.title}</h3>
                <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink/60">{s.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeShowcase;
