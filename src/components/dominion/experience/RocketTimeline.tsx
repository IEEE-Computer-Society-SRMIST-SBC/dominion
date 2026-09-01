import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";
import { Clock, Sparkles, ChevronRight, AlertCircle } from "lucide-react";

useGLTF.preload("/spaceship.glb");

// ─── 3D Spaceship Centered On Node ─────────────────────────────────────────
function MiniRocket({
  scrollProgress,
  activeIndex,
  rocketScale,
}: {
  scrollProgress: any;
  activeIndex: number;
  rocketScale: number;
}) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/spaceship.glb");

  // Premium Material Enhancement: Sleek sci-fi metallic sheen and vibrant neon emissive
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat.metalness !== undefined) {
            mat.metalness = Math.max(mat.metalness, 0.85);
            mat.roughness = Math.min(mat.roughness, 0.26);
          }
          if (mat.emissive) {
            mat.emissiveIntensity = 2.2;
          }
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const p = Math.max(0, Math.min(1, scrollProgress.get() || 0));

    // Subtle flight banking on desktop
    const targetBank = rocketScale < 0.28 ? 0 : activeIndex % 2 === 0 ? 0.05 : -0.05;

    // Zero-g hover micro-motion
    const hoverY = Math.sin(t * (3 + p * 2)) * 0.035;
    const rollY = Math.sin(t * 1.6) * 0.02;

    group.current.position.y = hoverY;
    group.current.rotation.z = targetBank;
    group.current.rotation.y = rollY;
  });

  return (
    <group ref={group} scale={rocketScale}>
      {/* ─── Glowing Plasma Thruster Plume Flame ─── */}
      <group position={[0, 0.72, 0]}>
        {/* Outer Cyan Plasma Cone */}
        <mesh position={[0, 0.16, 0]}>
          <coneGeometry args={[0.14, 0.35, 20, 1, true]} />
          <meshBasicMaterial
            color="#00ffcc"
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Inner White Core Flame */}
        <mesh position={[0, 0.1, 0]}>
          <coneGeometry args={[0.075, 0.22, 16, 1, true]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* High-Tech Glowing Ion Core at Thruster Nozzle */}
      <mesh position={[0, 0.68, 0.05]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshBasicMaterial color="#a8fff2" />
      </mesh>

      {/* Layered Neon Green Thruster Halo Rings matching reference image */}
      <mesh position={[0, 0.7, 0]}>
        <ringGeometry args={[0.18, 0.25, 32]} />
        <meshBasicMaterial color="#01E864" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <ringGeometry args={[0.25, 0.31, 32]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Wingtip Navigation Lights */}
      <mesh position={[-0.46, 0.22, 0.04]}>
        <sphereGeometry args={[0.024, 12, 12]} />
        <meshBasicMaterial color="#00ffea" />
      </mesh>
      <pointLight position={[-0.46, 0.22, 0.05]} intensity={0.9} color="#00ffea" distance={1.2} />

      <mesh position={[0.46, 0.22, 0.04]}>
        <sphereGeometry args={[0.024, 12, 12]} />
        <meshBasicMaterial color="#01E864" />
      </mesh>
      <pointLight position={[0.46, 0.22, 0.05]} intensity={0.9} color="#01E864" distance={1.2} />

      {/* Nose Ion Beam Light cutting through the conduit */}
      <mesh position={[0, -0.74, 0.02]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color="#00ffaa" />
      </mesh>
      <pointLight position={[0, -0.74, 0.08]} intensity={1.5} color="#00ffaa" distance={1.8} />

      {/* 2D Plane 180° Flip: Nose points DOWN, engines at TOP */}
      <group rotation={[0, 0, Math.PI]}>
        {/* Original GLTF pitch: Cockpit and cyan neon trim face camera */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

// ─── Refined Gradual Exhaust Smoke & Spark Particles (Billowing Upwards) ───
function MiniExhaust({
  scrollProgress,
  isMobile,
  rocketScale,
}: {
  scrollProgress: any;
  isMobile: boolean;
  rocketScale: number;
}) {
  const fumeCount = 45; // Reduced from 80 for cleaner, lighter smoke
  const sparkCount = 65;

  const fumesRef = useRef<THREE.InstancedMesh>(null!);
  const sparksRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const scaleFactor = rocketScale / 0.25;

  const fumes = useMemo(() => {
    return Array.from({ length: fumeCount }, () => ({
      position: new THREE.Vector3(0, -100, 0),
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: Math.random() * 0.7 + 0.35,
      scale: (Math.random() * 0.26 + 0.15) * scaleFactor,
    }));
  }, [fumeCount, scaleFactor]);

  const sparks = useMemo(() => {
    return Array.from({ length: sparkCount }, () => ({
      position: new THREE.Vector3(0, -100, 0),
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: Math.random() * 0.35 + 0.15,
      scale: (Math.random() * 0.09 + 0.04) * scaleFactor,
    }));
  }, [sparkCount, scaleFactor]);

  let nextFume = 0;
  let nextSpark = 0;

  useFrame((state, delta) => {
    if (!fumesRef.current || !sparksRef.current) return;

    const p = Math.max(0, Math.min(1, scrollProgress.get() || 0));
    // Refined gradual intensity
    const intensity = 0.2 + p * 0.75;

    // Thruster nozzle position at top (+Y) dynamically scaled
    const rY = 0.72 * scaleFactor + Math.sin(state.clock.elapsedTime * 3) * 0.035;
    // Tighter, cleaner column spread
    const spread = (isMobile ? 0.24 : 0.36) * scaleFactor * (0.65 + p * 0.45);

    // Controlled spawn rate: 1 fume per frame at idle, 2 during transit
    const spawnCount = Math.floor(0.8 + intensity * 1.4);

    // Spawn fumes billowing UPWARDS (+Y)
    for (let i = 0; i < spawnCount; i++) {
      const f = fumes[nextFume];
      f.position.set(
        (Math.random() - 0.5) * spread,
        rY,
        (Math.random() - 0.5) * spread
      );
      f.velocity.set(
        (Math.random() - 0.5) * (0.35 + p * 0.4) * scaleFactor,
        (1.5 + Math.random() * 1.6) * (0.8 + p * 0.4) * scaleFactor,
        (Math.random() - 0.5) * (0.35 + p * 0.4) * scaleFactor
      );
      f.scale = (Math.random() * 0.22 + 0.14) * scaleFactor * (0.75 + p * 0.65);
      f.life = f.maxLife * (0.75 + p * 0.35);
      nextFume = (nextFume + 1) % fumeCount;
    }

    // Spawn sparks shooting UPWARDS (+Y)
    const sparkSpawnCount = Math.floor(intensity * 1.8);
    for (let i = 0; i < sparkSpawnCount; i++) {
      const s = sparks[nextSpark];
      s.position.set(
        (Math.random() - 0.5) * (spread * 0.6),
        rY,
        (Math.random() - 0.5) * (spread * 0.6)
      );
      s.velocity.set(
        (Math.random() - 0.5) * (0.9 + p * 1.0) * scaleFactor,
        (2.4 + Math.random() * 2.8) * (0.8 + p * 0.4) * scaleFactor,
        (Math.random() - 0.5) * (0.9 + p * 1.0) * scaleFactor
      );
      s.scale = (Math.random() * 0.08 + 0.04) * scaleFactor * (0.75 + p * 0.6);
      s.life = s.maxLife;
      nextSpark = (nextSpark + 1) % sparkCount;
    }

    // Update fumes
    fumes.forEach((f, i) => {
      if (f.life > 0) {
        f.life -= delta;
        f.position.addScaledVector(f.velocity, delta);
        const lifeProgress = f.life / f.maxLife;
        dummy.position.copy(f.position);
        dummy.scale.setScalar(f.scale * (1.5 - lifeProgress * 0.5));
        dummy.updateMatrix();
        fumesRef.current.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.position.set(0, -100, 0);
        dummy.updateMatrix();
        fumesRef.current.setMatrixAt(i, dummy.matrix);
      }
    });
    fumesRef.current.instanceMatrix.needsUpdate = true;

    // Update sparks
    sparks.forEach((s, i) => {
      if (s.life > 0) {
        s.life -= delta;
        s.position.addScaledVector(s.velocity, delta);
        const lifeProgress = s.life / s.maxLife;
        dummy.position.copy(s.position);
        dummy.scale.setScalar(s.scale * lifeProgress);
        dummy.updateMatrix();
        sparksRef.current.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.position.set(0, -100, 0);
        dummy.updateMatrix();
        sparksRef.current.setMatrixAt(i, dummy.matrix);
      }
    });
    sparksRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={fumesRef} args={[undefined, undefined, fumeCount]}>
        <sphereGeometry args={[0.28, 8, 8]} />
        {/* Softer translucent ethereal smoke */}
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28} depthWrite={false} />
      </instancedMesh>
      <instancedMesh ref={sparksRef} args={[undefined, undefined, sparkCount]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color="#ffff00" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </instancedMesh>
    </>
  );
}

// ─── Dynamic Thruster Light with Plasma Micro-Flicker ──────────────────────
function DynamicEngineLight({
  scrollProgress,
  rocketScale,
}: {
  scrollProgress: any;
  rocketScale: number;
}) {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    if (!lightRef.current) return;
    const p = Math.max(0, Math.min(1, scrollProgress.get() || 0));
    const flicker = Math.sin(state.clock.elapsedTime * 18) * 0.25;
    lightRef.current.intensity = 3.2 + p * 4.5 + flicker;
  });

  const nozzleY = 0.72 * (rocketScale / 0.25);
  return <pointLight ref={lightRef} position={[0, nozzleY, 0]} color="#01E864" distance={7} />;
}

// ─── Timeline Data ─────────────────────────────────────────────────────────
interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  isImportant?: boolean;
}

const day1Events: TimelineEvent[] = [
  {
    id: "d1-01",
    time: "09:30 AM – 10:00 AM",
    title: "Participant Reporting & Registration",
    isImportant: true,
  },
  {
    id: "d1-02",
    time: "09:30 AM – 10:00 AM",
    title: "Arrival & Reception of HackerRank Officials and Guests",
  },
  {
    id: "d1-03",
    time: "10:00 AM – 10:05 AM",
    title: "Opening Address",
  },
  {
    id: "d1-04",
    time: "10:05 AM – 10:10 AM",
    title: "Welcome Address",
  },
  {
    id: "d1-05",
    time: "10:10 AM – 10:20 AM",
    title: "Introduction of Guests & HackerRank Officials",
  },
  {
    id: "d1-06",
    time: "10:20 AM – 11:00 AM",
    title: "Felicitation of Guests + Address",
  },
  {
    id: "d1-07",
    time: "11:00 AM – 11:20 AM",
    title: "Launch of Secretariat",
  },
  {
    id: "d1-08",
    time: "11:20 AM – 11:40 AM",
    title: "Sponsorship Promotion",
  },
  {
    id: "d1-09",
    time: "11:40 AM – 12:00 PM",
    title: "Buildathon Starts",
    isImportant: true,
  },
  {
    id: "d1-10",
    time: "12:00 PM – 01:00 PM",
    title: "Lunch",
    isImportant: true,
  },
  {
    id: "d1-11",
    time: "01:00 PM – 03:30 PM",
    title: "Comeback + Judging",
    isImportant: true,
  },
  {
    id: "d1-12",
    time: "03:30 PM – 05:15 PM",
    title: "Buildathon Development Continues Based on Review Feedback",
    isImportant: true,
  },
  {
    id: "d1-13",
    time: "After 05:15 PM",
    title: "Announcement of Shortlisted Teams for Round 2",
    isImportant: true,
  },
];

const day2Events: TimelineEvent[] = [
  {
    id: "d2-01",
    time: "09:30 AM – 10:00 AM",
    title: "Participant Reporting & Team Check-In",
    isImportant: true,
  },
  {
    id: "d2-02",
    time: "10:00 AM – 10:20 AM",
    title: "Day 2 Opening & Briefing",
  },
  {
    id: "d2-03",
    time: "10:20 AM – 12:00 PM",
    title: "Round 2 Final Buildathon Phase Begins",
    isImportant: true,
  },
  {
    id: "d2-04",
    time: "12:00 PM – 12:30 PM",
    title: "Break & Final Preparation Time",
    isImportant: true,
  },
  {
    id: "d2-05",
    time: "12:30 PM – 01:30 PM",
    title: "Final Round Project Completion & Submission",
    isImportant: true,
  },
  {
    id: "d2-06",
    time: "01:30 PM – 02:45 PM",
    title: "Final Judging & Project Presentations",
    isImportant: true,
  },
  {
    id: "d2-07",
    time: "02:45 PM – 03:15 PM",
    title: "Judges' Deliberation & Final Evaluation",
  },
  {
    id: "d2-08",
    time: "03:15 PM – 03:30 PM",
    title: "Announcement of Final Results",
    isImportant: true,
  },
  {
    id: "d2-09",
    time: "03:30 PM Onwards",
    title: "DOMAINION 2026 Official Culmination",
    isImportant: true,
  },
];

export default function RocketTimeline() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const trackRef = useRef<HTMLDivElement>(null);

  const currentEvents = activeDay === 1 ? day1Events : day2Events;

  const [activeMilestone, setActiveMilestone] = useState(0);
  const [trackBounds, setTrackBounds] = useState({ firstY: 36, totalHeight: 400 });

  // Spring physics for rocket vertical pixel position
  const rocketYMotion = useMotionValue(36);
  const rocketYSpring = useSpring(rocketYMotion, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.5,
  });

  // Spring physics for progress float (0 to 1) for exhaust smoke
  const progressMotion = useMotionValue(0);
  const smoothProgress = useSpring(progressMotion, {
    stiffness: 100,
    damping: 22,
    restDelta: 0.001,
  });

  // Query actual DOM circle elements to lock the center of the rocket exactly on each node
  const updateRocketPosition = useCallback(() => {
    if (!trackRef.current) return;
    const circles = trackRef.current.querySelectorAll<HTMLElement>("[data-timeline-circle]");
    if (circles.length === 0) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    const focusY = vh * 0.5;

    // Track bounds for laser rail
    const firstCircleRect = circles[0].getBoundingClientRect();
    const lastCircleRect = circles[circles.length - 1].getBoundingClientRect();
    const firstY = Math.max(0, firstCircleRect.top - trackRect.top + firstCircleRect.height / 2);
    const lastY = Math.max(firstY, lastCircleRect.top - trackRect.top + lastCircleRect.height / 2);
    setTrackBounds({ firstY, totalHeight: Math.max(0, lastY - firstY) });

    // Find closest circle to screen center
    let closestIdx = 0;
    let minDistance = Infinity;

    circles.forEach((circle, idx) => {
      const rect = circle.getBoundingClientRect();
      const circleCenterY = rect.top + rect.height / 2;
      const dist = Math.abs(circleCenterY - focusY);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    setActiveMilestone(closestIdx);

    // Exact pixel center of the circle relative to trackRef
    const activeCircle = circles[closestIdx];
    if (activeCircle) {
      const activeRect = activeCircle.getBoundingClientRect();
      const exactCenterY = activeRect.top - trackRect.top + activeRect.height / 2;
      if (!isNaN(exactCenterY) && exactCenterY > 0) {
        rocketYMotion.set(exactCenterY);
      }
    }

    const p = circles.length > 1 ? closestIdx / (circles.length - 1) : 0;
    progressMotion.set(p);
  }, [rocketYMotion, progressMotion]);

  // Handle scroll, resize, and day toggle
  useEffect(() => {
    updateRocketPosition();
    const t1 = setTimeout(updateRocketPosition, 40);
    const t2 = setTimeout(updateRocketPosition, 150);
    const t3 = setTimeout(updateRocketPosition, 350);

    window.addEventListener("scroll", updateRocketPosition, { passive: true });
    window.addEventListener("resize", updateRocketPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateRocketPosition);
      window.removeEventListener("resize", updateRocketPosition);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeDay, updateRocketPosition]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const rocketScale = isMobile ? 0.24 : 0.36;

  // Active laser conduit illuminates up to the rocket center
  const activeLineHeight = useTransform(rocketYSpring, (y) => {
    const val = typeof y === "number" ? y : trackBounds.firstY;
    const h = Math.max(0, val - trackBounds.firstY);
    return `${h}px`;
  });

  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-[#030807] py-20 sm:py-28 border-y border-[#121f18]"
    >
      {/* Sci-Fi Background Glow & Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(1,232,100,0.05)_0%,_transparent_75%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(1,232,100,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(1,232,100,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Subtle Metallic Border Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#01E864]/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#01E864]/25 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#01E864]/30 bg-[#01E864]/5 text-[#01E864] font-mono text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase mb-4"
          >
            <Sparkles className="w-3 h-3 text-[#01E864]" />
            MISSION PROTOCOL
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#E8FFF2] tracking-wider uppercase"
            style={{ textShadow: "0 0 25px rgba(1,232,100,0.25)" }}
          >
            EVENT TIMELINE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-[#8c9e94] max-w-xl mx-auto font-sans"
          >
            Chronological schedule for DOMINION 2026 across two days of intense innovation.
          </motion.p>
        </div>

        {/* Tactical Day Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <button
            type="button"
            onClick={() => setActiveDay(1)}
            className={`relative w-full sm:w-auto px-6 py-3.5 rounded-lg border transition-all duration-300 text-left sm:text-center flex items-center justify-between sm:justify-center gap-4 cursor-pointer ${
              activeDay === 1
                ? "bg-[#0a1811] border-[#01E864] shadow-[0_0_20px_rgba(1,232,100,0.25)] text-[#E8FFF2]"
                : "bg-[#060c09] border-[#15241b] text-[#76877d] hover:border-[#01E864]/40 hover:text-[#d3e5db]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-2.5 w-2.5 rounded-full ${
                  activeDay === 1
                    ? "bg-[#01E864] shadow-[0_0_8px_#01E864]"
                    : "bg-[#25392d]"
                }`}
              />
              <div>
                <p className="font-display text-xs sm:text-sm font-bold tracking-wider">
                  DAY 01 // 2ND SEPT 2026
                </p>
                <p className="font-mono text-[0.65rem] sm:text-xs text-[#01E864]/80 tracking-wider">
                  INAUGURATION & BUILDATHON PHASE 1
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 sm:hidden text-[#01E864]/60" />
          </button>

          <button
            type="button"
            onClick={() => setActiveDay(2)}
            className={`relative w-full sm:w-auto px-6 py-3.5 rounded-lg border transition-all duration-300 text-left sm:text-center flex items-center justify-between sm:justify-center gap-4 cursor-pointer ${
              activeDay === 2
                ? "bg-[#0a1811] border-[#01E864] shadow-[0_0_20px_rgba(1,232,100,0.25)] text-[#E8FFF2]"
                : "bg-[#060c09] border-[#15241b] text-[#76877d] hover:border-[#01E864]/40 hover:text-[#d3e5db]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-2.5 w-2.5 rounded-full ${
                  activeDay === 2
                    ? "bg-[#01E864] shadow-[0_0_8px_#01E864]"
                    : "bg-[#25392d]"
                }`}
              />
              <div>
                <p className="font-display text-xs sm:text-sm font-bold tracking-wider">
                  DAY 02 // 3RD SEPT 2026
                </p>
                <p className="font-mono text-[0.65rem] sm:text-xs text-[#01E864]/80 tracking-wider">
                  FINAL BUILDATHON, JUDGING & RESULTS
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 sm:hidden text-[#01E864]/60" />
          </button>
        </div>

        {/* Tactical Legend Bar */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mb-10 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#7e9086]">
            <span className="h-2 w-2 rounded-full bg-[#01E864] shadow-[0_0_6px_#01E864]" />
            <span>Ceremony & Protocol</span>
          </div>
          <div className="flex items-center gap-2 text-[#ffc107]">
            <span className="h-2 w-2 rounded-full bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
            <span className="font-bold">Participant Milestones</span>
          </div>
        </div>

        {/* Day 2 Notice Banner */}
        {activeDay === 2 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 mx-auto max-w-xl p-3.5 rounded-md bg-[#161205] border border-[#ffb000]/40 text-[#ffc107] text-xs font-mono text-center tracking-wide flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-[#ffc107] shrink-0" />
            <span>Only shortlisted teams from Day 1 report on Day 2.</span>
          </motion.div>
        )}

        {/* ─── Persistent Track Container (Housing Rocket & Conduit) ─── */}
        <div ref={trackRef} className="relative">
          {/* Base Laser Conduit Rail: Connects Circle 0 to Circle N-1 */}
          <div
            className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-[#122319]"
            style={{
              top: `${trackBounds.firstY}px`,
              height: `${trackBounds.totalHeight}px`,
            }}
          >
            {/* Active Glowing Conduit fill tracking up to the Rocket */}
            <motion.div
              className="w-full bg-gradient-to-b from-[#01E864] to-[#01E864] shadow-[0_0_12px_#01E864]"
              style={{ height: activeLineHeight }}
            />
          </div>

          {/* ─── Persistent 3D Rocket Gliding Along The Line ─── */}
          <motion.div
            className="absolute pointer-events-none z-30 left-4 sm:left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 flex items-center justify-center"
            style={{
              top: useTransform(rocketYSpring, (y) => `${typeof y === "number" ? y : 36}px`),
            }}
          >
            {/* Ambient Radial Energy Aura behind the spacecraft */}
            <div className="absolute inset-x-2 inset-y-4 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(1,232,100,0.22)_0%,_rgba(0,255,200,0.08)_45%,_transparent_75%)] blur-lg pointer-events-none" />
            <Canvas
              camera={{ position: [0, 0, 4.6], fov: 45 }}
              gl={{ alpha: true, antialias: true }}
            >
              <ambientLight intensity={0.55} />
              {/* Studio Key Specular Light */}
              <directionalLight position={[3, 4, 4]} intensity={2.2} color="#ffffff" />
              {/* Sci-Fi Cyan Edge Rim Light - Highlights Metallic Wing Bevels */}
              <pointLight position={[-3, 1, 2]} intensity={3.5} color="#00ffcc" distance={8} />
              {/* Emerald Laser Line Glow Fill */}
              <directionalLight position={[0, -3, 2]} intensity={0.8} color="#01E864" />
              <DynamicEngineLight scrollProgress={smoothProgress} rocketScale={rocketScale} />
              <React.Suspense fallback={null}>
                <MiniRocket
                  scrollProgress={smoothProgress}
                  activeIndex={activeMilestone}
                  rocketScale={rocketScale}
                />
                <MiniExhaust
                  scrollProgress={smoothProgress}
                  isMobile={isMobile}
                  rocketScale={rocketScale}
                />
              </React.Suspense>
            </Canvas>
          </motion.div>

          {/* ─── Day 1 / Day 2 Event Cards (Animated with AnimatePresence) ─── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative"
            >
              <div className="space-y-6 sm:space-y-8">
                {currentEvents.map((event, index) => {
                  const isEven = index % 2 === 0;
                  const isImportant = !!event.isImportant;
                  const isCurrent = activeMilestone === index;
                  const isPassed = activeMilestone > index;

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                      className={`relative flex items-center ${
                        isEven
                          ? "md:flex-row-reverse md:justify-end"
                          : "md:flex-row md:justify-end"
                      } justify-start`}
                    >
                      {/* Milestone Marker Node (Circle) */}
                      <div
                        data-timeline-circle={index}
                        className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
                      >
                        <div
                          className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                            isCurrent
                              ? isImportant
                                ? "h-8 w-8 sm:h-9 sm:w-9 border-[#ffb000] bg-[#241a05] shadow-[0_0_24px_#ffb000,0_0_10px_#ffb000] scale-110"
                                : "h-8 w-8 sm:h-9 sm:w-9 border-[#01E864] bg-[#0c2416] shadow-[0_0_24px_#01E864,0_0_10px_#01E864] scale-110"
                              : isPassed
                                ? isImportant
                                  ? "h-7 w-7 sm:h-8 sm:w-8 border-[#ffb000]/80 bg-[#140e03] shadow-[0_0_10px_rgba(255,176,0,0.3)]"
                                  : "h-7 w-7 sm:h-8 sm:w-8 border-[#01E864]/80 bg-[#06140b] shadow-[0_0_10px_rgba(1,232,100,0.3)]"
                                : isImportant
                                  ? "h-7 w-7 sm:h-8 sm:w-8 border-[#543f11] bg-[#0b0903] opacity-60"
                                  : "h-7 w-7 sm:h-8 sm:w-8 border-[#1a2d21] bg-[#050e09] opacity-60"
                          }`}
                        >
                          <div
                            className={`rounded-full transition-all duration-300 ${
                              isCurrent
                                ? isImportant
                                  ? "h-3 w-3 bg-[#ffb000] shadow-[0_0_8px_#ffb000]"
                                  : "h-3 w-3 bg-[#01E864] shadow-[0_0_8px_#01E864]"
                                : isImportant
                                  ? "h-2 w-2 bg-[#ffb000]"
                                  : "h-2 w-2 bg-[#01E864]"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Milestone Card Content */}
                      <div
                        className={`ml-11 sm:ml-16 md:ml-0 w-full md:w-[calc(50%-2.75rem)] lg:w-[calc(50%-3.5rem)] ${
                          isEven ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                        }`}
                      >
                        <div
                          className={`group relative overflow-hidden rounded-lg border p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                            isCurrent
                              ? isImportant
                                ? "border-[#ffb000] bg-[#110d04] shadow-[0_0_30px_rgba(255,176,0,0.3),inset_0_0_15px_rgba(255,176,0,0.08)]"
                                : "border-[#01E864] bg-[#08150e] shadow-[0_0_30px_rgba(1,232,100,0.25),inset_0_0_15px_rgba(1,232,100,0.06)]"
                              : isImportant
                                ? "border-[#45330e] bg-[#0b0903]/95 hover:border-[#ffb000]/80 hover:shadow-[0_0_25px_rgba(255,176,0,0.22)]"
                                : "border-[#16291e] bg-[#060e0a]/90 hover:border-[#01E864]/60 hover:shadow-[0_0_25px_rgba(1,232,100,0.15)]"
                          }`}
                          style={{
                            boxShadow: isCurrent
                              ? undefined
                              : isImportant
                                ? "inset 1px 1px 2px rgba(255,200,50,0.05), 0 4px 15px rgba(0,0,0,0.8)"
                                : "inset 1px 1px 2px rgba(255,255,255,0.03), 0 4px 15px rgba(0,0,0,0.7)",
                          }}
                        >
                          {/* Hardware Corner Rivets */}
                          <div
                            className={`absolute top-2 left-2 h-1 w-1 rounded-full ${
                              isImportant ? "bg-[#543f11]" : "bg-[#203828]"
                            }`}
                          />
                          <div
                            className={`absolute top-2 right-2 h-1 w-1 rounded-full ${
                              isImportant ? "bg-[#543f11]" : "bg-[#203828]"
                            }`}
                          />
                          <div
                            className={`absolute bottom-2 left-2 h-1 w-1 rounded-full ${
                              isImportant ? "bg-[#543f11]" : "bg-[#203828]"
                            }`}
                          />
                          <div
                            className={`absolute bottom-2 right-2 h-1 w-1 rounded-full ${
                              isImportant ? "bg-[#543f11]" : "bg-[#203828]"
                            }`}
                          />

                          {/* Scanline Texture */}
                          <div
                            className={`absolute inset-0 pointer-events-none rounded-lg ${
                              isImportant
                                ? "bg-[linear-gradient(rgba(255,176,0,0.02)_1px,transparent_1px)] bg-[size:100%_4px]"
                                : "bg-[linear-gradient(rgba(1,232,100,0.015)_1px,transparent_1px)] bg-[size:100%_4px]"
                            }`}
                          />

                          {/* Top Row: Time Badge & Milestone Number (KEY & ACTIVE Badges Removed) */}
                          <div className="relative z-10 flex items-center justify-between gap-2 mb-2 flex-wrap">
                            <div
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border ${
                                isImportant
                                  ? "bg-[#221703] border-[#ffb000]/40 shadow-[0_0_10px_rgba(255,176,0,0.18)]"
                                  : "bg-[#0b1c12] border-[#01E864]/30 shadow-[0_0_8px_rgba(1,232,100,0.12)]"
                              }`}
                            >
                              <Clock
                                className={`w-3 h-3 shrink-0 ${
                                  isImportant ? "text-[#ffc107]" : "text-[#01E864]"
                                }`}
                              />
                              <span
                                className={`font-mono text-xs sm:text-[0.8rem] font-bold tracking-wider ${
                                  isImportant ? "text-[#ffc107]" : "text-[#01E864]"
                                }`}
                              >
                                {event.time}
                              </span>
                            </div>

                            <span
                              className={`font-mono text-[0.65rem] sm:text-xs font-bold transition-colors ${
                                isCurrent
                                  ? isImportant
                                    ? "text-[#ffc107]"
                                    : "text-[#01E864]"
                                  : isImportant
                                    ? "text-[#6e531c] group-hover:text-[#ffc107]/80"
                                    : "text-[#3d5346] group-hover:text-[#01E864]/60"
                              }`}
                            >
                              #{String(index + 1).padStart(2, "0")}
                            </span>
                          </div>

                          {/* Event Title */}
                          <h3
                            className={`relative z-10 font-display text-sm sm:text-base font-bold tracking-wide leading-snug transition-colors ${
                              isCurrent
                                ? "#ffffff"
                                : isImportant
                                  ? "text-[#FFF8E7] group-hover:text-[#ffffff]"
                                  : "text-[#E8FFF2] group-hover:text-[#ffffff]"
                            }`}
                            style={
                              isCurrent
                                ? {
                                    textShadow: isImportant
                                      ? "0 0 16px rgba(255,176,0,0.4)"
                                      : "0 0 16px rgba(1,232,100,0.4)",
                                  }
                                : isImportant
                                  ? { textShadow: "0 0 12px rgba(255,176,0,0.2)" }
                                  : undefined
                            }
                          >
                            {event.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
