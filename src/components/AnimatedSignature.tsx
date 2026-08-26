import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface StrokeSegment {
  path: string;
  duration: number; // seconds
  isDot?: boolean;
}

// 4 clean continuous strokes that trace the signature
const STROKE_SEGMENTS: StrokeSegment[] = [
  // 1. Sweeping Outer D Loop (Starts near top-center, sweeps CCW around the large loop)
  {
    path: "M 184 112 C 145 125 75 180 40 260 C 18 305 24 355 55 385 C 85 395 135 365 170 280 C 198 215 208 155 198 120 C 194 110 188 108 184 112",
    duration: 1.05,
  },
  // 2. Diagonal Stem & Upper Flourish (Starts bottom-left hook, sweeps up-right)
  {
    path: "M 54 232 C 60 250 80 290 98 308 C 108 300 125 255 155 200 C 195 135 250 80 290 50 C 304 40 310 44 309 52",
    duration: 0.9,
  },
  // 3. Cursive Name "ebendra" (Flows up the diagonal)
  {
    path: "M 96 278 C 102 260 108 250 104 266 C 112 248 120 232 118 252 C 126 236 134 220 130 240 C 140 218 148 202 152 214 C 158 192 165 172 162 198 C 168 182 176 170 178 182 C 182 170 186 164 186 166",
    duration: 0.8,
  },
  // 4. Dot 1
  {
    path: "M 212 128 L 214 130",
    duration: 0.16,
    isDot: true,
  },
  // 5. Dot 2
  {
    path: "M 220 118 L 222 120",
    duration: 0.16,
    isDot: true,
  },
];

