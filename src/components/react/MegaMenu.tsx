import Icon from "./Icon";
import { serviceMenu, site } from "../../data/site";

function Group({ group }: { group: (typeof serviceMenu)[number] }) {
  return (
    <section aria-label={group.title}>
      <h3 className="mb-2 flex items-center gap-3 px-3 font-sans text-[11.5px] font-bold uppercase tracking-[0.22em] text-terracotta">
        {group.title}
        <span className="h-px flex-1 bg-gradient-to-r from-gold/70 to-transparent" />
      </h3>
      <ul>
        {group.items.map((it) => (
          <li key={it.slug}>
            <a
              href={`/services/${it.slug}/`}
              className="group/item relative flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-300 hover:bg-terracotta/[0.08] hover:pl-4"
            >
              <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold transition-all duration-300 group-hover/item:scale-150 group-hover/item:bg-terracotta" />
              <span className="min-w-0 flex-1 text-[14.5px] font-semibold leading-tight text-espresso transition-colors group-hover/item:text-terracotta">
                {it.title}
              </span>
              <Icon
                name="arrow-right"
                size={16}
                className="-translate-x-2 text-terracotta opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MegaMenu() {
  const [fertility, pregnancy, gyn, procedures, cosmetic, surgery, tubes] = serviceMenu;

  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] border border-gold/40 bg-ivory p-5 shadow-[0_45px_100px_-30px_rgb(43_31_27/0.65)] md:p-7">
      {/* gold hairline on top edge */}
      <span aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      {/* logo flower, blended into the corner */}
      <div
        aria-hidden="true"
        className="watermark -bottom-16 -right-12 h-[300px] w-[460px] rotate-[-8deg] opacity-[0.09]"
        style={{ maskImage: "radial-gradient(closest-side,#000 55%,transparent 100%)", WebkitMaskImage: "radial-gradient(closest-side,#000 55%,transparent 100%)" }}
      />

      <div className="grid grid-cols-[16.5rem_1fr] gap-7">
        {/* Featured */}
        <div className="flex flex-col gap-3">
          <a href="/services/" className="group/feat relative block aspect-square overflow-hidden rounded-3xl shadow-soft">
            <img
              src="/images/clinic/ultrasound-scan.jpg"
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover/feat:scale-110"
              style={{ objectPosition: "55% 50%" }}
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/25 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-5 text-white">
              <span className="block text-[11.5px] font-bold uppercase tracking-[0.22em] text-gold-soft">Our services</span>
              <span className="mt-1 block font-display text-2xl leading-tight">Care for every stage of your life</span>
            </span>
          </a>
          <a href="/services/" className="btn btn-dark btn-sm w-full">
            View All Services <Icon name="arrow-right" size={16} />
          </a>
          <div className="group/visit mt-1 flex-1 rounded-2xl border border-sand/70 bg-blush/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blush hover:shadow-soft">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.22em] text-terracotta">Visit us</p>
            <p className="mt-2 flex items-start gap-2 text-[14px] leading-snug text-espresso">
              <Icon name="map-pin" size={16} className="mt-0.5 shrink-0 text-terracotta" />
              <span>{site.address[0]}<br />{site.address[1]}</span>
            </p>
            <p className="mt-2 flex items-center gap-2 text-[14px] text-espresso/80">
              <Icon name="clock" size={16} className="shrink-0 text-terracotta" /> Open daily, 9 AM – 8 PM
            </p>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-4 gap-x-2">
          <div className="grid content-start gap-4">
            <Group group={fertility} />
            <Group group={pregnancy} />
            <Group group={cosmetic} />
          </div>
          <div className="content-start">
            <Group group={gyn} />
          </div>
          <div className="grid content-start gap-4">
            <Group group={procedures} />
            <Group group={tubes} />
          </div>
          <div className="grid content-start gap-4">
            <Group group={surgery} />
            <div className="group/cta relative mx-3 overflow-hidden rounded-2xl bg-gradient-to-br from-clay to-espresso p-5 text-white transition-shadow duration-500 hover:shadow-lift">
              <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-terracotta/40 blur-2xl transition-transform duration-700 group-hover/cta:scale-150" />
              <p className="relative font-display text-lg leading-snug">Not sure what you need?</p>
              <p className="relative mt-1 text-[13px] text-white/70">Same-day visits are often available.</p>
              <a href={site.phoneHref} className="btn btn-gold btn-sm relative mt-3">
                <Icon name="phone" size={15} /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
