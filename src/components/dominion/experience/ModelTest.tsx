import { Suspense, useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Trail, Text3D, Center } from "@react-three/drei";
import { LightningStrike } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";

useGLTF.preload("/mjolnir_thors_hammer.glb");

// ─── Camera Rig ────────────────────────────────────────────────────────────
function CameraRig({ shakeRef }: { shakeRef: React.RefObject<number> }) {
  const { camera } = useThree();
  const basePos = useRef(new THREE.Vector3(0, 0, 4));
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Flight
    gsap.fromTo(basePos.current, 
      { x: -1, y: -0.5, z: 2.5 },
      { x: 0, y: 0, z: 4.5, duration: 4.0, delay: 0.05, ease: "power1.inOut" }
    );

    // Impact Pullback
    gsap.to(basePos.current, {
      x: 0, y: 0.5, z: 7,
      duration: 3.0,
      ease: "expo.out",
      delay: 4.05
    });

    // Doom Reveal Drift (t = 4.5) - slowly drift up to see Doom
    gsap.to(basePos.current, {
      y: 2.5,
      z: 8,
      duration: 6.0,
      ease: "power2.inOut",
      delay: 4.5
    });
    
    // Look up at Doom
    gsap.to(lookAtTarget.current, {
      y: 2,
      duration: 5.0,
      ease: "power2.inOut",
      delay: 4.5
    });

  }, []);

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
  shakeRef, flashRef, textMatRef, greenWashRef, doomOpacityRef, logoRef, greenLightRef
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

    // 2. The Flight
    tl.to(g.position, {
      x: 0, y: 0, z: 0,
      duration: 4.0,
      ease: "power3.in",
    }, 0.05);

    // 3. The Impact (t = 4.05s)
    tl.add(() => {
      if (shakeRef) (shakeRef as React.MutableRefObject<number>).current = 1.8; 
      explosionActive.current = true;
      trailActive.current = false;
      setShowCage(true);

      if (flashRef) {
        gsap.to(flashRef, { current: 1, duration: 0.05 }); 
        gsap.to(flashRef, { current: 0, duration: 1.2, delay: 0.1 }); 
      }
    }, 4.05);

    tl.to(g.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.05, ease: "power4.out" }, 4.05);
    tl.to(g.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 1.2, ease: "elastic.out(1, 0.2)" }, 4.10);
    tl.to(g.position, { y: 0.3, z: -0.8, duration: 1.2, ease: "power3.out" }, 4.05);
    tl.to(g.rotation, { x: -0.2, y: Math.PI * 0.2, z: 0.15, duration: 1.5, ease: "power3.out" }, 4.05);

    // 4. The Green Wash & Doom Reveal (t = 4.5s)
    tl.to(textMatRef.current, { opacity: 0, duration: 0.5 }, 4.5); // Fade text out
    
    // Fade in green wash HTML overlay
    tl.to(greenWashRef.current, { opacity: 1, duration: 2.0, ease: "power2.inOut" }, 4.5);
    
    // Fade in green point light on the hammer
    tl.to(greenLightRef.current, { intensity: 10, duration: 2.0, ease: "power2.inOut" }, 4.5);
    
    // Fade in Doom's towering silhouette
    tl.to(doomOpacityRef, { current: 1, duration: 3.0, ease: "power2.inOut" }, 4.5);

    // 5. The Dominion Logo (t = 7.5s) - Give the user time to absorb Doom before branding
    tl.to(logoRef.current, { opacity: 1, duration: 2.0, ease: "power2.inOut" }, 7.5);

  }, []);

  useFrame(({ clock }) => {
    if (!hammerGroup.current) return;
    if (!trailActive.current) {
      hammerGroup.current.position.y = 0.3 + Math.sin(clock.elapsedTime * 1.5) * 0.05;
      hammerGroup.current.rotation.y = (Math.PI * 0.2) + Math.sin(clock.elapsedTime * 0.5) * 0.05;
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

// ─── Scene ─────────────────────────────────────────────────────────────────
export default function ModelTest() {
  const shakeRef = useRef(0);
  const flashRef = useRef(0);
  
  const textMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const greenWashRef = useRef<HTMLDivElement>(null!);
  const doomOpacityRef = useRef({ current: 0 });
  const logoRef = useRef<HTMLImageElement>(null!);
  const greenLightRef = useRef<THREE.PointLight>(null!);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#020305", position: "relative" }}>
      
      {/* Green Atmospheric Wash Overlay */}
      <div 
        ref={greenWashRef}
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%",
          background: "radial-gradient(circle at center, rgba(0,255,68,0.12) 0%, rgba(0,0,0,0) 70%)",
          zIndex: 40,
          opacity: 0,
          pointerEvents: "none"
        }}
      />

      {/* Dominion Logo Overlay */}
      <div 
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 50,
          pointerEvents: "none"
        }}
      >
        <img 
          ref={logoRef}
          src="/dominion_logo.png" 
          alt="Dominion"
          style={{
            maxWidth: "600px",
            width: "80%",
            opacity: 0,
            filter: "drop-shadow(0px 0px 30px rgba(0, 255, 68, 0.4))",
            transform: "translateY(-10%)"
          }}
        />
      </div>

      <Canvas gl={{ antialias: true, powerPreference: "high-performance" }}>
        <color attach="background" args={["#020305"]} />
        <fogExp2 attach="fog" args={["#020305", 0.04]} />

        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
        
        {/* Blue lights for Hammer */}
        <pointLight position={[0, -2, 2]} intensity={8} color="#2b8cff" distance={15} decay={2} />
        <pointLight position={[-3, 2, -3]} intensity={6} color="#73b2ff" distance={20} decay={2} />
        
        {/* Green light for Doom Wash */}
        <pointLight ref={greenLightRef} position={[0, 0, -20]} intensity={0} color="#00ff44" distance={50} decay={2} />

        <Suspense fallback={null}>
          <CameraRig shakeRef={shakeRef} />
          <FlashPlane opacityRef={flashRef} />

          {/* Intro Text */}
          <Center position={[0, 4, -15]}>
            <Text3D 
              font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json" 
              size={1.5} height={0.4} curveSegments={12} 
              bevelEnabled bevelThickness={0.05} bevelSize={0.02} bevelOffset={0} bevelSegments={5}
            >
              Once upon a time in space.
              <meshBasicMaterial ref={textMatRef} color="#ffffff" transparent opacity={1} />
            </Text3D>
          </Center>

          {/* The main orchestrator now handles the Hammer and master timeline */}
          <SceneOrchestrator 
            shakeRef={shakeRef} flashRef={flashRef} textMatRef={textMatRef}
            greenWashRef={greenWashRef} doomOpacityRef={doomOpacityRef} 
            logoRef={logoRef} greenLightRef={greenLightRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
