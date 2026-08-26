import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface StrokeSegment {
  path: string;
  duration: number; // in seconds
  isDot?: boolean;
}

// Precise calligraphic strokes spelling 'Debendra' in cursive with D bowl, flourish, and underline
const STROKE_SEGMENTS: StrokeSegment[] = [
  // 1. Cursive Capital 'D' Loop & Rounded Bowl
  {
    path: 'M 240 190 C 170 240 140 320 170 375 C 205 405 275 390 320 320 C 350 250 345 170 295 135 C 255 110 220 140 240 190',
    duration: 1.05,
  },
  // 2. Diagonal Stem through 'D' connecting into cursive 'e - b - e - n - d - r - a' and tail flourish
  {
    path: 'M 50 420 C 140 365 240 295 340 230 C 355 210 372 195 365 218 C 385 175 402 105 408 105 C 400 155 415 205 425 195 C 438 180 448 170 442 192 C 458 165 462 185 472 155 C 475 165 478 178 488 170 C 485 182 498 185 510 160 C 518 70 525 50 525 50 C 518 100 522 155 530 170 C 540 155 552 148 556 165 C 562 150 562 168 575 168 C 585 145 635 105 725 48',
    duration: 1.6,
  },
  // 3. Dot 1
  {
    path: 'M 744 42 L 746 44',
    duration: 0.15,
    isDot: true,
  },
  // 4. Dot 2
  {
    path: 'M 764 30 L 766 32',
    duration: 0.15,
    isDot: true,
  },
  // 5. Underline Stroke beneath 'ebendra'
  {
    path: 'M 320 355 C 420 290 500 235 550 200',
    duration: 0.45,
  },
  // 6. Accent Mark on Underline
  {
    path: 'M 578 184 L 580 186',
    duration: 0.15,
    isDot: true,
  },
];

// Continuous master vector path for the full signature
const MASTER_SIGNATURE_PATH =
  'M 50 420 C 140 365 240 295 340 230 C 355 210 372 195 365 218 C 385 175 402 105 408 105 C 400 155 415 205 425 195 C 438 180 448 170 442 192 C 458 165 462 185 472 155 C 475 165 478 178 488 170 C 485 182 498 185 510 160 C 518 70 525 50 525 50 C 518 100 522 155 530 170 C 540 155 552 148 556 165 C 562 150 562 168 575 168 C 585 145 635 105 725 48 M 240 190 C 170 240 140 320 170 375 C 205 405 275 390 320 320 C 350 250 345 170 295 135 C 255 110 220 140 240 190 M 320 355 C 420 290 500 235 550 200';

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

    const sigWidth = 800;
    const sigHeight = 480;

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
            'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.35) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 75%)',
          opacity: isSigning ? 1 : isHovered ? 0.9 : 0.65,
        }}
      />

      {/* Main SVG Container */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 480"
        className="w-full h-full block relative z-10 overflow-visible"
      >
        <defs>
          {/* Gradient for Rich Gold-Amber Ink */}
          <linearGradient id="sig-debendra-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="45%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* SVG Mask that unmasks the signature as the pen moves */}
          <mask id="sig-debendra-mask">
            <rect width="800" height="480" fill="black" />
            {STROKE_SEGMENTS.map((seg, idx) => (
              <path
                key={`mask-debendra-${idx}`}
                ref={(el) => (pathRefs.current[idx] = el)}
                d={seg.path}
                fill="none"
                stroke="white"
                strokeWidth={seg.isDot ? 22 : 36}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </mask>
        </defs>

        {/* 1. Main Signature Glowing Ink Body */}
        <g mask="url(#sig-debendra-mask)">
          {/* Glowing outer shadow layer */}
          <path
            d={MASTER_SIGNATURE_PATH}
            fill="none"
            stroke="#ea580c"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
            className="drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]"
          />

          {/* Core vivid ink stroke */}
          <path
            d={MASTER_SIGNATURE_PATH}
            fill="none"
            stroke="url(#sig-debendra-grad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          />

          {/* White-hot highlight filament in center */}
          <path
            d={MASTER_SIGNATURE_PATH}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
            className="drop-shadow-[0_0_6px_#f97316]"
          />

          {/* Two accent dots & underline flourish */}
          <circle cx="745" cy="43" r="4.5" fill="#ffffff" className="drop-shadow-[0_0_6px_#f97316]" />
          <circle cx="765" cy="31" r="4.5" fill="#ffffff" className="drop-shadow-[0_0_6px_#f97316]" />
          <circle cx="579" cy="185" r="3.5" fill="#ffffff" className="drop-shadow-[0_0_6px_#f97316]" />
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
