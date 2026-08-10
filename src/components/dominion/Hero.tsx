import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, CalendarDays, Zap } from "lucide-react";

const HeroScene = lazy(() => import("./HeroScene"));

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="home"
      className="scanlines relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 tech-grid opacity-40" />
      <div className="absolute inset-0">
        {mounted && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, transparent 10%, oklch(0.11 0.008 158 / 55%) 55%, oklch(0.11 0.008 158) 100%)",
        }}
      />
      <div
        className="animate-sweep pointer-events-none absolute inset-x-0 top-0 h-24 opacity-30"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.85 0.22 155 / 22%), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex flex-wrap justify-center items-center gap-6 sm:gap-8"
        >
          <img src="/srmlogo.png" alt="SRM" className="h-12 sm:h-20 object-contain" />
          <img
            src="/soclogo.png"
            alt="School of Computing"
            className="h-12 sm:h-20 object-contain"
          />
          <img src="/cintellogo.png" alt="Cintel" className="h-12 sm:h-16 object-contain" />
          <img src="/ctechlogo.png" alt="CTECH" className="h-12 sm:h-20 object-contain" />
          <img src="/hrcclogo.png" alt="HRCC" className="h-6 sm:h-8 object-contain" />
          <img src="/ieeecslogo.png" alt="IEEE CS" className="h-20 sm:h-28 object-contain" />
        </motion.div>

        <motion.img
          src="/logo.png"
          alt="Dominion"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 w-[80%] max-w-[600px] sm:max-w-[700px]"
          style={{ filter: "drop-shadow(0 0 34px oklch(0.6 0.175 149 / 55%))" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 font-display text-xs tracking-[0.42em] uppercase sm:text-base hover-loki-illusion"
          style={{ color: "var(--color-loki)", textShadow: "0 0 12px var(--color-loki)" }}
        >
          Build · Innovate · Dominate
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 flex justify-center"
        >
          <span className="glass-panel inline-flex flex-wrap items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-[0.7rem] tracking-[0.14em] text-chrome uppercase sm:text-xs">
            <Zap className="h-3.5 w-3.5 text-accent" />
            Hybrid Buildathon (Offline + Online)
            <span className="text-primary">|</span>
            <CalendarDays className="h-3.5 w-3.5 text-accent" />
            Sept 2nd – 3rd, 2026
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#sponsors"
            className="group relative w-full overflow-hidden rounded-sm px-8 py-3.5 font-display text-[0.7rem] tracking-[0.28em] text-primary-foreground uppercase transition-all duration-500 hover:brightness-115 sm:w-auto"
            style={{ background: "var(--gradient-emerald)", boxShadow: "var(--glow-emerald)" }}
          >
            Apply with Devfolio
          </a>
          <a
            href="#tracks"
            className="glass-panel-loki inline-flex w-full items-center justify-center gap-2 rounded-sm px-8 py-3.5 font-display text-[0.7rem] tracking-[0.28em] text-chrome uppercase sm:w-auto"
          >
            View Tracks &amp; Details
            <ArrowDownRight style={{ color: "var(--color-loki)" }} className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
