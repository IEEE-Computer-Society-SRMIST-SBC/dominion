import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "@/components/dominion/Navbar";
import DiscordFloatingWidget from "@/components/dominion/DiscordFloatingWidget";
import WhatsAppFloatingWidget from "@/components/dominion/WhatsAppFloatingWidget";
import Hero from "@/components/dominion/Hero";
import {
  Highlights,
  Tracks,
  Sponsors,
  Partners,
  Venues,
  Contact,
  Footer,
} from "@/components/dominion/Sections";

const CinematicExperience = lazy(
  () => import("@/components/dominion/experience/CinematicExperience")
);
const RocketTimeline = lazy(() => import("@/components/dominion/experience/RocketTimeline"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DOMINION 2026 — Hybrid Buildathon | HackerRank Campus Crew SRMIST" },
      {
        name: "description",
        content:
          "DOMINION: a hybrid buildathon by HackerRank Campus Crew SRMIST × IEEE Computer Society. Sept 2–3, 2026 at SRM KTR Campus & online. Build · Innovate · Dominate.",
      },
      { property: "og:title", content: "DOMINION 2026 — Hybrid Buildathon at SRMIST" },
      {
        property: "og:description",
        content:
          "48 hours. Four tracks. AI/ML, Blockchain, Hardware/IoT and Open Innovation. Register for DOMINION, Sept 2–3, 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("dominion-intro") === "1";
    if (!hasSeenIntro) {
      setShowIntro(true);
      setIntroDone(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const isIntroActive = showIntro && !introDone;
    document.body.style.overflow = isIntroActive ? "hidden" : "";

    if (showIntro && introDone) {
      sessionStorage.setItem("dominion-intro", "1");
    }
  }, [introDone, showIntro]);

  return (
    <div className="min-h-screen bg-void">
      {showIntro && !introDone && (
        <Suspense fallback={null}>
          <CinematicExperience onComplete={() => setIntroDone(true)} />
        </Suspense>
      )}
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <Tracks />
        <Sponsors />
        <Partners />
        <Suspense fallback={null}>
          <RocketTimeline />
        </Suspense>
        <Venues />
        <Contact />
      </main>
      <Footer />
      <DiscordFloatingWidget />
      <WhatsAppFloatingWidget />
    </div>
  );
}
