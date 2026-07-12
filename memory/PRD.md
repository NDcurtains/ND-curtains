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
