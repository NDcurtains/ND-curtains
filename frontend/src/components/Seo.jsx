import { useEffect } from "react";
import { BUSINESS } from "../lib/constants";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Lightweight SEO head manager (CSR-safe): sets title, meta description,
 * canonical, Open Graph/Twitter tags, and LocalBusiness JSON-LD.
 */
const Seo = ({ title, description, path = "/", jsonLd }) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${BUSINESS.name}`
      : `${BUSINESS.name} — Custom Curtains & Blinds Melbourne`;
    const url = `${BUSINESS.siteUrl}${path}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", BUSINESS.logo);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);

    const defaultLd = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "@id": `${BUSINESS.siteUrl}/#business`,
      name: BUSINESS.name,
      image: BUSINESS.logo,
      url: BUSINESS.siteUrl,
      email: BUSINESS.email,
      telephone: BUSINESS.phoneIntl,
      priceRange: "$$",
      description:
        "Custom-made sheer curtains, blockout curtains and blinds in Melbourne. In-home measure, fabric selection and professional installation.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "18 Tobruk Drive",
        addressLocality: "Officer South",
        addressRegion: "VIC",
        postalCode: "3809",
        addressCountry: "AU",
      },
      hasMap: "https://www.google.com/maps/search/?api=1&query=18+Tobruk+Drive+Officer+South+VIC+3809",
      areaServed: [
        "Officer South",
        "South East Melbourne",
        "Melbourne",
      ],
    };

    let script = document.getElementById("ld-json");
    if (!script) {
      script = document.createElement("script");
      script.id = "ld-json";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd || defaultLd);
  }, [title, description, path, jsonLd]);

  return null;
};

export default Seo;
