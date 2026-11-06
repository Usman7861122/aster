import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Icon from "./Icon";

interface Item { name: string; quote: string; about: string }

export default function Testimonials({ items }: { items: Item[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (n: number) => setI((n + items.length) % items.length);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [reduce, paused, items.length]);

  const t = items[i];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative rounded-[2rem] border border-sand/70 bg-white p-8 shadow-soft transition-shadow duration-500 hover:shadow-lift md:p-12">
        <span aria-hidden="true" className="absolute -top-8 left-8 font-display text-[9rem] leading-none text-terracotta/25 md:left-14">“</span>
        <div className="relative min-h-[14rem] md:min-h-[13rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-5 flex gap-1 text-gold" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => <Icon key={s} name="star" size={20} fill />)}
              </div>
              <blockquote className="font-display text-xl leading-snug text-espresso md:text-[1.7rem]">{t.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-terracotta font-display text-xl text-white">{t.name[0]}</span>
                <span>
                  <span className="block text-lg font-semibold">{t.name}</span>
                  <span className="block text-sm text-taupe">{t.about}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-2" role="tablist" aria-label="Choose review">
          {items.map((it, n) => (
            <button
              key={it.name}
              role="tab"
              aria-selected={n === i}
              aria-label={`Review from ${it.name}`}
              onClick={() => go(n)}
              className={`h-2.5 rounded-full transition-all duration-300 ${n === i ? "w-10 bg-terracotta" : "w-2.5 bg-espresso/25 hover:bg-espresso/50"}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => go(i - 1)} aria-label="Previous review" className="grid h-12 w-12 place-items-center rounded-[10px] border border-espresso/20 transition-all hover:-translate-y-0.5 hover:border-terracotta hover:bg-terracotta hover:text-white">
            <Icon name="chevron-left" />
          </button>
          <button onClick={() => go(i + 1)} aria-label="Next review" className="grid h-12 w-12 place-items-center rounded-[10px] bg-espresso text-white transition-all hover:-translate-y-0.5 hover:bg-terracotta">
            <Icon name="chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
}
