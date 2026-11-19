import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { IMAGES, BUSINESS } from "../lib/constants";

const AREAS = {
  officer: {
    name: "Officer",
    title: "Custom Curtains & Blinds in Officer",
    intro: "Made-to-measure curtains and blinds for homes in Officer, with personalised fabric guidance, in-home measuring and professional installation.",
    detail: "Based in neighbouring Officer South, ND Curtains & Blinds can provide a convenient local service for Officer homeowners. Explore sheer curtains, blockout curtains, layered S-Fold styles and made-to-measure blinds, with options selected to suit your rooms and windows.",
  },
  pakenham: {
    name: "Pakenham",
    title: "Custom Curtains & Blinds in Pakenham",
    intro: "Looking for custom curtains or blinds in Pakenham? Get tailored window coverings, fabric advice, measuring and installation from ND Curtains & Blinds.",
    detail: "Whether you are finishing a new home or refreshing existing rooms, we can help you compare sheer and blockout fabrics, curtain headings and blind options. We discuss your windows and preferences before preparing a tailored quote.",
  },
  berwick: {
    name: "Berwick",
    title: "Custom Curtains & Blinds in Berwick",
    intro: "Discover made-to-measure curtains and blinds in Berwick, with fabric selection, in-home measuring and professional installation.",
    detail: "Create a coordinated look throughout your home with custom sheer curtains, blockout curtains, double curtain systems and blinds. ND Curtains & Blinds helps you choose practical window coverings that complement your interior and privacy needs.",
  },
  "clyde-north": {
    name: "Clyde North",
    title: "Custom Curtains & Blinds in Clyde North",
    intro: "Custom window furnishings for Clyde North homes, including sheer curtains, blockout curtains and made-to-measure blinds.",
    detail: "From new-home window furnishings to updating a single room, we can help with fabric choices, measuring and installation planning. Ask about layered curtains, S-Fold and other styles to suit your windows.",
  },
  beaconsfield: {
    name: "Beaconsfield",
    title: "Custom Curtains & Blinds in Beaconsfield",
    intro: "Made-to-measure curtains and blinds for Beaconsfield homes, with personal fabric guidance and a tailored in-home quote.",
    detail: "Choose from light-filtering sheers, blockout options and practical blind styles. We help you consider light, privacy, room use and the finish you want before recommending suitable window coverings.",
  },
  "narre-warren": {
    name: "Narre Warren",
    title: "Custom Curtains & Blinds in Narre Warren",
    intro: "Find custom curtains and blinds in Narre Warren, supplied to suit your windows and installed with care.",
    detail: "ND Curtains & Blinds offers tailored window furnishing solutions for living rooms, bedrooms and other spaces. Explore sheer and blockout curtains, double-track combinations and made-to-measure blinds with guidance on fabrics and finishes.",
  },
  cranbourne: {
    name: "Cranbourne",
    title: "Custom Curtains & Blinds in Cranbourne",
    intro: "Upgrade your Cranbourne home with custom curtains and blinds, from fabric selection and measuring through to professional installation.",
    detail: "Whether you need daytime privacy, better light control or a finished look for a new room, we can help you compare curtain and blind options. Contact us to discuss your windows and arrange a tailored quote.",
  },
};

const ServiceArea = () => {
  const { slug } = useParams();
  const area = AREAS[slug];
  if (!area) return <Navigate to="/service-areas" replace />;

  const description = area.intro + " Serving Officer South and surrounding South East Melbourne suburbs within our service area.";
  const otherAreas = Object.entries(AREAS).filter(([key]) => key !== slug);

  return (
    <>
      <Seo title={area.title} description={description} path={`/service-areas/${slug}`} />
      <PageHero
        overline={`Local service · ${area.name}`}
        title={area.title}
        subtitle={area.intro}
        image={IMAGES.sheer}
      />
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl font-light text-ink sm:text-4xl">Window furnishings tailored to your home</h2>
            <p className="mt-6 text-base leading-relaxed text-ink/70">{area.detail}</p>
            <p className="mt-5 text-base leading-relaxed text-ink/70">
              Our business is based in Officer South and services the surrounding South East Melbourne region, including locations within approximately 50 km, subject to appointment availability. Contact us to confirm service availability for your address.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="border border-gold/20 bg-paper p-7">
              <h3 className="font-serif text-2xl text-ink">Custom curtains</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">Explore sheer, blockout and double curtains, including S-Fold/Wave and classic pleat styles.</p>
              <Link className="mt-5 inline-block text-sm font-semibold text-ink underline decoration-gold underline-offset-4" to="/curtains">Explore curtains</Link>
            </article>
            <article className="border border-gold/20 bg-paper p-7">
              <h3 className="font-serif text-2xl text-ink">Made-to-measure blinds</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">Discuss blind options for your windows, rooms, light control and privacy requirements.</p>
              <Link className="mt-5 inline-block text-sm font-semibold text-ink underline decoration-gold underline-offset-4" to="/blinds">Explore blinds</Link>
            </article>
          </div>
          <div className="mt-12 rounded-sm bg-ink p-8 text-center text-cream sm:p-12">
            <h2 className="font-serif text-3xl font-light">Planning new curtains or blinds in {area.name}?</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/75">Tell us about your windows and we'll help you take the next step.</p>
            <Link to="/get-a-quote" className="mt-7 inline-block rounded-full bg-gold px-9 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-cream">Request a free quote</Link>
            <p className="mt-5 text-sm text-cream/70">Call <a className="underline" href={`tel:${BUSINESS.phone}`}>0477 696 074</a> or <a className="underline" href={BUSINESS.whatsapp}>message us on WhatsApp</a>.</p>
          </div>
          <div className="mt-14">
            <h2 className="font-serif text-2xl text-ink">Other areas we service</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {otherAreas.map(([key, item]) => <Link key={key} to={`/service-areas/${key}`} className="border border-gold/30 px-4 py-2 text-sm text-ink hover:bg-paper">{item.name}</Link>)}
            </div>
            <p className="mt-5 text-sm text-ink/60">Also ask us about service availability in nearby suburbs within approximately 50 km of Officer South.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceArea;
