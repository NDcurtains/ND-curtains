import React, { useEffect, useState } from "react";

const SORO_SRC = "https://app.trysoro.com/api/embed/20284f9a-3bc1-4bb5-8bb0-9fd05e7c025d";

const HomeSoroBlog = () => {
  const [showAllArticles, setShowAllArticles] = useState(false);

  useEffect(() => {
    // Inject the Soro embed script once.
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

        <div
          id="soro-blog"
          className={showAllArticles ? "soro-blog-expanded" : "soro-blog-collapsed"}
        />

        <style>{`
          /* Keep the homepage journal concise while leaving every Soro article available. */
          #soro-blog.soro-blog-collapsed > :nth-child(n + 6),
          #soro-blog.soro-blog-collapsed > * > :nth-child(n + 6) {
            display: none !important;
          }
        `}</style>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllArticles((current) => !current)}
            aria-expanded={showAllArticles}
            aria-controls="soro-blog"
            className="inline-flex items-center justify-center border border-[#c9a45b] px-8 py-3 font-sans text-xs uppercase tracking-[0.22em] text-[#9b7838] transition-colors duration-200 hover:bg-[#c9a45b] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#c9a45b] focus:ring-offset-2"
          >
            {showAllArticles ? "Show fewer articles" : "View all articles"}
            <span className="ml-3" aria-hidden="true">{showAllArticles ? "↑" : "→"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeSoroBlog;
