import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Icon from "./Icon";
import { site } from "../../data/site";

const phrases = ["Care that listens.", "Your story first.", "Beside you, always."];

// One clean line per phrase (the echo copies were removed).
const layers = [{ opacity: 1, solid: true }];

// All phrases share one grid cell, so only the active one is visible
// and the hero height never changes while the text rotates.
const parent = {
  hidden: { transition: { staggerChildren: 0.04 } },
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.55 } },
};

const child = {
  hidden: { opacity: 0, y: 28, transition: { duration: 0.35 } },
  show: (o: number) => ({
    opacity: o,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % phrases.length), 6200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative flex min-h-[100svh] items-end justify-center overflow-hidden bg-espresso text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/Aster-OBGYN_banner.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* Readability layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgb(43_31_27/0.7),transparent_65%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-12 pt-36 text-center md:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="eyebrow eyebrow-center mb-5 text-[12px] tracking-[0.14em] text-gold-soft max-sm:before:hidden max-sm:after:hidden sm:text-sm sm:tracking-[0.22em]"
        >
          Aster OB/GYN · Upper West Side
        </motion.p>

        {/* Screen readers get the current phrase once */}
        <h1 className="sr-only">{phrases[i]}</h1>

        <div className="grid" aria-hidden="true">
          {phrases.map((phrase, p) => (
            <motion.div
              key={phrase}
              variants={parent}
              initial="hidden"
              animate={p === i ? "show" : "hidden"}
              className={`col-start-1 row-start-1 font-display text-[clamp(2rem,6vw,5.6rem)] font-medium italic leading-[0.98] whitespace-nowrap ${
                p === i ? "" : "pointer-events-none"
              }`}
            >
              {layers.map((l, idx) => (
                <motion.span
                  key={idx}
                  custom={l.opacity}
                  variants={child}
                  className={`block pb-[0.08em] ${idx > 0 ? "-mt-[0.5em]" : ""} ${
                    l.solid
                      ? "relative z-10 text-white drop-shadow-[0_6px_30px_rgb(0_0_0/0.45)]"
                      : "text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.85)]"
                  }`}
                >
                  {phrase}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-5 max-w-2xl text-lg text-white/90 md:text-xl"
        >
          Independent women's health care on West 98th Street. Same-day visits, evening and weekend hours, and most major insurance accepted.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a href={site.bookingUrl} target="_blank" rel="noopener" className="btn btn-primary btn-glow h-14 px-8 text-base">
            Book Appointment <Icon name="arrow-right" size={18} />
          </a>
          <a href="#services" className="btn btn-light h-14 px-8 text-base">
            Explore Services
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[15px] text-white/80"
        >
          <span className="inline-flex items-center gap-2"><Icon name="clock" size={16} /> {site.hours}</span>
          <span className="inline-flex items-center gap-2"><Icon name="map-pin" size={16} /> 240 W 98th St, Suite 1E</span>
        </motion.div>
      </div>
    </section>
  );
}
