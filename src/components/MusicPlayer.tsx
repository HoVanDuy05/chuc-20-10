import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";

export default function MusicPlayer({ src = "/assets/background.mp3" }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.18;
    audioRef.current.play().catch(() => setPlaying(false));
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [src]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="music-btn">
      <Button onClick={toggle} size="middle">{playing ? "Tắt nhạc" : "Bật nhạc"}</Button>
    </div>
  );
}
