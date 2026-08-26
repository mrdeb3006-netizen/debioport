import React, { useEffect, useRef } from 'react';

interface HeroOrbitalRingsProps {
  className?: string;
}

// Mystical Eldritch, Alchemical & Mathematical Runes from Doctor Strange Tao Mandala
const RUNIC_SYMBOLS = [
  'ᛟ', '⊘', '∇', 'ᚱ', '⊕', '∰', 'ᛊ', '⊗', '∆', 'ᚦ',
  '⊙', 'ℵ', 'ᚹ', '⊚', '∞', 'ᚲ', '⊛', '∿', 'ᛞ', '⊜',
  '≈', 'ᛗ', '⊝', '≢', 'ᛉ', '⊞', '≤', 'ᛏ', '⊟', '≥',
  'ᛒ', '⊠', '⊸', 'ᛖ', '⊡', '⊹', 'ᛚ', '∯', '⋈', 'ᛦ'
];

interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  depth: number;
  alpha: number;
}

interface OrbitalRingConfig {
  radius: number;
  bandWidth: number;
  tiltX: number; // Radian inclination around X
  tiltY: number; // Radian inclination around Y
  tiltZ: number; // Radian inclination around Z
  rotSpeed: number; // Continuous rotation speed
  currentAngle: number;
  colorCore: string;
  colorGlow: string;
  colorOuter: string;
  symbols: string[];
  glyphCount: number;
  numParticles: number;
  particles: Array<{
    progress: number;
    speed: number;
    size: number;
    offsetRadius: number;
    alpha: number;
    pulseSpeed: number;
    phase: number;
  }>;
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

    // Center of portrait anchor (recalculated on resize)
    let portraitCenterX = 0;
    let portraitCenterY = 0;
    let responsiveScale = 1;

