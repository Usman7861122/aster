import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

interface Img { src: string; alt: string; pos: string }

export default function Gallery({ images }: { images: Img[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((n) => (n === null ? n : (n + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photo: ${img.alt}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
            className="group relative aspect-square overflow-hidden rounded-3xl shadow-soft"
          >
            <img src={img.src} alt={img.alt} loading="lazy" style={{ objectPosition: img.pos }} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <span className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 right-4 flex translate-y-3 items-center justify-between gap-2 text-left text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="line-clamp-2">{img.alt}</span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/25 backdrop-blur"><Icon name="zoom" size={18} /></span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[100] grid place-items-center bg-espresso/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              key={open}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[min(88vh,44rem)]"
            >
              <img src={images[open].src} alt={images[open].alt} style={{ objectPosition: images[open].pos }} className="aspect-square w-full rounded-3xl object-cover shadow-2xl" />
              <p className="mt-4 text-center text-white/85">{images[open].alt}</p>
            </motion.div>
            <button onClick={close} aria-label="Close" className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-[10px] bg-white/10 text-white hover:bg-white hover:text-espresso"><Icon name="x" /></button>
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-[10px] bg-white/10 text-white hover:bg-white hover:text-espresso"><Icon name="chevron-left" /></button>
            <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-[10px] bg-white/10 text-white hover:bg-white hover:text-espresso"><Icon name="chevron-right" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
