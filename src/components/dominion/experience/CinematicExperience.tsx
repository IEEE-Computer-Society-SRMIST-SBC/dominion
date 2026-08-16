import { Suspense, useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Trail, Text3D, Center } from "@react-three/drei";
import { LightningStrike } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";

useGLTF.preload("/mjolnir_thors_hammer.glb");

// ─── Camera Rig ────────────────────────────────────────────────────────────
function CameraRig({ shakeRef }: { shakeRef: React.RefObject<number> }) {
  const { camera } = useThree();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const basePos = useRef(new THREE.Vector3(0, 0, isMobile ? 6 : 4));
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Flight
    gsap.fromTo(basePos.current, 
      { x: isMobile ? -0.5 : -1, y: -0.5, z: isMobile ? 4.5 : 2.5 },
      { x: 0, y: 0, z: isMobile ? 6.5 : 4.5, duration: 4.0, delay: 0.05, ease: "power1.inOut" }
    );

    // Impact Pullback
    gsap.to(basePos.current, {
      x: 0, y: 0.5, z: isMobile ? 9 : 7,
      duration: 3.0,
      ease: "expo.out",
      delay: 4.15
    });

    // Reveal Drift (t = 4.5)
    gsap.to(basePos.current, {
      y: 2.5,
      z: isMobile ? 10 : 8,
      duration: 6.0,
      ease: "power2.inOut",
      delay: 4.5
    });
    
    gsap.to(lookAtTarget.current, {
      y: 2,
      duration: 5.0,
      ease: "power2.inOut",
      delay: 4.5
    });
  }, [isMobile]);

  useFrame((_, delta) => {
    const shake = shakeRef.current ?? 0;
    if (shake > 0) {
      camera.position.set(
        basePos.current.x + (Math.random() - 0.5) * shake,
        basePos.current.y + (Math.random() - 0.5) * shake,
        basePos.current.z + (Math.random() - 0.5) * shake * 0.5
      );
      (shakeRef as React.MutableRefObject<number>).current = Math.max(0, shake - delta * 2.5);
    } else {
      camera.position.lerp(basePos.current, 0.1);
    }
    camera.lookAt(lookAtTarget.current);
  });
  return null;
}

