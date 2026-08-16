import { motion } from "framer-motion";
import {
  Brain,
  CalendarDays,
  Cpu,
  Globe2,
  Layers,
  MapPin,
  Monitor,
  Phone,
  Lightbulb,
  Blocks,
  Shield,
  HeartHandshake,
  Route,
  Activity,
  RefreshCw,
  CloudLightning,
  PawPrint,
  Zap,
  ScanFace,
  Satellite,
} from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <motion.div {...reveal} className="mb-12 text-center">
      <p className="font-mono text-[0.6rem] tracking-[0.4em] text-[#9ca3af] uppercase">{kicker}</p>
      <h2 className="text-[#e2e4e9] mt-3 font-mono text-3xl font-black tracking-[0.15em] uppercase sm:text-5xl" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
        {title}
      </h2>
      <div
        className="mx-auto mt-5 h-1 w-24 rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, #ffb000, transparent)", opacity: 0.5 }}
      />
    </motion.div>
  );
}

const highlights = [
  { icon: CalendarDays, label: "Dates", value: "September 2nd – 3rd, 2026" },
  { icon: Layers, label: "Format", value: "Hybrid Buildathon (Offline + Online)" },
  {
    icon: MapPin,
    label: "Offline Venue",
    value: "SRM Institute of Science and Technology, KTR Campus",
  },
  { icon: Monitor, label: "Online Venue", value: "Official Remote Event Platform" },
];

