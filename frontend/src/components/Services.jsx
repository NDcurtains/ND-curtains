import React from "react";
import { motion } from "framer-motion";
import { Scissors, Wind, MoonStar, Blinds, Ruler } from "lucide-react";

const services = [
  {
    title: "Custom Curtains",
    desc: "Made-to-measure drapery in premium fabrics, tailored to your exact windows and style.",
    icon: Scissors,
    img: "https://images.unsplash.com/photo-1688647063090-36f36f692d95?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    span: "lg:col-span-7",
  },
  {
    title: "Sheer Curtains",
    desc: "Soft, light-filtering sheers that add airy elegance and daytime privacy.",
    icon: Wind,
    img: "https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    span: "lg:col-span-5",
  },
  {
    title: "Blockout Curtains",
    desc: "Room-darkening layers for restful bedrooms and glare-free living.",
    icon: MoonStar,
    img: "https://images.unsplash.com/photo-1754611380518-61a923cc47ca?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    span: "lg:col-span-5",
  },
  {
    title: "Blinds",
    desc: "Roller, roman and venetian blinds — sleek control over light and privacy.",
    icon: Blinds,
    img: "https://images.unsplash.com/photo-1776972334786-ae17d81b4572?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    span: "lg:col-span-7",
  },
];

const Services = () => {
  return (
    <section id="services" data-testid="services-section" className="relative bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">What we do</p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-ink sm:text-5xl">
            A complete window wardrobe.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                data-testid={`service-card-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-sm border border-gold/15 ${s.span}`}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-72 w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110 lg:h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <Icon className="mb-3 h-7 w-7 text-gold" strokeWidth={1.4} />
                  <h3 className="font-serif text-2xl text-cream">{s.title}</h3>
                  <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-cream/75">{s.desc}</p>
                </div>
              </motion.article>
            );
          })}

          {/* Measure Supply & Install — full width feature */}
          <motion.article
            data-testid="service-card-install"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="col-span-1 flex flex-col items-start justify-between gap-6 rounded-sm bg-ink p-9 lg:col-span-12 lg:flex-row lg:items-center"
          >
            <div className="flex items-start gap-5">
              <Ruler className="h-9 w-9 shrink-0 text-gold" strokeWidth={1.3} />
              <div>
                <h3 className="font-serif text-2xl text-cream">Measure, Supply &amp; Install</h3>
                <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-cream/70">
                  Our full-service team handles precise measuring, expert supply and clean
                  professional installation — a seamless experience from quote to finished window.
                </p>
              </div>
            </div>
            <a
              href="#quote"
              data-testid="service-install-cta"
              className="shrink-0 rounded-full border border-gold px-8 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
            >
              Book a Measure
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default Services;
