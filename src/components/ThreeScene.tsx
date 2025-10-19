// src/components/MemoriesGallery.tsx
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

type PhotoProps = {
  url: string;
  angle: number;
  radius: number;
  active: boolean;
  size: number;
};

function PhotoMesh({ url, angle, radius, active, size }: PhotoProps) {
  const tex = useTexture(url);
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    const targetScale = active ? 1.5 : 1; // Trung tâm nổi bật hơn
    ref.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
    // Nhẹ nhàng nâng ảnh trung tâm lên
    ref.current.position.y = active ? 0.5 : 0;
  });

  return (
    <mesh
      ref={ref}
      position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
      rotation={[0, -angle, 0]}
    >
      <planeGeometry args={[size * 1.6, size]} />
      <meshStandardMaterial map={tex} metalness={0.15} roughness={0.4} />
    </mesh>
  );
}

export default function MemoriesGallery({ onClose }: { onClose: () => void }) {
  const images = [
    "/assets/memories/img1.jpg",
    "/assets/memories/img2.jpg",
    "/assets/memories/img3.jpg",
    "/assets/memories/img4.jpg",
    "/assets/memories/img5.jpg",
    "/assets/memories/img6.jpg",
    "/assets/memories/img7.jpg",
  ];

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    const clientX =
      "touches" in e ? (e as any).touches?.[0]?.clientX ?? 0 : e.clientX;
    setStartX(clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const clientX =
      "touches" in e ? (e as any).touches?.[0]?.clientX ?? 0 : e.clientX;
    const delta = (clientX - startX) * 0.006; // nhạy hơn
    setRotation((prev) => prev + delta);
    setStartX(clientX);
  };

  const handlePointerUp = () => setIsDragging(false);

  const getActiveIndex = () => {
    const normalized = ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const index = Math.round((normalized / (Math.PI * 2)) * images.length) % images.length;
    return (images.length - index) % images.length;
  };

  const activeIndex = getActiveIndex();
  const radius = isMobile ? 3.5 : 5; // radius rộng hơn
  const photoSize = isMobile ? 1.4 : 2; // ảnh lớn hơn

  const cameraY = isMobile ? 2 : 3; // nâng cao hơn
  const cameraZ = isMobile ? 7 : 9;

  return (
    <div
      className="gallery-fullscreen"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="gallery-topbar">
        <button className="btn-close" onClick={onClose}>Đóng</button>
      </div>

      <Canvas camera={{ position: [0, cameraY, cameraZ], fov: 55 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 5]} intensity={1.2} />
        <Suspense fallback={<Html center>Đang tải ảnh…</Html>}>
          {images.map((src, i) => {
            const angle = rotation + (i / images.length) * Math.PI * 2;
            return (
              <PhotoMesh
                key={i}
                url={src}
                angle={angle}
                radius={radius}
                size={photoSize}
                active={i === activeIndex}
              />
            );
          })}
        </Suspense>
      </Canvas>
    </div>
  );
}