    // Mouse parallax tracking
    const mouse = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
      const ny = (e.clientY - rect.top) / (rect.height || 1) - 0.5;
      mouse.x = nx * 0.18; // Smooth subtle max tilt ~10 deg
      mouse.y = -ny * 0.18;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Floating Ambient Cosmic Embers around orbit
    const ambientEmbers = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * 500,
      y: (Math.random() - 0.5) * 500,
      z: (Math.random() - 0.5) * 300,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.8 + 0.2,
      baseAlpha: Math.random() * 0.7 + 0.3,
      phase: Math.random() * Math.PI * 2,
    }));

    // Construct 3 Intersecting Doctor Strange / Mathematical Gyroscope Orbital Rings
    const createRingParticles = (count: number) => {
      return Array.from({ length: count }, () => ({
        progress: Math.random(),
        speed: (Math.random() * 0.002 + 0.0015) * (Math.random() > 0.3 ? 1 : -1),
        size: Math.random() * 2.2 + 1.2,
        offsetRadius: (Math.random() - 0.5) * 16,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const rings: OrbitalRingConfig[] = [
      // Ring 1: Primary Descending Diagonal Orbit (Crossing top-left to bottom-right)
      {
        radius: 255,
        bandWidth: 32,
        tiltX: 1.08, // ~62 deg
        tiltY: -0.48, // ~ -28 deg
        tiltZ: 0.64, // ~ 37 deg
        rotSpeed: reducedMotion ? 0 : 0.0032,
        currentAngle: 0,
        colorCore: '#ffedd5',
        colorGlow: '#f97316',
        colorOuter: '#fbbf24',
        symbols: RUNIC_SYMBOLS,
        glyphCount: 32,
        numParticles: 28,
        particles: createRingParticles(28),
      },
      // Ring 2: Intersecting Ascending Diagonal Orbit (Crossing bottom-left to top-right)
      {
        radius: 265,
        bandWidth: 30,
        tiltX: 1.14, // ~65 deg
        tiltY: 0.52, // ~ 30 deg
        tiltZ: -0.68, // ~ -39 deg
        rotSpeed: reducedMotion ? 0 : -0.0028,
        currentAngle: Math.PI * 0.4,
        colorCore: '#fef3c7',
        colorGlow: '#ea580c',
        colorOuter: '#f59e0b',
        symbols: [...RUNIC_SYMBOLS].reverse(),
        glyphCount: 30,
        numParticles: 26,
        particles: createRingParticles(26),
      },
      // Ring 3: Delicate Equatorial Celestial Orbit (Outer astrolabe telemetry ring)
      {
        radius: 285,
        bandWidth: 16,
        tiltX: 1.34, // ~77 deg
        tiltY: 0.12, // ~ 7 deg
        tiltZ: 0.22, // ~ 13 deg
        rotSpeed: reducedMotion ? 0 : 0.0018,
        currentAngle: Math.PI * 0.8,
        colorCore: '#ffffff',
        colorGlow: '#f97316',
        colorOuter: '#fed7aa',
        symbols: ['⊕', '⊘', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '∇', '∆', '∞'],
        glyphCount: 18,
        numParticles: 20,
        particles: createRingParticles(20),
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

      // Responsive portrait head center calculation
      if (width >= 1280) {
        // XL Desktop Screens (1280px - 2560px+)
        portraitCenterX = width * 0.77;
        portraitCenterY = height * 0.50;
        responsiveScale = Math.min(1.05, Math.max(0.85, width / 1500));
      } else if (width >= 1024) {
        // Standard Desktop (1024px - 1279px)
        portraitCenterX = width * 0.76;
        portraitCenterY = height * 0.50;
        responsiveScale = 0.88;
      } else if (width >= 768) {
        // Tablet Screens (768px - 1023px)
        portraitCenterX = width * 0.75;
        portraitCenterY = height * 0.50;
        responsiveScale = 0.74;
      } else {
        // Mobile Screens (< 768px)
        portraitCenterX = width * 0.74;
        portraitCenterY = height * 0.44;
        responsiveScale = Math.min(0.56, Math.max(0.42, width / 650));
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Intersection observer to pause loop when out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 3D Euler coordinate rotation and perspective projection
    const fov = 750;

    const project3D = (
      x0: number,
      y0: number,
      z0: number,
      rotX: number,
      rotY: number,
      rotZ: number,
      originX: number,
      originY: number
    ): ProjectedPoint => {
      // 1. Rotate around Z
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);
      const x1 = x0 * cosZ - y0 * sinZ;
      const y1 = x0 * sinZ + y0 * cosZ;
      const z1 = z0;

      // 2. Rotate around X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      // 3. Rotate around Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x3 = x2 * cosY + z2 * sinY;
      const y3 = y2;
      const z3 = -x2 * sinY + z2 * cosY;

      // Perspective Scale Projection
      const depth = fov / (fov - z3);
      const screenX = originX + x3 * depth;
      const screenY = originY + y3 * depth;

      // Calculate depth alpha (front is bright 1.0, back is dimmed 0.45)
      const maxZ = 280;
      const normalizedZ = Math.max(-1, Math.min(1, z3 / maxZ));
      const alpha = 0.5 + 0.5 * normalizedZ;

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

      // Smooth mouse lerp
      tilt.x += (mouse.x - tilt.x) * 0.05;
      tilt.y += (mouse.y - tilt.y) * 0.05;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // =========================================================================
      // 1. SOFT VOLUMETRIC RADIAL BLOOM (Centered around Portrait Orbit)
      // =========================================================================
      const pulse = Math.sin(time * 1.5) * 0.08 + 0.92;
      const glowRadius = 360 * responsiveScale * pulse;
      const glowGrad = ctx.createRadialGradient(
        portraitCenterX,
        portraitCenterY,
        30,
        portraitCenterX,
        portraitCenterY,
        glowRadius
      );
      glowGrad.addColorStop(0, 'rgba(249, 115, 22, 0.18)');
      glowGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.09)');
      glowGrad.addColorStop(0.7, 'rgba(234, 88, 12, 0.03)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(portraitCenterX, portraitCenterY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // =========================================================================
      // 2. AMBIENT FLOATING COSMIC EMBERS (Background field)
      // =========================================================================
      for (const ember of ambientEmbers) {
        ember.x += ember.vx;
        ember.y += ember.vy;
        ember.z += ember.vz;

        if (ember.x > 300) ember.x = -300;
        if (ember.x < -300) ember.x = 300;
        if (ember.y > 300) ember.y = -300;
        if (ember.y < -300) ember.y = 300;
        if (ember.z > 200) ember.z = -200;
        if (ember.z < -200) ember.z = 200;

        const p = project3D(
          ember.x * responsiveScale,
          ember.y * responsiveScale,
          ember.z * responsiveScale,
          tilt.y,
          tilt.x,
          0,
          portraitCenterX,
          portraitCenterY
        );

        const emberPulse = (Math.sin(time * 3 + ember.phase) + 1) * 0.5;
        const currentAlpha = ember.baseAlpha * emberPulse * (p.z > 0 ? 0.85 : 0.4);

        if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, ember.size * p.depth * responsiveScale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${currentAlpha})`;
          ctx.shadowColor = '#f97316';
          ctx.shadowBlur = 6 * p.depth;
          ctx.fill();
        }
      }

      // =========================================================================
      // 3. RENDER ORBITAL RINGS WITH DUAL-PASS 3D DEPTH
      // =========================================================================
      // Pass 1: Render Back Segments (z < 0)
      // Pass 2: Render Front Segments (z >= 0) with intense bloom
      for (const isFrontPass of [false, true]) {
        for (const ring of rings) {
          if (!reducedMotion) {
            ring.currentAngle += ring.rotSpeed;
          }

          const currentRadius = ring.radius * responsiveScale;
          const currentBandWidth = ring.bandWidth * responsiveScale;
          const outerR = currentRadius + currentBandWidth / 2;
          const innerR = currentRadius - currentBandWidth / 2;

          const totalSegments = 140;
          const step = (Math.PI * 2) / totalSegments;

          const ringRotX = ring.tiltX + tilt.y * 0.6;
          const ringRotY = ring.tiltY + tilt.x * 0.6;
          const ringRotZ = ring.tiltZ;

          // --- Draw Concentric Rails (Outer & Inner boundaries) ---
          for (const [radius, railIdx] of [[outerR, 0], [innerR, 1]] as [number, number][]) {
            ctx.beginPath();
            let isDrawing = false;

            for (let i = 0; i <= totalSegments; i++) {
              const theta = i * step;
              const x0 = radius * Math.cos(theta);
              const y0 = radius * Math.sin(theta);
              const z0 = 0;

              const p = project3D(
                x0,
                y0,
                z0,
                ringRotX,
                ringRotY,
                ringRotZ,
                portraitCenterX,
                portraitCenterY
              );

              const passesFilter = isFrontPass ? p.z >= -10 : p.z < -10;

              if (passesFilter) {
                if (!isDrawing) {
                  ctx.beginPath();
                  ctx.moveTo(p.x, p.y);
                  isDrawing = true;
                } else {
                  ctx.lineTo(p.x, p.y);
                }
              } else if (isDrawing) {
                // Stroke current segment
                ctx.strokeStyle = isFrontPass
                  ? ring.colorOuter
                  : 'rgba(234, 88, 12, 0.45)';
                ctx.lineWidth = (isFrontPass ? (railIdx === 0 ? 1.8 : 1.2) : 1.0) * responsiveScale;
                ctx.shadowColor = ring.colorGlow;
                ctx.shadowBlur = isFrontPass ? 14 : 4;
                ctx.stroke();
                ctx.beginPath();
                isDrawing = false;
              }
            }

            if (isDrawing) {
              ctx.strokeStyle = isFrontPass
                ? ring.colorOuter
                : 'rgba(234, 88, 12, 0.45)';
              ctx.lineWidth = (isFrontPass ? (railIdx === 0 ? 1.8 : 1.2) : 1.0) * responsiveScale;
              ctx.shadowColor = ring.colorGlow;
              ctx.shadowBlur = isFrontPass ? 14 : 4;
              ctx.stroke();
            }
          }

          // --- Draw Glowing Ribbon Surface Fill ---
          if (isFrontPass) {
            ctx.beginPath();
            for (let i = 0; i <= totalSegments; i++) {
              const theta = i * step;
              const pOuter = project3D(
                outerR * Math.cos(theta),
                outerR * Math.sin(theta),
                0,
                ringRotX,
                ringRotY,
                ringRotZ,
                portraitCenterX,
                portraitCenterY
              );
              if (pOuter.z >= -20) {
                if (i === 0) ctx.moveTo(pOuter.x, pOuter.y);
                else ctx.lineTo(pOuter.x, pOuter.y);
              }
            }
            for (let i = totalSegments; i >= 0; i--) {
              const theta = i * step;
              const pInner = project3D(
                innerR * Math.cos(theta),
                innerR * Math.sin(theta),
                0,
                ringRotX,
                ringRotY,
                ringRotZ,
                portraitCenterX,
                portraitCenterY
              );
              if (pInner.z >= -20) {
                ctx.lineTo(pInner.x, pInner.y);
              }
            }
            ctx.closePath();
            ctx.fillStyle = 'rgba(249, 115, 22, 0.07)';
            ctx.fill();
          }

          // --- Draw Doctor Strange Mystical Runes & Mathematical Symbols ---
          const glyphStep = (Math.PI * 2) / ring.glyphCount;
          const fontSize = Math.max(9, Math.round(13 * responsiveScale));
          ctx.font = `bold ${fontSize}px "Cinzel", "Cinzel Decorative", monospace, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          for (let k = 0; k < ring.glyphCount; k++) {
            const angle = k * glyphStep + ring.currentAngle;
            const x0 = currentRadius * Math.cos(angle);
            const y0 = currentRadius * Math.sin(angle);
            const z0 = 0;

            const p = project3D(
              x0,
              y0,
              z0,
              ringRotX,
              ringRotY,
              ringRotZ,
              portraitCenterX,
              portraitCenterY
            );

            const passesFilter = isFrontPass ? p.z >= -10 : p.z < -10;
            if (!passesFilter) continue;

            // Calculate tangent angle for glyph orientation
            const nextAngle = angle + 0.05;
            const pNext = project3D(
              currentRadius * Math.cos(nextAngle),
              currentRadius * Math.sin(nextAngle),
              0,
              ringRotX,
              ringRotY,
              ringRotZ,
              portraitCenterX,
              portraitCenterY
            );
            const tangentAngle = Math.atan2(pNext.y - p.y, pNext.x - p.x);

            const symbol = ring.symbols[k % ring.symbols.length];
            const glyphAlpha = isFrontPass
              ? Math.min(1.0, 0.55 + p.alpha * 0.45)
              : 0.38;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(tangentAngle);
            ctx.scale(p.depth, p.depth);

            ctx.shadowColor = ring.colorGlow;
            ctx.shadowBlur = isFrontPass ? 10 : 3;
            ctx.fillStyle = isFrontPass
              ? `rgba(255, 237, 213, ${glyphAlpha})`
              : `rgba(249, 115, 22, ${glyphAlpha})`;

            ctx.fillText(symbol, 0, 0);

            // Optional center dot / telemetry tick between glyphs
            if (isFrontPass && k % 2 === 0) {
              ctx.beginPath();
              ctx.arc(10, 0, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(251, 191, 36, ${glyphAlpha * 0.8})`;
              ctx.fill();
            }

            ctx.restore();
          }

          // --- Draw Glowing Orbital Particles / Sparks along Ribbon ---
          for (const part of ring.particles) {
            if (!reducedMotion) {
              part.progress = (part.progress + part.speed + 1) % 1;
            }

            const pAngle = part.progress * Math.PI * 2 + ring.currentAngle;
            const pRadius = currentRadius + part.offsetRadius * responsiveScale;
            const x0 = pRadius * Math.cos(pAngle);
            const y0 = pRadius * Math.sin(pAngle);
            const z0 = 0;

            const p = project3D(
              x0,
              y0,
              z0,
              ringRotX,
              ringRotY,
              ringRotZ,
              portraitCenterX,
              portraitCenterY
            );

            const passesFilter = isFrontPass ? p.z >= -10 : p.z < -10;
            if (!passesFilter) continue;

            const partPulse = (Math.sin(time * 6 + part.phase) + 1) * 0.5;
            const pAlpha = isFrontPass
              ? Math.min(1.0, (part.alpha + 0.3 * partPulse) * p.alpha)
              : part.alpha * 0.4;

            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, part.size * p.depth * responsiveScale, 0, Math.PI * 2);
            ctx.fillStyle = isFrontPass ? '#ffffff' : '#f97316';
            ctx.shadowColor = '#f97316';
            ctx.shadowBlur = isFrontPass ? 12 : 4;
            ctx.globalAlpha = pAlpha;
            ctx.fill();

            // Flare ring around prominent front sparks
            if (isFrontPass && part.size > 2.5) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, part.size * 2.2 * p.depth * responsiveScale, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(251, 191, 36, ${pAlpha * 0.45})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
            ctx.restore();
          }
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
