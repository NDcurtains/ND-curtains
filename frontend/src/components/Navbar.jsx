import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BUSINESS, NAV_LINKS } from "../lib/constants";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const solid = scrolled || !isHome || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-gold/20 bg-cream/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-10">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-3">
          <span className="rounded-md bg-cream p-1.5">
            <img src={BUSINESS.logo} alt="ND Curtains — custom curtains and blinds Melbourne" className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
          </span>
          <span className={`font-serif text-xl tracking-[0.22em] transition-colors ${solid ? "text-ink" : "text-cream"}`}>
            ND <span className="text-gold">CURTAINS</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `font-sans text-xs uppercase tracking-[0.18em] transition-colors hover:text-gold ${
                    isActive ? "text-gold" : solid ? "text-ink/70" : "text-cream/85"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/get-a-quote"
            data-testid="nav-quote-btn"
            className="hidden rounded-full bg-gold px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-widest text-ink transition-colors duration-300 hover:bg-ink hover:text-cream sm:inline-block"
          >
            Get a Quote
          </Link>

          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen(!open)}
            className={`lg:hidden ${solid ? "text-ink" : "text-cream"}`}
            aria-label="Toggle menu"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gold/20 bg-cream px-6 py-5 lg:hidden" data-testid="nav-mobile-menu">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="block py-2.5 font-sans text-sm uppercase tracking-widest text-ink/80"
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/get-a-quote" className="mt-3 inline-block rounded-full bg-gold px-7 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-ink">
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
