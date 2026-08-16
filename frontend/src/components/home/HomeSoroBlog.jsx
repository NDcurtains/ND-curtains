import React, { useEffect } from "react";

const SORO_SRC = "https://app.trysoro.com/api/embed/20284f9a-3bc1-4bb5-8bb0-9fd05e7c025d";

const HomeSoroBlog = () => {
  useEffect(() => {
    // Inject the Soro embed script once
    if (document.querySelector(`script[src="${SORO_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SORO_SRC;
    s.defer = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section data-testid="home-soro" className="relative bg-cream py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">From our journal</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
            Style notes &amp; inspiration
          </h2>
        </div>
        <div id="soro-blog" />
      </div>
    </section>
  );
};

export default HomeSoroBlog;