// ─── Impact Debris ─────────────────────────────────────────────────────────
function ImpactDebris({ active }: { active: React.RefObject<boolean> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const count = 200;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.1) * 40,
        (Math.random() - 0.5) * 40 + 15
      ),
      rotation: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      rotSpeed: new THREE.Vector3((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15),
      scale: Math.random() * 0.2 + 0.05,
      active: false
    }));
  }, []);

  const hasExploded = useRef(false);

  useFrame((_, delta) => {
    if (active.current && !hasExploded.current) {
      hasExploded.current = true;
      particles.forEach(p => p.active = true);
    }
    if (!hasExploded.current) return;

    particles.forEach((p, i) => {
      if (!p.active) return;
      p.position.addScaledVector(p.velocity, delta);
      p.velocity.y -= 30 * delta; 
      p.velocity.multiplyScalar(0.94); 
      p.rotation.addScaledVector(p.rotSpeed, delta);
      p.scale = Math.max(0, p.scale - delta * 0.04); 
      dummy.position.copy(p.position);
      dummy.rotation.setFromVector3(p.rotation);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
    </instancedMesh>
  );
}

// ─── Procedural Lightning Arcs ─────────────────────────────────────────────
function LightningBolt({ color, extent }: { color: string; extent: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [strike] = useState(() => {
    return new LightningStrike({
      sourceOffset: new THREE.Vector3(0, 0, 0),
      destOffset: new THREE.Vector3(0, extent, 0),
      isEternal: true,
      timeScale: 3.0,
      roughness: 0.8,
      straightness: 0.2,
      radius0: 0.04,
      radius1: 0.04,
      maxIterations: 5,
      ramification: 0.1,
      maxSubrayRecursion: 2,
    });
  });

  const start = useMemo(() => new THREE.Vector3(), []);
  const end = useMemo(() => new THREE.Vector3(), []);
  const timer = useRef({ nextStrike: 0, offTime: 0, isVisible: false });

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (timer.current.isVisible) {
      if (t > timer.current.offTime) {
        timer.current.isVisible = false;
        meshRef.current.visible = false;
      } else {
        strike.update(t);
      }
    } else {
      if (t > timer.current.nextStrike) {
        timer.current.isVisible = true;
        meshRef.current.visible = true;
        start.set((Math.random() - 0.5) * extent, (Math.random() - 0.5) * extent, (Math.random() - 0.5) * extent);
        end.set((Math.random() - 0.5) * extent, (Math.random() - 0.5) * extent, (Math.random() - 0.5) * extent);
        strike.rayParameters.sourceOffset.copy(start);
        strike.rayParameters.destOffset.copy(end);
        timer.current.offTime = t + 0.1 + Math.random() * 0.2;
        timer.current.nextStrike = timer.current.offTime + 0.5 + Math.random() * 2.0;
      }
    }
  });

  return (
    <mesh ref={meshRef} geometry={strike} visible={false}>
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

// ─── Main Sequence Orchestrator ────────────────────────────────────────────
function SceneOrchestrator({ 
  shakeRef, flashRef, textMatRef, onShatter
}: any) {
  const { scene } = useGLTF("/mjolnir_thors_hammer.glb");
  const hammerGroup = useRef<THREE.Group>(null!);
  
  const trailActive = useRef(true);
  const explosionActive = useRef(false);
  const [showCage, setShowCage] = useState(false);

  useEffect(() => {
    const g = hammerGroup.current;
    if (!g) return;

    g.position.set(25, 20, -60);
    g.rotation.set(Math.PI / 2, 0, 0);
    g.scale.setScalar(0); 

    const tl = gsap.timeline();

    // 1. Pop-in
    tl.to(g.scale, { x: 1, y: 1, z: 1, duration: 0.01 }, 0.05);

    // 2. The Flight (Takes 3.95s to get close)
    tl.to(g.position, {
      x: 0, y: 2, z: 0,
      duration: 3.95,
      ease: "power3.inOut",
    }, 0.05);

    // 3. The Slam down (t = 4.00 to 4.15)
    tl.to(g.position, {
      y: -0.5, z: 1,
      duration: 0.15,
      ease: "power4.in",
    }, 4.00);

    // 4. The Impact Effects (t = 4.15s)
    tl.add(() => {
      if (shakeRef) (shakeRef as React.MutableRefObject<number>).current = 2.5; 
      explosionActive.current = true;
      trailActive.current = false;
      setShowCage(true);

      if (flashRef) {
        gsap.to(flashRef, { current: 1, duration: 0.05 }); 
        gsap.to(flashRef, { current: 0, duration: 1.2, delay: 0.1 }); 
      }
    }, 4.15);

    tl.to(g.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.05, ease: "power4.out" }, 4.15);
    tl.to(g.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 1.2, ease: "elastic.out(1, 0.2)" }, 4.20);
    tl.to(g.rotation, { x: -0.2, y: Math.PI * 0.2, z: 0.15, duration: 1.5, ease: "power3.out" }, 4.15);

    // 5. Fade text out fast right before shatter
    tl.to(textMatRef.current, { opacity: 0, duration: 0.1 }, 4.05); 
    
    // 6. Trigger the screen shatter at exactly the moment of impact (4.15s)
    tl.add(() => {
      if (onShatter) onShatter();
    }, 4.15);

    // Note: The hammer stays on screen! The background shattering handles the exit.
  }, []);

  useFrame(({ clock }) => {
    if (!hammerGroup.current) return;
    if (!trailActive.current) {
      hammerGroup.current.position.y += Math.sin(clock.elapsedTime * 1.5) * 0.05;
      hammerGroup.current.rotation.y += Math.sin(clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <>
      <ImpactDebris active={explosionActive} />
      <group ref={hammerGroup}>
        <Trail
          width={2.5}
          color="#2b8cff"
          length={40}
          decay={2}
          attenuation={(t) => t * t}
          transparent
          opacity={0.7}
        >
          <primitive object={scene} scale={0.003} />
        </Trail>

        {showCage && (
          <group>
            <LightningBolt color="#2b8cff" extent={3.5} />
            <LightningBolt color="#73b2ff" extent={3.0} />
            <LightningBolt color="#ffffff" extent={2.5} />
          </group>
        )}
      </group>
    </>
  );
}

// ─── Flash Plane ───────────────────────────────────────────────────────────
function FlashPlane({ opacityRef }: { opacityRef: React.RefObject<number> }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null!);
  useFrame(() => {
    if (matRef.current) matRef.current.opacity = opacityRef.current ?? 0;
  });
  return (
    <mesh position={[0, 0, 3]} renderOrder={999}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial ref={matRef} color="#ffffff" transparent opacity={0} depthTest={false} />
    </mesh>
  );
}

// ─── SHATTER SHARDS ────────────────────────────────────────────────────────
// 8 jagged polygons meeting at the center 50% 50% impact point
const SHARDS = [
  { clipPath: "polygon(0% 0%, 30% 0%, 50% 50%, 0% 40%)",   x: -150, y: -50,  r: -25 },
  { clipPath: "polygon(30% 0%, 70% 0%, 50% 50%)",          x: 0,    y: -200, r: 15 },
  { clipPath: "polygon(70% 0%, 100% 0%, 100% 30%, 50% 50%)", x: 150, y: -50,  r: 35 },
  { clipPath: "polygon(100% 30%, 100% 80%, 50% 50%)",      x: 200,  y: 50,   r: -15 },
  { clipPath: "polygon(100% 80%, 100% 100%, 60% 100%, 50% 50%)", x: 150, y: 150, r: 25 },
  { clipPath: "polygon(60% 100%, 20% 100%, 50% 50%)",      x: -50,  y: 200,  r: -35 },
  { clipPath: "polygon(20% 100%, 0% 100%, 0% 70%, 50% 50%)", x: -180, y: 150, r: 20 },
  { clipPath: "polygon(0% 70%, 0% 40%, 50% 50%)",          x: -200, y: 20,   r: -10 },
];

// ─── Main Export ───────────────────────────────────────────────────────────
export default function CinematicExperience({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [shattered, setShattered] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  
  const shakeRef = useRef(0);
  const flashRef = useRef(0);
  const textMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  const handleShatter = () => {
    setShattered(true);
    // Unmount a few seconds after the shatter
    setTimeout(() => {
      setVisible(false);
    }, 3900);
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          
          {/* Glass Shards Background */}
          {!shattered ? (
            <div className="absolute inset-0 bg-[#020305]" />
          ) : (
            SHARDS.map((shard, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 bg-[#020305]"
                style={{ clipPath: shard.clipPath }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ 
                  x: shard.x, 
                  y: shard.y + 1200, // Gravity pulls shards down
                  rotate: shard.r, 
                  opacity: 0 
                }}
                transition={{ duration: 3.5, ease: [0.42, 0, 1, 1] }} // Slow motion easeIn
              />
            ))
          )}

          {/* Canvas (Transparent) - Hammer drops along with the glass! */}
          <motion.div
            className="absolute inset-0"
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={shattered ? { y: 1000, opacity: 0, rotate: 5, scale: 0.9 } : { y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 3.5, ease: [0.42, 0, 1, 1] }} // Slow motion easeIn
          >
            <Canvas gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
              <fogExp2 attach="fog" args={["#020305", 0.04]} />

              <ambientLight intensity={0.1} />
              <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
              
              {/* Blue lights for Hammer */}
              <pointLight position={[0, -2, 2]} intensity={8} color="#2b8cff" distance={15} decay={2} />
              <pointLight position={[-3, 2, -3]} intensity={6} color="#73b2ff" distance={20} decay={2} />
              
              <Suspense fallback={null}>
                <CameraRig shakeRef={shakeRef} />
                <FlashPlane opacityRef={flashRef} />

                <Center position={[0, 4, -15]}>
                  <Text3D 
                    font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json" 
                    size={isMobile ? 0.8 : 1.5} height={0.4} curveSegments={12} 
                    bevelEnabled bevelThickness={0.05} bevelSize={0.02} bevelOffset={0} bevelSegments={5}
                    lineHeight={isMobile ? 1.2 : 1}
                  >
                    {isMobile ? "Once upon\na time\nin space." : "Once upon a time in space."}
                    <meshBasicMaterial ref={textMatRef} color="#ffffff" transparent opacity={1} />
                  </Text3D>
                </Center>

                <SceneOrchestrator 
                  shakeRef={shakeRef} flashRef={flashRef} textMatRef={textMatRef} onShatter={handleShatter}
                />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Skip button */}
          <button
            onClick={() => setVisible(false)}
            className="absolute right-5 bottom-5 z-[200] font-display text-[0.6rem] tracking-[0.35em] text-neutral-500 uppercase pointer-events-auto hover:text-[#00ff87]"
          >
            Skip
          </button>
        </div>
      )}
    </AnimatePresence>
  );
}