export function Highlights() {
  return (
    <section id="about" className="relative border-y border-border py-24">
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionTitle kicker="The Arena" title="System Status" />
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-5">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-md border-2 border-[#111] p-6 ${
                i === 0 ? "md:col-span-2 md:row-span-2 p-8" :
                i === 1 ? "md:col-span-2" :
                "md:col-span-1"
              }`}
              style={{
                backgroundColor: "#030c05",
                boxShadow: "inset 4px 4px 15px rgba(0, 0, 0, 0.9), inset -2px -2px 8px rgba(255, 255, 255, 0.05), 1px 1px 2px rgba(255, 255, 255, 0.1)",
                backgroundImage: "linear-gradient(rgba(0, 255, 0, 0.03) 50%, transparent 50%)",
                backgroundSize: "100% 4px",
              }}
            >
              <h.icon 
                className={`transition-colors ${i === 0 ? "mb-6 h-8 w-8" : "mb-4 h-5 w-5"}`} 
                style={{ color: "#00ff41", filter: "drop-shadow(0 0 5px #00ff41)" }} 
              />
              <div>
                <p 
                  className="font-mono text-[0.65rem] tracking-widest uppercase" 
                  style={{ color: "#00aa2b" }}
                >
                  {h.label}
                </p>
                <p 
                  className={`mt-2 font-mono font-bold ${i === 0 ? "text-2xl" : "text-sm"}`} 
                  style={{ color: "#00ff41", textShadow: "0 0 8px #00ff41" }}
                >
                  {h.value}
                </p>
              </div>
              <div className="absolute inset-0 pointer-events-none rounded-md ring-1 ring-inset ring-[#00ff41]/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const tracks = [
  {
    name: "Defence & National Security",
    desc: "Developing advanced tech to safeguard borders, military assets, and national sovereignty.",
    icon: Shield,
    color: "#ff2a2a",
  },
  {
    name: "Women Safety",
    desc: "Creating rapid-response and preventative solutions for personal security.",
    icon: HeartHandshake,
    color: "#ff4d94",
  },
  {
    name: "Road & Transport Safety",
    desc: "Innovating traffic intelligence and accident prevention systems.",
    icon: Route,
    color: "#ffb000",
  },
  {
    name: "Anti-Narcotics & Drug Intelligence",
    desc: "Deploying data analytics to trace and dismantle illicit supply chains.",
    icon: Activity,
    color: "#b02aff",
  },
  {
    name: "Rehabilitation & Reintegration",
    desc: "Building systems to support the return of marginalized individuals to society.",
    icon: RefreshCw,
    color: "#2a8cff",
  },
  {
    name: "Climate Resilience & Extreme Events",
    desc: "Engineering solutions to predict, survive, and recover from environmental disasters.",
    icon: CloudLightning,
    color: "#2affea",
  },
  {
    name: "Wildlife Protection & Anti-Poaching",
    desc: "Leveraging sensors and AI to protect endangered species and habitats.",
    icon: PawPrint,
    color: "#00ff41",
  },
  {
    name: "Critical Infrastructure & Blackout",
    desc: "Securing power grids and vital facilities against physical and cyber threats.",
    icon: Zap,
    color: "#ffd700",
  },
  {
    name: "Human Trafficking & Missing Persons",
    desc: "Utilizing OSINT and facial recognition to locate and rescue victims.",
    icon: ScanFace,
    color: "#ff8c00",
  },
  {
    name: "Space & Satellite Resilience",
    desc: "Protecting orbital assets and securing satellite communication networks.",
    icon: Satellite,
    color: "#00e5ff",
  },
];

const getTrackGridClass = (i: number) => {
  switch (i) {
    case 0: return "md:col-span-2 md:row-span-2 p-8";
    case 1: return "md:col-span-2";
    case 2: return "md:col-span-1";
    case 3: return "md:col-span-1";
    case 4: return "md:col-span-1";
    case 5: return "md:col-span-1";
    case 6: return "md:col-span-2 md:row-span-2 p-8";
    case 7: return "md:col-span-2";
    case 8: return "md:col-span-2";
    case 9: return "md:col-span-2";
    default: return "md:col-span-1";
  }
};

export function Tracks() {
  return (
    <section id="tracks" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle kicker="Hardware Uplink" title="Modules" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {tracks.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ 
                y: 3, 
                boxShadow: "inset 2px 2px 8px rgba(0,0,0,0.9), inset -2px -2px 5px rgba(255,255,255,0.02), 2px 2px 5px rgba(0,0,0,0.5)" 
              }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-lg p-6 cursor-pointer ${getTrackGridClass(i)}`}
              style={{
                background: "linear-gradient(145deg, #2a2d34 0%, #1c1e22 100%)",
                borderTop: "2px solid #3e4149",
                borderLeft: "2px solid #3e4149",
                borderBottom: "2px solid #0c0d10",
                borderRight: "2px solid #0c0d10",
                boxShadow: "8px 8px 18px rgba(0,0,0,0.9), -2px -2px 10px rgba(255,255,255,0.03), inset 1px 1px 2px rgba(255,255,255,0.1), inset -1px -1px 2px rgba(0,0,0,0.6)",
              }}
            >
              {/* Screws */}
              <div className="absolute top-3 left-3 h-2 w-2 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
              <div className="absolute top-3 right-3 h-2 w-2 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
              <div className="absolute bottom-3 left-3 h-2 w-2 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
              <div className="absolute bottom-3 right-3 h-2 w-2 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />

              <div className="absolute right-0 top-0 -mr-6 -mt-6 opacity-5 mix-blend-overlay">
                <t.icon className="h-48 w-48" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <t.icon 
                  className={`${(i === 0 || i === 6) ? "mb-10 h-14 w-14" : "mb-8 h-8 w-8"}`} 
                  style={{ color: t.color, filter: `drop-shadow(0 0 8px ${t.color})` }}
                />
                <div>
                  <h3 className={`font-mono font-black tracking-widest text-[#e2e4e9] uppercase ${(i === 0 || i === 6) ? "text-3xl" : "text-lg"}`} style={{ textShadow: "1px 1px 2px #000" }}>{t.name}</h3>
                  <p className={`mt-3 font-mono leading-relaxed text-[#9ca3af] ${(i === 0 || i === 6) ? "text-base" : "text-sm"}`}>{t.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Sponsors() {
  return (
    <section id="sponsors" className="relative border-y border-border py-24">
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionTitle kicker="Mainframe Uplink" title="Command Console" />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-8 rounded-xl p-8 md:flex-row md:p-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #1f2126 0%, #141619 100%)",
            borderTop: "3px solid #33373e",
            borderLeft: "3px solid #33373e",
            borderBottom: "3px solid #090a0c",
            borderRight: "3px solid #090a0c",
            boxShadow: "10px 10px 25px rgba(0,0,0,0.9), inset 2px 2px 5px rgba(255,255,255,0.05)",
          }}
        >
          {/* Hardware Grip Texture on left edge */}
          <div className="hidden md:flex flex-col gap-2 opacity-30 absolute left-4 inset-y-0 py-8 justify-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-1 w-12 rounded-full bg-black shadow-[1px_1px_1px_rgba(255,255,255,0.1)]" />
            ))}
          </div>

          <div className="flex flex-col items-center md:items-start md:ml-12 relative z-10">
            <p className="mb-3 font-mono text-[0.65rem] tracking-widest text-[#9ca3af] uppercase">Platform Partner Uplink</p>
            <div className="rounded border-2 border-[#111] p-3 bg-[#0a0b0d] shadow-[inset_2px_2px_10px_rgba(0,0,0,0.8)]">
              <img src="/devfoliologo.svg" alt="DEVFOLIO LOGO" className="h-8 w-auto opacity-80" />
            </div>
            <p className="mt-5 max-w-xs font-mono text-sm leading-relaxed text-[#7a8190]">
              System initializing official buildathon deployment protocols. Awaiting applicant authorization.
            </p>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}

