import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";
import MegaMenu from "./MegaMenu";
import { mainNav, mobileNav, serviceMenu, site, utilityNav } from "../../data/site";

interface Props {
  /** Inner pages have a light background, so the bar is always solid there */
  solid?: boolean;
}

const norm = (p: string) => (p.endsWith("/") ? p : p + "/");

export default function Header({ solid: forceSolid = false }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [mega, setMega] = useState(false); // desktop services panel
  const [mobSvc, setMobSvc] = useState(false);
  const [path, setPath] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setPath(norm(window.location.pathname));
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const openMega = () => {
    clearTimeout(timer.current);
    setMega(true);
  };
  const closeMegaSoon = (ms = 160) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMega(false), ms);
  };

  const solid = scrolled || open || mega || forceSolid;
  const isActive = (href: string) => href !== "/" && path !== "" && path.startsWith(norm(href));

  const linkColor = (active: boolean) =>
    solid
      ? active ? "text-terracotta" : "text-espresso hover:text-terracotta"
      : active ? "text-gold-soft" : "text-white hover:text-gold-soft";

  return (
    <>
      {/* Dim the page behind the mega menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed inset-0 z-40 hidden bg-espresso/40 backdrop-blur-[3px] xl:block"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        onMouseEnter={() => clearTimeout(timer.current)}
        onMouseLeave={() => closeMegaSoon()}
        onKeyDown={(e) => e.key === "Escape" && setMega(false)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(false);
        }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-ivory/95 shadow-[0_8px_30px_-18px_rgb(43_31_27/0.45)] backdrop-blur-xl"
            : "bg-gradient-to-b from-espresso/60 to-transparent"
        }`}
      >
        {/* ---------- Top utility bar (desktop) ---------- */}
        <div
          className={`hidden overflow-hidden bg-espresso/85 text-white backdrop-blur transition-all duration-500 xl:block ${
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="mx-auto flex h-11 max-w-[88rem] items-center justify-between gap-6 px-10 text-[13.5px]">
            <p className="flex items-center gap-6 text-white/80">
              <span className="inline-flex items-center gap-2"><Icon name="clock" size={15} className="text-gold" /> {site.hours}</span>
              <span className="hidden items-center gap-2 2xl:inline-flex"><Icon name="map-pin" size={15} className="text-gold" /> {site.address[0]}, New York</span>
            </p>
            <div className="flex items-center gap-2">
              <a href={utilityNav.careers.href} className="btn btn-light !h-8 !rounded-lg !px-3.5 !text-[13px]">
                {utilityNav.careers.label}
              </a>
              <a href={utilityNav.portal.href} target="_blank" rel="noopener" className="btn btn-light !h-8 !rounded-lg !px-3.5 !text-[13px]">
                <Icon name="users" size={14} /> {utilityNav.portal.label}
              </a>
              <a href={site.phoneHref} className="btn btn-gold !h-8 !rounded-lg !px-3.5 !text-[13px]">
                <Icon name="phone" size={14} /> {site.phone}
              </a>
            </div>
          </div>
        </div>

        {/* ---------- Main bar ---------- */}
        <div
          className={`relative mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-6 transition-all duration-500 md:px-10 ${
            scrolled ? "h-[84px]" : "h-[96px] xl:h-[104px]"
          }`}
        >
          <a href="/" aria-label="Aster OB/GYN home" className="group flex shrink-0 items-center">
            <img
              src="/images/logo.png"
              alt="Aster OB/GYN"
              className={`rounded-full bg-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.55)] ring-1 ring-gold/50 transition-all duration-500 group-hover:scale-105 group-hover:ring-2 group-hover:ring-gold ${
                scrolled ? "h-[68px] w-[68px]" : "h-[76px] w-[76px] xl:h-[88px] xl:w-[88px]"
              }`}
            />
          </a>

          <nav aria-label="Main" className="hidden items-center xl:flex">
            {mainNav.map((item) => {
              const active = isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-haspopup={item.mega ? "true" : undefined}
                  aria-expanded={item.mega ? mega : undefined}
                  onMouseEnter={item.mega ? openMega : () => closeMegaSoon(220)}
                  onMouseLeave={item.mega ? undefined : () => clearTimeout(timer.current)}
                  onFocus={item.mega ? openMega : () => setMega(false)}
                  className={`group relative px-2.5 py-3 text-[13.5px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 2xl:px-3.5 2xl:text-[14px] 2xl:tracking-[0.14em] ${linkColor(active || (!!item.mega && mega))}`}
                >
                  <span className="relative inline-flex items-center gap-1.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {item.label}
                    {item.mega && (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${mega ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    )}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-2.5 bottom-1.5 h-px origin-center bg-gradient-to-r from-transparent via-current to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100 ${
                      active || (item.mega && mega) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-current transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${
                      active || (item.mega && mega) ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <a href={site.bookingUrl} target="_blank" rel="noopener" className="btn btn-primary btn-glow btn-sm">
              Book Appointment
              <Icon name="arrow-right" size={16} />
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-12 w-12 place-items-center rounded-[10px] border transition-colors xl:hidden ${
              solid ? "border-espresso/20 text-espresso" : "border-white/50 text-white"
            }`}
          >
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>

          {/* ---------- Mega menu ---------- */}
          <AnimatePresence>
            {mega && (
              <motion.div
                key="mega"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                onMouseEnter={() => clearTimeout(timer.current)}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute left-1/2 top-full z-10 hidden w-[min(74rem,calc(100vw-3rem))] -translate-x-1/2 pt-3 xl:block"
              >
                <MegaMenu />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ---------- Mobile menu ---------- */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-y-auto bg-ivory xl:hidden"
              style={{ maxHeight: "calc(100svh - 84px)" }}
            >
              <div className="flex flex-col gap-1 px-6 pb-8 pt-4">
                {mobileNav.map((item, i) => {
                  const isServices = item.href === "/services/";
                  return (
                    <motion.div key={item.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                      {isServices ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={mobSvc}
                            onClick={() => setMobSvc((v) => !v)}
                            className="flex w-full items-center justify-between rounded-[10px] px-4 py-3.5 font-display text-2xl text-espresso transition-colors hover:bg-terracotta/10 hover:text-terracotta"
                          >
                            {item.label}
                            <Icon name="chevron-right" size={20} className={`transition-transform duration-300 ${mobSvc ? "rotate-90" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {mobSvc && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mb-2 ml-4 grid gap-4 border-l border-gold/50 py-2 pl-4">
                                  {serviceMenu.map((g) => (
                                    <div key={g.title}>
                                      <p className="mb-1 text-[11.5px] font-bold uppercase tracking-[0.22em] text-terracotta">{g.title}</p>
                                      <ul className="grid">
                                        {g.items.map((s) => (
                                          <li key={s.slug}>
                                            <a href={`/services/${s.slug}/`} className="block rounded-lg px-2 py-2 text-[16px] font-semibold text-espresso hover:bg-terracotta/10 hover:text-terracotta">
                                              {s.title}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                  <a href="/services/" className="btn btn-dark btn-sm w-fit">View All Services <Icon name="arrow-right" size={16} /></a>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a
                          href={item.href}
                          className="group flex items-center justify-between rounded-[10px] px-4 py-3.5 font-display text-2xl text-espresso transition-colors hover:bg-terracotta/10 hover:text-terracotta"
                        >
                          {item.label}
                          <Icon name="arrow-right" size={18} className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </a>
                      )}
                    </motion.div>
                  );
                })}
                <div className="mt-5 grid gap-3">
                  <a href={utilityNav.portal.href} target="_blank" rel="noopener" className="btn btn-outline w-full">
                    <Icon name="users" size={16} /> {utilityNav.portal.label}
                  </a>
                  <a href={site.phoneHref} className="btn btn-outline w-full">
                    <Icon name="phone" size={16} /> {site.phone}
                  </a>
                  <a href={site.bookingUrl} target="_blank" rel="noopener" className="btn btn-primary btn-glow w-full">
                    Book Appointment <Icon name="arrow-right" size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
