// components/FallingPetalsPoints.tsx
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Petals({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points | null>(null);

  const [positions, speeds, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 10 + 0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sp[i] = 0.002 + Math.random() * 0.012;
      const c = new THREE.Color().setHSL(0.95 + Math.random() * 0.05, 0.7, 0.7);
      cols[i * 3 + 0] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return [pos, sp, cols] as const;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const geom = ref.current.geometry;
    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i);
      y -= speeds[i] * 60 * delta;
      if (y < -6) y = 10 + Math.random() * 2;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
    ref.current.rotation.y += 0.0008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.95} />
    </points>
  );
}

export default function FallingPetalsPoints() {
  return (
    <Canvas
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // để không cản click
      }}
      camera={{ position: [0, 0, 8], fov: 70 }}
    >
      <ambientLight intensity={0.6} />
      <Petals />
    </Canvas>
  );
}
