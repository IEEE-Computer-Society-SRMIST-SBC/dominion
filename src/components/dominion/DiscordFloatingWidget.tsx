import { motion } from "framer-motion";

export default function DiscordFloatingWidget() {
  const inviteUrl = "https://discord.gg/K6MVfFdCsV";

  // Hover transitions for engines & lights
  const shipVariants = {
    hover: {
      scale: 1.1,
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const coreBeamVariants = {
    hover: {
      scaleY: 1.3,
      scaleX: 1.25,
      opacity: 1,
      transition: { repeat: Infinity, duration: 0.4, yoyo: true }
    }
  };

  const sideJetVariants = {
    hover: {
      scaleY: 1.4,
      opacity: 1,
      transition: { repeat: Infinity, duration: 0.3, yoyo: true }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center pointer-events-none">
      <motion.a
        href={inviteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join Discord Server"
        className="pointer-events-auto group relative flex flex-col items-center focus:outline-none"
        initial={{ y: 0, rotate: 0, x: 0 }}
        animate={{
          y: [0, -12, 0],
          rotate: [-3, 3, -3],
          x: [-2, 2, -2],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 4.5,
            ease: "easeInOut",
          },
          rotate: {
            repeat: Infinity,
            duration: 5.5,
            ease: "easeInOut",
          },
          x: {
            repeat: Infinity,
            duration: 6.5,
            ease: "easeInOut",
          }
        }}
        variants={shipVariants}
        whileHover="hover"
      >
        {/* Holographic HUD Tooltip */}
        <div className="absolute bottom-full mb-4 flex flex-col items-center opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div 
            className="rounded border border-[#00ff41]/50 px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] text-[#e2e4e9] uppercase shadow-[0_0_20px_rgba(0,255,65,0.4)] relative overflow-hidden"
            style={{
              background: "rgba(8, 9, 12, 0.95)",
              backgroundImage: "linear-gradient(rgba(0, 255, 65, 0.05) 50%, transparent 50%)",
              backgroundSize: "100% 4px",
            }}
          >
            {/* Hologram scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff41]/12 to-transparent animate-sweep pointer-events-none" />
            
            <div className="flex items-center gap-1.5 relative z-10">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41] animate-pulse" />
              <span className="text-emerald-glow">Discord Uplink</span>
            </div>
            <div className="mt-0.5 text-[0.5rem] text-[#8C9994] tracking-widest relative z-10 text-center">
              LINK STATUS: SECURED
            </div>
          </div>
          {/* Tooltip Arrow */}
          <div className="h-2 w-2 rotate-45 border-r border-b border-[#00ff41]/50 bg-[#08090c] -mt-1 shadow-[0_4px_10px_rgba(0,255,65,0.3)]" />
        </div>

        {/* Premium Doom UFO Vessel Container */}
        <div className="relative h-20 w-28 sm:h-24 sm:w-32 drop-shadow-[0_14px_28px_rgba(0,0,0,0.95)] transition-all duration-300">
          
          {/* UFO Vector Hull SVG */}
          <svg
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[0_0_10px_rgba(0,255,65,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(0,255,65,0.6)] transition-all duration-300"
          >
            <defs>
              {/* Metallic UFO Hull Gradient - Brushed Steel */}
              <linearGradient id="ufo-hull-grad" x1="35" y1="12" x2="35" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#505763" />
                <stop offset="30%" stopColor="#2c3038" />
                <stop offset="70%" stopColor="#15171c" />
                <stop offset="100%" stopColor="#050608" />
              </linearGradient>

              {/* Lower Rim Gradient */}
              <linearGradient id="ufo-rim-grad" x1="35" y1="32" x2="35" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#353a47" />
                <stop offset="100%" stopColor="#080a0e" />
              </linearGradient>

              {/* Cockpit Canopy Glowing Radial Gradient */}
              <radialGradient id="canopy-glow-grad" cx="35" cy="28" r="14" fx="35" fy="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#5865F2" stopOpacity="1" />
                <stop offset="60%" stopColor="#404EED" stopOpacity="0.85" />
                <stop offset="90%" stopColor="#181920" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#090a0d" stopOpacity="0.2" />
              </radialGradient>

              {/* Laser Stabilizer Ring Gradient */}
              <linearGradient id="laser-ring-grad" x1="8" y1="30" x2="62" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00ff41" stopOpacity="0.1" />
                <stop offset="20%" stopColor="#00ff41" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
                <stop offset="80%" stopColor="#00ff41" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00ff41" stopOpacity="0.1" />
              </linearGradient>

              {/* Energy Glow Filter */}
              <filter id="green-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 3D Depth: Back Half of the Laser Stabilizer Ring (renders behind dome) */}
            <path
              d="M 8,30 A 27,9 0 0,1 62,30"
              stroke="url(#laser-ring-grad)"
              strokeWidth="1.25"
              strokeDasharray="4,4"
              opacity="0.6"
              className="animate-pulse"
            />

            {/* Typical Saucer Upper Plate (Smooth classic disk profile) */}
            <path
              d="M6,32 Q35,14 64,32 Q35,48 6,32 Z"
              fill="url(#ufo-hull-grad)"
              stroke="#5865F2"
              strokeWidth="1.5"
            />

            {/* Panel Lines on Upper Saucer Plate (Industrial Detailing) */}
            <path d="M22,23 L25,30" stroke="#1c1d22" strokeWidth="1" />
            <path d="M48,23 L45,30" stroke="#1c1d22" strokeWidth="1" />
            <path d="M35,17 L35,23" stroke="#1c1d22" strokeWidth="1" />
            <path d="M14,31 L20,31" stroke="#1c1d22" strokeWidth="1" />
            <path d="M56,31 L50,31" stroke="#1c1d22" strokeWidth="1" />
            <path d="M18,28 Q35,18 52,28" stroke="#00ff41" strokeWidth="0.75" opacity="0.6" />

            {/* Large Cockpit Canopy / Insignia Dome (Discord Blurple Glass) */}
            <circle
              cx="35"
              cy="28"
              r="14"
              fill="url(#canopy-glow-grad)"
              stroke="#00F0FF"
              strokeWidth="1.5"
              style={{
                filter: "drop-shadow(0 0 10px rgba(88, 101, 242, 0.8))",
              }}
            />

            {/* HUD Targeting Graphic Overlay inside Cockpit Canopy */}
            <path d="M25,24 L25,22 L27,22" stroke="#00F0FF" strokeWidth="0.75" opacity="0.7" />
            <path d="M45,24 L45,22 L43,22" stroke="#00F0FF" strokeWidth="0.75" opacity="0.7" />
            <path d="M25,32 L25,34 L27,34" stroke="#00F0FF" strokeWidth="0.75" opacity="0.7" />
            <path d="M45,32 L45,34 L43,34" stroke="#00F0FF" strokeWidth="0.75" opacity="0.7" />

            {/* Glass Glare Highlights on Dome */}
            <path
              d="M23,23 A14,14 0 0,1 47,23"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path
              d="M26,33.5 A14,14 0 0,0 44,33.5"
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeLinecap="round"
              opacity="0.15"
            />

            {/* Fully Visible Printed Discord Brand Logo (High Contrast Center) */}
            <g transform="translate(23.5, 19.3) scale(0.18)">
              <path
                d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.87-.64,1.72-1.32,2.53-2a75.76,75.76,0,0,0,73,0c.81.7,1.66,1.38,2.53,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,54.65,122.94,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"
                fill="#ffffff"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                }}
              />
            </g>

            {/* UFO Saucer Lower Rim Plate (gives thickness) */}
            <path
              d="M5,32 C5,32, 8,45, 35,49 C62,45, 65,32, 65,32 C65,32, 61,43, 35,43 C9,43, 5,32, 5,32 Z"
              fill="url(#ufo-rim-grad)"
              stroke="#111"
              strokeWidth="1.25"
            />

            {/* Doom Green Glowing Rim Capacitors */}
            <circle cx="18" cy="39" r="1.5" fill="#00ff41" filter="url(#green-glow)" />
            <circle cx="26.5" cy="41.5" r="1.5" fill="#00ff41" filter="url(#green-glow)" />
            <circle cx="35" cy="42.5" r="1.5" fill="#00ff41" filter="url(#green-glow)" className="animate-pulse" />
            <circle cx="43.5" cy="41.5" r="1.5" fill="#00ff41" filter="url(#green-glow)" />
            <circle cx="52" cy="39" r="1.5" fill="#00ff41" filter="url(#green-glow)" />

            {/* Metal Rivets / Fasteners */}
            <circle cx="20" cy="30" r="0.6" fill="#8c99a4" />
            <circle cx="50" cy="30" r="0.6" fill="#8c99a4" />
            <circle cx="35" cy="15" r="0.6" fill="#8c99a4" />
            <circle cx="13" cy="35" r="0.6" fill="#8c99a4" />
            <circle cx="57" cy="35" r="0.6" fill="#8c99a4" />

            {/* Center Engine Core Emitter */}
            <path
              d="M30,44 C30,44 31,47 35,47 C39,47 40,44 40,44 Z"
              fill="#111"
              stroke="#00ff41"
              strokeWidth="0.75"
            />

            {/* Side Jet Exhaust Nozzles (Stabilizer jets relocated under the smooth saucer hull) */}
            <rect x="19.5" y="37" width="3" height="2" rx="0.5" fill="#111" stroke="#00ff41" strokeWidth="0.5" />
            <rect x="47.5" y="37" width="3" height="2" rx="0.5" fill="#111" stroke="#00ff41" strokeWidth="0.5" />

            {/* 3D Depth: Front Half of the Laser Stabilizer Ring (renders in front of saucer) */}
            <path
              d="M 8,30 A 27,9 0 0,0 62,30"
              stroke="url(#laser-ring-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              filter="url(#green-glow)"
              className="transition-opacity duration-300 opacity-80 group-hover:opacity-100"
            />
          </svg>

          {/* Glowing Green Gravity Beam/Tractor Propulsion (Core Engine) */}
          <div className="absolute top-[63%] left-1/2 -translate-x-1/2 w-10 pointer-events-none flex flex-col items-center">
            <motion.div
              className="w-full rounded-b-full bg-gradient-to-b from-[#00ff41]/90 via-[#00ff41]/25 to-transparent shadow-[0_0_15px_rgba(0,255,65,0.85)]"
              variants={coreBeamVariants}
              animate={{
                height: [18, 32, 22, 40, 18],
                opacity: [0.65, 0.95, 0.7, 0.9, 0.65],
                scaleX: [1, 1.15, 0.95, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                filter: "blur(0.5px)",
                transformOrigin: "top center",
              }}
            />
          </div>

          {/* Left Stabilizer Thruster Flame (White-hot core + Cyan glow) */}
          <div className="absolute top-[57%] left-[30%] -translate-x-1/2 pointer-events-none">
            <motion.div
              className="w-1 rounded-b-full bg-gradient-to-b from-[#E0FFFF] via-[#00F0FF] to-transparent shadow-[0_0_8px_rgba(0,240,255,0.9)]"
              variants={sideJetVariants}
              animate={{
                height: [4, 11, 6, 13, 4],
                opacity: [0.7, 1, 0.8, 1, 0.7],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                ease: "easeInOut",
              }}
              style={{
                filter: "blur(0.5px)",
              }}
            />
          </div>

          {/* Right Stabilizer Thruster Flame (White-hot core + Cyan glow) */}
          <div className="absolute top-[57%] right-[30%] translate-x-1/2 pointer-events-none">
            <motion.div
              className="w-1 rounded-b-full bg-gradient-to-b from-[#E0FFFF] via-[#00F0FF] to-transparent shadow-[0_0_8px_rgba(0,240,255,0.9)]"
              variants={sideJetVariants}
              animate={{
                height: [6, 4, 13, 8, 6],
                opacity: [0.8, 0.7, 1, 0.8, 0.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{
                filter: "blur(0.5px)",
              }}
            />
          </div>
          
        </div>
      </motion.a>
    </div>
  );
}
