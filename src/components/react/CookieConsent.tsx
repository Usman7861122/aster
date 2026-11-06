import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

/**
 * Cookie consent with a customize window.
 *
 * To load a third-party script only after consent, add it to a page like this:
 *   <script type="text/plain" data-consent="analytics" src="https://..."></script>
 * Categories: "preferences" | "analytics" | "marketing".
 * The script is switched on only when the visitor allows that category.
 *
 * Other code can listen:  window.addEventListener("aster:consent", (e) => e.detail)
 * A button anywhere can reopen the window:  <button data-cookie-settings>
 */

type Choices = { preferences: boolean; analytics: boolean; marketing: boolean };
type Stored = Choices & { v: number; ts: number };

const KEY = "aster-cookie-consent";
const VERSION = 1;
const OFF: Choices = { preferences: false, analytics: false, marketing: false };
const ON: Choices = { preferences: true, analytics: true, marketing: true };

const categories: { id: keyof Choices | "necessary"; title: string; text: string }[] = [
  { id: "necessary", title: "Strictly necessary", text: "These keep the site working and remember your cookie choice. They cannot be turned off." },
  { id: "preferences", title: "Preferences", text: "These remember settings that make the site easier for you, such as text size or display choices." },
  { id: "analytics", title: "Analytics", text: "These help us see how the site is used, so we can fix problems and improve it. The data is combined and not used to identify you." },
  { id: "marketing", title: "Marketing", text: "These may be used to show our practice on other websites or to measure how well that works." },
];

function read(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Stored;
    return v && v.v === VERSION ? v : null;
  } catch {
    return null;
  }
}

function activate(c: Choices) {
  document.querySelectorAll<HTMLScriptElement>('script[type="text/plain"][data-consent]').forEach((old) => {
    const cat = old.dataset.consent as keyof Choices;
    if (!c[cat] || old.dataset.activated) return;
    const s = document.createElement("script");
    for (const a of Array.from(old.attributes)) {
      if (a.name === "type" || a.name === "data-consent" || a.name === "data-activated") continue;
      s.setAttribute(a.name, a.value);
    }
    s.text = old.text;
    old.dataset.activated = "1";
    old.after(s);
  });
}

function persist(c: Choices, previous: Stored | null) {
  const value: Stored = { ...c, v: VERSION, ts: Date.now() };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {}
  try {
    document.cookie = `aster_consent=${encodeURIComponent(JSON.stringify(c))}; Max-Age=31536000; Path=/; SameSite=Lax`;
  } catch {}
  activate(c);
  window.dispatchEvent(new CustomEvent("aster:consent", { detail: c }));
  // A script that already ran cannot be unloaded. If something was switched off, reload so it stops.
  const revoked = previous && (["preferences", "analytics", "marketing"] as const).some((k) => previous[k] && !c[k]);
  const ran = document.querySelector('script[data-activated="1"]');
  if (revoked && ran) window.location.reload();
}

function Switch({ checked, onChange, label, disabled }: { checked: boolean; onChange?: (v: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-8 w-14 shrink-0 rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${checked ? "bg-terracotta" : "bg-espresso/25"} ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${checked ? "translate-x-6" : ""}`} />
    </button>
  );
}

export default function CookieConsent() {
  const [banner, setBanner] = useState(false);
  const [modal, setModal] = useState(false);
  const [draft, setDraft] = useState<Choices>(OFF);
  const [gpc, setGpc] = useState(false);
  const prev = useRef<Stored | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = read();
    prev.current = saved;
    setGpc(Boolean((navigator as any).globalPrivacyControl));
    if (saved) {
      setDraft({ preferences: saved.preferences, analytics: saved.analytics, marketing: saved.marketing });
      activate(saved);
    } else {
      const t = setTimeout(() => setBanner(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  const openSettings = useCallback(() => {
    const saved = read();
    setDraft(saved ? { preferences: saved.preferences, analytics: saved.analytics, marketing: saved.marketing } : OFF);
    setBanner(false);
    setModal(true);
  }, []);

  useEffect(() => {
    const onClick = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest("[data-cookie-settings]");
      if (el) { e.preventDefault(); openSettings(); }
    };
    document.addEventListener("click", onClick);
    window.addEventListener("aster:open-cookie-settings", openSettings);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("aster:open-cookie-settings", openSettings);
    };
  }, [openSettings]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  function closeModal() {
    setModal(false);
    if (!read()) setBanner(true);
  }

  function choose(c: Choices) {
    persist(c, prev.current);
    prev.current = read();
    setDraft(c);
    setBanner(false);
    setModal(false);
  }

  return (
    <>
      <AnimatePresence>
        {banner && (
          <motion.div
            role="region"
            aria-label="Cookie consent"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[90] max-w-md rounded-[1.75rem] border border-sand/70 bg-white p-6 shadow-lift sm:inset-x-auto sm:bottom-6 sm:left-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-terracotta/10 text-terracotta"><Icon name="shield-check" size={20} /></span>
              <p className="font-display text-xl text-espresso">Your privacy matters</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-espresso/75">
              We use cookies to keep this site working. With your permission, we also use them to understand how the site is used. You choose what to allow.
            </p>
            {gpc && <p className="mt-2 text-xs text-terracotta-deep">We see your browser's Global Privacy Control. We keep optional cookies off unless you turn them on.</p>}
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              <button type="button" onClick={() => choose(gpc ? { ...OFF, preferences: true } : ON)} className="btn btn-primary btn-sm">Accept all</button>
              <button type="button" onClick={() => choose(OFF)} className="btn btn-outline btn-sm">Reject optional</button>
              <button type="button" onClick={openSettings} className="btn btn-dark btn-sm sm:col-span-2">Customize</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[120] grid place-items-center bg-espresso/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-lift md:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Cookie settings</p>
                  <h2 id="cookie-title" className="mt-2 font-display text-3xl text-espresso">Choose your cookies</h2>
                </div>
                <button ref={closeBtn} type="button" onClick={closeModal} aria-label="Close cookie settings" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-espresso/15 transition hover:border-terracotta hover:bg-terracotta hover:text-white">
                  <Icon name="x" size={18} />
                </button>
              </div>
              <p className="mt-3 text-sm text-espresso/75">Turn on only what you are comfortable with. You can change this at any time from the footer of every page.</p>

              <ul className="mt-6 divide-y divide-sand/80 border-y border-sand/80">
                {categories.map((c) => {
                  const fixed = c.id === "necessary";
                  return (
                    <li key={c.id} className="flex items-start justify-between gap-5 py-4">
                      <div>
                        <p className="font-semibold text-espresso">{c.title}{fixed && <span className="ml-2 text-xs font-bold uppercase tracking-wider text-terracotta">Always on</span>}</p>
                        <p className="mt-1 text-sm text-espresso/70">{c.text}</p>
                      </div>
                      <Switch
                        label={c.title}
                        checked={fixed ? true : draft[c.id as keyof Choices]}
                        disabled={fixed}
                        onChange={fixed ? undefined : (v) => setDraft((d) => ({ ...d, [c.id]: v }))}
                      />
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <button type="button" onClick={() => choose(draft)} className="btn btn-primary btn-sm sm:col-span-3">Save my choices</button>
                <button type="button" onClick={() => choose(ON)} className="btn btn-outline btn-sm sm:col-span-2">Accept all</button>
                <button type="button" onClick={() => choose(OFF)} className="btn btn-outline btn-sm">Reject optional</button>
              </div>
              <div className="mt-4 text-center">
                <a href="/cookie-policy/" className="btn btn-dark btn-sm">Read our Cookie Policy</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
