import React, { useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";

const CurtainScene = lazy(() => import("./CurtainScene"));

const Hero = () => {
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
      id="home"
      data-testid="hero-section"
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      {/* 3D scene */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-ink" />}>
          <CurtainScene openRef={openRef} />
        </Suspense>
      </div>

      {/* vignette + readability overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink/50 via-transparent to-ink/70" />

      {/* Overlay content */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-sans text-xs uppercase tracking-[0.42em] text-ink"
          data-testid="hero-overline"
        >
          Melbourne · Officer South, VIC
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mt-4 font-serif text-5xl font-light leading-[0.95] tracking-tight text-cream sm:text-6xl lg:text-8xl"
          data-testid="hero-title"
        >
          Curtains that <span className="italic text-champagne">drape</span>
          <br /> your world in light.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-7 max-w-xl font-sans text-base leading-relaxed text-cream/80"
          data-testid="hero-subtitle"
        >
          Custom curtains, sheers, blockouts &amp; blinds — measured, designed and
          installed. Where luxury meets affordability.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#quote"
            data-testid="hero-quote-btn"
            className="rounded-full bg-gold px-9 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-ink transition-colors duration-300 hover:bg-champagne"
          >
            Book a Free Consultation
          </a>
          <button
            onClick={toggleDraw}
            data-testid="hero-draw-btn"
            className="rounded-full border border-cream/40 px-9 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            {drawn ? "Close the Curtains" : "Draw the Curtains"}
          </button>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.3em] text-cream/60"
      >
        Scroll to reveal
      </motion.div>
    </section>
  );
};

export default Hero;
