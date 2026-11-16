import React, { useEffect, useState } from "react";

const SORO_SRC = "https://app.trysoro.com/api/embed/20284f9a-3bc1-4bb5-8bb0-9fd05e7c025d";
const VISIBLE_ARTICLES = 5;

// Soro injects its article cards asynchronously, so locate the repeated card
// elements after they appear instead of assuming a particular embed wrapper.
const findArticleCards = (root) => {
  const elements = Array.from(root.querySelectorAll("article, li, div, a"));
  const groups = [];

  elements.forEach((element) => {
    const parent = element.parentElement;
    if (!parent || parent === root) return;

    const siblings = Array.from(parent.children);
    if (siblings.length < VISIBLE_ARTICLES + 1) return;

    const articleLike = (node) =>
      node.querySelector("img") &&
      node.querySelector("h1, h2, h3, h4, h5, h6, [class*='title'], [class*='Title']");

    if (!articleLike(element)) return;

    const matchingSiblings = siblings.filter(articleLike);
    if (matchingSiblings.length >= VISIBLE_ARTICLES + 1) {
      groups.push(matchingSiblings);
    }
  });

  // Prefer the smallest repeated card group to avoid hiding an outer layout.
  groups.sort((a, b) => a[0].querySelectorAll("*").length - b[0].querySelectorAll("*").length);
  return groups[0] || [];
};

const HomeSoroBlog = () => {
  const [showAllArticles, setShowAllArticles] = useState(false);

  useEffect(() => {
    if (!document.querySelector(`script[src="${SORO_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = SORO_SRC;
      script.defer = true;
      document.body.appendChild(script);
    }

    const root = document.getElementById("soro-blog");
    if (!root) return undefined;

    const applyArticleLimit = () => {
      const cards = findArticleCards(root);
      cards.forEach((card, index) => {
        if (!card.hasAttribute("data-home-journal-original-display")) {
          card.setAttribute(
            "data-home-journal-original-display",
            card.style.getPropertyValue("display")
          );
          card.setAttribute(
            "data-home-journal-original-priority",
            card.style.getPropertyPriority("display")
          );
        }

        if (!showAllArticles && index >= VISIBLE_ARTICLES) {
          card.style.setProperty("display", "none", "important");
        } else {
          const originalDisplay = card.getAttribute("data-home-journal-original-display");
          const originalPriority = card.getAttribute("data-home-journal-original-priority");
          if (originalDisplay) {
            card.style.setProperty("display", originalDisplay, originalPriority || "");
          } else {
            card.style.removeProperty("display");
          }
        }
      });
    };

    applyArticleLimit();
    const observer = new MutationObserver(applyArticleLimit);
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [showAllArticles]);

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
