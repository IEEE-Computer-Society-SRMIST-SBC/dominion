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
          
          {/* Recessed Button Chamber */}
          <div 
            className="shrink-0 p-4 rounded-lg border-2 border-[#111] bg-[#050608]"
            style={{ boxShadow: "inset 5px 5px 15px rgba(0,0,0,0.9), inset -2px -2px 5px rgba(255,255,255,0.02)" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[0.55rem] tracking-widest text-[#ff2a2a] uppercase">Authorize</span>
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "#ff2a2a", boxShadow: "0 0 8px #ff2a2a" }} />
            </div>
            <div
              className="apply-button relative"
              data-hackathon-slug="dominion2026"
              data-button-theme="dark"
              style={{ height: "44px", width: "312px" }}
            />
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
              className="glass-panel armor-surface relative overflow-hidden p-8"
            >
              <div className="animate-float-slow absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
              <span className="relative inline-block rounded-sm border border-primary/40 px-2.5 py-1 font-display text-[0.55rem] tracking-[0.3em] text-primary uppercase">
                {v.tag}
              </span>
              <v.icon className="relative mt-6 h-7 w-7 text-accent" strokeWidth={1.4} />
              <h3 className="text-chrome relative mt-4 font-display text-lg leading-snug font-bold tracking-[0.08em] uppercase">
                {v.title}
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{v.sub}</p>
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
              className="glass-panel flex items-center gap-4 p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-primary/40 bg-primary/10">
                <Phone className="h-4 w-4 text-accent" />
              </span>
              <span>
                <span className="text-chrome block font-display text-sm tracking-[0.2em] uppercase">
                  {o.name}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">+91 {o.phone}</span>
              </span>
            </motion.a>
          ))}
        </div>
        <motion.div {...reveal} className="mt-10 text-center">
          <a
            href="#sponsors"
            className="inline-block rounded-sm px-10 py-4 font-display text-[0.7rem] tracking-[0.3em] text-primary-foreground uppercase"
            style={{ background: "var(--gradient-emerald)", boxShadow: "var(--glow-emerald)" }}
          >
            Apply with Devfolio
          </a>
        </motion.div>
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
