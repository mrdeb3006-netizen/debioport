import React, { useEffect, useRef } from 'react';

export const ConstellationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      if (canvas.parentElement) {
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const count = 28;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: i % 2 === 0 ? 'rgba(0, 240, 255, 0.8)' : 'rgba(217, 70, 239, 0.8)'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 90) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.35 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />
      <div className="text-center flex flex-col items-center gap-3 relative z-[2]">
        <div className="font-mono text-[0.75rem] text-accent-cyan py-1 px-3 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full">
          ✨ LIVE CANVAS PARTICLES
        </div>
        <div className="font-display text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]">
          DEBENDRA
        </div>
        <div className="flex gap-3 font-mono text-[0.75rem] text-text-secondary flex-wrap justify-center">
          <span>// 60FPS RUNTIME</span>
          <span>// TAO MANDALA RING</span>
          <span>// DRAG / HOVER</span>
        </div>
      </div>
    </div>
  );
};
