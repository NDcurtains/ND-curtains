import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { BUSINESS } from "../lib/constants";

const footerLinks = [
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Get a Quote", to: "/get-a-quote" },
  { label: "Refund & Cancellation Policy", to: "/refund-policy" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];

const Footer = () => {
  return (
    <footer data-testid="footer" className="relative grain bg-ink pt-16 pb-8 text-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 border-b border-gold/15 pb-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-cream p-2">
                <img src={BUSINESS.logo} alt="ND Curtains logo" data-testid="footer-logo" className="h-14 w-14 object-contain" />
              </span>
              <div>
                <p className="font-serif text-2xl tracking-[0.2em] text-cream">ND <span className="text-gold">CURTAINS</span></p>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/70">Curate. Design. Elevate.</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-cream/60">
              Custom-made curtains &amp; blinds for Melbourne homes. {BUSINESS.serviceArea}
            </p>
          </div>

          <div>
            <p className="mb-4 font-sans text-xs uppercase tracking-widest text-gold">Explore</p>
            <ul className="grid grid-cols-1 gap-2 font-sans text-sm text-cream/70 sm:grid-cols-2">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`} className="transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-sans text-xs uppercase tracking-widest text-gold">Get in touch</p>
            <ul className="space-y-3 font-sans text-sm text-cream/70">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /> <a href={`tel:${BUSINESS.phoneIntl}`} className="hover:text-gold">{BUSINESS.phone}</a></li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /> <a href={`mailto:${BUSINESS.email}`} className="hover:text-gold">{BUSINESS.email}</a></li>
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <span>{BUSINESS.locationLine}<br /><span className="text-cream/45">Servicing South East Melbourne</span></span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 font-sans text-xs text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} ND Curtains. All rights reserved.</p>
          <p>{BUSINESS.locationLine} · Australia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
