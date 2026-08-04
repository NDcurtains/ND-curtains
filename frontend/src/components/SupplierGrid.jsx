import React from "react";
import { SUPPLIER_LOGOS } from "../lib/constants";

// Compact, elegant supplier grid. Renders an official logo on a clean light tile
// when available, otherwise a refined wordmark. Keeps each logo's proportions.
const SupplierGrid = ({ names, testidPrefix = "supplier" }) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {names.map((name, i) => {
        const logo = SUPPLIER_LOGOS[name];
        return (
          <div
            key={name}
            data-testid={`${testidPrefix}-${i}`}
            className="flex h-24 items-center justify-center rounded-sm border border-gold/20 bg-white px-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
          >
            {logo ? (
              <img
                src={logo}
                alt={`${name} logo`}
                loading="lazy"
                decoding="async"
                className="max-h-12 w-auto max-w-[85%] object-contain"
              />
            ) : (
              <span className="text-center font-serif text-lg tracking-wide text-ink/80">
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
