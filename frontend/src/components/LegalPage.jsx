import React from "react";
import Seo from "./Seo";
import PageHero from "./PageHero";

// Renders a clean, readable legal/policy page from structured sections.
const LegalPage = ({ seoTitle, seoDescription, path, overline, title, intro, sections, footerNote, draft }) => {
  return (
    <>
      <Seo title={seoTitle} description={seoDescription} path={path} />
      <PageHero overline={overline} title={title} />
      <section data-testid="legal-page" className="relative bg-cream py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {draft && (
            <p className="mb-8 rounded-sm border border-gold/40 bg-paper px-5 py-3 font-sans text-xs uppercase tracking-widest text-ink/60">
              Draft — pending final approval
            </p>
          )}
          {intro && <p className="mb-10 font-sans text-base leading-relaxed text-ink/75">{intro}</p>}
          <div className="space-y-9">
            {sections.map((s, i) => (
              <div key={i} data-testid={`legal-section-${i}`}>
                <h2 className="font-serif text-2xl font-light text-ink">{s.heading}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-3 font-sans text-[15px] leading-relaxed text-ink/75">{p}</p>
                ))}
              </div>
            ))}
          </div>
          {footerNote && <p className="mt-12 border-t border-gold/20 pt-6 font-sans text-sm text-ink/60">{footerNote}</p>}
        </div>
      </section>
    </>
  );
};

export default LegalPage;