/*
 * `cap` is each logo's max height as a % of the key well, tuned per logo so the
 * marks read at the same optical weight despite very different aspect ratios
 * (a squarish mark at the same height looks far heavier than a wide lockup).
 * Derived as height ∝ 1/sqrt(aspect), then clamped so neither the near-square
 * CINTEL mark nor the ultra-wide CMU lockup dominates its neighbours.
 */
const nationalPartners = [
  { src: "/srmlogo.png", alt: "SRM Institute of Science and Technology", code: "SRMIST", cap: 46 },
  { src: "/soclogo.png", alt: "School of Computing", code: "SOC", cap: 54 },
  { src: "/cintellogo.png", alt: "Department of Computational Intelligence", code: "CINTEL", cap: 65 },
  { src: "/ctechlogo.png", alt: "Department of Computing Technologies", code: "C-TECH", cap: 51 },
  { src: "/hrcclogo.png", alt: "HackerRank Campus Crew SRMIST", code: "HRCC", cap: 61 },
  { src: "/ieeecslogo.png", alt: "IEEE Computer Society", code: "IEEE CS", cap: 42 },
];

const internationalPartners = [
  { src: "/partners/cmu-africa.png", alt: "Carnegie Mellon University Africa IEEE Student Branch", code: "CMU Africa", cap: 33 },
  { src: "/partners/dedan-kimathi.png", alt: "Dedan Kimathi University IEEE Student Branch", code: "DeKUT", cap: 62 },
  { src: "/partners/ernest-cook.png", alt: "Ernest Cook University IEEE Student Branch", code: "Ernest Cook", cap: 48 },
  { src: "/partners/makerere.png", alt: "Makerere University IEEE Student Branch", code: "Makerere", cap: 48 },
  { src: "/partners/mbarara.png", alt: "Mbarara University IEEE Student Branch", code: "Mbarara", cap: 47 },
  { src: "/partners/ndejje.png", alt: "Ndejje University IEEE Student Branch", code: "Ndejje", cap: 48 },
  { src: "/partners/university-of-rwanda.png", alt: "University of Rwanda IEEE Student Branch", code: "U. Rwanda", cap: 49 },
];

/* Panel fastener — sits at the console housing corners */
function Screw({ className }: { className: string }) {
  return (
    <div
      className={`absolute h-2.5 w-2.5 rounded-full ${className}`}
      style={{
        background: "radial-gradient(circle at 32% 30%, #4a4f57 0%, #23272d 55%, #14171b 100%)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25), 0 1px 2px rgba(0,0,0,0.9)",
      }}
    >
      <div className="absolute top-1/2 left-1/2 h-[1px] w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#0b0d10]" />
    </div>
  );
}

