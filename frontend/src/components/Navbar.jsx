import React, { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

const LOGO = "https://customer-assets.emergentagent.com/job_nd-curtains-animate/artifacts/mdg8r6ar_IMG_4895.jpeg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-gold/20 bg-cream/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" data-testid="nav-logo" className="flex items-center gap-3">
          <span className="rounded-md bg-cream p-1.5">
            <img src={LOGO} alt="ND Curtains" className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
          </span>
          <span className={`font-serif text-xl tracking-[0.22em] transition-colors ${scrolled ? "text-ink" : "text-cream"}`}>
            ND <span className="text-gold">CURTAINS</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={`font-sans text-xs uppercase tracking-[0.18em] transition-colors hover:text-gold ${
                  scrolled ? "text-ink/70" : "text-cream/80"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#quote"
          data-testid="nav-quote-btn"
          className="hidden rounded-full bg-gold px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-widest text-ink transition-colors duration-300 hover:bg-ink hover:text-cream md:inline-block"
        >
          Free Quote
        </a>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          className={`md:hidden ${scrolled ? "text-ink" : "text-cream"}`}
          aria-label="Toggle menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-gold/20 bg-cream/95 px-6 py-4 backdrop-blur-xl md:hidden" data-testid="nav-mobile-menu">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-sans text-sm uppercase tracking-widest text-ink/80"
            >
              {l.label}
            </a>
          ))}
          <a href="#quote" onClick={() => setOpen(false)} className="mt-2 inline-block rounded-full bg-gold px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-widest text-ink">
            Free Quote
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
