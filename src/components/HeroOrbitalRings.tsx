import React, { useEffect, useRef } from 'react';

interface HeroOrbitalRingsProps {
  className?: string;
}

// Authentic Eldritch, Tao Mandala & Sacred Mathematical Runes
const RUNES = [
  'ᛟ', '⊘', '∇', 'ᚱ', '⊕', '∰', 'ᛊ', '⊗', '∆', 'ᚦ',
  '⊙', 'ℵ', 'ᚹ', '⊚', '∞', 'ᚲ', '⊛', '∿', 'ᛞ', '⊜',
  '≈', 'ᛗ', '⊝', '≢', 'ᛉ', '⊞', '≤', 'ᛏ', '⊟', '≥',
  'ᛒ', '⊠', '⊸', 'ᛖ', '⊡', '⊹', 'ᛚ', '∯', '⋈', 'ᛦ',
  '⊶', '⊷', '⋀', '⋁', '⋆', '⋇', '⋍', '⋎', '⋘', '⋙'
];

interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  depth: number;
  alpha: number;
}

interface Spark {
  progress: number;
  speed: number;
  size: number;
  offset: number;
  alpha: number;
  pulsePhase: number;
  tailLength: number;
}

interface RingConfig {
  radius: number;
  bandWidth: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  speed: number;
  currentAngle: number;
  symbols: string[];
  glyphCount: number;
  sparks: Spark[];
  colorTheme: {
    core: string;
    mid: string;
    glow: string;
    rail: string;
  };
}

