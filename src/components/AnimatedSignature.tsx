import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface StrokeSegment {
  path: string;
  duration: number; // in seconds
  isDot?: boolean;
}

// 4 continuous guide strokes aligned with the authentic handwritten signature photo
const STROKE_SEGMENTS: StrokeSegment[] = [
  // 1. Initial Cursive 'D' loop and wide bowl
  {
    path: 'M 220 180 C 170 230 145 310 165 355 C 185 385 240 375 285 315 C 315 260 315 190 275 155 C 240 135 200 155 220 180',
    duration: 1.0,
  },
  // 2. Main Slanted Cross-Line cutting through 'D' and writing cursive 'debendra' with tail flourish
  {
    path: 'M 35 400 C 120 350 220 280 315 210 C 335 190 355 170 345 190 C 365 170 385 165 395 170 C 405 150 425 135 425 145 C 440 130 455 130 465 125 C 475 105 490 35 496 30 C 492 65 490 100 498 115 C 510 105 525 95 530 110 C 545 95 565 80 565 100 C 580 85 630 60 678 40',
    duration: 1.5,
  },
  // 3. Two Accent Dots at the top right
  {
    path: 'M 692 36 L 694 38',
    duration: 0.15,
    isDot: true,
  },
  {
    path: 'M 710 26 L 712 28',
    duration: 0.15,
    isDot: true,
  },
  // 4. Underline stroke beneath the name with accent mark
  {
    path: 'M 290 335 L 500 200',
    duration: 0.45,
  },
  {
    path: 'M 525 185 L 527 187',
    duration: 0.15,
    isDot: true,
  },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export const AnimatedSignature: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const penCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isSigning, setIsSigning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const strokeLengthsRef = useRef<number[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const totalDuration = STROKE_SEGMENTS.reduce((acc, s) => acc + s.duration, 0) + 0.3;

  const startSigning = () => {
    setIsSigning(true);
    setHasCompleted(false);
    startTimeRef.current = null;
    particlesRef.current = [];

    pathRefs.current.forEach((p, idx) => {
      if (p) {
        const len = strokeLengthsRef.current[idx] || p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      }
    });
  };

  useEffect(() => {
    pathRefs.current.forEach((p, idx) => {
      if (p) {
        const len = p.getTotalLength();
        strokeLengthsRef.current[idx] = len;
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      }
    });

    const timer = setTimeout(() => {
      startSigning();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isSigning && hasCompleted) return;

    const penCanvas = penCanvasRef.current;
    if (!penCanvas) return;
    const ctx = penCanvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const sigWidth = 724;
    const sigHeight = 440;

    const render = (time: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = time;
      }

      const elapsed = (time - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / totalDuration, 1);

      const dpr = window.devicePixelRatio || 1;
      const rect = penCanvas.getBoundingClientRect();
      if (penCanvas.width !== rect.width * dpr || penCanvas.height !== rect.height * dpr) {
        penCanvas.width = rect.width * dpr;
        penCanvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const scaleX = rect.width / sigWidth;
      const scaleY = rect.height / sigHeight;
      const scale = Math.min(scaleX, scaleY);
      const offsetX = (rect.width - sigWidth * scale) / 2;
      const offsetY = (rect.height - sigHeight * scale) / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      let accumulatedTime = 0;
      let activePenPos: { x: number; y: number } | null = null;
      let penAngle = -0.55;
      let isPenWriting = false;

      // Update stroke dashoffsets
      for (let i = 0; i < STROKE_SEGMENTS.length; i++) {
        const seg = STROKE_SEGMENTS[i];
        const segStart = accumulatedTime;
        const segEnd = segStart + seg.duration;
        accumulatedTime = segEnd;

        const pathEl = pathRefs.current[i];
        const len = strokeLengthsRef.current[i] || (pathEl ? pathEl.getTotalLength() : 100);

        if (elapsed < segStart) {
          if (pathEl) {
            pathEl.style.strokeDashoffset = `${len}`;
          }
        } else if (elapsed >= segEnd) {
          if (pathEl) {
            pathEl.style.strokeDashoffset = '0';
          }
        } else {
          const strokeElapsed = elapsed - segStart;
          const strokeProgress = strokeElapsed / seg.duration;
          const currentOffset = len * (1 - strokeProgress);

          if (pathEl) {
            pathEl.style.strokeDashoffset = `${currentOffset}`;

            const currentDist = len * strokeProgress;
            const pt = pathEl.getPointAtLength(Math.min(currentDist, len));
            activePenPos = { x: pt.x, y: pt.y };
            isPenWriting = true;

            if (currentDist > 2 && currentDist < len - 2) {
              const ptPrev = pathEl.getPointAtLength(currentDist - 2);
              const ptNext = pathEl.getPointAtLength(currentDist + 2);
              const dx = ptNext.x - ptPrev.x;
              const dy = ptNext.y - ptPrev.y;
              if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                penAngle = Math.atan2(dy, dx) - Math.PI / 2.6;
              }
            }
          }
        }
      }

      if (progress >= 1 && !hasCompleted) {
        setHasCompleted(true);
        setIsSigning(false);
      }

      // Emit fine golden sparks while inking
      if (isPenWriting && activePenPos) {
        if (Math.random() < 0.55) {
          particlesRef.current.push({
            x: activePenPos.x,
            y: activePenPos.y,
            vx: (Math.random() - 0.5) * 3.2,
            vy: (Math.random() - 0.7) * 3.2,
            size: Math.random() * 2.2 + 1.2,
            alpha: 1,
            decay: Math.random() * 0.045 + 0.03,
            color: Math.random() > 0.35 ? '#fbbf24' : '#ffffff',
          });
        }
      }

      // Update & render spark particles
      for (let pIdx = particlesRef.current.length - 1; pIdx >= 0; pIdx--) {
        const p = particlesRef.current[pIdx];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(pIdx, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render animated Fountain Pen Nib
      if (isPenWriting && activePenPos) {
        ctx.save();
        ctx.translate(activePenPos.x, activePenPos.y);
        ctx.rotate(penAngle);

        // 1. Radiant Pen Laser Flare
        const flare = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
        flare.addColorStop(0, '#ffffff');
        flare.addColorStop(0.3, 'rgba(251, 191, 36, 0.95)');
        flare.addColorStop(0.7, 'rgba(249, 115, 22, 0.4)');
        flare.addColorStop(1, 'transparent');
        ctx.fillStyle = flare;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();

        // 2. White-hot contact nib
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 9;
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // 3. Fountain Pen Chrome Nib Body
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(5, -13);
        ctx.lineTo(-5, -13);
        ctx.closePath();
        ctx.fill();

        // 4. Gold Nib Collar
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(0, -7, 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(-5, -17, 10, 4);

        // 5. Stylus Shaft Body
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-4.5, -42, 9, 25);

        // Chrome highlight along shaft
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fillRect(-1.5, -42, 2, 25);

        ctx.restore();
      }

      ctx.restore();

      if (progress < 1 || particlesRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isSigning]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={startSigning}
      className={`relative select-none cursor-pointer group/signature ${className}`}
      title="Click to sign again"
    >
      {/* Ambient Warm Golden Aura behind Signature */}
      <div
        className="absolute -inset-4 rounded-2xl blur-xl transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.38) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 75%)',
          opacity: isSigning ? 1 : isHovered ? 0.95 : 0.7,
        }}
      />

      {/* Main SVG Container */}
      <svg
        ref={svgRef}
        viewBox="0 0 724 440"
        className="w-full h-full block relative z-10 overflow-visible"
      >
        <defs>
          {/* SVG Mask that unmasks the exact authentic handwritten signature as the pen moves */}
          <mask id="exact-photo-sig-mask">
            <rect width="724" height="440" fill="black" />
            {STROKE_SEGMENTS.map((seg, idx) => (
              <path
                key={`exact-mask-${idx}`}
                ref={(el) => (pathRefs.current[idx] = el)}
                d={seg.path}
                fill="none"
                stroke="white"
                strokeWidth={seg.isDot ? 28 : 46}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </mask>
        </defs>

        {/* 1. Exact Authentic Handwritten Signature image revealed smoothly under the pen */}
        <g mask="url(#exact-photo-sig-mask)">
          {/* Glowing Amber Ink Signature Layer */}
          <image
            href="/debendra-exact-signature.png"
            width="724"
            height="440"
            className="drop-shadow-[0_0_12px_rgba(249,115,22,0.85)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
          />

          {/* Crisp White-Hot Highlight Filament */}
          <image
            href="/debendra-signature-white.png"
            width="724"
            height="440"
            opacity="0.65"
            className="drop-shadow-[0_0_6px_#f97316]"
          />
        </g>
      </svg>

      {/* Floating Canvas for the Animated Pen Nib & Sparks */}
      <canvas
        ref={penCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Subtle Mini Tooltip on Hover */}
      <div
        className={`absolute -bottom-5 right-2 z-30 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0d0e12]/85 backdrop-blur-md border border-white/10 text-slate-300 transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        <RotateCcw size={9} className="text-accent-orange" />
        <span className="font-mono text-[0.58rem] font-medium tracking-wider uppercase">
          {isSigning ? 'Signing...' : 'Re-sign'}
        </span>
      </div>
    </div>
  );
};
