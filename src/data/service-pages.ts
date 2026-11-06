// Content for the service pages built from the shared template (src/pages/services/[slug].astro).
// Wording is rewritten in plain English from the live asterobgyn.com pages. Fertility has its own file.

export interface ServicePage {
  slug: string;
  title: string;          // page title and H1
  metaTitle: string;
  eyebrow: string;
  lede: string;
  heroAlt: string;
  heroPos?: string;
  intro: { eyebrow: string; title: string; lead: string; text: string; cta: string; img: string; imgAlt: string };
  steps: { eyebrow: string; title: string; items: { title: string; text: string }[] };
  detail: { eyebrow: string; title: string; note?: string; img: string; imgAlt: string; items: { title: string; text: string }[] };
  facts?: { eyebrow: string; title: string; items: string[]; foot?: string };
  faqs?: { q: string; a: string }[];
  related: string[];
  closing: { title: string; text: string };
}

export const servicePages: ServicePage[] = [
  {
    slug: "sono-hsg",
    title: "Sono HSG in Manhattan",
    metaTitle: "Sono HSG (Sonohysterography) in Manhattan | Aster OB/GYN",
    eyebrow: "Fertility imaging",
    lede: "A gentle ultrasound test that checks your uterus and fallopian tubes, done in our office.",
    heroAlt: "A doctor and a smiling woman look at an ultrasound screen together",
    heroPos: "50% 30%",
    intro: {
      eyebrow: "What is Sono HSG",
      title: "A clear look inside the uterus and tubes",
      lead: "Sono HSG is a short ultrasound test. It lets our doctors see the inside of your uterus and fallopian tubes.",
      text: "It can show a blocked tube or another problem that makes it hard to get pregnant. Dr. Fahmy and Dr. Roesner then use what they see to plan the next step with you.",
      cta: "Book a Sono HSG",
      img: "/images/sono-hsg-a.jpg",
      imgAlt: "An older doctor shows a smiling woman her results on a tablet",
    },
    steps: {
      eyebrow: "Why it helps",
      title: "Three good reasons to choose it",
      items: [
        { title: "A detailed look", text: "Ultrasound with a saline and air mixture shows the uterus and tubes, and can reveal problems." },
        { title: "Done in our office", text: "The test causes little discomfort. Recovery is quick, and you can talk about results right away." },
        { title: "A plan made for you", text: "Your results guide a treatment plan built to improve your chances of getting pregnant." },
      ],
    },
    detail: {
      eyebrow: "What to expect",
      title: "Your visit, step by step",
      note: "A local numbing medicine may be used to keep you comfortable.",
      img: "/images/sono-hsg-b.jpg",
      imgAlt: "A calm woman sits next to an ultrasound machine in a bright exam room",
      items: [
        { title: "You lie back as in a pelvic exam", text: "Your doctor places a speculum and gently cleans the area." },
        { title: "A small ultrasound wand is used", text: "The transvaginal wand scans your uterus, and a saline and air mixture helps show the tubes." },
        { title: "The test is short", text: "It takes 30 minutes or less, and results may be ready right away." },
        { title: "We talk about what comes next", text: "If a tube is blocked, options may include laparoscopy for a closer look, or IVF." },
      ],
    },
    facts: {
      eyebrow: "Who it is for",
      title: "When doctors suggest Sono HSG",
      items: [
        "Women who are having trouble getting pregnant, to check for a full or partial tube blockage",
        "A few months after elective tubal sterilization, to confirm the procedure worked fully",
      ],
    },
    faqs: [
      { q: "What is Sono HSG?", a: "It is an ultrasound that lets Dr. Fahmy and Dr. Roesner see inside the uterus and fallopian tubes. A small transvaginal wand and a saline and air mixture are used." },
      { q: "Who needs it?", a: "It is most often used for women with infertility, to check for tube blockage. It is also used a few months after elective tubal sterilization to confirm it is complete." },
      { q: "What happens after the test?", a: "Your results guide the next step. If the tubes are blocked, we may talk about laparoscopy for a closer look, or in vitro fertilization (IVF)." },
    ],
    related: ["fertility", "family-planning", "ultrasound"],
    closing: { title: "Take the first step toward parenthood", text: "Learn how advanced fertility imaging can help, and book your visit." },
  },
  {
    slug: "family-planning",
    title: "Family Planning in Manhattan",
    metaTitle: "Family Planning & Birth Control in Manhattan | Aster OB/GYN",
    eyebrow: "Family planning",
    lede: "Honest, personal guidance for when and how you grow your family.",
    heroAlt: "A friendly doctor talks with a smiling couple at her desk",
    heroPos: "50% 25%",
    intro: {
      eyebrow: "Plan with confidence",
      title: "Care built around your plans",
      lead: "Whether you want to prevent pregnancy, understand your fertility, or deal with a hard loss, we are here to help.",
      text: "Dr. Fahmy and Dr. Roesner give care that fits your life. We cannot promise any outcome, but we can help you take charge of when and how you build your family.",
      cta: "Book a Consultation",
      img: "/images/family-planning-a.jpg",
      imgAlt: "A smiling couple talks with a doctor during a consultation",
    },
    steps: {
      eyebrow: "How we help",
      title: "Three kinds of support",
      items: [
        { title: "Birth control that fits you", text: "We help you choose a method that matches your lifestyle and health goals." },
        { title: "Fertility evaluation", text: "If you want to get pregnant, we check your tubes and look for anything that may be in the way." },
        { title: "Miscarriage care", text: "After repeated miscarriages we look for the cause and build a treatment plan with you." },
      ],
    },
    detail: {
      eyebrow: "Birth control options",
      title: "Many choices, explained in plain words",
      note: "Implants and IUDs remove the guesswork, and many of our patients do very well with them.",
      img: "/images/family-planning-b.jpg",
      imgAlt: "A happy couple embraces in a bright, sunlit room",
      items: [
        { title: "Hormonal methods", text: "The pill, the Nexplanon® implant, injections, patches and IUDs." },
        { title: "Barrier methods", text: "Condoms, diaphragms and cervical caps. Tubal ligation is also part of the conversation." },
        { title: "Fertility checks", text: "Using FemVue®, Dr. Fahmy sends a saline and air mixture through each tube and uses Sono HSG to watch for a blockage." },
        { title: "Finding the cause", text: "Problems can come from ovulation, blocked tubes, endometriosis or PCOS. We look for the cause and talk about treatment." },
      ],
    },
    faqs: [
      { q: "What is family planning?", a: "It includes birth control, fertility checks and care after miscarriage. We cannot guarantee results, but we can help you manage when and how you build your family." },
      { q: "What are my birth control options?", a: "Hormonal options include the pill, the Nexplanon® implant, injections, patches and IUDs. Barrier options include condoms, diaphragms and cervical caps." },
      { q: "How can my fertility be checked?", a: "Trouble can come from ovulation, blocked tubes, endometriosis or polycystic ovary syndrome (PCOS). With FemVue®, Dr. Fahmy sends a saline and air mixture into each tube and uses Sono HSG to watch for blockages. If one is found, we talk about how to treat it." },
      { q: "How are miscarriages treated?", a: "We look for the underlying cause, which may be chromosomal or related to the reproductive system. Then we diagnose, explain and recommend treatment." },
    ],
    related: ["contraception", "fertility", "sono-hsg"],
    closing: { title: "Plan your future with confidence", text: "Explore your options with doctors who listen. Call us or book online." },
  },
  {
    slug: "contraception",
    title: "Contraception in Manhattan",
    metaTitle: "Birth Control & Contraception in Manhattan | Aster OB/GYN",
    eyebrow: "Birth control",
    lede: "Personal birth control advice, so you can choose what is right for you.",
    heroAlt: "A friendly doctor talks with a smiling young woman in a bright clinic",
    heroPos: "50% 25%",
    intro: {
      eyebrow: "What is birth control",
      title: "Options that fit your life",
      lead: "Birth control includes medicines, devices and small procedures that prevent pregnancy.",
      text: "Some are short term and easy to stop. Others last longer, and some also protect against infections. Dr. Fahmy and Dr. Roesner help you choose with no pressure.",
      cta: "Book a Visit",
      img: "/images/contraception-a.jpg",
      imgAlt: "A gynecologist talks warmly with a young woman",
    },
    steps: {
      eyebrow: "Our care",
      title: "Support from start to finish",
      items: [
        { title: "Full counseling", text: "We go over every method, hormonal and non-hormonal, so you can see all your choices." },
        { title: "A method that fits", text: "We think about your health history, lifestyle and preferences before we suggest anything." },
        { title: "Support over time", text: "We are here for side effects, questions, and changes in what you need." },
      ],
    },
    detail: {
      eyebrow: "Types of birth control",
      title: "A simple guide to your choices",
      img: "/images/contraception-b.jpg",
      imgAlt: "A senior gynecologist talks with a young woman in an exam room",
      items: [
        { title: "Hormonal methods", text: "Pills, patches, rings, shots, implants and IUDs. They stop ovulation or thicken mucus so sperm cannot get through." },
        { title: "Barrier methods", text: "Condoms, diaphragms, cervical caps and sponges block sperm from reaching the egg." },
        { title: "Spermicides", text: "These products kill sperm. They can be used alone or with a barrier method." },
        { title: "Fertility awareness", text: "You track your cycle to find fertile days, and avoid sex on those days." },
        { title: "Emergency contraception", text: "Often called the morning-after pill, it is a high dose of hormones taken after unprotected sex." },
      ],
    },
    faqs: [
      { q: "What is birth control?", a: "It covers medicines, devices and small procedures that prevent pregnancy. Some are temporary and reversible, some are more permanent, and some also protect against STIs." },
      { q: "How do I choose a method?", a: "We look at your medical history, lifestyle and preferences, then explain the options that fit. The choice is always yours." },
      { q: "Can I change my method later?", a: "Yes. We offer ongoing care for side effects and for changes in your needs." },
    ],
    related: ["family-planning", "fertility", "ultrasound"],
    closing: { title: "Care that fits every stage of your life", text: "Talk with a doctor you trust about the birth control that is right for you." },
  },
];
