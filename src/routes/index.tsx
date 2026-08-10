import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import CinematicExperience from "@/components/dominion/experience/CinematicExperience";
import Navbar from "@/components/dominion/Navbar";
import Hero from "@/components/dominion/Hero";
import {
  Highlights,
  Tracks,
  Sponsors,
  Venues,
  Contact,
  Footer,
} from "@/components/dominion/Sections";
import RocketTimeline from "@/components/dominion/experience/RocketTimeline";

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
  const [introDone, setIntroDone] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Temporarily forcing intro to show on every reload for testing
    setShowIntro(true);
    // sessionStorage.setItem("dominion-intro", "1");

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
  }, [introDone]);

  return (
    <div className="min-h-screen bg-void">
      {showIntro && !introDone && <CinematicExperience onComplete={() => setIntroDone(true)} />}
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <Tracks />
        <Sponsors />
        <RocketTimeline />
        <Venues />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
