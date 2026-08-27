import React, { useEffect, useRef } from 'react';

export const DoctorStrangeCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas && ctx) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Smooth physics states
    const mouse = { x: -200, y: -200 };
    const ring = { x: -200, y: -200 };
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;

    let currentRadius = 14;
    let targetRadius = 14;
    let currentAlpha = 0;
    let targetAlpha = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ring.x = mouse.x;
        ring.y = mouse.y;
      }

      // Ultra-lightweight interactive target detection
      const target = e.target as HTMLElement | null;
      if (target) {
        // If mouse is over any editable text field, hide magic cursor so native I-beam text selection works smoothly
        const isTextInput = !!target.closest('input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');
        if (isTextInput) {
          targetAlpha = 0;
          isHovering = false;
          return;
        }

        targetAlpha = 1;

        const interactive = target.closest('a, button, select, input[type="button"], input[type="submit"], .interactive-skill-tag, .social-icon-btn, .nav-link, [role="button"], .cursor-pointer');
        const hovering = !!interactive;
        if (hovering !== isHovering) {
          isHovering = hovering;
          targetRadius = isHovering ? 24 : (isClicking ? 10 : 14);
        }
      } else {
        targetAlpha = 1;
      }
    };

    const onMouseEnter = () => {
      isVisible = true;
      targetAlpha = 1;
    };

    const onMouseLeave = () => {
      targetAlpha = 0;
    };

    const onMouseDown = () => {
      isClicking = true;
      targetRadius = isHovering ? 20 : 9;
    };

    const onMouseUp = () => {
      isClicking = false;
      targetRadius = isHovering ? 24 : 14;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseenter', onMouseEnter, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Buttery smooth organic linear interpolation
      const ringLerp = 0.28;
      ring.x += (mouse.x - ring.x) * ringLerp;
      ring.y += (mouse.y - ring.y) * ringLerp;

      currentRadius += (targetRadius - currentRadius) * 0.18;
      currentAlpha += (targetAlpha - currentAlpha) * 0.12;

      if (currentAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = currentAlpha;

        // 1. Smooth Outer Trailing Ring
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, currentRadius, 0, Math.PI * 2);
        
        if (isHovering) {
          ctx.fillStyle = 'rgba(249, 115, 22, 0.08)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(249, 115, 22, 0.8)';
          ctx.lineWidth = 1.5;
          ctx.shadowColor = 'rgba(249, 115, 22, 0.4)';
          ctx.shadowBlur = 8;
        } else {
          ctx.strokeStyle = 'rgba(249, 115, 22, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.shadowColor = 'rgba(249, 115, 22, 0.2)';
          ctx.shadowBlur = 4;
        }
        ctx.stroke();

        // 2. Crisp Center Dot (Follows pointer directly with zero lag)
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, isHovering ? 2.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isHovering ? '#f97316' : '#ffffff';
        ctx.shadowColor = 'rgba(249, 115, 22, 0.7)';
        ctx.shadowBlur = isHovering ? 6 : 3;
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      id="magic-cursor-container"
      className="cursor-layer pointer-events-none fixed inset-0 z-[2147483647] overflow-hidden"
      style={{ zIndex: 2147483647 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} id="magic-cursor-canvas" className="pointer-events-none absolute inset-0 w-full h-full" />
    </div>
  );
};
