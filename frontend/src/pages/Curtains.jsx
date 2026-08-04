import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { IMAGES } from "../lib/constants";

const types = [
  {
    title: "Sheer Curtains",
    img: IMAGES.sheer,
    desc: "Light, flowing sheers soften natural light and add daytime privacy while keeping rooms bright and airy. A favourite for living areas and layered looks.",
  },
  {
    title: "Blockout Curtains",
    img: IMAGES.blockout,
    desc: "Room-darkening blockout fabrics reduce light and help with warmth and privacy — ideal for bedrooms, media rooms and west-facing windows.",
  },
  {
    title: "Double Curtains (Sheer + Blockout)",
    img: IMAGES.custom,
    desc: "The best of both worlds: sheers for the day and blockout for the night, on a double track for effortless flexibility and a luxurious, layered finish.",
  },
];

const styles = [
  { name: "S-Fold / Wave", desc: "Soft, continuous S-shaped folds for a modern, elegant drape." },
  { name: "Pinch Pleat", desc: "Classic tailored pleats gathered at the heading for a timeless look." },
  { name: "Other / Not Sure", desc: "Unsure which suits your windows? We'll guide you at your in-home measure." },
];

const Curtains = () => {
  return (
    <>
      <Seo
        title="Custom Curtains Melbourne — Sheer, Blockout & S-Fold"
        description="Custom-made curtains in Melbourne — sheer, blockout and double curtains in S-Fold/Wave, Pinch Pleat and more. Affordable to premium fabrics, in-home measure and professional installation across South East Melbourne."
        path="/curtains"
      />
      <PageHero
        overline="Curtains"
        title="Custom Curtains, Made to Measure"
        subtitle="Sheer, blockout and double curtains tailored to your windows — with heading styles from modern S-Fold/Wave to classic Pinch Pleat."
        image={IMAGES.sheer}
      />

      <section data-testid="curtains-types" className="relative grain bg-cream py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="space-y-16">
            {types.map((t, i) => (
              <motion.div
                key={t.title}
                data-testid={`curtain-type-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="overflow-hidden rounded-sm">
                  <img src={t.img} alt={`${t.title} by ND Curtains Melbourne`} loading="lazy" decoding="async" className="h-[340px] w-full object-cover transition-transform duration-[1.4s] hover:scale-105 lg:h-[440px]" />
                </div>
                <div>
                  <span className="font-serif text-5xl text-gold/70">0{i + 1}</span>
                  <h2 className="mt-3 font-serif text-3xl font-light text-ink sm:text-4xl">{t.title}</h2>
                  <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-ink/70">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="mb-10 font-serif text-3xl font-light text-ink sm:text-4xl">Heading &amp; pleat styles</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {styles.map((s) => (
              <div key={s.name} data-testid="curtain-style" className="rounded-sm border border-gold/20 bg-cream p-8">
                <h3 className="font-serif text-2xl text-ink">{s.name}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink/65">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/get-a-quote" className="inline-block rounded-full bg-gold px-10 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream">
              Get a Free Curtain Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Curtains;
