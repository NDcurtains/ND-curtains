import React from "react";

// Slow editorial marquee band.
const Marquee = ({ items, className = "", dark = true }) => {
  const content = items.join("      \u00B7      ");
  const renderContent = () => {
    const parts = content.split("0477 696 074");
    return parts.flatMap((part, index) =>
      index === 0
        ? [part]
        : [
            <span key={`phone-${index}`} className="font-sans tracking-normal normal-case">
              0477 696 074
            </span>,
            part,
          ]
    );
  };

  return (
    <div
      data-testid="marquee"
      className={`grain relative overflow-hidden border-y ${
        dark ? "border-gold/20 bg-ink" : "border-gold/20 bg-cream"
      } py-6 ${className}`}
    >
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {[0, 1].map((k) => (
          <span
            key={k}
            className={`font-serif text-2xl uppercase tracking-[0.15em] sm:text-3xl ${
              dark ? "text-cream/90" : "text-ink"
            }`}
          >
            {renderContent()}
            <span className="mx-8 text-gold">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
