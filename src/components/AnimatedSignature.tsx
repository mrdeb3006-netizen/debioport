import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface StrokeData {
  name: string;
  points: Point[];
  duration: number; // in seconds
  isDot?: boolean;
}

// Master Parametric Calligraphy Points for 'Debendra'
const CALLIGRAPHY_STROKES: StrokeData[] = [
  // 1. The Grand Cursive 'D' Bowl & Loop
  {
    name: 'd_loop',
    duration: 1.1,
    points: [
      { x: 245, y: 175 }, { x: 232, y: 188 }, { x: 215, y: 206 }, { x: 198, y: 226 },
      { x: 182, y: 248 }, { x: 168, y: 272 }, { x: 158, y: 298 }, { x: 154, y: 324 },
      { x: 156, y: 348 }, { x: 165, y: 368 }, { x: 182, y: 382 }, { x: 204, y: 390 },
      { x: 228, y: 392 }, { x: 252, y: 384 }, { x: 274, y: 368 }, { x: 292, y: 346 },
      { x: 308, y: 320 }, { x: 320, y: 290 }, { x: 326, y: 258 }, { x: 326, y: 226 },
      { x: 320, y: 196 }, { x: 308, y: 170 }, { x: 292, y: 150 }, { x: 272, y: 142 },
      { x: 252, y: 148 }, { x: 242, y: 162 }, { x: 245, y: 175 },
    ],
  },
  // 2. Diagonal Stem through 'D' connecting into cursive 'e - b - e - n - d - r - a' + tail
  {
    name: 'debendra_word',
    duration: 1.85,
    points: [
      // Starting diagonal slash through D
      { x: 45, y: 415 }, { x: 72, y: 398 }, { x: 104, y: 378 }, { x: 138, y: 358 },
      { x: 174, y: 338 }, { x: 212, y: 314 }, { x: 250, y: 290 }, { x: 284, y: 266 },
      { x: 314, y: 242 }, { x: 338, y: 225 },
      // 'e' loop
      { x: 350, y: 206 }, { x: 364, y: 194 }, { x: 368, y: 204 }, { x: 362, y: 216 },
      { x: 372, y: 210 },
      // 'b' tall loop
      { x: 382, y: 178 }, { x: 392, y: 142 }, { x: 402, y: 112 }, { x: 408, y: 100 },
      { x: 404, y: 128 }, { x: 398, y: 162 }, { x: 408, y: 192 }, { x: 418, y: 204 },
      { x: 426, y: 192 },
      // 'e' loop
      { x: 434, y: 180 }, { x: 446, y: 168 }, { x: 448, y: 178 }, { x: 442, y: 190 },
      { x: 448, y: 184 },
      // 'n' twin arches
      { x: 454, y: 166 }, { x: 460, y: 184 }, { x: 466, y: 162 }, { x: 472, y: 176 },
      // 'd' oval bowl & tall loop
      { x: 484, y: 166 }, { x: 480, y: 178 }, { x: 494, y: 182 }, { x: 506, y: 142 },
      { x: 518, y: 88 }, { x: 526, y: 48 }, { x: 522, y: 82 }, { x: 518, y: 130 },
      { x: 526, y: 170 },
      // 'r' shoulder
      { x: 536, y: 156 }, { x: 548, y: 148 }, { x: 556, y: 164 },
      // 'a' oval & sweeping tail
      { x: 566, y: 150 }, { x: 562, y: 166 }, { x: 574, y: 168 }, { x: 585, y: 148 },
      { x: 610, y: 128 }, { x: 642, y: 102 }, { x: 680, y: 72 }, { x: 730, y: 42 },
    ],
  },
  // 3. Dot 1
  {
    name: 'dot1',
    duration: 0.14,
    isDot: true,
    points: [{ x: 748, y: 38 }, { x: 750, y: 40 }],
  },
  // 4. Dot 2
  {
    name: 'dot2',
    duration: 0.14,
    isDot: true,
    points: [{ x: 768, y: 26 }, { x: 770, y: 28 }],
  },
  // 5. Underline Stroke
  {
    name: 'underline',
    duration: 0.45,
    points: [
      { x: 310, y: 358 }, { x: 355, y: 328 }, { x: 405, y: 294 }, { x: 460, y: 256 },
      { x: 510, y: 220 }, { x: 545, y: 195 },
    ],
  },
  // 6. Star / Accent Mark on Underline
  {
    name: 'star_mark',
    duration: 0.14,
    isDot: true,
    points: [{ x: 574, y: 182 }, { x: 576, y: 184 }],
  },
];

