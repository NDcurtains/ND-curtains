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

const Seo = ({ title, description, path = "/", jsonLd }) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${BUSINESS.name}`
      : `${BUSINESS.name} — Custom Curtains & Blinds Melbourne`;
    const url = `${BUSINESS.siteUrl}${path}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", "index,follow");
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", BUSINESS.logo);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", BUSINESS.logo);

    const business = {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${BUSINESS.siteUrl}/#business`,
      name: BUSINESS.name,
      image: BUSINESS.logo,
      url: BUSINESS.siteUrl,
      email: BUSINESS.email,
      telephone: BUSINESS.phoneIntl,
      priceRange: "$$",
      description: "Custom-made sheer curtains, blockout curtains and blinds in Melbourne. In-home measure, fabric selection and professional installation.",
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.streetAddress,
        addressLocality: BUSINESS.locality,
        addressRegion: BUSINESS.region,
        postalCode: BUSINESS.postcode,
        addressCountry: "AU",
      },
      hasMap: BUSINESS.mapUrl,
      areaServed: ["Officer South", "South East Melbourne", "Melbourne"],
    };
    const website = {
      "@type": "WebSite",
      "@id": `${BUSINESS.siteUrl}/#website`,
      url: BUSINESS.siteUrl,
      name: BUSINESS.name,
      publisher: { "@id": `${BUSINESS.siteUrl}/#business` },
      inLanguage: "en-AU",
    };
    const webpage = {
      "@type": "WebPage",
      "@id": `${url}/#webpage`,
      url,
      name: fullTitle,
      description,
      isPartOf: { "@id": `${BUSINESS.siteUrl}/#website` },
      about: { "@id": `${BUSINESS.siteUrl}/#business` },
      inLanguage: "en-AU",
    };

    const structuredData = jsonLd || {
      "@context": "https://schema.org",
      "@graph": [business, website, webpage],
    };
    let script = document.getElementById("ld-json");
    if (!script) {
      script = document.createElement("script");
      script.id = "ld-json";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [title, description, path, jsonLd]);

  return null;
};

export default Seo;
