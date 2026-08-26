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

// Precise sequential stroke paths extracted directly from Debendra's handwritten signature
const STROKE_SEQUENCE: StrokeData[] = [
  // 1. Big "D" outer sweeping loop
  {
    name: 'loop',
    duration: 1.1,
    points: [
      { x: 185, y: 110 }, { x: 165, y: 118 }, { x: 142, y: 132 }, { x: 118, y: 154 },
      { x: 92, y: 182 }, { x: 68, y: 218 }, { x: 48, y: 258 }, { x: 34, y: 298 },
      { x: 28, y: 334 }, { x: 36, y: 364 }, { x: 54, y: 382 }, { x: 80, y: 384 },
      { x: 110, y: 368 }, { x: 138, y: 332 }, { x: 162, y: 288 }, { x: 182, y: 238 },
      { x: 196, y: 188 }, { x: 202, y: 148 }, { x: 198, y: 122 }, { x: 185, y: 110 }
    ],
  },
  // 2. Diagonal stem and upper flourish
  {
    name: 'stem',
    duration: 0.95,
    points: [
      { x: 54, y: 232 }, { x: 62, y: 248 }, { x: 74, y: 272 }, { x: 88, y: 296 },
      { x: 98, y: 308 }, { x: 104, y: 298 }, { x: 116, y: 272 }, { x: 134, y: 236 },
      { x: 156, y: 194 }, { x: 182, y: 154 }, { x: 212, y: 118 }, { x: 244, y: 88 },
      { x: 272, y: 64 }, { x: 294, y: 46 }, { x: 306, y: 42 }, { x: 309, y: 52 }
    ],
  },
  // 3. Inner cursive letters "ebendra"
  {
    name: 'text',
    duration: 0.85,
    points: [
      { x: 96, y: 278 }, { x: 102, y: 264 }, { x: 108, y: 252 }, { x: 104, y: 268 },
      { x: 112, y: 250 }, { x: 120, y: 234 }, { x: 118, y: 252 }, { x: 126, y: 238 },
      { x: 134, y: 222 }, { x: 130, y: 240 }, { x: 140, y: 220 }, { x: 146, y: 204 },
      { x: 150, y: 214 }, { x: 156, y: 194 }, { x: 163, y: 172 }, { x: 160, y: 198 },
      { x: 168, y: 184 }, { x: 174, y: 172 }, { x: 176, y: 180 }, { x: 184, y: 166 }
    ],
  },
  // 4. Dot 1
  {
    name: 'dot1',
    duration: 0.18,
    isDot: true,
    points: [{ x: 212, y: 128 }, { x: 214, y: 130 }],
  },
  // 5. Dot 2
  {
    name: 'dot2',
    duration: 0.18,
    isDot: true,
    points: [{ x: 220, y: 118 }, { x: 222, y: 120 }],
  },
];

