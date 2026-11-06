import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";
import { site } from "../../data/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[10px] border border-espresso/15 bg-white px-4 py-3 text-base text-espresso outline-none transition placeholder:text-taupe/70 focus:border-terracotta focus:ring-4 focus:ring-terracotta/15";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      // Set PUBLIC_FORM_ENDPOINT in .env (Formspree, Netlify, your own API...)
      const endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined;
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      {/* Map fills the section background */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-lift">
        <iframe
          title="Map to Aster OB/GYN, 240 West 98th Street, New York"
          src={site.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 [filter:sepia(0.28)_saturate(0.9)_contrast(1.02)]"
        />
      </div>

      <div className="relative grid min-h-[44rem] items-center p-4 md:p-10 lg:min-h-[46rem] lg:grid-cols-[minmax(0,32rem)_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-ivory/95 p-6 shadow-lift backdrop-blur-md md:p-9"
        >
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Tell us how we can help</h2>

          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 rounded-2xl bg-terracotta/10 p-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-terracotta text-white"><Icon name="check" size={26} /></span>
                <p className="mt-4 font-display text-2xl">Message sent</p>
                <p className="mt-1 text-base text-espresso/75">Thank you. Our team will reply within one business day.</p>
                <button onClick={() => setStatus("idle")} className="btn btn-outline btn-sm mt-5">Send Another Message</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} className="mt-6 grid gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-semibold">Name
                    <input name="name" required autoComplete="name" className={field} placeholder="Your full name" />
                  </label>
                  <label className="grid gap-1.5 text-sm font-semibold">Phone
                    <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="(212) 000-0000" />
                  </label>
                </div>
                <label className="grid gap-1.5 text-sm font-semibold">Email
                  <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@email.com" />
                </label>
                <label className="grid gap-1.5 text-sm font-semibold">Subject
                  <input name="subject" className={field} placeholder="Appointment, insurance, question..." />
                </label>
                <label className="grid gap-1.5 text-sm font-semibold">Message
                  <textarea name="message" required rows={4} className={`${field} resize-y`} placeholder="How can we help you?" />
                </label>
                {status === "error" && (
                  <p role="alert" className="rounded-[10px] bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                    Your message did not send. Check your connection and try again, or call {site.phone}.
                  </p>
                )}
                <button type="submit" disabled={status === "sending"} className="btn btn-primary h-14 w-full text-base disabled:opacity-70">
                  {status === "sending" ? "Sending…" : "Send Message"}
                  <Icon name="arrow-right" size={18} />
                </button>
                <p className="text-xs text-taupe">Please do not include private medical details. For urgent needs, call us.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Info chip on the map */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 self-end justify-self-start rounded-3xl bg-espresso/95 p-6 text-white shadow-lift backdrop-blur-md transition-transform duration-500 hover:-translate-y-1 lg:mt-0 lg:justify-self-end"
        >
          <p className="font-display text-xl text-gold-soft">Aster OB/GYN</p>
          <ul className="mt-3 grid gap-2 text-base text-white/90">
            <li className="flex items-start gap-3"><Icon name="map-pin" size={18} className="mt-1 shrink-0 text-gold" />{site.address[0]}<br />{site.address[1]}</li>
            <li className="flex items-center gap-3"><Icon name="phone" size={18} className="shrink-0 text-gold" />{site.phone}</li>
            <li className="flex items-center gap-3"><Icon name="clock" size={18} className="shrink-0 text-gold" />{site.hours}</li>
          </ul>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=240+W+98th+St+Suite+1E+New+York+NY+10025"
            target="_blank"
            rel="noopener"
            className="btn btn-gold btn-sm mt-5"
          >
            Get Directions <Icon name="arrow-up-right" size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