/* One logo as a physical, pressable console key */
function PartnerKey({
  partner,
  tone,
  index,
}: {
  partner: { src: string; alt: string; code: string; cap: number };
  tone: "dark" | "light";
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className="relative rounded-lg p-1.5 transition-transform duration-150 group-hover:translate-y-[2px] group-active:translate-y-[3px]"
        style={{
          background: "linear-gradient(145deg, #262a30 0%, #12151a 100%)",
          borderTop: "1px solid #3e4149",
          borderLeft: "1px solid #3e4149",
          borderBottom: "3px solid #06070a",
          borderRight: "3px solid #06070a",
          boxShadow: "0 14px 26px rgba(0,0,0,0.85), inset 1px 1px 2px rgba(255,255,255,0.1)",
        }}
      >
        {/* Status LED — idles dim, lights on hover */}
        <span className="absolute top-2 right-2 z-10 h-1.5 w-1.5 rounded-full bg-[#00E68A] opacity-30 shadow-[0_0_6px_#00E68A] transition-opacity duration-300 group-hover:opacity-100" />

        {/* Recessed well holding the logo */}
        <div
          className="flex h-20 w-40 items-center justify-center rounded px-3 sm:h-24 sm:w-52"
          style={
            tone === "light"
              ? {
                  /* Flat white: these logos ship an opaque white background, so any
                     tint would show as a hard-edged white rectangle around each mark. */
                  background: "#FFFFFF",
                  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.28)",
                }
              : {
                  background: "linear-gradient(160deg, #0A1A12 0%, #050908 100%)",
                  boxShadow: "inset 2px 2px 10px rgba(0,0,0,0.9)",
                }
          }
        >
          <img
            src={partner.src}
            alt={partner.alt}
            loading="lazy"
            className="w-auto max-w-full object-contain"
            style={{ maxHeight: `${partner.cap}%` }}
          />
        </div>

        {/* Green illumination on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 18px rgba(0,230,138,0.35)" }}
        />
      </div>

      <p className="mt-2.5 text-center font-mono text-[0.5rem] tracking-[0.25em] text-[#7a8190] uppercase transition-colors group-hover:text-[#00E68A]">
        {partner.code}
      </p>
    </motion.div>
  );
}

/* Engraved legend above each bank of keys */
function BankLabel({ children }: { children: string }) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <span className="h-1.5 w-1.5 rotate-45 bg-[#00E68A] shadow-[0_0_6px_#00E68A]" />
      <p
        className="font-mono text-[0.6rem] font-bold tracking-[0.35em] text-[#9ca3af] uppercase"
        style={{ textShadow: "0 1px 0 rgba(0,0,0,0.9)" }}
      >
        {children}
      </p>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-[#33373e] to-transparent" />
    </div>
  );
}

export function Partners() {
  return (
    <section id="partners" className="relative py-24">
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionTitle kicker="Allied Fleet" title="Partners" />

        <motion.div
          {...reveal}
          className="relative mx-auto overflow-hidden rounded-xl p-8 sm:p-10"
          style={{
            background: "linear-gradient(145deg, #1f2126 0%, #141619 100%)",
            borderTop: "3px solid #33373e",
            borderLeft: "3px solid #33373e",
            borderBottom: "3px solid #090a0c",
            borderRight: "3px solid #090a0c",
            boxShadow: "10px 10px 25px rgba(0,0,0,0.9), inset 2px 2px 5px rgba(255,255,255,0.05)",
          }}
        >
          <Screw className="top-3 left-3" />
          <Screw className="top-3 right-3" />
          <Screw className="bottom-3 left-3" />
          <Screw className="right-3 bottom-3" />

          <div className="mb-12">
            <BankLabel>National Partners</BankLabel>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
              {nationalPartners.map((partner, i) => (
                <PartnerKey key={partner.src} partner={partner} tone="dark" index={i} />
              ))}
            </div>
          </div>

          {/* Panel seam between the two banks */}
          <div className="mb-12 h-[2px] w-full bg-gradient-to-r from-transparent via-[#090a0c] to-transparent shadow-[0_1px_0_rgba(255,255,255,0.04)]" />

          <div>
            <BankLabel>International Partners</BankLabel>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
              {internationalPartners.map((partner, i) => (
                <PartnerKey key={partner.src} partner={partner} tone="light" index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Venues() {
  return (
    <section id="venues" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle kicker="Two Battlegrounds" title="Venues" />
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              icon: MapPin,
              tag: "Offline",
              title: "SRM Institute of Science and Technology",
              sub: "KTR Campus, Kattankulathur, Chennai",
            },
            {
              icon: Globe2,
              tag: "Online",
              title: "Official Remote Event Platform",
              sub: "Livestreamed mentoring, submissions and judging",
            },
          ].map((v, i) => (
            <motion.div
              key={v.tag}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg p-8 cursor-pointer"
              whileHover={{ 
                y: 3, 
                boxShadow: "inset 2px 2px 8px rgba(0,0,0,0.9), inset -2px -2px 5px rgba(255,255,255,0.02), 2px 2px 5px rgba(0,0,0,0.5)" 
              }}
              style={{
                background: "linear-gradient(145deg, #2a2d34 0%, #1c1e22 100%)",
                borderTop: "2px solid #3e4149",
                borderLeft: "2px solid #3e4149",
                borderBottom: "2px solid #0c0d10",
                borderRight: "2px solid #0c0d10",
                boxShadow: "8px 8px 18px rgba(0,0,0,0.9), -2px -2px 10px rgba(255,255,255,0.03), inset 1px 1px 2px rgba(255,255,255,0.1), inset -1px -1px 2px rgba(0,0,0,0.6)",
              }}
            >
              <div className="absolute top-3 left-3 h-2 w-2 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
              <div className="absolute top-3 right-3 h-2 w-2 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
              <div className="absolute bottom-3 left-3 h-2 w-2 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
              <div className="absolute bottom-3 right-3 h-2 w-2 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
              
              <div className="absolute right-0 top-0 -mr-6 -mt-6 opacity-5 mix-blend-overlay">
                <v.icon className="h-48 w-48" />
              </div>

              <div className="relative z-10">
                <span className="inline-block rounded-sm border border-[#444] bg-[#0c0d10] px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.3em] text-primary uppercase shadow-[inset_1px_1px_3px_rgba(0,0,0,0.9)]">
                  {v.tag}
                </span>
                <v.icon className="mt-6 h-8 w-8 text-primary" style={{ filter: "drop-shadow(0 0 5px var(--primary))" }} />
                <h3 className="text-[#e2e4e9] mt-4 font-mono text-lg font-black tracking-widest uppercase" style={{ textShadow: "1px 1px 2px #000" }}>
                  {v.title}
                </h3>
                <p className="mt-2 font-mono text-sm leading-relaxed text-[#9ca3af]">{v.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const organizers = [
  { name: "Jushiya", phone: "70182 88584" },
  { name: "Vishesh", phone: "83199 61671" },
];

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-border py-24">
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="relative mx-auto max-w-4xl px-6">
        <SectionTitle kicker="Reach The Council" title="Contact & Organizers" />
        <div className="grid gap-5 sm:grid-cols-2">
          {organizers.map((o, i) => (
            <motion.a
              key={o.name}
              href={`tel:+91${o.phone.replace(/\s/g, "")}`}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg p-6 flex items-center gap-4 cursor-pointer"
              whileHover={{ 
                y: 3, 
                boxShadow: "inset 2px 2px 8px rgba(0,0,0,0.9), inset -2px -2px 5px rgba(255,255,255,0.02), 2px 2px 5px rgba(0,0,0,0.5)" 
              }}
              style={{
                background: "linear-gradient(145deg, #2a2d34 0%, #1c1e22 100%)",
                borderTop: "2px solid #3e4149",
                borderLeft: "2px solid #3e4149",
                borderBottom: "2px solid #0c0d10",
                borderRight: "2px solid #0c0d10",
                boxShadow: "8px 8px 18px rgba(0,0,0,0.9), -2px -2px 10px rgba(255,255,255,0.03), inset 1px 1px 2px rgba(255,255,255,0.1), inset -1px -1px 2px rgba(0,0,0,0.6)",
              }}
            >
              <div className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
              <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
              <div className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
              <div className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />

              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded border border-[#444] bg-[#0c0d10] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.9)]">
                <Phone className="h-4 w-4 text-primary" style={{ filter: "drop-shadow(0 0 5px var(--primary))" }} />
              </span>
              <span className="relative z-10">
                <span className="text-[#e2e4e9] block font-mono font-black text-sm tracking-widest uppercase" style={{ textShadow: "1px 1px 2px #000" }}>
                  {o.name}
                </span>
                <span className="mt-1 block font-mono text-xs text-[#9ca3af]">+91 {o.phone}</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

const accreditations = [
  "NAAC A++",
  "Category 1 with 12B Status",
  "QS World Rankings",
  "NIRF 12th Ranked University",
  "THE World University Rankings",
  "Shanghai Ranking",
  "Nature Index",
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-void py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap justify-center gap-2.5">
          {accreditations.map((a) => (
            <span
              key={a}
              className="armor-surface rounded-sm border border-border px-3 py-2 font-display text-[0.55rem] tracking-[0.22em] text-steel uppercase transition-colors hover:border-primary/50 hover:text-accent"
            >
              {a}
            </span>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-chrome font-display text-xl font-black tracking-[0.35em] uppercase">
            Dominion
          </p>
          <p className="mt-3 text-xs tracking-[0.18em] text-muted-foreground uppercase">
            HackerRank Campus Crew SRMIST × IEEE Computer Society
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            SRM Institute of Science and Technology · School of Computing · CTECH
          </p>
        </div>
      </div>
    </footer>
  );
}
