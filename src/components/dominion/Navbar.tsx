import { useState } from "react";
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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <img 
            src="/logo.png" 
            alt="Dominion" 
            className="h-6 object-contain sm:h-8" 
          />
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-display text-[0.65rem] tracking-[0.22em] text-muted-foreground uppercase transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#sponsors"
            className="hidden rounded-sm border border-primary/60 px-4 py-2 font-display text-[0.65rem] tracking-[0.22em] text-primary-foreground uppercase transition-shadow duration-500 sm:block"
            style={{ background: "var(--gradient-emerald)", boxShadow: "var(--glow-emerald)" }}
          >
            Apply with Devfolio
          </motion.a>
          <button
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="rounded-sm border border-border p-2 text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-void/95 px-6 pt-2 pb-5 lg:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 font-display text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#sponsors"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-sm px-4 py-2.5 text-center font-display text-[0.7rem] tracking-[0.22em] text-primary-foreground uppercase"
            style={{ background: "var(--gradient-emerald)" }}
          >
            Apply with Devfolio
          </a>
        </div>
      )}
    </header>
  );
}
