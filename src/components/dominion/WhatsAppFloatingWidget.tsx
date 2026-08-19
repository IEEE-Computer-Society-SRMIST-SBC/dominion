import { motion } from "framer-motion";

export default function WhatsAppFloatingWidget() {
  // Replace with your actual WhatsApp community or group invite link
  const inviteUrl = "https://chat.whatsapp.com/BR2ZnSsnW8ACEZsZSnJJBg";

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
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center pointer-events-none">
      <motion.a
        href={inviteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join WhatsApp Group"
        className="pointer-events-auto group relative flex flex-col items-center focus:outline-none"
        initial={{ y: 0, rotate: 0, x: 0 }}
        // Out-of-phase floating frequencies from Discord UFO to look organic
        animate={{
          y: [-6, 6, -6],
          rotate: [3, -3, 3],
          x: [2, -2, 2],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 5.0,
            ease: "easeInOut",
          },
          rotate: {
            repeat: Infinity,
            duration: 6.0,
            ease: "easeInOut",
          },
          x: {
            repeat: Infinity,
            duration: 5.5,
            ease: "easeInOut",
          }
        }}
        variants={shipVariants}
        whileHover="hover"
      >
        {/* Holographic HUD Tooltip */}
        <div className="absolute bottom-full mb-4 flex flex-col items-center opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div 
            className="rounded border border-[#25D366]/50 px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] text-[#e2e4e9] uppercase shadow-[0_0_20px_rgba(37,211,102,0.4)] relative overflow-hidden"
            style={{
              background: "rgba(8, 12, 9, 0.95)",
              backgroundImage: "linear-gradient(rgba(37, 211, 102, 0.05) 50%, transparent 50%)",
              backgroundSize: "100% 4px",
            }}
          >
            {/* Hologram scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#25D366]/12 to-transparent animate-sweep pointer-events-none" />
            
            <div className="flex items-center gap-1.5 relative z-10">
              <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] shadow-[0_0_8px_#25D366] animate-pulse" />
              <span className="text-emerald-glow" style={{ textShadow: "0 0 8px rgba(37,211,102,0.6)" }}>WhatsApp Comms</span>
            </div>
            <div className="mt-0.5 text-[0.5rem] text-[#8C9994] tracking-widest relative z-10 text-center">
              LINK STATUS: SECURED
            </div>
          </div>
          {/* Tooltip Arrow */}
          <div className="h-2 w-2 rotate-45 border-r border-b border-[#25D366]/50 bg-[#080c09] -mt-1 shadow-[0_4px_10px_rgba(37,211,102,0.3)]" />
        </div>

        {/* Premium Doom UFO Vessel Container (Equal to Discord UFO size & shadow) */}
        <div className="relative h-20 w-28 sm:h-24 sm:w-32 drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] transition-all duration-300">
          
          {/* UFO Vector Hull SVG (Identical geometry to Discord UFO) */}
          <svg
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[0_0_10px_rgba(37,211,102,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(37,211,102,0.6)] transition-all duration-300"
          >
            <defs>
              {/* Metallic UFO Hull Gradient - Brushed Steel */}
              <linearGradient id="wa-ufo-hull-grad" x1="35" y1="12" x2="35" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#505763" />
                <stop offset="30%" stopColor="#2c3038" />
                <stop offset="70%" stopColor="#15171c" />
                <stop offset="100%" stopColor="#050608" />
              </linearGradient>

              {/* Lower Rim Gradient */}
              <linearGradient id="wa-ufo-rim-grad" x1="35" y1="32" x2="35" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#353a47" />
                <stop offset="100%" stopColor="#080a0e" />
              </linearGradient>

              {/* Cockpit Canopy Glowing Radial Gradient (WhatsApp Green) */}
              <radialGradient id="wa-canopy-glow-grad" cx="35" cy="28" r="14" fx="35" fy="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#25D366" stopOpacity="1" />
                <stop offset="60%" stopColor="#128C7E" stopOpacity="0.85" />
                <stop offset="90%" stopColor="#0b0d10" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#050608" stopOpacity="0.2" />
              </radialGradient>

              {/* Laser Stabilizer Ring Gradient */}
              <linearGradient id="wa-laser-ring-grad" x1="8" y1="30" x2="62" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#25D366" stopOpacity="0.1" />
                <stop offset="20%" stopColor="#25D366" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
                <stop offset="80%" stopColor="#25D366" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#25D366" stopOpacity="0.1" />
              </linearGradient>

              {/* Energy Glow Filter */}
              <filter id="wa-green-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 3D Depth: Back Half of the Laser Stabilizer Ring */}
            <path
              d="M 8,30 A 27,9 0 0,1 62,30"
              stroke="url(#wa-laser-ring-grad)"
              strokeWidth="1.25"
              strokeDasharray="4,4"
              opacity="0.6"
              className="animate-pulse"
            />

            {/* Saucer Upper Plate (Smooth classic disk profile - Identical to Discord) */}
            <path
              d="M6,32 Q35,14 64,32 Q35,48 6,32 Z"
              fill="url(#wa-ufo-hull-grad)"
              stroke="#2d3038"
              strokeWidth="1.5"
            />

            {/* Panel Lines on Upper Saucer Plate (Industrial Detailing) */}
            <path d="M22,23 L25,30" stroke="#1c1d22" strokeWidth="1" />
            <path d="M48,23 L45,30" stroke="#1c1d22" strokeWidth="1" />
            <path d="M35,17 L35,23" stroke="#1c1d22" strokeWidth="1" />
            <path d="M14,31 L20,31" stroke="#1c1d22" strokeWidth="1" />
            <path d="M56,31 L50,31" stroke="#1c1d22" strokeWidth="1" />
            <path d="M18,28 Q35,18 52,28" stroke="#25D366" strokeWidth="0.75" opacity="0.6" />

            {/* Large Cockpit Canopy / Insignia Dome (WhatsApp Green Glass) */}
            <circle
              cx="35"
              cy="28"
              r="14"
              fill="url(#wa-canopy-glow-grad)"
              stroke="#00F0FF"
              strokeWidth="1.5"
              style={{
                filter: "drop-shadow(0 0 10px rgba(37, 211, 102, 0.75))",
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

            {/* Fully Visible Printed WhatsApp Brand Logo (Scaled to equal visual size as Discord logo) */}
            <g transform="translate(23.6, 16.6) scale(0.95)">
              <path
                d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.244 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.785 1.059 3.568 1.603 5.4 1.604 5.378 0 9.754-4.3 9.758-9.585.002-2.561-1-4.97-2.82-6.79-1.82-1.82-4.24-2.82-6.8-2.822-5.38 0-9.758 4.302-9.761 9.587-.002 1.9.497 3.754 1.447 5.396L1.867 22.18l6.78-1.78zm11.758-5.345c-.092-.152-.336-.244-.722-.437-.386-.192-2.28-1.125-2.63-1.252-.35-.128-.606-.192-.86.192-.254.385-.986 1.252-1.21 1.508-.222.256-.445.287-.831.094-.386-.192-1.63-.601-3.106-1.916-1.148-1.024-1.923-2.29-2.148-2.675-.224-.386-.024-.595.17-.788.174-.174.386-.45.58-.675.19-.224.256-.386.386-.642.128-.256.064-.482-.032-.676-.096-.192-.86-2.073-1.178-2.839-.309-.75-.623-.65-.86-.662-.22-.011-.475-.013-.728-.013-.254 0-.67.096-.985.442-.315.346-1.202 1.176-1.202 2.87 0 1.693 1.236 3.326 1.408 3.557.172.23 2.43 3.714 5.887 5.204 3.457 1.49 3.457 1.012 4.076.953.62-.058 2.012-.821 2.296-1.616.284-.796.284-1.479.198-1.632z"
                fill="#ffffff"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                }}
              />
            </g>

            {/* UFO Saucer Lower Rim Plate (gives thickness) */}
            <path
              d="M5,32 C5,32, 8,45, 35,49 C62,45, 65,32, 65,32 C65,32, 61,43, 35,43 C9,43, 5,32, 5,32 Z"
              fill="url(#wa-ufo-rim-grad)"
              stroke="#111"
              strokeWidth="1.25"
            />

            {/* WhatsApp Green Glowing Rim Capacitors */}
            <circle cx="18" cy="39" r="1.5" fill="#25D366" filter="url(#wa-green-glow)" />
            <circle cx="26.5" cy="41.5" r="1.5" fill="#25D366" filter="url(#wa-green-glow)" />
            <circle cx="35" cy="42.5" r="1.5" fill="#25D366" filter="url(#wa-green-glow)" className="animate-pulse" />
            <circle cx="43.5" cy="41.5" r="1.5" fill="#25D366" filter="url(#wa-green-glow)" />
            <circle cx="52" cy="39" r="1.5" fill="#25D366" filter="url(#wa-green-glow)" />

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
              stroke="#25D366"
              strokeWidth="0.75"
            />

            {/* Side Jet Exhaust Nozzles */}
            <rect x="19.5" y="37" width="3" height="2" rx="0.5" fill="#111" stroke="#25D366" strokeWidth="0.5" />
            <rect x="47.5" y="37" width="3" height="2" rx="0.5" fill="#111" stroke="#25D366" strokeWidth="0.5" />

            {/* 3D Depth: Front Half of the Laser Stabilizer Ring */}
            <path
              d="M 8,30 A 27,9 0 0,0 62,30"
              stroke="url(#wa-laser-ring-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              filter="url(#wa-green-glow)"
              className="transition-opacity duration-300 opacity-80 group-hover:opacity-100"
            />
          </svg>

          {/* Glowing Green Gravity Beam/Tractor Propulsion (Core Engine) */}
          <div className="absolute top-[63%] left-1/2 -translate-x-1/2 w-10 pointer-events-none flex flex-col items-center">
            <motion.div
              className="w-full rounded-b-full bg-gradient-to-b from-[#25D366]/90 via-[#25D366]/25 to-transparent shadow-[0_0_15px_rgba(37,211,102,0.85)]"
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
