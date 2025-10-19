import React, { useEffect, useState } from "react";
import LoaderScreen from "./components/Loader3D";
import CardScene from "./components/CardOpen";
import MemoriesGallery from "./components/ThreeScene";
import FallingPetalsPoints from "./components/FallingPetalsPoints";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import "./App.css";
import { Button } from "antd";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio("/assets/background.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.18;
    audioRef.current.play().catch(() => {
      setMusicOn(false);
    });
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      audioRef.current.play().catch(() => {});
      setMusicOn(true);
    }
  };

  return (
    <div className="app-root">
      <AnimatePresence>{loading && <LoaderScreen />}</AnimatePresence>

      {!loading && (
        <>
          <div className="petals-layer">
            <FallingPetalsPoints />
          </div>

          <div className="center-stage">
            {!showGallery ? (
              <CardScene onOpenGallery={() => setShowGallery(true)} />
            ) : (
              <MemoriesGallery onClose={() => setShowGallery(false)} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