export const HeroOrbitalRings: React.FC<HeroOrbitalRingsProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Anchor center for the portrait head in the Hero background
    let centerX = 0;
    let centerY = 0;
    let scale = 1;

    // Smooth mouse parallax
    const mouse = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
      const ny = (e.clientY - rect.top) / (rect.height || 1) - 0.5;
      mouse.x = nx * 0.22;
      mouse.y = -ny * 0.22;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Ambient floating cosmic sparks
    const ambientEmbers = Array.from({ length: 60 }, () => ({
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 600,
      z: (Math.random() - 0.5) * 400,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.1, // subtle upward drift
      vz: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2.2 + 0.8,
      baseAlpha: Math.random() * 0.75 + 0.25,
      phase: Math.random() * Math.PI * 2,
    }));

    const createSparks = (count: number): Spark[] => {
      return Array.from({ length: count }, () => ({
        progress: Math.random(),
        speed: (Math.random() * 0.0025 + 0.0018) * (Math.random() > 0.3 ? 1 : -1),
        size: Math.random() * 2.8 + 1.2,
        offset: (Math.random() - 0.5) * 24,
        alpha: Math.random() * 0.8 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        tailLength: Math.random() * 0.025 + 0.01,
      }));
    };

    // 2 Major Intersecting Fiery Doctor Strange Rings + 1 Accent Celestial Loop
    const rings: RingConfig[] = [
      // Ring 1: Primary Descending Diagonal Orbit (Top-Left to Bottom-Right across chin/neck)
      {
        radius: 225,
        bandWidth: 42,
        rotX: 1.10, // ~63 deg
        rotY: -0.44, // ~ -25 deg
        rotZ: 0.62, // ~ 35 deg
        speed: reducedMotion ? 0 : 0.0036,
        currentAngle: 0,
        symbols: RUNES,
        glyphCount: 38,
        sparks: createSparks(36),
        colorTheme: {
          core: '#fffbeb',
          mid: '#fbbf24',
          glow: '#f97316',
          rail: '#ffd166',
        },
      },
      // Ring 2: Primary Ascending Diagonal Orbit (Bottom-Left to Top-Right across face)
      {
        radius: 235,
        bandWidth: 40,
        rotX: 1.15, // ~66 deg
        rotY: 0.46, // ~ 26 deg
        rotZ: -0.64, // ~ -37 deg
        speed: reducedMotion ? 0 : -0.0032,
        currentAngle: Math.PI * 0.5,
        symbols: [...RUNES].reverse(),
        glyphCount: 36,
        sparks: createSparks(34),
        colorTheme: {
          core: '#fff7ed',
          mid: '#f59e0b',
          glow: '#ea580c',
          rail: '#fbbf24',
        },
      },
      // Ring 3: Subtle Equatorial Celestial Armillary Loop
      {
        radius: 260,
        bandWidth: 18,
        rotX: 1.36, // ~78 deg
        rotY: 0.10, // ~ 6 deg
        rotZ: 0.18, // ~ 10 deg
        speed: reducedMotion ? 0 : 0.0018,
        currentAngle: Math.PI * 0.8,
        symbols: ['⊕', '⊘', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '∇', '∆', '∞'],
        glyphCount: 16,
        sparks: createSparks(22),
        colorTheme: {
          core: '#ffffff',
          mid: '#f97316',
          glow: '#dc2626',
          rail: '#fed7aa',
        },
      },
    ];

    const resize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Match face center in hero-bg.jpg across all screen breakpoints
      if (width >= 1440) {
        centerX = width * 0.77;
        centerY = height * 0.49;
        scale = Math.min(1.15, Math.max(0.95, width / 1600));
      } else if (width >= 1024) {
        centerX = width * 0.76;
        centerY = height * 0.49;
        scale = 0.95;
      } else if (width >= 768) {
        centerX = width * 0.75;
        centerY = height * 0.49;
        scale = 0.80;
      } else {
        centerX = width * 0.74;
        centerY = height * 0.43;
        scale = Math.min(0.65, Math.max(0.48, width / 550));
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const fov = 850;

    const project3D = (
      x0: number,
      y0: number,
      z0: number,
      rx: number,
      ry: number,
      rz: number
    ): ProjectedPoint => {
      // Rotate Z
      const cz = Math.cos(rz);
      const sz = Math.sin(rz);
      const x1 = x0 * cz - y0 * sz;
      const y1 = x0 * sz + y0 * cz;
      const z1 = z0;

      // Rotate X
      const cx = Math.cos(rx);
      const sx = Math.sin(rx);
      const x2 = x1;
      const y2 = y1 * cx - z1 * sx;
      const z2 = y1 * sx + z1 * cx;

      // Rotate Y
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);
      const x3 = x2 * cy + z2 * sy;
      const y3 = y2;
      const z3 = -x2 * sy + z2 * cy;

      // Perspective Projection
      const depth = fov / (fov - z3);
      const screenX = centerX + x3 * depth;
      const screenY = centerY + y3 * depth;

      // Normalized Z: -1 (deep back) to +1 (front close to camera)
      const maxZ = 250;
      const normZ = Math.max(-1, Math.min(1, z3 / maxZ));
      const alpha = 0.5 + 0.5 * normZ;

      return {
        x: screenX,
        y: screenY,
        z: z3,
        depth,
        alpha,
      };
    };

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;

      // Spring mouse tilt
      tilt.x += (mouse.x - tilt.x) * 0.06;
      tilt.y += (mouse.y - tilt.y) * 0.06;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // =========================================================================
      // 1. WARM VOLUMETRIC AURA (Radiating around the face)
      // =========================================================================
      const pulse = Math.sin(time * 2.2) * 0.06 + 0.94;
      const auraR = 340 * scale * pulse;
      const auraGrad = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, auraR);
      auraGrad.addColorStop(0, 'rgba(251, 146, 60, 0.22)');
      auraGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.11)');
      auraGrad.addColorStop(0.7, 'rgba(234, 88, 12, 0.04)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, auraR, 0, Math.PI * 2);
      ctx.fill();

      // =========================================================================
      // 2. AMBIENT DRIFTING EMBERS
      // =========================================================================
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const ember of ambientEmbers) {
        ember.x += ember.vx;
        ember.y += ember.vy;
        ember.z += ember.vz;

        if (ember.x > 320) ember.x = -320;
        if (ember.x < -320) ember.x = 320;
        if (ember.y > 320) ember.y = -320;
        if (ember.y < -320) ember.y = 320;
        if (ember.z > 220) ember.z = -220;
        if (ember.z < -220) ember.z = 220;

        const p = project3D(
          ember.x * scale,
          ember.y * scale,
          ember.z * scale,
          tilt.y * 0.8,
          tilt.x * 0.8,
          0
        );

        const emberPulse = (Math.sin(time * 3.5 + ember.phase) + 1) * 0.5;
        const eAlpha = ember.baseAlpha * emberPulse * (p.z > 0 ? 0.9 : 0.4);

        if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, ember.size * p.depth * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(254, 215, 170, ${eAlpha})`;
          ctx.shadowColor = '#f97316';
          ctx.shadowBlur = 8 * p.depth;
          ctx.fill();
        }
      }
      ctx.restore();

      // =========================================================================
      // 3. DUAL-PASS 3D ORBITAL RINGS (BACK PASS then FRONT PASS)
      // =========================================================================
      for (const isFrontPass of [false, true]) {
        for (const ring of rings) {
          if (!reducedMotion) {
            ring.currentAngle += ring.speed;
          }

          const curR = ring.radius * scale;
          const curBandW = ring.bandWidth * scale;
          const outerR = curR + curBandW / 2;
          const innerR = curR - curBandW / 2;
          const midR = curR;

          const totalSegments = 160;
          const step = (Math.PI * 2) / totalSegments;

          const rx = ring.rotX + tilt.y * 0.7;
          const ry = ring.rotY + tilt.x * 0.7;
          const rz = ring.rotZ;

          // --- PASS A: GLOWING RIBBON BODY (Solid fiery ribbon surface) ---
          ctx.save();
          if (isFrontPass) {
            ctx.globalCompositeOperation = 'lighter';
          }

          for (let i = 0; i < totalSegments; i++) {
            const theta1 = i * step;
            const theta2 = (i + 1) * step;

            const pOut1 = project3D(outerR * Math.cos(theta1), outerR * Math.sin(theta1), 0, rx, ry, rz);
            const pOut2 = project3D(outerR * Math.cos(theta2), outerR * Math.sin(theta2), 0, rx, ry, rz);
            const pIn1 = project3D(innerR * Math.cos(theta1), innerR * Math.sin(theta1), 0, rx, ry, rz);
            const pIn2 = project3D(innerR * Math.cos(theta2), innerR * Math.sin(theta2), 0, rx, ry, rz);

            const avgZ = (pOut1.z + pOut2.z + pIn1.z + pIn2.z) / 4;
            const passes = isFrontPass ? avgZ >= -12 : avgZ < -12;
            if (!passes) continue;

            const segAlpha = isFrontPass
              ? Math.min(0.24, 0.12 + 0.12 * Math.max(0, avgZ / 200))
              : 0.06;

            ctx.beginPath();
            ctx.moveTo(pOut1.x, pOut1.y);
            ctx.lineTo(pOut2.x, pOut2.y);
            ctx.lineTo(pIn2.x, pIn2.y);
            ctx.lineTo(pIn1.x, pIn1.y);
            ctx.closePath();

            ctx.fillStyle = isFrontPass
              ? `rgba(251, 146, 60, ${segAlpha})`
              : `rgba(234, 88, 12, ${segAlpha})`;
            ctx.fill();
          }
          ctx.restore();

          // --- PASS B: CONCENTRIC GLOWING RAILS (Outer, Center, Inner) ---
          ctx.save();
          if (isFrontPass) {
            ctx.globalCompositeOperation = 'lighter';
          }

          const rails = [
            { r: outerR, width: 2.2, color: ring.colorTheme.rail, blur: 16 },
            { r: midR, width: 1.0, color: ring.colorTheme.core, blur: 8 },
            { r: innerR, width: 2.0, color: ring.colorTheme.mid, blur: 14 },
          ];

          for (const rail of rails) {
            let isDrawing = false;
            ctx.beginPath();

            for (let i = 0; i <= totalSegments; i++) {
              const theta = i * step;
              const x0 = rail.r * Math.cos(theta);
              const y0 = rail.r * Math.sin(theta);
              const p = project3D(x0, y0, 0, rx, ry, rz);

              const passes = isFrontPass ? p.z >= -10 : p.z < -10;

              if (passes) {
                if (!isDrawing) {
                  ctx.beginPath();
                  ctx.moveTo(p.x, p.y);
                  isDrawing = true;
                } else {
                  ctx.lineTo(p.x, p.y);
                }
              } else if (isDrawing) {
                ctx.strokeStyle = isFrontPass
                  ? rail.color
                  : 'rgba(234, 88, 12, 0.4)';
                ctx.lineWidth = (isFrontPass ? rail.width : rail.width * 0.7) * scale;
                ctx.shadowColor = ring.colorTheme.glow;
                ctx.shadowBlur = isFrontPass ? rail.blur : 4;
                ctx.stroke();
                ctx.beginPath();
                isDrawing = false;
              }
            }

            if (isDrawing) {
              ctx.strokeStyle = isFrontPass
                ? rail.color
                : 'rgba(234, 88, 12, 0.4)';
              ctx.lineWidth = (isFrontPass ? rail.width : rail.width * 0.7) * scale;
              ctx.shadowColor = ring.colorTheme.glow;
              ctx.shadowBlur = isFrontPass ? rail.blur : 4;
              ctx.stroke();
            }
          }
          ctx.restore();

          // --- PASS C: RADIANT ELDRITCH RUNES & MATHEMATICAL SYMBOLS ---
          const glyphStep = (Math.PI * 2) / ring.glyphCount;
          const fontSize = Math.max(10, Math.round(14.5 * scale));
          ctx.font = `bold ${fontSize}px "Cinzel", "Cinzel Decorative", monospace, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          for (let k = 0; k < ring.glyphCount; k++) {
            const angle = k * glyphStep + ring.currentAngle;
            const x0 = curR * Math.cos(angle);
            const y0 = curR * Math.sin(angle);
            const p = project3D(x0, y0, 0, rx, ry, rz);

            const passes = isFrontPass ? p.z >= -10 : p.z < -10;
            if (!passes) continue;

            // Calculate tangent angle for smooth ribbon alignment
            const pNext = project3D(
              curR * Math.cos(angle + 0.05),
              curR * Math.sin(angle + 0.05),
              0,
              rx,
              ry,
              rz
            );
            const tangent = Math.atan2(pNext.y - p.y, pNext.x - p.x);

            const symbol = ring.symbols[k % ring.symbols.length];

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(tangent);
            ctx.scale(p.depth, p.depth);

            if (isFrontPass) {
              ctx.globalCompositeOperation = 'lighter';

              // Layer 1: Fiery Orange Outer Halo
              ctx.shadowColor = ring.colorTheme.glow;
              ctx.shadowBlur = 14;
              ctx.fillStyle = `rgba(249, 115, 22, ${Math.min(1.0, 0.7 + p.alpha * 0.3)})`;
              ctx.fillText(symbol, 0, 0);

              // Layer 2: White-Hot Golden Core Glyph
              ctx.shadowColor = '#fbbf24';
              ctx.shadowBlur = 5;
              ctx.fillStyle = ring.colorTheme.core;
              ctx.fillText(symbol, 0, 0);

              // Connecting telemetry micro-dot between runes
              if (k % 2 === 0) {
                ctx.beginPath();
                ctx.arc(11, 0, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = '#fde68a';
                ctx.shadowColor = '#f59e0b';
                ctx.shadowBlur = 6;
                ctx.fill();
              }
            } else {
              // Back Depth: Subtle ambient rune
              ctx.shadowColor = '#ea580c';
              ctx.shadowBlur = 3;
              ctx.fillStyle = 'rgba(234, 88, 12, 0.45)';
              ctx.fillText(symbol, 0, 0);
            }

            ctx.restore();
          }

          // --- PASS D: FIERY ORBITAL SPARKS & EMBER TRAILS ---
          ctx.save();
          if (isFrontPass) {
            ctx.globalCompositeOperation = 'lighter';
          }

          for (const spark of ring.sparks) {
            if (!reducedMotion) {
              spark.progress = (spark.progress + spark.speed + 1) % 1;
            }

            const pAngle = spark.progress * Math.PI * 2 + ring.currentAngle;
            const pRadius = curR + spark.offset * scale;
            const p = project3D(
              pRadius * Math.cos(pAngle),
              pRadius * Math.sin(pAngle),
              0,
              rx,
              ry,
              rz
            );

            const passes = isFrontPass ? p.z >= -10 : p.z < -10;
            if (!passes) continue;

            const pulseVal = (Math.sin(time * 5 + spark.pulsePhase) + 1) * 0.5;
            const sparkAlpha = isFrontPass
              ? Math.min(1.0, (spark.alpha + 0.3 * pulseVal))
              : spark.alpha * 0.35;

            // Draw spark trailing streak
            const pTail = project3D(
              pRadius * Math.cos(pAngle - spark.tailLength * Math.sign(spark.speed)),
              pRadius * Math.sin(pAngle - spark.tailLength * Math.sign(spark.speed)),
              0,
              rx,
              ry,
              rz
            );

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pTail.x, pTail.y);
            ctx.strokeStyle = isFrontPass
              ? `rgba(251, 191, 36, ${sparkAlpha * 0.6})`
              : `rgba(234, 88, 12, ${sparkAlpha * 0.3})`;
            ctx.lineWidth = spark.size * 0.6 * p.depth * scale;
            ctx.stroke();

            // Core hot spark head
            ctx.beginPath();
            ctx.arc(p.x, p.y, spark.size * p.depth * scale, 0, Math.PI * 2);
            ctx.fillStyle = isFrontPass ? '#fffbeb' : '#f97316';
            ctx.shadowColor = '#f97316';
            ctx.shadowBlur = isFrontPass ? 14 : 4;
            ctx.globalAlpha = sparkAlpha;
            ctx.fill();

            // Solar flare ring on prominent sparks
            if (isFrontPass && spark.size > 2.6) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, spark.size * 2.4 * p.depth * scale, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(254, 240, 138, ${sparkAlpha * 0.5})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
          ctx.restore();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-[3] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none select-none"
      />
    </div>
  );
};
