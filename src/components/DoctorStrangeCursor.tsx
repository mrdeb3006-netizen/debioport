import React, { useEffect, useRef } from 'react';

export const DoctorStrangeCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) return;

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

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
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
      targetAlpha = 1;
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
      targetRadius = isHovering ? 22 : 10;
    };

    const onMouseUp = () => {
      isClicking = false;
      targetRadius = isHovering ? 26 : 14;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const setupHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, .interactive-skill-tag, .social-icon-btn, .nav-link, [role="button"], .cursor-pointer'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          isHovering = true;
          targetRadius = 26;
        });
        el.addEventListener('mouseleave', () => {
          isHovering = false;
          targetRadius = isClicking ? 10 : 14;
        });
      });
    };

    setupHoverListeners();
    const observer = new MutationObserver(setupHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp tracking
      const ringLerp = 0.18;
      ring.x += (mouse.x - ring.x) * ringLerp;
      ring.y += (mouse.y - ring.y) * ringLerp;

      currentRadius += (targetRadius - currentRadius) * 0.15;
      currentAlpha += (targetAlpha - currentAlpha) * 0.1;

      if (currentAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = currentAlpha;

        // 1. Sleek Outer Trailing Ring
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, currentRadius, 0, Math.PI * 2);
        
        if (isHovering) {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
          ctx.lineWidth = 1.5;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.35)';
          ctx.shadowBlur = 8;
        } else {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.2)';
          ctx.shadowBlur = 4;
        }
        ctx.stroke();

        // 2. Crisp Center Dot (Locks directly to pointer)
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, isHovering ? 2.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isHovering ? '#38bdf8' : '#ffffff';
        ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
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
