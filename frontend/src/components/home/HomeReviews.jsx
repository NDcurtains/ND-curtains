import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { REVIEWS } from "../../lib/constants";

const HomeReviews = () => {
  const hasWidget = Boolean(REVIEWS.featurableWidgetId);

  return (
    <section id="reviews" data-testid="home-reviews" className="relative bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-gold" strokeWidth={0} />
            ))}
          </div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">What our customers say</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
            Real experiences from our ND Curtains customers
          </h2>
        </div>

        {/* Google Reviews widget mount area (Featurable embed). */}
        <div
          id="featurable-widget"
          data-testid="reviews-widget"
          className="min-h-[200px] rounded-sm border border-gold/20 bg-cream p-6"
        >
          {!hasWidget && (
            <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
              <p className="font-serif text-2xl text-ink/70">Google reviews load here</p>
              <p className="mt-2 max-w-md font-sans text-sm text-ink/50">
                Live Google reviews will appear in this section once the Featurable widget
                embed code is connected.
              </p>
            </div>
          )}
          {/* When you provide the Featurable embed, it will be injected here. */}
        </div>

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
      </div>
    </section>
  );
};

export default HomeReviews;
