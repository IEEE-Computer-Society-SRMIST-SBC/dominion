import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, motion, useTransform } from "framer-motion";
import * as THREE from "three";

// ─── Procedural Stylized Rocket ────────────────────────────────────────────
function Rocket({ scrollY }: { scrollY: any }) {
  const group = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!group.current) return;
    const progress = scrollY.get(); // 0 to 1
    
    // Base floating animation
    const floatY = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    const floatRot = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    
    // If progress approaches 1 (breakthrough), blast off
    const blastOff = progress > 0.95 ? (progress - 0.95) * 500 : 0;
    
    group.current.position.y = -2 + (progress * 4) + floatY + blastOff;
    group.current.rotation.z = floatRot;
    group.current.rotation.y += delta * 0.2; // Slowly spin
  });

  return (
    <group ref={group} scale={0.5}>
      {/* Main Body */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 3, 16]} />
        <meshStandardMaterial color="#c9d1cc" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Nose Cone */}
      <mesh position={[0, 3.5, 0]}>
        <coneGeometry args={[0.4, 1, 16]} />
        <meshStandardMaterial color="#00a83f" metalness={0.5} roughness={0.1} />
      </mesh>

      {/* Fins */}
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((rot, i) => (
        <group key={i} rotation={[0, rot, 0]}>
          <mesh position={[0.4, 0.3, 0]} rotation={[0, 0, -0.4]}>
            <boxGeometry args={[0.6, 0.8, 0.1]} />
            <meshStandardMaterial color="#006B35" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Engine Bell */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.5, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.4} />
      </mesh>
      
      {/* Engine Glow */}
      <mesh position={[0, -0.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#01E864" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// ─── Exhaust Particles ─────────────────────────────────────────────────────
function Exhaust({ scrollY }: { scrollY: any }) {
  const count = 100;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(0, -100, 0), // hide initially
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: Math.random() * 0.5 + 0.5,
      scale: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  let nextParticle = 0;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const progress = scrollY.get();
    const isMoving = progress > 0.01 && progress < 0.99;
    
    // Spawn new particles if moving
    if (isMoving) {
      for (let i = 0; i < 2; i++) {
        const p = particles[nextParticle];
        // Rocket position estimation (matches Rocket component)
        const blastOff = progress > 0.95 ? (progress - 0.95) * 500 : 0;
        const rY = -2 + (progress * 4) + Math.sin(state.clock.elapsedTime * 2) * 0.1 + blastOff;
        
        p.position.set((Math.random() - 0.5) * 0.2, rY - 0.5, (Math.random() - 0.5) * 0.2);
        p.velocity.set((Math.random() - 0.5) * 1, -2 - Math.random() * 2, (Math.random() - 0.5) * 1);
        p.life = p.maxLife;
        p.scale = Math.random() * 0.5 + 0.2;
        
        nextParticle = (nextParticle + 1) % count;
      }
    }

    // Update particles
    particles.forEach((p, i) => {
      if (p.life > 0) {
        p.life -= delta;
        p.position.addScaledVector(p.velocity, delta);
        p.scale *= 0.95; // Shrink over time
        dummy.position.copy(p.position);
        dummy.scale.setScalar(p.scale * (p.life / p.maxLife));
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.position.set(0, -100, 0); // hide
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial color="#01E864" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
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

  useFrame((_, delta) => {
    if (shakeRef.current > 0) {
      const shake = shakeRef.current;
      camera.position.x = (Math.random() - 0.5) * shake;
      camera.position.y = (Math.random() - 0.5) * shake;
      shakeRef.current -= delta * 2;
    } else {
      camera.position.x = 0;
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
          <div className="relative w-1/2 h-full flex flex-col justify-center pl-10 sm:pl-24">
            {/* Glowing Trajectory Line */}
            <div className="absolute left-[39px] sm:left-[95px] top-0 bottom-0 w-[2px] bg-[#0A3D29]">
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
              className="absolute top-10 left-10 sm:left-24 font-display text-[0.6rem] tracking-[0.2em] text-[#01E864]"
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
