import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SupplierGrid from "../components/SupplierGrid";
import { BUSINESS, FABRIC_SUPPLIERS, BLIND_SUPPLIERS, IMAGES } from "../lib/constants";

const reasons = [
  "10+ Years Industry Experience",
  "Sheer, Blockout & Double Curtains",
  "Affordable to Premium Fabrics",
  "S-Fold/Wave, Pinch Pleat & More",
  "In-Home Measure & Fabric Selection",
  "Custom-Made to Your Windows",
  "Professional Installation",
];

const About = () => {
  return (
    <>
      <Seo
        title="About Us — Custom Curtains & Blinds Melbourne"
        description="ND Curtains brings 10+ years of experience in custom sheer curtains, blockout curtains and blinds for Melbourne homes. Servicing Officer South & South East Melbourne, with fabrics from leading suppliers."
        path="/about"
      />
      <PageHero
        overline="About ND Curtains"
        title="Custom Curtains & Blinds in Melbourne"
        subtitle={BUSINESS.serviceArea}
        image={IMAGES.sheerAlt}
      />

      {/* Intro content */}
      <section data-testid="about-section" className="relative grain bg-cream py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <p className="font-sans text-base leading-relaxed text-ink/75">
              ND Curtains brings 10+ years of industry experience, specialising in custom-made
              sheer curtains, blockout curtains and blinds. We provide personalised window
              furnishing solutions for Melbourne homes, with options ranging from affordable
              everyday fabrics to premium designer collections.
            </p>
            <p className="mt-5 font-sans text-base leading-relaxed text-ink/75">
              We work with leading fabric suppliers including {FABRIC_SUPPLIERS.filter((s) => s !== "And more").join(", ")} and more,
              along with blinds from {BLIND_SUPPLIERS.join(" and ")}.
            </p>

            <h2 className="mt-12 font-serif text-3xl font-light text-ink sm:text-4xl">Why Choose ND Curtains?</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2" data-testid="about-reasons">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15">
                    <Check className="h-3.5 w-3.5 text-gold" strokeWidth={2.5} />
                  </span>
                  <span className="font-sans text-sm text-ink/80">{r}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 font-serif text-2xl italic text-ink">
              ND Curtains &mdash; <span className="text-gold">Where Luxury Meets Affordability.</span>
            </p>

            <Link
              to="/get-a-quote"
              data-testid="about-quote-btn"
              className="mt-8 inline-block rounded-full bg-ink px-9 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-cream transition-colors duration-300 hover:bg-gold hover:text-ink"
            >
              Get a Free Quote
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-sm" style={{ clipPath: "polygon(0 0, 100% 3%, 100% 97%, 0 100%)" }}>
              <img
                src={IMAGES.interior}
                alt="ND Curtains custom window furnishings in a Melbourne home"
              loading="lazy"
              decoding="async"
                className="h-full min-h-[420px] w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Suppliers */}
      <section id="suppliers" data-testid="suppliers-section" className="relative bg-ink py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">Our fabric & blind suppliers</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-cream sm:text-5xl">
              Fabrics From Brands You Know &amp; Trust
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-cream/70">
              Explore our extensive selection of affordable to premium fabrics from leading
              suppliers, with colours, textures and designs to complement every style of home.
            </p>
          </div>

          <p className="mb-4 font-sans text-xs uppercase tracking-widest text-gold/70">Fabric Suppliers</p>
          <SupplierGrid names={FABRIC_SUPPLIERS} variant="dark" testidPrefix="fabric-supplier" />

          <p className="mb-4 mt-10 font-sans text-xs uppercase tracking-widest text-gold/70">Blind Suppliers</p>
          <div className="sm:max-w-md">
            <SupplierGrid names={BLIND_SUPPLIERS} variant="dark" testidPrefix="blind-supplier" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
