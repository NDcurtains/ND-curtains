import React from "react";
import { SUPPLIER_LOGOS } from "../lib/constants";

// Compact, elegant supplier grid. Renders an official logo image when available
// in SUPPLIER_LOGOS, otherwise a refined wordmark. Keeps logo proportions.
const SupplierGrid = ({ names, variant = "light", testidPrefix = "supplier" }) => {
  const dark = variant === "dark";
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {names.map((name, i) => {
        const logo = SUPPLIER_LOGOS[name];
        return (
          <div
            key={name}
            data-testid={`${testidPrefix}-${i}`}
            className={`flex h-20 items-center justify-center rounded-sm border px-5 transition-colors duration-300 sm:h-24 ${
              dark ? "border-gold/20 bg-charcoal/40 hover:border-gold/50" : "border-gold/20 bg-cream hover:border-gold/50"
            }`}
          >
            {logo ? (
              <img
                src={logo}
                alt={`${name} logo`}
                loading="lazy"
                decoding="async"
                className={`max-h-10 w-auto max-w-[80%] object-contain ${dark ? "" : ""}`}
              />
            ) : (
              <span className={`text-center font-serif text-base tracking-wide sm:text-lg ${dark ? "text-cream/85" : "text-ink/80"}`}>
                {name}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SupplierGrid;
