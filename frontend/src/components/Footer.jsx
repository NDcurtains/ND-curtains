import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer data-testid="footer" className="relative grain bg-ink pt-16 pb-8 text-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 border-b border-gold/15 pb-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-3xl tracking-[0.2em]">ND <span className="text-gold">CURTAINS</span></p>
            <p className="mt-3 font-sans text-xs uppercase tracking-[0.3em] text-gold/70">Curate. Design. Elevate.</p>
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-cream/60">
              Custom curtains &amp; blinds for Melbourne homes. Where luxury meets affordability.
            </p>
          </div>

          <div>
            <p className="mb-4 font-sans text-xs uppercase tracking-widest text-gold">Explore</p>
            <ul className="space-y-2 font-sans text-sm text-cream/70">
              <li><a href="#about" className="transition-colors hover:text-gold">About</a></li>
              <li><a href="#services" className="transition-colors hover:text-gold">Services</a></li>
              <li><a href="#gallery" className="transition-colors hover:text-gold">Gallery</a></li>
              <li><a href="#quote" className="transition-colors hover:text-gold">Free Quote</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-sans text-xs uppercase tracking-widest text-gold">Get in touch</p>
            <ul className="space-y-3 font-sans text-sm text-cream/70">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /> 0487 930 023</li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /> info@ndcurtains.com.au</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-gold" /> Officer South, Victoria</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 font-sans text-xs text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} ND Curtains. All rights reserved.</p>
          <p>Melbourne, Victoria · Australia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
