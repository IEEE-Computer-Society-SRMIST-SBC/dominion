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
            <Scene scrollY={scrollYProgress} activeMilestone={active} />
          </Canvas>
        </div>

        {/* UI Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none flex">
          
          {/* Left Side: Trajectory & Milestones */}
          <div className="relative w-[90%] md:w-1/2 h-full flex flex-col justify-center pl-6 sm:pl-10 md:pl-24">
            {/* Glowing Trajectory Line */}
            <div className="absolute left-[23px] sm:left-[39px] md:left-[95px] top-0 bottom-0 w-[2px] bg-[#0A3D29]">
              <motion.div 
                className="w-full bg-[#01E864] origin-top"
                style={{ 
                  height: "100%", 
                  scaleY: useTransform(scrollYProgress, [0, 0.9], [0, 1]),
                  boxShadow: "0 0 10px #01E864"
                }}
              />
            </div>

            {/* Initial State text (top) */}
            <motion.div 
              className="absolute top-10 left-6 sm:left-10 md:left-24 font-display text-[0.6rem] tracking-[0.2em] text-[#01E864]"
              style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
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
                    {/* HUD Target Node */}
                    <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center">
                      <div className={`absolute h-full w-full border transition-colors duration-300 ${isActive || isPassed ? "border-[#01E864]" : "border-[#0A3D29]"}`} style={{ transform: "rotate(45deg)" }} />
                      {isActive && <div className="absolute h-2 w-2 bg-[#01E864]" style={{ transform: "rotate(45deg)", boxShadow: "0 0 10px #01E864" }} />}
                    </div>

                    {/* Milestone Card */}
                    <motion.div 
                      className={`relative font-display uppercase transition-all duration-500 ${isActive ? "opacity-100" : "opacity-30"}`}
                      initial={{ x: -20 }}
                      animate={{ x: isActive ? 0 : -10 }}
                    >
                      <p className={`text-[0.6rem] tracking-[0.3em] ${isActive ? "text-[#01E864]" : "text-[#6F8F7D]"}`}>
                        {m.num} — {m.title}
                      </p>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className="mt-3 border border-[#01E864]/40 bg-[#006B35]/20 p-4 backdrop-blur-sm"
                          style={{ boxShadow: "0 0 20px rgba(1, 232, 100, 0.1)" }}
                        >
                          <p className="text-sm tracking-widest text-[#E8FFF2]">{m.desc}</p>
                          <p className="mt-2 text-[0.55rem] tracking-[0.2em] text-[#01E864]">{m.date}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Breakthrough Flash */}
        <motion.div 
          className="absolute inset-0 z-40 bg-white"
          style={{ opacity: flashOpacity }}
        />

        {/* Final Screen */}
        <motion.div 
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#030807] text-center"
          style={{ opacity: endScreenOpacity, pointerEvents: active === 5 ? "auto" : "none" }}
        >
          <img src="/logo.png" alt="Dominion" className="mb-10 h-12 sm:h-16 object-contain" />
          <h2 className="font-display text-2xl sm:text-5xl font-black tracking-[0.1em] text-[#E8FFF2] leading-tight">
            THE FUTURE<br/>BELONGS TO<br/>THOSE WHO BUILD.
          </h2>
          <motion.a 
            href="#register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-16 pointer-events-auto border border-[#01E864] px-8 py-4 font-display text-sm tracking-[0.3em] text-[#01E864] transition-colors hover:bg-[#01E864] hover:text-[#030807]"
            style={{ boxShadow: "0 0 20px rgba(1, 232, 100, 0.2)" }}
          >
            [ ENTER ]
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
