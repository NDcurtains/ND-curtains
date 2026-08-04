import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { BUSINESS, IMAGES } from "../lib/constants";

const Contact = () => {
  const cards = [
    { icon: Phone, label: "Phone", value: BUSINESS.phone, href: `tel:${BUSINESS.phoneIntl}`, testid: "contact-phone" },
    { icon: Mail, label: "Email", value: BUSINESS.email, href: `mailto:${BUSINESS.email}`, testid: "contact-email" },
    { icon: MessageCircle, label: "WhatsApp", value: "Message us", href: BUSINESS.whatsapp, testid: "contact-whatsapp" },
    { icon: MapPin, label: "Location", value: BUSINESS.locationLine, href: BUSINESS.mapUrl, testid: "contact-location" },
  ];

  return (
    <>
      <Seo
        title="Contact ND Curtains — Curtains & Blinds Melbourne"
        description="Contact ND Curtains for custom curtains and blinds in Melbourne. Call or WhatsApp 0487 930 023, email info@ndcurtains.com.au. Servicing Officer South and South East Melbourne."
        path="/contact"
      />
      <PageHero
        overline="Get in touch"
        title="Contact ND Curtains"
        subtitle={BUSINESS.serviceArea}
        image={IMAGES.interior}
      />

      <section data-testid="contact-section" className="relative grain bg-cream py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {cards.map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-ink/50">{c.label}</p>
                    <p className="mt-1 font-serif text-xl text-ink">{c.value}</p>
                  </div>
                </>
              );
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-testid={c.testid} className="flex items-center gap-5 rounded-sm border border-gold/20 bg-paper p-7 transition-colors duration-300 hover:border-gold/60">
                      {inner}
                    </a>
                  ) : (
                    <div data-testid={c.testid} className="flex items-center gap-5 rounded-sm border border-gold/20 bg-paper p-7">
                      {inner}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 rounded-sm bg-ink p-10 text-center lg:p-14">
            <p className="font-script text-3xl text-gold">Ready to dress your windows?</p>
            <h2 className="mt-1 font-serif text-3xl font-light text-cream sm:text-4xl">Request your free quote today.</h2>
            <Link to="/get-a-quote" className="mt-7 inline-block rounded-full bg-gold px-10 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-champagne">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
