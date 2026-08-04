// Central business info — single source of truth (NAP + links)
export const BUSINESS = {
  name: "ND Curtains",
  tagline: "Curate. Design. Elevate.",
  strapline: "Where Luxury Meets Affordability",
  streetAddress: "18 Tobruk Drive",
  locality: "Officer South",
  region: "VIC",
  postcode: "3809",
  locationLine: "18 Tobruk Drive, Officer South, VIC 3809",
  serviceArea:
    "Servicing Officer South, South East Melbourne and surrounding Melbourne areas.",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=18+Tobruk+Drive+Officer+South+VIC+3809",
  email: "info@ndcurtains.com.au",
  phone: "0487 930 023",
  phoneIntl: "+61487930023",
  whatsapp: "https://wa.me/61487930023",
  logo:
    "https://customer-assets.emergentagent.com/job_nd-curtains-animate/artifacts/mdg8r6ar_IMG_4895.jpeg",
  siteUrl: "https://www.ndcurtains.com.au",
};

// Google review links (ND Curtains Google Business Profile)
export const REVIEWS = {
  readUrl: "https://g.page/r/CQS6Yj_G-GQpEAE",
  writeUrl: "https://g.page/r/CQS6Yj_G-GQpEAE/review",
};

export const FABRIC_SUPPLIERS = [
  "Hoad",
  "Charles Parsons",
  "Maurice Kain",
  "Nettex",
  "Warwick",
  "James Dunlop",
];

export const BLIND_SUPPLIERS = ["Shaw"];

// Official supplier logo files (name -> hosted image URL), provided by ND Curtains.
export const SUPPLIER_LOGOS = {
  "Hoad": "https://customer-assets-v7afamib.emergentagent.net/job_nd-curtains-animate/artifacts/w2uwp3um_Screenshot%202026-08-04%20at%206.24.22%E2%80%AFpm.png",
  "Charles Parsons": "https://customer-assets-v7afamib.emergentagent.net/job_nd-curtains-animate/artifacts/nsp10l64_Screenshot%202026-08-04%20at%206.24.46%E2%80%AFpm.png",
  "Maurice Kain": "https://customer-assets-v7afamib.emergentagent.net/job_nd-curtains-animate/artifacts/wism5mei_Screenshot%202026-08-04%20at%206.27.35%E2%80%AFpm.png",
  "James Dunlop": "https://customer-assets-v7afamib.emergentagent.net/job_nd-curtains-animate/artifacts/f6hj15ql_Screenshot%202026-08-04%20at%206.29.51%E2%80%AFpm.png",
  "Nettex": "https://customer-assets-v7afamib.emergentagent.net/job_nd-curtains-animate/artifacts/bu4q80mf_Screenshot%202026-08-04%20at%206.30.31%E2%80%AFpm.png",
  "Shaw": "https://customer-assets-v7afamib.emergentagent.net/job_nd-curtains-animate/artifacts/8oglw2nb_Screenshot%202026-08-04%20at%206.31.14%E2%80%AFpm.png",
  "Warwick": "https://customer-assets-v7afamib.emergentagent.net/job_nd-curtains-animate/artifacts/fsuk6jsu_Screenshot%202026-08-04%20at%206.35.39%E2%80%AFpm.png",
};

// Optimised Unsplash images (auto=format serves webp; lower quality + sized widths for speed)
const u = (id, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=srgb&auto=format&q=62&w=${w}`;

export const IMAGES = {
  interior: u("1704040686413-2c607dbd2f06", 1000),
  custom: u("1688647063090-36f36f692d95", 1000),
  sheer: u("1667584523543-d1d9cc828a15", 1000),
  sheerAlt: u("1754611362309-71297e9f42fd", 1000),
  blockout: u("1754611380518-61a923cc47ca", 1000),
  blinds: u("1776972334786-ae17d81b4572", 1000),
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Curtains", to: "/curtains" },
  { label: "Blinds", to: "/blinds" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];
