import React, { useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BUSINESS } from "../../lib/constants";

const CurtainScene = lazy(() => import("../CurtainScene"));

const LINES = ["Custom Curtains", "& Blinds for", "Melbourne homes."];

const HomeHero = () => {
  const openRef = useRef(0.08);
  const heroRef = useRef(null);
  const [manualOpen, setManualOpen] = useState(0);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      openRef.current = Math.max(progress * 1.15, manualOpen, 0.08);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [manualOpen]);

  const toggleDraw = () => {
    const next = drawn ? 0 : 1;
    setDrawn(!drawn);
    setManualOpen(next);
    openRef.current = Math.max(openRef.current, next);
  };

  return (
    <section
      ref={heroRef}
      data-testid="hero-section"
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-ink" />}>
          <CurtainScene openRef={openRef} />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink/45 via-transparent to-ink/75" />

      <div className="relative z-20 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-5 font-sans text-[11px] uppercase tracking-[0.42em] text-ink"
          data-testid="hero-overline"
        >
          {BUSINESS.locationLine} · South East Melbourne
        </motion.p>

        <h1 data-testid="hero-title" className="font-serif text-[13vw] font-light leading-[0.92] tracking-tight text-cream sm:text-7xl lg:text-8xl">
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden py-[0.05em]">
              <motion.span
                className="block"
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.95, delay: 0.25 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                {i === 0 ? <span className="italic text-champagne">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-7 max-w-xl font-sans text-base leading-relaxed text-cream/80"
          data-testid="hero-subtitle"
        >
          Sheer, blockout &amp; double curtains and custom blinds — measured, designed and
          installed. Where luxury meets affordability.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            to="/get-a-quote"
            data-testid="hero-quote-btn"
            className="rounded-full bg-gold px-9 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-ink transition-colors duration-300 hover:bg-champagne"
          >
            Get a Free Quote
          </Link>
          <button
            onClick={toggleDraw}
            data-testid="hero-draw-btn"
            className="rounded-full border border-cream/40 px-9 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            {drawn ? "Close the Curtains" : "Draw the Curtains"}
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.3em] text-cream/60"
      >
        Scroll to reveal
      </motion.div>
    </section>
  );
};

export default HomeHero;
