import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Icosahedron, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = pointer.x * 0.45;
    const targetX = -pointer.y * 0.28;
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 3, 1);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 3, 1);
  });

  return <group ref={group}>{children}</group>;
}

function EnergyParticles({ count = 900 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.045;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.3;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#00ff87"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ArmoredCore() {
  const wire = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (wire.current) {
      wire.current.rotation.y += delta * 0.12;
      wire.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <group>
      {/* Containment Field */}
      <mesh>
        <cylinderGeometry args={[4.5, 4.5, 12, 32, 1, true]} />
        <meshBasicMaterial color="#00E68A" transparent opacity={0.02} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[4.6, 4.6, 12, 16, 1, true]} />
        <meshBasicMaterial color="#00FF9A" wireframe transparent opacity={0.05} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <Icosahedron ref={wire} args={[3.1, 1]}>
        <meshBasicMaterial color="#00E68A" wireframe transparent opacity={0.2} />
      </Icosahedron>

      <Float speed={1.1} rotationIntensity={0.6} floatIntensity={0.8}>
        <Icosahedron args={[1.05, 0]}>
          <meshStandardMaterial
            color="#050908"
            metalness={1.0}
            roughness={0.15}
            flatShading
            emissive="#00E68A"
            emissiveIntensity={0.1}
          />
        </Icosahedron>
      </Float>

      <Float speed={0.8} rotationIntensity={1.1} floatIntensity={1.2}>
        <TorusKnot args={[0.7, 0.16, 160, 24]} position={[3.6, 1.3, -1.5]}>
          <meshStandardMaterial color="#0B1210" metalness={1} roughness={0.1} emissive="#00FF9A" emissiveIntensity={0.05} />
        </TorusKnot>
      </Float>

      <Float speed={0.7} rotationIntensity={0.9} floatIntensity={1}>
        <mesh position={[-3.9, -1.4, -1]} rotation={[0.4, 0.8, 0.2]}>
          <octahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial
            color="#121C19"
            metalness={0.9}
            roughness={0.2}
            emissive="#00FF9A"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh position={[2.4, -2.1, 1.2]} rotation={[0.9, 0.2, 0.5]}>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color="#050908" metalness={1} roughness={0.25} emissive="#00E68A" emissiveIntensity={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 9], fov: 45 }}
    >
      <fog attach="fog" args={["#030807", 8, 20]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={1.5} color="#E8ECE9" />
      <pointLight position={[0, 0, 0]} intensity={30} color="#00E68A" distance={10} />
      <pointLight position={[-6, -2, 3]} intensity={18} color="#00FF9A" distance={20} />
      <pointLight position={[4, 3, -4]} intensity={15} color="#00E68A" distance={18} />
      <Rig>
        <ArmoredCore />
      </Rig>
      <EnergyParticles />
    </Canvas>
  );
}
