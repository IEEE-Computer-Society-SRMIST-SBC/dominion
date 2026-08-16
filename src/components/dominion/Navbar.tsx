import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Schedule", href: "#schedule" },
  { label: "Venues", href: "#venues" },
  { label: "Contact", href: "#contact" },
];

const institutions = [
  "SRM Institute of Science and Technology",
  "School of Computing",
  "CTECH",
  "HackerRank Campus Crew",
  "IEEE Computer Society",
];

function LogoMark({ label }: { label: string }) {
  const initials = label
    .split(/[\s/]+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 3)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <span
      title={label}
      className="armor-surface flex h-8 items-center gap-1.5 rounded-sm border border-border px-2 font-display text-[0.6rem] tracking-[0.18em] text-chrome"
    >
      <Shield className="h-3 w-3 text-primary" strokeWidth={1.6} />
      {initials}
    </span>
  );
}

function DevfolioButton({ theme = "dark" }: { theme?: "light" | "dark" | "dark-inverted" }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      className="apply-button"
      data-hackathon-slug="dominion2026"
      data-button-theme={theme}
      style={{ height: "44px", width: "312px" }}
    ></div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header 
      className="fixed top-2 right-2 left-2 sm:top-4 sm:right-4 sm:left-4 z-50 overflow-hidden rounded-lg"
      style={{
        background: "linear-gradient(180deg, #16181b 0%, #0B1210 100%)",
        borderTop: "1px solid #3e4149",
        borderLeft: "1px solid #3e4149",
        borderBottom: "2px solid #050908",
        borderRight: "2px solid #050908",
        boxShadow: "0px 10px 25px rgba(0,0,0,0.9), inset 0px 1px 1px rgba(255,255,255,0.1)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10" />
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.03]" />
      
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4 overflow-hidden">
          <img src="/logo.png" alt="Dominion" className="h-6 object-contain sm:h-8 drop-shadow-[0_0_8px_rgba(0,255,154,0.3)]" />
          
          <div className="hidden sm:flex items-center gap-2 rounded bg-[#050908] px-3 py-1.5 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.9)] border border-[#111]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#00E68A] shadow-[0_0_8px_#00E68A]" />
            <span className="font-mono text-[0.55rem] font-bold tracking-widest text-[#00E68A] uppercase">Uplink Secure</span>
          </div>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative rounded bg-[#050908] px-4 py-2 font-display text-[0.65rem] tracking-[0.22em] text-[#8C9994] uppercase transition-all hover:text-[#00FF9A] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8),_1px_1px_1px_rgba(255,255,255,0.05)] border border-[#0B1210]"
            >
              <div className="absolute left-1/2 top-0 h-[1px] w-0 -translate-x-1/2 bg-[#00FF9A] transition-all group-hover:w-1/2 shadow-[0_0_5px_#00FF9A]" />
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <DevfolioButton theme="dark" />
          </div>
          <button
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="rounded p-2 text-[#8C9994] lg:hidden relative overflow-hidden active:translate-y-[1px]"
            style={{
              background: "linear-gradient(145deg, #1c1e22 0%, #0B1210 100%)",
              borderTop: "1px solid #3e4149",
              borderLeft: "1px solid #3e4149",
              borderBottom: "1px solid #050908",
              borderRight: "1px solid #050908",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.8), inset 1px 1px 1px rgba(255,255,255,0.1)",
            }}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div 
          className="border-t border-[#0c0d10] px-6 pt-2 pb-5 lg:hidden relative z-10"
          style={{
            background: "linear-gradient(180deg, #121417 0%, #0a0b0d 100%)",
            boxShadow: "inset 0px 5px 15px rgba(0,0,0,0.9)"
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 font-display text-[0.7rem] tracking-[0.22em] text-[#9ca3af] uppercase hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-5 flex justify-center">
            <DevfolioButton theme="dark" />
          </div>
        </div>
      )}
    </header>
  );
}
