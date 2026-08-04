import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { REVIEWS } from "../../lib/constants";

const HomeReviews = () => {
  return (
    <section id="reviews" data-testid="home-reviews" className="relative grain bg-paper py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl px-6 text-center lg:px-10"
      >
        <div className="mb-5 flex items-center justify-center gap-1.5 text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-6 w-6 fill-gold" strokeWidth={0} />
          ))}
        </div>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">What our customers say</p>
        <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
          Real experiences from our ND Curtains customers
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-ink/70">
          We're proud of the homes we've dressed across Melbourne. Read what our customers say on
          Google — and if we've helped with your windows, we'd love you to share your experience.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={REVIEWS.readUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="read-reviews-btn"
            className="rounded-full bg-ink px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-cream transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            Read Our Google Reviews
          </a>
          <a
            href={REVIEWS.writeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="write-review-btn"
            className="rounded-full border border-ink/25 px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Leave Us a Google Review
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeReviews;
