"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const [sphere, setSphere] = useState<Float32Array | null>(null);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 1200 : 5000;
    const points = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 1.5 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      points[i3] = r * Math.sin(phi) * Math.cos(theta);
      points[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      points[i3 + 2] = r * Math.cos(phi);
    }
    setSphere(points);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    ref.current.position.y = Math.sin(t * 0.5) * 0.05;
  });

  if (!sphere) return null;

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.003}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

const QuantumCanvas = ({ index = 0 }: { index?: number }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const bgColors = [
    "radial-gradient(circle at 50% 50%, rgba(14,165,233,0.15) 0%, rgba(2,6,23,1) 80%)", // Blue
    "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, rgba(2,6,23,1) 80%)", // Purple
    "radial-gradient(circle at 50% 50%, rgba(236,72,153,0.15) 0%, rgba(2,6,23,1) 80%)", // Pink
    "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.15) 0%, rgba(2,6,23,1) 80%)",  // Amber
    "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.15) 0%, rgba(2,6,23,1) 80%)", // Emerald
  ];

  return (
    <div className="fixed inset-0 -z-10 bg-[#020617]">
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ background: bgColors[index] || bgColors[0] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 z-10 opacity-70 mix-blend-screen">
        <Canvas 
          camera={{ position: [0, 0, 1.8] }} 
          gl={{ 
            antialias: !isMobile, 
            powerPreference: "high-performance",
            precision: isMobile ? "mediump" : "highp"
          }}
          dpr={isMobile ? [1, 1.2] : [1, 1.5]}
        >
          <ambientLight intensity={0.3} />
          <ParticleField />
        </Canvas>
      </div>
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617]" />
    </div>
  );
};

export default QuantumCanvas;