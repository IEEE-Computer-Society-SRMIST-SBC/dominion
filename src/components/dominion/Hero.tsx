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
      className="relative flex min-h-screen items-center overflow-hidden bg-[#030807]"
    >
      {/* Background Layer 1: Deep Space & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A1A12] via-[#030807] to-[#030807]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Background Layer 2: Mechanical Panels & Circuit Paths */}
      <div className="absolute left-0 top-0 bottom-0 w-[15vw] border-r border-[#111815] bg-[#050908] shadow-[10px_0_30px_rgba(0,0,0,0.8),inset_-1px_0_2px_rgba(255,255,255,0.02)] hidden md:block" />
      <div className="absolute right-0 top-0 bottom-0 w-[15vw] border-l border-[#111815] bg-[#050908] shadow-[-10px_0_30px_rgba(0,0,0,0.8),inset_1px_0_2px_rgba(255,255,255,0.02)] hidden md:block" />
      
      <div className="absolute left-[5vw] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00E68A] to-transparent opacity-20" />
      <div className="absolute right-[5vw] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00E68A] to-transparent opacity-20" />
      <div className="absolute inset-0">
        {mounted && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, transparent 10%, rgba(3,8,7,0.8) 55%, #030807 100%)",
        }}
      />
      
      {/* Background Layer 3: Large Mechanical Framework behind title */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] max-w-[1200px] border border-[#111815] bg-[#050908]/50 rounded-[40px] shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-[6] flex items-center justify-center">
        <div className="absolute inset-4 border border-[#111815] rounded-[30px] opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[2px] bg-[#00E68A] shadow-[0_0_15px_#00E68A]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[2px] bg-[#00E68A] shadow-[0_0_15px_#00E68A]" />
      </div>

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

        {/* Title inside Energy Chamber */}
        <div className="relative mx-auto mt-12 sm:mt-16 w-full max-w-[600px] sm:max-w-[800px] z-10 flex justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(0,230,138,0.15)_0%,_transparent_70%)] blur-2xl pointer-events-none" />
          
          <motion.img
            src="/logo.png"
            alt="Dominion"
            initial={{ opacity: 0, scale: 1.1, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-[90%] sm:w-[100%]"
            style={{ 
              filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.9)) drop-shadow(0px 4px 6px rgba(0,0,0,0.6)) drop-shadow(0px 0px 15px rgba(0,230,138,0.2))" 
            }}
          />
        </div>

        {/* Tagline: Amber Digital Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-12 sm:mt-16 w-max rounded-sm bg-[#050908] px-6 py-2 border border-[#111815]"
          style={{ boxShadow: "inset 2px 2px 10px rgba(0,0,0,0.9), inset -1px -1px 2px rgba(255,255,255,0.02)" }}
        >
          <p
            className="font-mono text-[0.6rem] sm:text-[0.7rem] font-bold tracking-[0.4em] uppercase text-[#D9A61A]"
            style={{ textShadow: "0 0 10px rgba(217,166,26,0.6)" }}
          >
            BUILD <span className="text-[#3e4149] mx-1">/</span> INNOVATE <span className="text-[#3e4149] mx-1">/</span> DOMINATE
          </p>
        </motion.div>

        {/* Event Information Bar: Horizontal Status Console */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 mx-auto flex max-w-fit flex-col sm:flex-row items-center rounded-lg p-1.5"
          style={{
            background: "linear-gradient(145deg, #121C19 0%, #0B1210 100%)",
            borderTop: "1px solid #2a352e",
            borderLeft: "1px solid #2a352e",
            borderBottom: "2px solid #030807",
            borderRight: "2px solid #030807",
            boxShadow: "0px 15px 30px rgba(0,0,0,0.8), inset 1px 1px 2px rgba(255,255,255,0.05)"
          }}
        >
          <div 
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded bg-[#050908] px-6 py-3"
            style={{ boxShadow: "inset 2px 2px 8px rgba(0,0,0,0.9)" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#111815] bg-[#0A1A12]">
                <Zap className="h-3 w-3 text-[#00E68A]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-mono text-[0.45rem] tracking-[0.2em] text-[#8C9994] uppercase">MODE</span>
                <span className="font-display text-[0.65rem] tracking-[0.15em] text-[#E8ECE9] uppercase">Hybrid Buildathon</span>
              </div>
            </div>
            
            <div className="hidden sm:block h-8 w-[1px] bg-[#111815]" />
            <div className="block sm:hidden w-full h-[1px] bg-[#111815]" />

            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#111815] bg-[#0A1A12]">
                <CalendarDays className="h-3 w-3 text-[#00E68A]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-mono text-[0.45rem] tracking-[0.2em] text-[#8C9994] uppercase">DATE</span>
                <span className="font-display text-[0.65rem] tracking-[0.15em] text-[#E8ECE9] uppercase">Sept 2nd – 3rd, 2026</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button: Tactile Mechanical Control */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#tracks"
            className="group relative flex items-center justify-center rounded-lg p-1.5 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(145deg, #1c1e22 0%, #0B1210 100%)",
              borderTop: "1px solid #3e4149",
              borderLeft: "1px solid #3e4149",
              borderBottom: "2px solid #030807",
              borderRight: "2px solid #030807",
              boxShadow: "0px 15px 30px rgba(0,0,0,0.8), inset 1px 1px 2px rgba(255,255,255,0.1)"
            }}
          >
            <div 
              className="relative flex items-center gap-3 rounded bg-[#050908] px-8 py-4 overflow-hidden"
              style={{ boxShadow: "inset 2px 2px 10px rgba(0,0,0,0.9)" }}
            >
              {/* Green illuminated edge on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "inset 0 0 15px rgba(0,230,138,0.4)" }} />
              
              <div className="h-2 w-2 rounded-full bg-[#00E68A] shadow-[0_0_8px_#00E68A,inset_1px_1px_2px_#ffffff]" />
              <span className="font-display text-[0.7rem] font-bold tracking-[0.28em] text-[#E8ECE9] uppercase group-hover:text-[#00FF9A] transition-colors">
                View Tracks &amp; Details
              </span>
              <ArrowDownRight className="h-4 w-4 text-[#8C9994] group-hover:text-[#00FF9A] transition-colors" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
