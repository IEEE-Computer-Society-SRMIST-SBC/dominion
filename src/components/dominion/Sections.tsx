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
      <p className="font-display text-[0.6rem] tracking-[0.4em] text-primary uppercase">{kicker}</p>
      <h2 className="text-chrome mt-3 font-display text-3xl font-black tracking-[0.08em] uppercase sm:text-5xl">
        {title}
      </h2>
      <div
        className="mx-auto mt-5 h-px w-40"
        style={{ background: "var(--gradient-emerald)", boxShadow: "var(--glow-emerald)" }}
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
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionTitle kicker="The Arena" title="Event Highlights" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="glass-panel-thor group gothic-arch relative overflow-hidden p-6 pt-10 hover-loki-illusion"
            >
              <div
                className="animate-glow-pulse absolute -top-14 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full blur-2xl"
                style={{ backgroundColor: "var(--color-thor)", opacity: 0.25 }}
              />
              <h.icon
                className="relative h-6 w-6 animate-lightning"
                strokeWidth={1.5}
                style={{ color: "var(--color-thor)" }}
              />
              <p
                className="relative mt-5 font-display text-[0.6rem] tracking-[0.3em] uppercase"
                style={{ color: "var(--color-thor)" }}
              >
                {h.label}
              </p>
              <p className="relative mt-2 text-sm leading-relaxed text-chrome">{h.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const tracks = [
  {
    icon: Brain,
    name: "AI / ML",
    desc: "Train agents, ship intelligence. Models that reason, predict and command.",
  },
  {
    icon: Blocks,
    name: "Blockchain",
    desc: "Trustless systems, on-chain sovereignty and decentralized authority.",
  },
  {
    icon: Cpu,
    name: "Hardware / IoT",
    desc: "Armored machines and sensor networks that bend the physical world.",
  },
  {
    icon: Lightbulb,
    name: "Open Innovation",
    desc: "No boundaries. Build the idea nobody dared to prototype yet.",
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ rotateX: -7, rotateY: 7, y: -8 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
      className="glass-panel-loki hover-loki-illusion relative overflow-hidden p-7"
    >
      {children}
    </motion.div>
  );
}

export function Tracks() {
  return (
    <section id="tracks" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle kicker="Choose Your Domain" title="Tracks" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tracks.map((t, i) => (
            <motion.div
              key={t.name}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
            >
              <TiltCard>
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: "var(--gradient-loki)" }}
                />
                <div
                  className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full blur-2xl"
                  style={{ backgroundColor: "var(--color-loki)", opacity: 0.15 }}
                />
                <t.icon
                  className="h-8 w-8"
                  strokeWidth={1.4}
                  style={{ color: "var(--color-loki)" }}
                />
                <h3 className="text-chrome mt-6 font-display text-lg font-bold tracking-[0.14em] uppercase">
                  {t.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                <p
                  className="mt-6 font-display text-[0.55rem] tracking-[0.3em] uppercase"
                  style={{ color: "var(--color-loki)" }}
                >
                  0{i + 1} / Track
                </p>
              </TiltCard>
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
        <SectionTitle kicker="Backed By" title="Sponsors" />
        <motion.a
          href="https://devfolio.co"
          target="_blank"
          rel="noreferrer"
          {...reveal}
          className="glass-panel-thor group gothic-arch relative mx-auto block max-w-2xl overflow-hidden p-8 text-center hover-loki-illusion"
        >
          <div
            className="absolute -top-20 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full blur-3xl"
            style={{ backgroundColor: "var(--color-thor)", opacity: 0.2 }}
          />
          <p
            className="relative font-display text-[0.6rem] tracking-[0.3em] uppercase"
            style={{ color: "var(--color-thor)" }}
          >
            Platform Partner
          </p>
          <img
            src="/Devfolio - White.png"
            alt="Devfolio"
            className="relative mx-auto mt-4 h-10 w-auto object-contain sm:h-12"
          />
          <p className="relative mt-4 text-sm text-muted-foreground">
            Powering the official buildathon platform for registrations and submissions.
          </p>
        </motion.a>
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
            href="#register"
            className="inline-block rounded-sm px-10 py-4 font-display text-[0.7rem] tracking-[0.3em] text-primary-foreground uppercase"
            style={{ background: "var(--gradient-emerald)", boxShadow: "var(--glow-emerald)" }}
          >
            Register Now
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
