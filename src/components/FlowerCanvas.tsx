import React, { useEffect, useRef } from "react";

const FlowerCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const flowers = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 8 + Math.random() * 15,
      speedY: 1 + Math.random() * 1.5,
      sway: Math.random() * 2,
      color: ["#ff85c0aa", "#ffa6c9aa", "#ffbbd4aa"][Math.floor(Math.random() * 3)],
    }));

    const draw = (x: number, y: number, s: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.lineTo(0, -s);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      flowers.forEach((f) => {
        f.y += f.speedY;
        f.x += Math.sin(f.y * 0.015) * f.sway;
        if (f.y > height) f.y = -10;
        draw(f.x, f.y, f.size, f.color);
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return <canvas ref={canvasRef} className="flower-canvas"></canvas>;
};

export default FlowerCanvas;
