# ND Curtains — PRD

## Original Problem Statement
"Build 3d website with high interaction and animation for nd curtains" — luxury custom curtains & blinds business, Melbourne (Officer South, VIC). Brand: "Curate. Design. Elevate." / "Where luxury meets affordability."

## User Choices
- Backend consultation-request form saved to database.
- Email notification: SKIPPED for now (wire Resend later).
- Contact: 0487 930 023, info@ndcurtains.com.au, Officer South, VIC.
- 3D animated curtain hero approved.

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + react-three-fiber/drei (three.js) + Lenis smooth scroll. shadcn UI (Select, Input, Textarea, Label, Sonner).
- Backend: FastAPI + Motor (MongoDB). Routes prefixed /api.
- DB collection: `consultations`.

## Design
- Light luxury theme: cream (#FAF9F6), gold (#C5A059), champagne, charcoal/ink (#1A1A1A).
- Fonts: Cormorant Garamond (serif headings), Manrope (body), Pinyon Script (accent).
- Guidelines in /app/design_guidelines.json.

## Implemented (2026-07-12)
- Interactive 3D draping curtain hero (segmented plane with pleat/sway displacement, panels open on scroll + "Draw the Curtains" toggle, mouse parallax rig, warm window glow).
- Sections: Navbar (glass, sticky), Hero, About (+stats), Services (bento grid + Measure/Supply/Install feature), Gallery (masonry), Testimonials, Quote/Consultation form, Footer.
- Consultation form → POST /api/consultations (name, email, phone, service, message) saved to MongoDB; sonner toasts; validation.
- Backend has optional Resend email helper (activates only if RESEND_API_KEY set).
- Tested: iteration_1.json — backend 100%, frontend 100%, no failures.

## Backlog / Next
- P1: Wire Resend email notifications (needs RESEND_API_KEY + verified domain).
- P2: Admin page to view submitted consultations.
- P2: Fabric/color configurator in 3D scene; before/after gallery slider.
- P2: SEO meta, sitemap, Google Business embed/map for Officer South.
EOF

## Multi-page Restructure (2026-08-04)
- Converted single-page → multi-page via React Router. Layout (Navbar/Footer/WhatsApp/Toaster/Lenis).
- Pages created: /about, /curtains, /blinds, /contact, /get-a-quote, /refund-policy, /privacy, /terms. Home rebuilt as focused showcase (hero, marquee, intro, manifesto, showcase, suppliers, Google-reviews placeholder, CTA).
- Quote form moved to /get-a-quote: expanded fields (name, phone, email, suburb, product, windows, style, measurements, budget, message) + photo upload (client-side compressed) + honeypot + rate limit. Email via Resend to info@ndcurtains.com.au with attachments. Vercel serverless mirror updated.
- Location standardised: Officer South, VIC 3809 + service-area line. WhatsApp FAB (wa.me/61487930023).
- SEO: per-page Seo component (title/meta/canonical/OG + LocalBusiness JSON-LD), keyword-aware H1/H2, image alt text, internal links. vercel.json SPA rewrite added.
- Pending user approval/inputs: Featurable embed + Google review links; official supplier logos; specific blind product ranges; Privacy & Terms wording review (marked Draft on-page); final refund policy sign-off (50% deposit clause included).
