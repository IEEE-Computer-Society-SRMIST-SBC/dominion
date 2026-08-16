import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, motion, useTransform } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/spaceship.glb");

// ─── Procedural Stylized Rocket ────────────────────────────────────────────
function Rocket({ scrollY }: { scrollY: any }) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/spaceship.glb");

  useFrame((state, delta) => {
    if (!group.current) return;
    const progress = scrollY.get(); // 0 to 1
    
    // Base floating animation
    const floatY = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    
    // If progress approaches 1 (breakthrough), blast off
    const blastOff = progress > 0.95 ? (progress - 0.95) * 500 : 0;
    
    // Speed up as it goes up
    const accProgress = Math.pow(progress, 2);
    
    group.current.position.y = -2 + (accProgress * 4) + floatY + blastOff;
    group.current.rotation.x = Math.PI / 2; // Face up (pitch up 90 degrees)
    group.current.rotation.y = 0; // Rotated by 180 degrees as requested
    group.current.rotation.z = 0; // Keep it perfectly vertical
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const rocketScale = isMobile ? 0.15 : 0.3;

  return (
    <group ref={group} scale={rocketScale}>
      <primitive object={scene} />
    </group>
  );
}

// ─── Exhaust Particles ─────────────────────────────────────────────────────
function Exhaust({ scrollY }: { scrollY: any }) {
  const fumeCount = 150;
  const sparkCount = 150;
  
  const fumesRef = useRef<THREE.InstancedMesh>(null!);
  const sparksRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const fumes = useMemo(() => {
    return Array.from({ length: fumeCount }, () => ({
      position: new THREE.Vector3(0, -100, 0), // hide initially
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: Math.random() * 0.8 + 0.4,
      scale: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  const sparks = useMemo(() => {
    return Array.from({ length: sparkCount }, () => ({
      position: new THREE.Vector3(0, -100, 0),
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: Math.random() * 0.4 + 0.2,
      scale: Math.random() * 0.1 + 0.05,
    }));
  }, []);

  let nextFume = 0;
  let nextSpark = 0;

  useFrame((state, delta) => {
    if (!fumesRef.current || !sparksRef.current) return;
    
    const progress = scrollY.get();
    const isMoving = progress < 0.99; // Spawn as long as we haven't reached the very end
    
    // Spawn more particles as it speeds up, but keep a base idle amount
    const intensity = Math.max(0.8, progress * 4);
    
    // Spawn new particles if moving
    if (isMoving) {
      const blastOff = progress > 0.95 ? (progress - 0.95) * 500 : 0;
      const accProgress = Math.pow(progress, 2);
      const rY = -2 + (accProgress * 4) + Math.sin(state.clock.elapsedTime * 2) * 0.1 + blastOff;
      
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const offset = isMobile ? 0.6 : 1.2;
      const spread = isMobile ? 0.75 : 1.5;

      // Spawn Fumes
      for (let i = 0; i < Math.floor(2 * intensity); i++) {
        const p = fumes[nextFume];
        p.position.set((Math.random() - 0.5) * spread, rY - offset, (Math.random() - 0.5) * spread);
        p.velocity.set((Math.random() - 0.5) * 1.0, -1.5 - Math.random() * 2.0, (Math.random() - 0.5) * 1.0);
        p.life = p.maxLife;
        nextFume = (nextFume + 1) % fumeCount;
      }

      // Spawn Sparks
      for (let i = 0; i < Math.floor(3 * intensity); i++) {
        const p = sparks[nextSpark];
        p.position.set((Math.random() - 0.5) * spread, rY - offset, (Math.random() - 0.5) * spread);
        p.velocity.set((Math.random() - 0.5) * 3, -4 - Math.random() * 5, (Math.random() - 0.5) * 3);
        p.life = p.maxLife;
        nextSpark = (nextSpark + 1) % sparkCount;
      }
    }

    // Update fumes
    fumes.forEach((p, i) => {
      if (p.life > 0) {
        p.life -= delta;
        p.position.addScaledVector(p.velocity, delta);
        const lifeProgress = p.life / p.maxLife;
        dummy.position.copy(p.position);
        dummy.scale.setScalar(p.scale * (1.5 - lifeProgress)); // Fumes grow
        dummy.updateMatrix();
        fumesRef.current.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.position.set(0, -100, 0); // hide
        dummy.updateMatrix();
        fumesRef.current.setMatrixAt(i, dummy.matrix);
      }
    });
    fumesRef.current.instanceMatrix.needsUpdate = true;

    // Update sparks
    sparks.forEach((p, i) => {
      if (p.life > 0) {
        p.life -= delta;
        p.position.addScaledVector(p.velocity, delta);
        const lifeProgress = p.life / p.maxLife;
        dummy.position.copy(p.position);
        dummy.scale.setScalar(p.scale * lifeProgress); // Sparks shrink
        dummy.updateMatrix();
        sparksRef.current.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.position.set(0, -100, 0); // hide
        dummy.updateMatrix();
        sparksRef.current.setMatrixAt(i, dummy.matrix);
      }
    });
    sparksRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={fumesRef} args={[undefined, undefined, fumeCount]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} depthWrite={false} />
      </instancedMesh>
      <instancedMesh ref={sparksRef} args={[undefined, undefined, sparkCount]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#ffff00" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </instancedMesh>
    </>
  );
}

// ─── Scene Setup ───────────────────────────────────────────────────────────
function Scene({ scrollY, activeMilestone }: { scrollY: any; activeMilestone: number }) {
  const { camera } = useThree();
  const shakeRef = useRef(0);
  const prevMilestone = useRef(activeMilestone);

  useEffect(() => {
    if (activeMilestone !== prevMilestone.current && activeMilestone > -1) {
      shakeRef.current = 0.5; // Trigger shake on new milestone
      prevMilestone.current = activeMilestone;
    }
  }, [activeMilestone]);

  useFrame((state, delta) => {
    // Shift camera on mobile so rocket appears on the right
    const isMobile = window.innerWidth < 768;
    const targetX = isMobile ? -1.0 : 0;

    if (shakeRef.current > 0) {
      const shake = shakeRef.current;
      camera.position.x = targetX + (Math.random() - 0.5) * shake;
      camera.position.y = (Math.random() - 0.5) * shake;
      shakeRef.current -= delta * 2;
    } else {
      camera.position.x += (targetX - camera.position.x) * delta * 5;
      camera.position.y = 0;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, -2, 0]} intensity={5} color="#01E864" distance={10} />
      
      <Rocket scrollY={scrollY} />
      <Exhaust scrollY={scrollY} />
    </>
  );
}

// ─── Milestones Data ───────────────────────────────────────────────────────
const milestones = [
  { num: "01", title: "IGNITION", desc: "Registration Opens", date: "12 AUG — 18 AUG" },
  { num: "02", title: "LIFTOFF", desc: "Team Formation", date: "19 AUG — 25 AUG" },
  { num: "03", title: "ASCENT", desc: "Hackathon Begins", date: "02 SEPT (00:00)" },
  { num: "04", title: "ORBIT", desc: "Submission & Evaluation", date: "03 SEPT (12:00)" },
  { num: "05", title: "FINAL DESCENT", desc: "Finals & Judging", date: "03 SEPT (16:00)" },
  { num: "06", title: "DOMINION", desc: "Winners Announced", date: "03 SEPT (19:00)" },
];

// ─── HTML Overlay Component ────────────────────────────────────────────────
export default function RocketTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [active, setActive] = useState(-1);

  // Update active milestone based on scroll
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      // 6 milestones distributed across 0.1 to 0.8 scroll range
      if (v < 0.1) setActive(-1);
      else if (v < 0.25) setActive(0);
      else if (v < 0.4) setActive(1);
      else if (v < 0.55) setActive(2);
      else if (v < 0.7) setActive(3);
      else if (v < 0.85) setActive(4);
      else setActive(5);
    });
  }, [scrollYProgress]);

  // Breakthrough flash animation
  const flashOpacity = useTransform(scrollYProgress, [0.93, 0.96, 1], [0, 1, 0]);
  const endScreenOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative bg-[#030807]" style={{ height: "700vh" }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <React.Suspense fallback={null}>
              <Scene scrollY={scrollYProgress} activeMilestone={active} />
            </React.Suspense>
          </Canvas>
        </div>

        {/* UI Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none flex">
          
          {/* Left Side: Trajectory & Milestones */}
          <div className="relative w-[90%] md:w-1/2 h-full flex flex-col justify-center pl-6 sm:pl-10 md:pl-24">
            
            {/* Illuminated Energy Conduit (Metallic Rail) */}
            <div className="absolute left-[32px] sm:left-[48px] md:left-[104px] top-0 bottom-0 w-[8px] rounded-full border-x border-[#0c0d10] bg-[#111317] shadow-[inset_1px_1px_4px_rgba(0,0,0,0.9),0_0_5px_rgba(0,0,0,0.5)] overflow-hidden">
              <motion.div 
                className="w-full bg-[#01E864] origin-top opacity-80"
                style={{ 
                  height: "100%", 
                  scaleY: useTransform(scrollYProgress, [0, 0.9], [0, 1]),
                  boxShadow: "0 0 15px #01E864, inset 0 0 5px #ffffff"
                }}
              />
            </div>

            {/* Initial State text (top) */}
            <motion.div 
              className="absolute top-10 left-6 sm:left-10 md:left-24 font-mono text-[0.6rem] font-bold tracking-[0.2em] text-[#01E864]"
              style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]), textShadow: "0 0 8px rgba(1,232,100,0.5)" }}
            >
              <p>T−00:00:00</p>
              <p>SYSTEMS ONLINE</p>
            </motion.div>

            <div className="flex flex-col gap-10 sm:gap-16">
              {milestones.map((m, i) => {
                const isActive = active === i;
                const isPassed = active > i;
                return (
                  <div key={m.num} className="relative flex items-center gap-6">
                    
                    {/* Tactile Mechanical Indicator */}
                    <div 
                      className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                        isActive || isPassed 
                          ? "border-[#01E864] bg-[#0c1811] shadow-[0_0_15px_rgba(1,232,100,0.4),inset_0_0_8px_rgba(1,232,100,0.4)]" 
                          : "border-[#2a2d34] bg-[#1c1e22] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8),1px_1px_2px_rgba(255,255,255,0.05)]"
                      }`}
                    >
                      <div className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                        isActive 
                          ? "bg-[#01E864] shadow-[0_0_10px_#01E864,inset_1px_1px_2px_#ffffff]" 
                          : isPassed 
                            ? "bg-[#0A3D29]"
                            : "bg-[#111317] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8)]"
                      }`} />
                    </div>

                    {/* Milestone Card */}
                    <motion.div 
                      className={`relative font-display uppercase transition-all duration-500 ${isActive ? "opacity-100" : "opacity-40"}`}
                      initial={{ x: -20 }}
                      animate={{ x: isActive ? 0 : -10 }}
                    >
                      <p 
                        className={`text-[0.65rem] font-bold tracking-[0.35em] ${isActive ? "text-[#01E864]" : "text-[#5b6860]"}`}
                        style={{ textShadow: isActive ? "0 0 8px rgba(1,232,100,0.4)" : "1px 1px 1px rgba(0,0,0,0.8)" }}
                      >
                        {m.num} — {m.title}
                      </p>
                      
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }} 
                          animate={{ opacity: 1, scale: 1 }} 
                          className="mt-4 relative overflow-hidden rounded-lg p-5 flex flex-col gap-2"
                          style={{ 
                            background: "linear-gradient(145deg, #181d1a 0%, #0d120f 100%)",
                            borderTop: "2px solid #2a352e",
                            borderLeft: "2px solid #2a352e",
                            borderBottom: "2px solid #050806",
                            borderRight: "2px solid #050806",
                            boxShadow: "10px 10px 20px rgba(0,0,0,0.9), -1px -1px 5px rgba(255,255,255,0.02), inset 1px 1px 2px rgba(1,232,100,0.1), inset -1px -1px 5px rgba(0,0,0,0.8), 0 0 30px rgba(1,232,100,0.05)"
                          }}
                        >
                          {/* Hardware Screws */}
                          <div className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
                          <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
                          <div className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />
                          <div className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full border border-[#000]" style={{ background: "radial-gradient(circle, #444 20%, #111 90%)", boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.2)" }} />

                          {/* Recessed Screen */}
                          <div className="relative mt-2 p-4 rounded bg-[#030604] border border-[#111]" style={{ boxShadow: "inset 3px 3px 10px rgba(0,0,0,0.9), inset -1px -1px 2px rgba(255,255,255,0.03)" }}>
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(1,232,100,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(1,232,100,0.03)_1px,transparent_1px)] bg-[size:4px_4px] pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                            
                            <div className="mb-3 flex items-center justify-between">
                              <span className="font-mono text-[0.55rem] tracking-[0.2em] text-[#01E864] uppercase opacity-70">● SYSTEM ACTIVE</span>
                            </div>
                            
                            <p className="font-display text-lg tracking-widest text-[#E8FFF2]" style={{ textShadow: "0 0 10px rgba(1,232,100,0.5)" }}>{m.desc}</p>
                            <p className="mt-2 font-mono text-[0.65rem] font-bold tracking-[0.25em] text-[#01E864]">{m.date}</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>



      </div>
    </section>
  );
}
