import React from "react";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1688647063090-36f36f692d95?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1704040686413-2c607dbd2f06?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1754611362309-71297e9f42fd?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1754611380518-61a923cc47ca?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1776972334786-ae17d81b4572?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
];

const Gallery = () => {
  return (
    <section id="gallery" data-testid="gallery-section" className="relative bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">Our work</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
              Recently dressed windows.
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm text-ink/60">
            A selection of custom installations across Melbourne homes — every project made to measure.
          </p>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {images.map((src, i) => (
            <motion.figure
              key={i}
              data-testid={`gallery-item-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group relative overflow-hidden rounded-sm border border-gold/10 break-inside-avoid"
            >
              <img
                src={src}
                alt={`ND Curtains installation ${i + 1}`}
                className={`w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 ${
                  i % 2 === 0 ? "h-80" : "h-96"
                }`}
              />
              <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
