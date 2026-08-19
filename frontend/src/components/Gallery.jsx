import React from "react";
import { motion } from "framer-motion";

// Responsive editorial gallery — clipped frames, staggered reveal on scroll.
// Items: [{ src, alt, tall? }]
const Gallery = ({ overline = "Gallery", title, subtitle, items = [], testid = "gallery" }) => {
  return (
    <section data-testid={testid} className="relative bg-paper py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">{overline}</p>
          {title && (
            <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-ink sm:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 font-sans text-sm leading-relaxed text-ink/60">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {items.map((it, i) => (
            <motion.figure
              key={i}
              data-testid={`${testid}-item-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
             className={`group relative rounded-sm border border-gold/15 ${
                it.tall ? "row-span-2" : ""
              }`}
              style={{ clipPath: i % 4 === 0 ? "polygon(0 3%, 100% 0, 100% 97%, 0 100%)" : undefined }}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain transition-transform duration-[1.4s] ease-out"
                }`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
