import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    quote:
      "The sheers completely transformed our living room — soft light all day and total privacy at night. Faultless install.",
    name: "Amelia R.",
    place: "Berwick, VIC",
  },
  {
    quote:
      "Beautiful custom curtains at a price that genuinely surprised us. The measure and fitting were spot on.",
    name: "Daniel & Priya",
    place: "Officer, VIC",
  },
  {
    quote:
      "Blockout curtains in the kids' rooms have been a game changer. Professional, tidy and on time.",
    name: "Sophie M.",
    place: "Pakenham, VIC",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" data-testid="testimonials-section" className="relative grain bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">Kind words</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-cream sm:text-5xl">
            Loved by Melbourne homes.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={r.name}
              data-testid={`testimonial-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col rounded-sm border border-gold/20 bg-charcoal/60 p-8"
            >
              <div className="mb-5 flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-gold" strokeWidth={0} />
                ))}
              </div>
              <p className="font-serif text-xl italic leading-relaxed text-cream/90">"{r.quote}"</p>
              <footer className="mt-6 border-t border-gold/15 pt-4">
                <p className="font-sans text-sm font-semibold text-cream">{r.name}</p>
                <p className="font-sans text-xs uppercase tracking-widest text-gold/70">{r.place}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