// Helper: Smooth point interpolation
function getInterpolatedPoint(pts: Point[], t: number): Point {
  if (pts.length === 1) return pts[0];
  if (t <= 0) return pts[0];
  if (t >= 1) return pts[pts.length - 1];

  const totalSegments = pts.length - 1;
  const rawIdx = t * totalSegments;
  const idx = Math.floor(rawIdx);
  const frac = rawIdx - idx;

  if (idx >= totalSegments) return pts[pts.length - 1];

  const p0 = pts[idx];
  const p1 = pts[idx + 1];
  return {
    x: p0.x + (p1.x - p0.x) * frac,
    y: p0.y + (p1.y - p0.y) * frac,
  };
}

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isSigning, setIsSigning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Total duration of complete signature writing
  const totalDuration =
    CALLIGRAPHY_STROKES.reduce((acc, s) => acc + s.duration, 0) + 0.35;

  const startSigning = () => {
    setIsSigning(true);
    setHasCompleted(false);
    startTimeRef.current = null;
    particlesRef.current = [];
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startSigning();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const sigWidth = 800;
    const sigHeight = 450;

    const render = (time: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = time;
      }

      const elapsed = (time - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / totalDuration, 1);

      // Retina display handling
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
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
      let activePenPos: Point | null = null;
      let penAngle = -0.55;
      let isPenWriting = false;

      // Draw each stroke progressively
      for (let i = 0; i < CALLIGRAPHY_STROKES.length; i++) {
        const stroke = CALLIGRAPHY_STROKES[i];
        const strokeStart = accumulatedTime;
        const strokeEnd = strokeStart + stroke.duration;
        accumulatedTime = strokeEnd;

        if (elapsed < strokeStart) {
          continue;
        }

        const strokeElapsed = elapsed - strokeStart;
        const strokeProgress = Math.min(strokeElapsed / stroke.duration, 1);

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (stroke.isDot) {
          if (strokeProgress > 0.25) {
            const pt = stroke.points[0];
            const radius = stroke.name.startsWith('dot') ? 4.5 : 3.5;

            // 1. Ambient Glow Halo
            ctx.shadowColor = '#f97316';
            ctx.shadowBlur = 12;
            ctx.fillStyle = '#ea580c';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, radius + 1.5, 0, Math.PI * 2);
            ctx.fill();

            // 2. Radiant Golden Ring
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
            ctx.fill();

            // 3. White-Hot Incandescent Core
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, radius * 0.55, 0, Math.PI * 2);
            ctx.fill();

            activePenPos = pt;
            isPenWriting = strokeProgress < 0.95;
          }
        } else {
          // Continuous spline drawing
          const numPts = stroke.points.length;
          const currentCount = Math.max(2, Math.floor(strokeProgress * numPts));
          const subPts = stroke.points.slice(0, currentCount);

          const currentTip = getInterpolatedPoint(stroke.points, strokeProgress);
          subPts.push(currentTip);

          if (subPts.length >= 2) {
            // Function to draw smooth quadratic bezier curve
            const drawSpline = () => {
              ctx.beginPath();
              ctx.moveTo(subPts[0].x, subPts[0].y);
              for (let p = 1; p < subPts.length - 1; p++) {
                const xc = (subPts[p].x + subPts[p + 1].x) / 2;
                const yc = (subPts[p].y + subPts[p + 1].y) / 2;
                ctx.quadraticCurveTo(subPts[p].x, subPts[p].y, xc, yc);
              }
              ctx.lineTo(subPts[subPts.length - 1].x, subPts[subPts.length - 1].y);
            };

            // Layer 1: Ambient fiery orange aura
            ctx.shadowColor = '#f97316';
            ctx.shadowBlur = 14;
            ctx.strokeStyle = 'rgba(234, 88, 12, 0.45)';
            ctx.lineWidth = stroke.name === 'underline' ? 5.5 : 7.0;
            drawSpline();
            ctx.stroke();

            // Layer 2: Main Rich Golden-Amber Liquid Ink
            const inkGrad = ctx.createLinearGradient(0, 450, 800, 0);
            inkGrad.addColorStop(0, '#ea580c');
            inkGrad.addColorStop(0.5, '#f97316');
            inkGrad.addColorStop(1, '#fbbf24');

            ctx.shadowBlur = 8;
            ctx.strokeStyle = inkGrad;
            ctx.lineWidth = stroke.name === 'underline' ? 3.4 : 4.2;
            drawSpline();
            ctx.stroke();

            // Layer 3: White-Hot Filament Core
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#ffffff';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.4;
            drawSpline();
            ctx.stroke();
          }

          if (strokeProgress < 1) {
            activePenPos = currentTip;
            isPenWriting = true;

            // Compute tangent angle for natural pen slant
            if (subPts.length >= 2) {
              const pA = subPts[subPts.length - 2];
              const pB = subPts[subPts.length - 1];
              const dx = pB.x - pA.x;
              const dy = pB.y - pA.y;
              if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                penAngle = Math.atan2(dy, dx) - Math.PI / 2.6;
              }
            }
          }
        }

        ctx.restore();
      }

      if (progress >= 1 && !hasCompleted) {
        setHasCompleted(true);
        setIsSigning(false);
      }

      // Spawn glowing spark particles while pen is active
      if (isPenWriting && activePenPos) {
        if (Math.random() < 0.6) {
          particlesRef.current.push({
            x: activePenPos.x,
            y: activePenPos.y,
            vx: (Math.random() - 0.5) * 3.5,
            vy: (Math.random() - 0.7) * 3.5,
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

      // Render 3D Animated Luxury Fountain Pen Nib
      if (isPenWriting && activePenPos) {
        ctx.save();
        ctx.translate(activePenPos.x, activePenPos.y);
        ctx.rotate(penAngle);

        // 1. Radiant Pen Laser Contact Flare
        const flare = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
        flare.addColorStop(0, '#ffffff');
        flare.addColorStop(0.3, 'rgba(251, 191, 36, 0.95)');
        flare.addColorStop(0.7, 'rgba(249, 115, 22, 0.4)');
        flare.addColorStop(1, 'transparent');
        ctx.fillStyle = flare;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();

        // 2. White-hot contact nib tip
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 10;
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
        className="absolute -inset-4 rounded-3xl blur-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.38) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 75%)',
          opacity: isSigning ? 1 : isHovered ? 0.95 : 0.7,
        }}
      />

      {/* Main High-Performance Canvas for Calligraphy & Pen */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10"
        style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.95))' }}
      />

      {/* Subtle Mini Tooltip on Hover */}
      <div
        className={`absolute -bottom-5 right-2 z-30 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0d0e12]/85 backdrop-blur-md border border-white/10 text-slate-300 transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        <RotateCcw size={9} className="text-accent-orange" />
        <span className="font-mono text-[0.60rem] font-semibold tracking-wider uppercase">
          {isSigning ? 'Signing...' : 'Re-sign'}
        </span>
      </div>
    </div>
  );
};