// Exact authentic vector path of Debendra's signature
const AUTHENTIC_SIGNATURE_PATH =
  "M 32 312 L 28 313 Z M 176 162 L 174 162 L 170 167 L 163 168 L 161 170 L 157 171 L 157 181 L 154 186 L 149 182 L 148 178 L 144 178 L 144 181 L 147 188 L 145 198 L 141 193 L 139 187 L 137 185 L 133 185 L 133 188 L 139 197 L 140 202 L 139 205 L 137 203 L 134 204 L 133 214 L 128 215 L 127 223 L 125 225 L 121 225 L 120 233 L 115 232 L 115 236 L 113 240 L 109 242 L 110 247 L 109 250 L 104 250 L 103 257 L 100 257 L 100 264 L 102 266 L 105 266 L 107 264 L 109 256 L 114 255 L 113 246 L 116 243 L 122 241 L 125 231 L 129 230 L 130 225 L 136 218 L 136 216 L 143 212 L 145 203 L 148 204 L 150 202 L 151 197 L 150 192 L 152 191 L 154 193 L 156 193 L 158 191 L 161 183 L 163 183 L 166 180 L 166 177 L 176 166 Z M 209 129 L 210 133 L 214 132 L 214 129 L 212 128 Z M 216 118 L 217 122 L 221 122 L 221 117 Z M 303 39 L 296 36 L 285 36 L 272 40 L 262 45 L 246 55 L 222 73 L 182 110 L 172 107 L 158 108 L 143 112 L 124 121 L 98 140 L 80 159 L 64 180 L 40 221 L 23 263 L 17 288 L 17 305 L 19 310 L 23 313 L 19 308 L 18 304 L 18 292 L 23 269 L 28 254 L 42 221 L 56 196 L 80 162 L 105 137 L 125 123 L 149 112 L 158 110 L 177 110 L 179 111 L 180 113 L 151 144 L 114 192 L 96 220 L 77 257 L 75 259 L 68 250 L 57 232 L 53 233 L 53 235 L 58 240 L 74 262 L 59 301 L 49 341 L 48 349 L 49 371 L 53 380 L 57 384 L 62 386 L 68 386 L 75 384 L 84 379 L 103 363 L 123 341 L 143 315 L 162 285 L 163 281 L 166 278 L 175 261 L 175 259 L 185 239 L 193 217 L 199 196 L 199 191 L 201 187 L 203 174 L 204 154 L 201 132 L 193 117 L 185 111 L 186 109 L 208 87 L 211 86 L 224 74 L 229 71 L 231 68 L 237 65 L 239 62 L 256 51 L 271 43 L 285 38 L 296 38 L 301 40 L 306 45 L 309 53 L 309 48 L 306 42 Z M 184 113 L 194 122 L 199 134 L 201 142 L 201 175 L 197 196 L 192 214 L 180 246 L 172 261 L 172 263 L 154 295 L 135 323 L 119 343 L 98 365 L 86 375 L 75 382 L 69 384 L 61 384 L 54 378 L 51 372 L 49 355 L 51 338 L 56 316 L 72 270 L 77 266 L 86 280 L 94 296 L 101 306 L 101 302 L 98 299 L 98 297 L 93 290 L 89 281 L 77 262 L 80 253 L 87 241 L 87 238 L 91 234 L 103 212 L 108 206 L 110 201 L 114 197 L 117 191 L 123 184 L 124 181 L 131 173 L 131 171 L 133 170 L 156 141 L 166 131 L 167 128 L 182 113 Z";

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

  // Stroke lengths cache
  const strokeLengthsRef = useRef<number[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Total signing duration
  const totalDuration = STROKE_SEGMENTS.reduce((acc, s) => acc + s.duration, 0) + 0.25;

  const startSigning = () => {
    setIsSigning(true);
    setHasCompleted(false);
    startTimeRef.current = null;
    particlesRef.current = [];

    // Reset stroke dashoffsets
    pathRefs.current.forEach((p, idx) => {
      if (p) {
        const len = strokeLengthsRef.current[idx] || p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      }
    });
  };

  useEffect(() => {
    // Measure lengths on mount
    pathRefs.current.forEach((p, idx) => {
      if (p) {
        const len = p.getTotalLength();
        strokeLengthsRef.current[idx] = len;
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      }
    });

    // Auto-trigger signing after page load
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

    const sigWidth = 347;
    const sigHeight = 415;

    const render = (time: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = time;
      }

      const elapsed = (time - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / totalDuration, 1);

      // Handle retina canvas sizing
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
      let penAngle = -0.65; // Default natural pen slant angle in radians
      let isPenWriting = false;

      // Update each stroke path's dashoffset
      for (let i = 0; i < STROKE_SEGMENTS.length; i++) {
        const seg = STROKE_SEGMENTS[i];
        const segStart = accumulatedTime;
        const segEnd = segStart + seg.duration;
        accumulatedTime = segEnd;

        const pathEl = pathRefs.current[i];
        const len = strokeLengthsRef.current[i] || (pathEl ? pathEl.getTotalLength() : 100);

        if (elapsed < segStart) {
          // Hasn't started yet
          if (pathEl) {
            pathEl.style.strokeDashoffset = `${len}`;
          }
        } else if (elapsed >= segEnd) {
          // Finished this stroke
          if (pathEl) {
            pathEl.style.strokeDashoffset = '0';
          }
        } else {
          // Currently writing this stroke
          const strokeElapsed = elapsed - segStart;
          const strokeProgress = strokeElapsed / seg.duration;
          const currentOffset = len * (1 - strokeProgress);

          if (pathEl) {
            pathEl.style.strokeDashoffset = `${currentOffset}`;

            // Get exact sub-pixel point along the bezier path
            const currentDist = len * strokeProgress;
            const pt = pathEl.getPointAtLength(Math.min(currentDist, len));
            activePenPos = { x: pt.x, y: pt.y };
            isPenWriting = true;

            // Calculate tangent angle for realistic pen nib tilt
            if (currentDist > 2 && currentDist < len - 2) {
              const ptPrev = pathEl.getPointAtLength(currentDist - 2);
              const ptNext = pathEl.getPointAtLength(currentDist + 2);
              const dx = ptNext.x - ptPrev.x;
              const dy = ptNext.y - ptPrev.y;
              if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                penAngle = Math.atan2(dy, dx) - Math.PI / 2.8;
              }
            }
          }
        }
      }

      // Check if finished all strokes
      if (progress >= 1 && !hasCompleted) {
        setHasCompleted(true);
        setIsSigning(false);
      }

      // Emit fine golden ink sparks at pen contact point
      if (isPenWriting && activePenPos) {
        if (Math.random() < 0.5) {
          particlesRef.current.push({
            x: activePenPos.x,
            y: activePenPos.y,
            vx: (Math.random() - 0.5) * 2.8,
            vy: (Math.random() - 0.7) * 2.8,
            size: Math.random() * 2.0 + 1.0,
            alpha: 1,
            decay: Math.random() * 0.045 + 0.03,
            color: Math.random() > 0.35 ? '#fbbf24' : '#ffffff',
          });
        }
      }

      // Render spark particles
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
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render the realistic animated Pen Stylus / Nib
      if (isPenWriting && activePenPos) {
        ctx.save();
        ctx.translate(activePenPos.x, activePenPos.y);
        ctx.rotate(penAngle);

        // 1. Radiant Pen Laser Flare
        const flare = ctx.createRadialGradient(0, 0, 0, 0, 0, 14);
        flare.addColorStop(0, '#ffffff');
        flare.addColorStop(0.3, 'rgba(251, 191, 36, 0.95)');
        flare.addColorStop(0.7, 'rgba(249, 115, 22, 0.4)');
        flare.addColorStop(1, 'transparent');
        ctx.fillStyle = flare;
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();

        // 2. White-hot pen nib contact point
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // 3. Fountain Pen Chrome Nib Body
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(4.5, -12);
        ctx.lineTo(-4.5, -12);
        ctx.closePath();
        ctx.fill();

        // 4. Gold Nib Breather Hole & Collar
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(0, -7, 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(-4.5, -16, 9, 4);

        // 5. Stylus Shaft Body
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-4, -40, 8, 24);

        // Metallic chrome highlight along shaft
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fillRect(-1.2, -40, 1.8, 24);

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
        className="absolute -inset-3 rounded-2xl blur-xl transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.32) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 75%)',
          opacity: isSigning ? 1 : isHovered ? 0.85 : 0.6,
        }}
      />

      {/* Main SVG Container */}
      <svg
        ref={svgRef}
        viewBox="0 0 347 415"
        className="w-full h-full block relative z-10 overflow-visible"
      >
        <defs>
          {/* Linear Gradient for Rich Gold-Amber Ink */}
          <linearGradient id="sig-ink-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* SVG Mask that reveals the authentic signature as the pen moves */}
          <mask id="authentic-sig-mask">
            <rect width="347" height="415" fill="black" />
            {STROKE_SEGMENTS.map((seg, idx) => (
              <path
                key={`mask-seg-${idx}`}
                ref={(el) => (pathRefs.current[idx] = el)}
                d={seg.path}
                fill="none"
                stroke="white"
                strokeWidth={seg.isDot ? 16 : 28}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </mask>
        </defs>

        {/* 1. Masked Authentic High-Fidelity Vector Signature */}
        <path
          d={AUTHENTIC_SIGNATURE_PATH}
          fill="url(#sig-ink-grad)"
          mask="url(#authentic-sig-mask)"
          className="drop-shadow-[0_0_10px_rgba(249,115,22,0.7)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
        />

        {/* 2. White-Hot Accent Filament Stroke Overlay for radiant glow */}
        <g mask="url(#authentic-sig-mask)" opacity="0.85">
          {STROKE_SEGMENTS.map((seg, idx) => (
            <path
              key={`filament-${idx}`}
              d={seg.path}
              fill="none"
              stroke="#ffffff"
              strokeWidth={seg.isDot ? 2.5 : 1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_6px_#f97316]"
            />
          ))}
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
