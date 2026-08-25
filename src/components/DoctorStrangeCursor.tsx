import React, { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  spin: number;
  type: 'gold' | 'cyan' | 'magenta' | 'orange';
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  decay: number;
}

export const DoctorStrangeCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: width / 2, y: height / 2 };
    const pos = { x: width / 2, y: height / 2 };
    const lastPos = { x: width / 2, y: height / 2 };
    let speed = 0;

    let angleOuter = 0;
    let angleInner = 0;
    let angleMiddle = 0;

    let isHovering = false;
    const baseRadius = 18;
    let currentRadius = 18;
    let targetRadius = 18;
    let hoverMultiplier = 1;

    const sparks: Spark[] = [];
    const particles: Particle[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const dist = Math.hypot(mouse.x - lastPos.x, mouse.y - lastPos.y);
      speed = dist;
      lastPos.x = mouse.x;
      lastPos.y = mouse.y;

      const count = Math.min(Math.floor(dist * 0.25) + (isHovering ? 1 : 0), 3);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * (dist * 0.08 + 1.2) + 0.8;
        const sparkType: 'gold' | 'cyan' | 'magenta' | 'orange' = 
          Math.random() > 0.4 ? 'gold' : (Math.random() > 0.5 ? 'cyan' : 'orange');
        
        sparks.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * 2.2 + 1.2,
          alpha: 1,
          decay: Math.random() * 0.035 + 0.02,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.2,
          type: sparkType
        });
      }
    };

    const onMouseDown = () => {
      const burstCount = 14;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 / burstCount) * i + (Math.random() - 0.5) * 0.3;
        const burstSpeed = Math.random() * 4.5 + 2.5;
        sparks.push({
          x: pos.x,
          y: pos.y,
          vx: Math.cos(angle) * burstSpeed,
          vy: Math.sin(angle) * burstSpeed,
          size: Math.random() * 3.5 + 1.8,
          alpha: 1,
          decay: Math.random() * 0.04 + 0.025,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.3,
          type: i % 2 === 0 ? 'cyan' : 'magenta'
        });
      }

      particles.push({
        x: pos.x,
        y: pos.y,
        radius: currentRadius * 0.8,
        maxRadius: currentRadius * 2.5,
        alpha: 0.9,
        decay: 0.05
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);

    const setupHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, .interactive-skill-tag, .social-icon-btn, .nav-link, [role="button"]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          isHovering = true;
          targetRadius = 26;
          hoverMultiplier = 1.4;
        });
        el.addEventListener('mouseleave', () => {
          isHovering = false;
          targetRadius = baseRadius;
          hoverMultiplier = 1;
        });
      });
    };

    setupHoverListeners();
    const observer = new MutationObserver(setupHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const lerp = 0.24;
      pos.x += (mouse.x - pos.x) * lerp;
      pos.y += (mouse.y - pos.y) * lerp;
      currentRadius += (targetRadius - currentRadius) * 0.18;

      // Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05;
        s.vx *= 0.97;
        s.alpha -= s.decay;
        s.rotation += s.spin;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = Math.max(0, s.alpha);

        let color = '#fbbf24';
        let glow = 'rgba(245, 158, 11, 0.6)';
        if (s.type === 'cyan') {
          color = '#38bdf8';
          glow = 'rgba(56, 189, 248, 0.6)';
        } else if (s.type === 'magenta') {
          color = '#818cf8';
          glow = 'rgba(99, 102, 241, 0.5)';
        } else if (s.type === 'gold') {
          color = '#fde047';
          glow = 'rgba(245, 158, 11, 0.6)';
        }

        ctx.fillStyle = color;
        ctx.shadowColor = glow;
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.moveTo(0, -s.size);
        ctx.lineTo(s.size * 0.5, 0);
        ctx.lineTo(0, s.size);
        ctx.lineTo(-s.size * 0.5, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Draw Shockwaves
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.radius += (p.maxRadius - p.radius) * 0.14 + 0.8;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.radius >= p.maxRadius) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(56, 189, 248, ${p.alpha * 0.7})`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
        ctx.shadowBlur = 8;
        ctx.lineWidth = 1.6 * p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw Tao Mandala Cursor Ring
      ctx.save();
      ctx.translate(pos.x, pos.y);

      const rotSpeed = (0.018 + speed * 0.0006) * hoverMultiplier;
      angleOuter += rotSpeed;
      angleInner -= rotSpeed * 1.35;
      angleMiddle += rotSpeed * 0.85;

      // 1. Outer Track
      ctx.save();
      ctx.rotate(angleOuter);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
      ctx.lineWidth = 1.4;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
      ctx.shadowBlur = 8;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
      ctx.stroke();

      const glyphCount = 6;
      for (let i = 0; i < glyphCount; i++) {
        const theta = (Math.PI * 2 / glyphCount) * i;
        const gx = Math.cos(theta) * currentRadius;
        const gy = Math.sin(theta) * currentRadius;

        ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#818cf8';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(gx, gy, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 2. Middle Star
      ctx.save();
      ctx.rotate(angleMiddle);
      const innerR = currentRadius * 0.72;
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.65)';
      ctx.shadowColor = 'rgba(99, 102, 241, 0.35)';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2, 4]);

      ctx.beginPath();
      ctx.arc(0, 0, innerR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const theta = (Math.PI / 2) * i;
        const x1 = Math.cos(theta) * innerR;
        const y1 = Math.sin(theta) * innerR;
        const x2 = Math.cos(theta + Math.PI / 2) * innerR;
        const y2 = Math.sin(theta + Math.PI / 2) * innerR;
        if (i === 0) ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      ctx.restore();

      // 3. Center Core
      ctx.save();
      ctx.rotate(angleInner);
      const coreR = currentRadius * 0.38;
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)';
      ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(0, 0, coreR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = isHovering ? '#38bdf8' : '#ffffff';
      ctx.shadowColor = isHovering ? 'rgba(56, 189, 248, 0.8)' : 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div id="magic-cursor-container" className="cursor-layer" aria-hidden="true">
      <canvas ref={canvasRef} id="magic-cursor-canvas" />
    </div>
  );
};
