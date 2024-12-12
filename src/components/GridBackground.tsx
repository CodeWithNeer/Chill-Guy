import React, { useEffect, useRef } from 'react';
import { Theme } from '../types';

interface GridBackgroundProps {
  theme: Theme;
}

export default function GridBackground({ theme }: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gridSize = 30;
    let frame = 0;

    const drawDot = (x: number, y: number, size: number) => {
      const distance = Math.sqrt(
        Math.pow(x - window.innerWidth / 2, 2) + 
        Math.pow(y - window.innerHeight / 2, 2)
      );
      
      const maxDistance = Math.sqrt(
        Math.pow(window.innerWidth / 2, 2) + 
        Math.pow(window.innerHeight / 2, 2)
      );
      
      const normalizedDistance = distance / maxDistance;
      const wave = Math.sin((distance - frame) * 0.02) * 0.5 + 0.5;
      const scale = (1 - normalizedDistance) * wave;
      
      ctx.beginPath();
      ctx.arc(
        x + Math.sin((x + y + frame) * 0.01) * 2,
        y + Math.cos((x - y + frame) * 0.01) * 2,
        size * (scale + 0.2),
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const baseColor = theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
      const opacity = theme === 'dark' ? 0.08 : 0.05;
      ctx.fillStyle = `rgba(${baseColor}, ${opacity})`;

      for (let x = 0; x < window.innerWidth; x += gridSize) {
        for (let y = 0; y < window.innerHeight; y += gridSize) {
          drawDot(x, y, 1.2);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-70"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(to bottom right, #0F172A, #1E293B)' 
          : 'linear-gradient(to bottom right, #F8FAFC, #F1F5F9)'
      }}
    />
  );
}