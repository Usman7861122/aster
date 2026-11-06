export const site = {
  name: "Aster OB/GYN",
  phone: "212-662-6100",
  phoneHref: "tel:+12126626100",
  fax: "(212) 662-6101",
  address: ["240 West 98th Street, Suite 1E", "New York, NY 10025"],
  hours: "Open daily, 9:00 AM – 8:00 PM",
  bookingUrl: "https://consumer.scheduling.athena.io/?locationId=34568-1",
  portalUrl: "https://34568-1.portal.athenahealth.com/",
  tourFormUrl: "https://forms.office.com/r/sDpaV4V4xr",
  mapEmbed:
    "https://www.google.com/maps?q=240%20W%2098th%20St%20Suite%201E%2C%20New%20York%2C%20NY%2010025&output=embed",
};

/* ---------- Menu (same structure as asterobgyn.com) ---------- */

export interface NavItem { label: string; href: string; mega?: boolean }

// Main bar. "Home" is the logo on desktop and a row in the mobile menu.
export const mainNav: NavItem[] = [
  { label: "About Practice", href: "/about-practice/" },
  { label: "Providers", href: "/providers/" },
  { label: "Services", href: "/services/", mega: true },
  { label: "Our Babies", href: "/our-babies/" },
  { label: "Insurance", href: "/insurance/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "Contact", href: "/contact/" },
];

// Small bar above the main menu
export const utilityNav = {
  careers: { label: "Careers", href: "/careers/" },
  portal: { label: "Patient Portal", href: site.portalUrl },
};

export const mobileNav: NavItem[] = [
  { label: "Home", href: "/" },
  ...mainNav,
  { label: "Careers", href: "/careers/" },
];

type ServiceLink = { title: string; slug: string; note: string };

// All 16 services from the live site, grouped for the mega menu
export const serviceMenu: { title: string; items: ServiceLink[] }[] = [
  {
    title: "Fertility & Family",
    items: [
      { title: "Fertility", slug: "fertility", note: "Support building your family" },
      { title: "Sono HSG", slug: "sono-hsg", note: "Uterus and tubes imaging" },
      { title: "Family Planning", slug: "family-planning", note: "Guidance for every plan" },
      { title: "Contraception", slug: "contraception", note: "Birth control options" },
    ],
  },
  {
    title: "Pregnancy",
    items: [
      { title: "Obstetrician", slug: "obstetrician", note: "Care through pregnancy" },
      { title: "Ultrasound", slug: "ultrasound", note: "Including 3D imaging" },
    ],
  },
  {
    title: "Gynecology",
    items: [
      { title: "Gynecology", slug: "gynecology", note: "Routine and diagnostic care" },
      { title: "Annual OB/GYN Exams", slug: "annual-exams", note: "Yearly women's health exams" },
      { title: "Colposcopy", slug: "colposcopy", note: "After an abnormal Pap smear" },
      { title: "LEEP", slug: "leep", note: "In-office cervical care" },
      { title: "STD Testing", slug: "std-testing", note: "Screening and results" },
      { title: "Urodynamics", slug: "urodynamics", note: "Bladder function testing" },
    ],
  },
  {
    title: "Surgery",
    items: [
      { title: "Fibroids", slug: "fibroids", note: "Minimally invasive treatment" },
      { title: "Laparoscopy", slug: "laparoscopy", note: "Small-incision surgery" },
      { title: "Minimally Invasive Surgery", slug: "minimally-invasive-surgery", note: "Smaller incisions" },
      { title: "Labiaplasty", slug: "labiaplasty", note: "Comfort-focused procedure" },
    ],
  },
];

/* ---------- Homepage content ---------- */

export const services = [
  { slug: "fertility", title: "Fertility Testing", img: "/images/clinic/couple-consult.jpg", pos: "55% 50%", text: "Clear answers about your fertility, including follicle counts and Sono-HSG, so you can plan your next step." },
  { slug: "sono-hsg", title: "Sono HSG", img: "/images/clinic/ultrasound-screen.jpg", pos: "40% 50%", text: "A gentle ultrasound-guided test that checks the uterus and fallopian tubes, done right in our office." },
  { slug: "obstetrician", title: "Obstetrics Care", img: "/images/clinic/exam-baby.jpg", pos: "50% 40%", text: "Prenatal visits, ultrasounds and delivery care from doctors who know you and your story." },
  { slug: "family-planning", title: "Family Planning", img: "/images/clinic/lounge-mothers.jpg", pos: "45% 50%", text: "Honest, judgment-free guidance on when, and whether, to grow your family." },
  { slug: "contraception", title: "Contraception", img: "/images/Doctor2-2.webp", pos: "58% 40%", text: "Pills, IUDs and other options explained in plain words, with help placing the one you choose." },
  { slug: "ultrasound", title: "Ultrasound", img: "/images/clinic/ultrasound-scan.jpg", pos: "55% 50%", text: "ACR-accredited ultrasound in our own exam rooms, including 3D imaging, reviewed with your doctor." },
  { slug: "fibroids", title: "Fibroid Management", img: "/images/clinic/consult-paperwork.jpg", pos: "80% 40%", text: "Care plans for fibroids, from monitoring and symptom relief to minimally invasive treatment." },
  { slug: "laparoscopy", title: "Laparoscopy", img: "/images/clinic/doctor-at-door.jpg", pos: "48% 40%", text: "Camera-guided surgery with small incisions and a faster return to your routine." },
];

export const doctors = [
  {
    name: "Dr. Rachel Roesner",
    creds: "DO, FACOG",
    role: "Board-certified OB/GYN",
    img: "/images/Doctor-1-e1745254896325.webp",
    pos: "50% 14%",
    bio: "Dr. Roesner focuses on personalized, compassionate care through every stage of life, including fertility and minimally invasive procedures. She takes time to teach, so you always know what comes next.",
    tags: ["Obstetrics", "Fertility", "Minimally invasive surgery"],
  },
  {
    name: "Dr. Farris Fahmy",
    creds: "MD, FACOG",
    role: "Board-certified OB/GYN",
    img: "/images/client-scaled-1-e1745254857902.webp",
    pos: "50% 10%",
    bio: "Dr. Fahmy has served the Upper West Side for years, from routine exams to advanced surgery. His style is patient-focused, calm and clear.",
    tags: ["Gynecologic surgery", "Obstetrics", "Ultrasound"],
  },
];

export const testimonials = [
  { name: "Amanda C.", quote: "I feel beyond lucky to have found Dr. Roesner, who delivered our first child.", about: "Pregnancy and birth" },
  { name: "Zamira X.", quote: "From the moment I walked in, the staff was warm, welcoming, and highly efficient.", about: "First visit" },
  { name: "Katherine R.", quote: "Dr. Roesner always provides a wonderful experience.", about: "Routine care and IUD" },
  { name: "Danielle A.", quote: "The office was pleasant, clean and calming.", about: "The office" },
  { name: "Niki S.", quote: "Responsive team — quickly ensures that your insurance is accepted.", about: "Insurance" },
];

export const gallery = [
  { src: "/images/jannet/Staff.webp", alt: "Jannet with Dr. Fahmy and a colleague in the Aster lounge", pos: "50% 30%" },
  { src: "/images/jannet/Doctor2.webp", alt: "Jannet, a much-loved member of the Aster team", pos: "50% 25%" },
  { src: "/images/clinic/hallway-mother-baby.jpg", alt: "A mother carries her baby down the Aster hallway", pos: "45% 50%" },
  { src: "/images/clinic/lounge.jpg", alt: "The Aster waiting lounge with art on the wall", pos: "35% 50%" },
  { src: "/images/clinic/ultrasound-consult.jpg", alt: "Dr. Fahmy talking with a patient beside the ultrasound", pos: "45% 50%" },
  { src: "/images/Doctors.webp", alt: "Dr. Roesner and Dr. Fahmy in the lounge", pos: "50% 40%" },
  { src: "/images/clinic/lounge-2.jpg", alt: "Doctors greeting mothers and babies in the lounge", pos: "45% 50%" },
  { src: "/images/clinic/office-sign.jpg", alt: "The Aster OB/GYN office sign", pos: "40% 50%" },
  { src: "/images/clinic/exam-baby.jpg", alt: "Dr. Roesner with a mother and baby in the exam room", pos: "50% 40%" },
  { src: "/images/clinic/lounge-3.jpg", alt: "A doctor greeting a baby in the Aster lounge", pos: "50% 50%" },
];