// Helper: interpolate smooth point along an array of points
function getInterpolatedPoint(pts: Point[], t: number): Point {
  if (pts.length === 1) return pts[0];
  if (t <= 0) return pts[0];
  if (t >= 1) return pts[pts.length - 1];

  const totalSegments = pts.length - 1;
  const rawIndex = t * totalSegments;
  const idx = Math.floor(rawIndex);
  const frac = rawIndex - idx;

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Particle sparks system for the glowing pen nib
  const particlesRef = useRef<Particle[]>([]);

  // Trigger signature drawing
  const startSigning = () => {
    setIsSigning(true);
    setHasCompleted(false);
    startTimeRef.current = null;
    particlesRef.current = [];
  };

  useEffect(() => {
    // Initial entrance delay for smooth page load
    const timer = setTimeout(() => {
      startSigning();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Viewbox width & height of the authentic signature
    const sigWidth = 347;
    const sigHeight = 415;

    // Total duration calculation
    const totalDuration = STROKE_SEQUENCE.reduce((acc, s) => acc + s.duration, 0) + 0.35; // with pause

    const render = (time: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = time;
      }

      const elapsed = (time - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / totalDuration, 1);

      // Handle canvas resolution
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Scale signature coordinate space to canvas element size
      const scaleX = rect.width / sigWidth;
      const scaleY = rect.height / sigHeight;
      const scale = Math.min(scaleX, scaleY);
      const offsetX = (rect.width - sigWidth * scale) / 2;
      const offsetY = (rect.height - sigHeight * scale) / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      // Calculate which stroke we are currently drawing
      let accumulatedTime = 0;
      let penPos: Point | null = null;
      let isPenActive = false;

      // Draw each stroke up to current progress
      for (let i = 0; i < STROKE_SEQUENCE.length; i++) {
        const stroke = STROKE_SEQUENCE[i];
        const strokeStart = accumulatedTime;
        const strokeEnd = strokeStart + stroke.duration;
        accumulatedTime = strokeEnd;

        if (elapsed < strokeStart) {
          // Has not started this stroke yet
          continue;
        }

        const strokeElapsed = elapsed - strokeStart;
        const strokeProgress = Math.min(strokeElapsed / stroke.duration, 1);

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Radiant golden-amber ink glow
        ctx.shadowColor = 'rgba(249, 115, 22, 0.75)';
        ctx.shadowBlur = 12;

        if (stroke.isDot) {
          if (strokeProgress > 0.3) {
            const pt = stroke.points[0];
            const radius = stroke.name === 'dot1' ? 3.8 : 3.4;

            // Outer golden halo
            ctx.fillStyle = '#f97316';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, radius + 1.2, 0, Math.PI * 2);
            ctx.fill();

            // White hot core
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
            ctx.fill();

            penPos = pt;
            isPenActive = strokeProgress < 0.95;
          }
        } else {
          // Draw polyline up to current progress
          const numPts = stroke.points.length;
          const currentPointCount = Math.max(2, Math.floor(strokeProgress * numPts));
          const subPts = stroke.points.slice(0, currentPointCount);

          // Get exact fractional tip position
          const currentTip = getInterpolatedPoint(stroke.points, strokeProgress);
          subPts.push(currentTip);

          if (subPts.length >= 2) {
            // Background outer flame aura
            ctx.strokeStyle = 'rgba(249, 115, 22, 0.45)';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(subPts[0].x, subPts[0].y);
            for (let p = 1; p < subPts.length; p++) {
              ctx.lineTo(subPts[p].x, subPts[p].y);
            }
            ctx.stroke();

            // Main glowing golden stroke
            ctx.strokeStyle = '#f97316';
            ctx.lineWidth = 3.4;
            ctx.beginPath();
            ctx.moveTo(subPts[0].x, subPts[0].y);
            for (let p = 1; p < subPts.length; p++) {
              ctx.lineTo(subPts[p].x, subPts[p].y);
            }
            ctx.stroke();

            // White-hot filament highlight in center of ink
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(subPts[0].x, subPts[0].y);
            for (let p = 1; p < subPts.length; p++) {
              ctx.lineTo(subPts[p].x, subPts[p].y);
            }
            ctx.stroke();
          }

          if (strokeProgress < 1) {
            penPos = currentTip;
            isPenActive = true;
          }
        }

        ctx.restore();
      }

      // If animation has finished all strokes
      if (progress >= 1 && !hasCompleted) {
        setHasCompleted(true);
        setIsSigning(false);
      }

      // Spawn spark particles while pen is active
      if (isPenActive && penPos) {
        if (Math.random() < 0.6) {
          particlesRef.current.push({
            x: penPos.x,
            y: penPos.y,
            vx: (Math.random() - 0.5) * 3.5,
            vy: (Math.random() - 0.7) * 3.5,
            size: Math.random() * 2.5 + 1.2,
            alpha: 1,
            decay: Math.random() * 0.04 + 0.03,
            color: Math.random() > 0.4 ? '#fbbf24' : '#ffffff',
          });
        }
      }

      // Update and render spark particles
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

      // Render the animated Glowing Pen Stylus / Nib
      if (isPenActive && penPos) {
        ctx.save();
        ctx.translate(penPos.x, penPos.y);

        // Pen angle: tilted diagonally like held in right hand (-32 degrees)
        ctx.rotate(-Math.PI / 5.5);

        // 1. Radiant Pen Laser Flare
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, 'rgba(251, 191, 36, 0.9)');
        grad.addColorStop(0.7, 'rgba(249, 115, 22, 0.4)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();

        // 2. White-hot contact nib
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // 3. Metallic Pen Nib Body (Extending up-right)
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(5, -14);
        ctx.lineTo(-5, -14);
        ctx.closePath();
        ctx.fill();

        // 4. Gold collar & pen shaft
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(-4.5, -18, 9, 4);

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(-4, -42, 8, 24);

        // Subtle chrome highlight on stylus shaft
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(-1.5, -42, 2, 24);

        ctx.restore();
      }

      ctx.restore();

      // Continue animation loop if still signing or particles exist
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
      {/* Ambient Atmospheric Glow behind Signature */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.28) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 75%)',
          opacity: isSigning ? 1 : isHovered ? 0.9 : 0.65,
        }}
      />

      {/* Vector Signature Overlay (Renders complete high-fidelity crisp SVG once finished) */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          hasCompleted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg
          viewBox="0 0 347 415"
          className="w-full h-full text-accent-orange drop-shadow-[0_0_12px_rgba(249,115,22,0.65)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          fill="currentColor"
        >
          {/* Authentic exact vector path of Debendra's signature */}
          <path
            d="M 32 312 L 28 313 Z M 176 162 L 174 162 L 170 167 L 163 168 L 161 170 L 157 171 L 157 181 L 154 186 L 149 182 L 148 178 L 144 178 L 144 181 L 147 188 L 145 198 L 141 193 L 139 187 L 137 185 L 133 185 L 133 188 L 139 197 L 140 202 L 139 205 L 137 203 L 134 204 L 133 214 L 128 215 L 127 223 L 125 225 L 121 225 L 120 233 L 115 232 L 115 236 L 113 240 L 109 242 L 110 247 L 109 250 L 104 250 L 103 257 L 100 257 L 100 264 L 102 266 L 105 266 L 107 264 L 109 256 L 114 255 L 113 246 L 116 243 L 122 241 L 125 231 L 129 230 L 130 225 L 136 218 L 136 216 L 143 212 L 145 203 L 148 204 L 150 202 L 151 197 L 150 192 L 152 191 L 154 193 L 156 193 L 158 191 L 161 183 L 163 183 L 166 180 L 166 177 L 176 166 Z M 209 129 L 210 133 L 214 132 L 214 129 L 212 128 Z M 216 118 L 217 122 L 221 122 L 221 117 Z M 303 39 L 296 36 L 285 36 L 272 40 L 262 45 L 246 55 L 222 73 L 182 110 L 172 107 L 158 108 L 143 112 L 124 121 L 98 140 L 80 159 L 64 180 L 40 221 L 23 263 L 17 288 L 17 305 L 19 310 L 23 313 L 19 308 L 18 304 L 18 292 L 23 269 L 28 254 L 42 221 L 56 196 L 80 162 L 105 137 L 125 123 L 149 112 L 158 110 L 177 110 L 179 111 L 180 113 L 151 144 L 114 192 L 96 220 L 77 257 L 75 259 L 68 250 L 57 232 L 53 233 L 53 235 L 58 240 L 74 262 L 59 301 L 49 341 L 48 349 L 49 371 L 53 380 L 57 384 L 62 386 L 68 386 L 75 384 L 84 379 L 103 363 L 123 341 L 143 315 L 162 285 L 163 281 L 166 278 L 175 261 L 175 259 L 185 239 L 193 217 L 199 196 L 199 191 L 201 187 L 203 174 L 204 154 L 201 132 L 193 117 L 185 111 L 186 109 L 208 87 L 211 86 L 224 74 L 229 71 L 231 68 L 237 65 L 239 62 L 256 51 L 271 43 L 285 38 L 296 38 L 301 40 L 306 45 L 309 53 L 309 48 L 306 42 Z M 184 113 L 194 122 L 199 134 L 201 142 L 201 175 L 197 196 L 192 214 L 180 246 L 172 261 L 172 263 L 154 295 L 135 323 L 119 343 L 98 365 L 86 375 L 75 382 L 69 384 L 61 384 L 54 378 L 51 372 L 49 355 L 51 338 L 56 316 L 72 270 L 77 266 L 86 280 L 94 296 L 101 306 L 101 302 L 98 299 L 98 297 L 93 290 L 89 281 L 77 262 L 80 253 L 87 241 L 87 238 L 91 234 L 103 212 L 108 206 L 110 201 L 114 197 L 117 191 L 123 184 L 124 181 L 131 173 L 131 171 L 133 170 L 156 141 L 166 131 L 167 128 L 182 113 Z"
            fillRule="evenodd"
          />
        </svg>
      </div>

      {/* Dynamic Animated Pen Drawing Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10"
        style={{ filter: 'drop-shadow(0 0 10px rgba(249,115,22,0.45))' }}
      />

      {/* Floating Status / Replay Badge */}
      <div
        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111116]/80 backdrop-blur-md border border-white/10 text-slate-300 transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        <RotateCcw size={10} className="text-accent-orange" />
        <span className="font-mono text-[0.62rem] font-medium tracking-wider uppercase">
          {isSigning ? 'Signing...' : 'Click to Sign'}
        </span>
      </div>
    </div>
  );
};
