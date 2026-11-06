import { useCallback, useEffect, useRef, useState } from "react";

export interface IgPost { img: string; href: string; alt: string; caption: string }

// Infinite, seamless carousel: shows 3 posts at a time on desktop (2 on tablets, 1 on phones).
// Posts are repeated three times; after each slide we silently jump back to the middle copy.
function useVisible() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const calc = () => setN(window.innerWidth >= 900 ? 3 : window.innerWidth >= 560 ? 2 : 1);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return n;
}

const igIcon = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export default function InstagramCarousel({ posts }: { posts: IgPost[] }) {
  const N = posts.length;
  const visible = useVisible();
  const items = [...posts, ...posts, ...posts];
  const [idx, setIdx] = useState(N);
  const [animate, setAnimate] = useState(true);
  const paused = useRef(false);
  const busy = useRef(false);

  const go = useCallback((dir: 1 | -1) => {
    if (busy.current) return;
    busy.current = true;
    setAnimate(true);
    setIdx((i) => i + dir);
  }, []);

  // Autoplay (off for reduced motion, paused while hovered)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { if (!paused.current) go(1); }, 3800);
    return () => clearInterval(t);
  }, [go]);

  const onEnd = () => {
    busy.current = false;
    if (idx >= 2 * N || idx < N) {
      setAnimate(false);
      setIdx(((idx % N) + N) % N + N);
    }
  };

  // Re-enable the transition after a silent jump
  useEffect(() => {
    if (!animate) {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(r);
    }
  }, [animate]);

  const itemPct = 100 / items.length;

  return (
    <div className="relative" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="overflow-hidden px-1 py-8 [mask-image:linear-gradient(to_right,transparent,#000_3%,#000_97%,transparent)]">
        <div
          className="flex"
          style={{
            width: `${(items.length * 100) / visible}%`,
            transform: `translateX(-${idx * itemPct}%)`,
            transition: animate ? "transform 700ms cubic-bezier(.22,.8,.26,1)" : "none",
          }}
          onTransitionEnd={onEnd}
        >
          {items.map((p, i) => (
            <div key={i} className="px-2.5 sm:px-3" style={{ width: `${itemPct}%` }}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener"
                aria-label={`${p.alt} - view on Instagram`}
                className="group/ig relative block overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-sand/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
              >
                <img src={p.img} alt={p.alt} className="aspect-square w-full object-cover transition-transform duration-700 group-hover/ig:scale-105" loading="lazy" draggable={false} />
                <span className="absolute inset-0 flex flex-col items-center justify-end gap-2 bg-gradient-to-t from-espresso/85 via-espresso/25 to-transparent p-5 text-center text-white opacity-0 transition-opacity duration-500 group-hover/ig:opacity-100">
                  {igIcon}
                  <span className="text-base leading-snug">{p.caption}</span>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        {(["prev", "next"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d === "next" ? 1 : -1)}
            aria-label={d === "next" ? "Next posts" : "Previous posts"}
            className="grid h-12 w-12 place-items-center rounded-full border border-espresso/15 bg-white text-espresso shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta hover:bg-terracotta hover:text-white hover:shadow-lift"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points={d === "prev" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
