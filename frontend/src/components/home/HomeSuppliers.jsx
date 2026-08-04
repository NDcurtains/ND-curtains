import React from "react";
import { Link } from "react-router-dom";
import SupplierGrid from "../SupplierGrid";
import { FABRIC_SUPPLIERS, BLIND_SUPPLIERS } from "../../lib/constants";

const HomeSuppliers = () => {
  return (
    <section data-testid="home-suppliers" className="relative bg-cream py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">Fabrics you can trust</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
            Brands you know &amp; trust.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-ink/60">
            Affordable to premium fabrics from leading suppliers, with colours, textures and
            designs to complement every style of home.
          </p>
        </div>

        <SupplierGrid names={FABRIC_SUPPLIERS} variant="light" testidPrefix="home-supplier" />

        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="font-sans text-xs uppercase tracking-widest text-ink/50">
            Blinds by {BLIND_SUPPLIERS.join(" · ")}
          </p>
          <Link to="/about" className="font-sans text-xs uppercase tracking-widest text-gold hover:text-ink">
            See all suppliers &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeSuppliers;
