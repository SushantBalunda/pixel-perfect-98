import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

function AICore() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    const p = scrollProgress();
    const g = group.current!;
    g.rotation.y += dt * 0.25;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.4, 0.05);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.3, 0.05);
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
    g.scale.setScalar(pulse * (1 - p * 0.5));
    g.position.y = p * 6;
    g.position.x = THREE.MathUtils.lerp(g.position.x, 1.6 + state.pointer.x * 0.3, 0.05);
    shell.current!.rotation.y -= dt * 0.4;
    ring.current!.rotation.z += dt * 0.6;
  });
  return (
    <group ref={group} position={[1.6, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.85, 64, 64]} />
        <MeshDistortMaterial color="#5aa8ff" emissive="#2a5cff" emissiveIntensity={1.4} distort={0.35} speed={2} roughness={0.1} metalness={0.4} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color="#8fb8ff" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.85, 0.012, 16, 160]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.8} />
      </mesh>
      <Sparkles count={60} scale={4} size={3} speed={0.6} color="#9cc4ff" />
    </group>
  );
}

function Planet({ pos, color, size, speed }: { pos: [number, number, number]; color: string; size: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    ref.current!.rotation.y += dt * speed;
  });
  return (
    <Float speed={1} floatIntensity={1.5}>
      <mesh ref={ref} position={pos}>
        <sphereGeometry args={[size, 48, 48]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} emissive={color} emissiveIntensity={0.15} />
      </mesh>
    </Float>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 40;
    return arr;
  }, []);
  useFrame((_, dt) => {
    ref.current!.rotation.y += dt * 0.01;
    const m = ref.current!.material as THREE.PointsMaterial;
    m.opacity = 0.15 + scrollProgress() * 0.6;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#9db7ff" transparent opacity={0.3} depthWrite={false} />
    </points>
  );
}

function Rig() {
  const stars = useRef<THREE.Group>(null);
  useFrame((state) => {
    const p = scrollProgress();
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, state.pointer.x * 0.5, 0.03);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, state.pointer.y * 0.3 - p * 2, 0.03);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, 6 - p * 3, 0.05);
    cam.lookAt(0, -p * 2, 0);
    if (stars.current) {
      stars.current.rotation.y = p * 1.2 + state.clock.elapsedTime * 0.005;
      stars.current.rotation.x = p * 0.3;
    }
  });
  return (
    <group ref={stars}>
      <Stars radius={60} depth={50} count={4000} factor={3.5} fade speed={0.6} />
      <Dust />
      <Planet pos={[-6, -4, -8]} color="#3b5bdb" size={1.2} speed={0.1} />
      <Planet pos={[7, -10, -12]} color="#7c5cff" size={2} speed={0.05} />
      <Planet pos={[-8, -16, -10]} color="#1fb5c9" size={0.9} speed={0.15} />
    </group>
  );
}

export default function SpaceScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#8fb8ff" />
      <pointLight position={[-4, -2, 2]} intensity={20} color="#a78bfa" />
      <AICore />
      <Rig />
    </Canvas>
  );
}
