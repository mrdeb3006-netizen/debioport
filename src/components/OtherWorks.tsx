import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Camera,
  BookOpen,
  X,
  Feather,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  Calendar,
  ExternalLink,
  Eye,
  Waves
} from 'lucide-react';
import { PhilosophyReaderModal } from './PhilosophyReaderModal';

/* =========================================================================
   IMMERSIVE FULL-SECTION WATER CANVAS SIMULATION
   ========================================================================= */
/* =========================================================================
   IMMERSIVE CINEMATIC OCEAN WATER CANVAS SIMULATION (UPGRADED)
   ========================================================================= */
const ShipwreckWaterCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------------------
    // 1. Interactive Ripple & Shockwave System
    // -------------------------------------------------------------------------
    interface WaterRipple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
      lineWidth: number;
      color: string;
    }
    const ripples: WaterRipple[] = [];

    // -------------------------------------------------------------------------
    // 2. Cursor Wake Particle System (micro-droplets on mouse movement)
    // -------------------------------------------------------------------------
    interface WakeParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      life: number;
      maxLife: number;
    }
    const wakeParticles: WakeParticle[] = [];

    // -------------------------------------------------------------------------
    // 3. Multi-Layered Glassy Oxygen Bubbles
    // -------------------------------------------------------------------------
    interface Bubble {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      wobbleSpeed: number;
      wobbleAmp: number;
      phase: number;
      baseAlpha: number;
      depth: number; // 0 (far/small) to 1 (near/crisp)
    }

    const bubbleCount = Math.min(54, Math.max(28, Math.floor(width / 26)));
    const bubbles: Bubble[] = Array.from({ length: bubbleCount }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.2 + depth * 5.5,
        speedY: 0.3 + depth * 0.9,
        wobbleSpeed: 0.015 + Math.random() * 0.025,
        wobbleAmp: 8 + depth * 22,
        phase: Math.random() * Math.PI * 2,
        baseAlpha: 0.2 + depth * 0.5,
        depth,
      };
    });

    // -------------------------------------------------------------------------
    // 4. Luminescent Marine Plankton / Bio-particles
    // -------------------------------------------------------------------------
    interface Plankton {
      x: number;
      y: number;
      radius: number;
      driftSpeedX: number;
      driftSpeedY: number;
      pulseSpeed: number;
      baseAlpha: number;
      phase: number;
      color: string;
    }

    const planktonCount = Math.min(60, Math.max(30, Math.floor(width / 24)));
    const planktonColors = [
      'rgba(6, 182, 212, ', // Cyan
      'rgba(20, 184, 166, ', // Teal
      'rgba(56, 189, 248, ', // Sky
      'rgba(147, 197, 253, ', // Soft Blue
    ];

    const planktonList: Plankton[] = Array.from({ length: planktonCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.8 + Math.random() * 2.2,
      driftSpeedX: (Math.random() - 0.5) * 0.25,
      driftSpeedY: -0.1 - Math.random() * 0.25,
      pulseSpeed: 0.02 + Math.random() * 0.035,
      baseAlpha: 0.15 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      color: planktonColors[Math.floor(Math.random() * planktonColors.length)],
    }));

    // Pointer Interaction Listeners
    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastPointerTime = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = now - lastPointerTime;
      if (dt < 25) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        const dx = x - lastPointerX;
        const dy = y - lastPointerY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        // Spawn gentle water ripple
        if (speed > 8 && ripples.length < 24) {
          ripples.push({
            x,
            y,
            radius: 3,
            maxRadius: 55 + Math.min(speed * 1.5, 60),
            opacity: Math.min(0.35 + speed * 0.01, 0.7),
            speed: 1.5 + Math.min(speed * 0.05, 2.2),
            lineWidth: 1.8,
            color: 'rgba(2, 132, 199, ',
          });
        }

        // Spawn micro-droplets wake
        if (speed > 12 && wakeParticles.length < 40) {
          for (let k = 0; k < 2; k++) {
            wakeParticles.push({
              x: x + (Math.random() - 0.5) * 12,
              y: y + (Math.random() - 0.5) * 12,
              vx: (Math.random() - 0.5) * 1.5 - dx * 0.08,
              vy: (Math.random() - 0.5) * 1.5 - dy * 0.08 - 0.3,
              radius: 1 + Math.random() * 2.5,
              alpha: 0.65,
              life: 0,
              maxLife: 35 + Math.random() * 20,
            });
          }
        }

        // Push nearby bubbles slightly
        for (let i = 0; i < bubbles.length; i++) {
          const b = bubbles[i];
          const distSq = (b.x - x) * (b.x - x) + (b.y - y) * (b.y - y);
          if (distSq < 6400) {
            const dist = Math.sqrt(distSq) || 1;
            const push = (1 - dist / 80) * 1.8;
            b.x += (b.x - x) / dist * push * 3;
          }
        }
      }

      lastPointerX = x;
      lastPointerY = y;
      lastPointerTime = now;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        // Multi-ring shockwave on click/tap
        ripples.push({
          x,
          y,
          radius: 4,
          maxRadius: 110,
          opacity: 0.85,
          speed: 3.2,
          lineWidth: 2.5,
          color: 'rgba(6, 182, 212, ',
        });
        ripples.push({
          x,
          y,
          radius: 2,
          maxRadius: 80,
          opacity: 0.65,
          speed: 2.2,
          lineWidth: 1.8,
          color: 'rgba(2, 132, 199, ',
        });

        // Burst of micro-bubbles
        for (let k = 0; k < 6; k++) {
          const angle = Math.random() * Math.PI * 2;
          const mag = 1 + Math.random() * 3;
          wakeParticles.push({
            x,
            y,
            vx: Math.cos(angle) * mag,
            vy: Math.sin(angle) * mag - 0.5,
            radius: 1.5 + Math.random() * 3,
            alpha: 0.8,
            life: 0,
            maxLife: 45,
          });
        }
      }
    };

    const parentElem = canvas.parentElement;
    if (parentElem) {
      parentElem.addEventListener('pointermove', handlePointerMove);
      parentElem.addEventListener('pointerdown', handlePointerDown);
    }

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 1. Procedural Multi-Harmonic Caustic Wave Mesh
      // -----------------------------------------------------------------------
      ctx.save();
      const strandCount = 8;
      for (let s = 0; s < strandCount; s++) {
        const yBase = (height / (strandCount + 1)) * (s + 1);
        const waveSpeed = 0.8 + s * 0.15;
        const waveAmp = 14 + (s % 3) * 6;

        ctx.beginPath();
        ctx.moveTo(0, yBase);

        for (let x = 0; x <= width; x += 24) {
          const yOffset =
            Math.sin(x * 0.006 + time * waveSpeed + s * 1.3) * waveAmp +
            Math.cos(x * 0.013 - time * 0.7 + s * 2.1) * (waveAmp * 0.55) +
            Math.sin(x * 0.002 + time * 0.4) * 8;
          ctx.lineTo(x, yBase + yOffset);
        }

        const alphaWave = 0.045 + Math.sin(time * 1.2 + s) * 0.025;
        ctx.strokeStyle = s % 2 === 0
          ? `rgba(6, 182, 212, ${alphaWave})`
          : `rgba(20, 184, 166, ${alphaWave * 0.85})`;
        ctx.lineWidth = s % 3 === 0 ? 3.0 : 2.0;
        ctx.stroke();
      }

      // Secondary Cross-Caustic Diagonal Filaments (Interference shimmer)
      const diagCount = 4;
      for (let d = 0; d < diagCount; d++) {
        const startX = (width / (diagCount + 1)) * (d + 1) + Math.sin(time * 0.6 + d) * 60;
        ctx.beginPath();
        ctx.moveTo(startX, 0);

        for (let y = 0; y <= height; y += 32) {
          const xOffset = Math.sin(y * 0.008 + time * 0.9 + d * 1.7) * 26;
          ctx.lineTo(startX + xOffset + (y / height) * 80, y);
        }

        ctx.strokeStyle = `rgba(56, 189, 248, ${0.03 + Math.sin(time * 0.8 + d) * 0.018})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      ctx.restore();

      // -----------------------------------------------------------------------
      // 2. Volumetric Underwater Sunbeams (Godrays with atmospheric light scatter)
      // -----------------------------------------------------------------------
      ctx.save();
      const beamCount = 4;
      for (let b = 0; b < beamCount; b++) {
        const baseBeamX = (width / (beamCount + 1)) * (b + 1);
        const sway = Math.sin(time * 0.45 + b * 1.4) * 75;
        const beamX = baseBeamX + sway;
        const beamWidthTop = 70 + Math.sin(time * 0.7 + b) * 20;
        const beamWidthBottom = 260 + Math.cos(time * 0.5 + b) * 50;

        const gradient = ctx.createLinearGradient(beamX, 0, beamX + 180, height);
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.055)');
        gradient.addColorStop(0.35, 'rgba(6, 182, 212, 0.03)');
        gradient.addColorStop(0.75, 'rgba(20, 184, 166, 0.015)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(beamX - beamWidthTop * 0.5, 0);
        ctx.lineTo(beamX + beamWidthTop * 0.5, 0);
        ctx.lineTo(beamX + 160 + beamWidthBottom * 0.5, height);
        ctx.lineTo(beamX + 160 - beamWidthBottom * 0.5, height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      ctx.restore();

      // -----------------------------------------------------------------------
      // 3. Marine Plankton & Bio-luminescent Snow Particles
      // -----------------------------------------------------------------------
      ctx.save();
      for (let i = 0; i < planktonList.length; i++) {
        const p = planktonList[i];
        p.x += p.driftSpeedX + Math.sin(time * 1.1 + p.phase) * 0.35;
        p.y += p.driftSpeedY;
        p.phase += p.pulseSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.baseAlpha * (0.6 + Math.sin(p.phase) * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();

        // Subtle glowing halo around larger particles
        if (p.radius > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${currentAlpha * 0.25})`;
          ctx.fill();
        }
      }
      ctx.restore();

      // -----------------------------------------------------------------------
      // 4. Realistic 3D Glassy Oxygen Bubbles
      // -----------------------------------------------------------------------
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.speedY;
        b.phase += b.wobbleSpeed;
        const currentX = b.x + Math.sin(b.phase) * b.wobbleAmp;

        if (b.y < -25) {
          b.y = height + 25 + Math.random() * 40;
          b.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(currentX, b.y, b.radius, 0, Math.PI * 2);

        // Outer glassy rim
        ctx.strokeStyle = `rgba(14, 165, 233, ${b.baseAlpha * 0.9})`;
        ctx.lineWidth = Math.max(1.0, b.radius * 0.22);
        ctx.stroke();

        // Aqua translucent inner gradient
        const bubbleGrad = ctx.createRadialGradient(
          currentX - b.radius * 0.3,
          b.y - b.radius * 0.3,
          b.radius * 0.1,
          currentX,
          b.y,
          b.radius
        );
        bubbleGrad.addColorStop(0, `rgba(255, 255, 255, ${b.baseAlpha * 0.45})`);
        bubbleGrad.addColorStop(0.5, `rgba(6, 182, 212, ${b.baseAlpha * 0.25})`);
        bubbleGrad.addColorStop(1, `rgba(2, 132, 199, ${b.baseAlpha * 0.1})`);
        ctx.fillStyle = bubbleGrad;
        ctx.fill();

        // Primary specular reflection highlight (top-left)
        ctx.beginPath();
        ctx.arc(
          currentX - b.radius * 0.36,
          b.y - b.radius * 0.36,
          Math.max(0.6, b.radius * 0.28),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${b.baseAlpha * 0.95})`;
        ctx.fill();

        // Secondary bottom ambient bounce
        if (b.radius > 3) {
          ctx.beginPath();
          ctx.arc(
            currentX + b.radius * 0.3,
            b.y + b.radius * 0.3,
            b.radius * 0.18,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(56, 189, 248, ${b.baseAlpha * 0.6})`;
          ctx.fill();
        }

        ctx.restore();
      }

      // -----------------------------------------------------------------------
      // 5. Wake Particle Stream (Cursor Movement Droplets)
      // -----------------------------------------------------------------------
      for (let k = wakeParticles.length - 1; k >= 0; k--) {
        const wp = wakeParticles[k];
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.life++;
        const lifeRatio = 1 - wp.life / wp.maxLife;

        if (lifeRatio <= 0) {
          wakeParticles.splice(k, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.radius * (0.6 + lifeRatio * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${wp.alpha * lifeRatio * 0.75})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${wp.alpha * lifeRatio * 0.8})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // -----------------------------------------------------------------------
      // 6. Interactive Water Ripples & Shockwaves
      // -----------------------------------------------------------------------
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed;
        rip.opacity -= 0.012;

        if (rip.opacity <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${rip.color}${rip.opacity * 0.75})`;
        ctx.lineWidth = rip.lineWidth;
        ctx.stroke();

        // Echo harmonics (secondary and tertiary ripple rings)
        if (rip.radius > 16) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius * 0.68, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(20, 184, 166, ${rip.opacity * 0.45})`;
          ctx.lineWidth = rip.lineWidth * 0.75;
          ctx.stroke();
        }

        if (rip.radius > 32) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius * 0.42, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${rip.opacity * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (parentElem) {
        parentElem.removeEventListener('pointermove', handlePointerMove);
        parentElem.removeEventListener('pointerdown', handlePointerDown);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
};

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  imageSrc: string;
  downloadFileName: string;
  aspectRatio: string;
}

export const OtherWorks: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [philosophyModalOpen, setPhilosophyModalOpen] = useState(false);
  const [readerInitialPage, setReaderInitialPage] = useState(1);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 15 Authentic User Photographs
  const photos: PhotoItem[] = [
    {
      id: 'photo-1',
      title: 'Sunlight Through The Window Grill',
      category: 'Light & Shadows',
      location: 'Morning Rays & Green Canopy',
      year: '2026',
      description: 'Luminous morning sunbeams piercing through window geometry, illuminating lush treetops against an open azure sky.',
      imageSrc: '/photography/photo1_window_sunlight.jpg',
      downloadFileName: 'debendra_sunlight_window.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-2',
      title: 'Victoria Memorial & Lake Reflection',
      category: 'Heritage & Nature',
      location: 'Victoria Memorial Grounds, Kolkata',
      year: '2025',
      description: 'A picturesque perspective of the historic Victoria Memorial mirrored across serene waters, framed by vibrant yellow wildflowers and dynamic cloud formations.',
      imageSrc: '/photography/photo2_victoria_memorial.jpg',
      downloadFileName: 'debendra_victoria_memorial_reflection.jpg',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      id: 'photo-3',
      title: 'Serenade On Water • Two Ducks',
      category: 'Wildlife & Stillness',
      location: 'Quiet Lake Horizon',
      year: '2025',
      description: 'A study of quiet tranquility as two ducks glide across gentle concentric water ripples in soft overcast daylight.',
      imageSrc: '/photography/photo3_ducks_lake.jpg',
      downloadFileName: 'debendra_ducks_lake_serenade.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-4',
      title: 'Moonlight Over Ocean Waves',
      category: 'Nightscape & Ocean',
      location: 'Sea Horizon at Night',
      year: '2025',
      description: 'Dramatic moonlight illuminating rolling ocean tide crests and sea spray under deep nocturnal clouds with distant horizon lights.',
      imageSrc: '/photography/photo4_moonlight_ocean.jpg',
      downloadFileName: 'debendra_moonlight_ocean_waves.jpg',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      id: 'photo-5',
      title: 'Golden Sunflower In Bloom',
      category: 'Botanical & Macro',
      location: 'Garden Sunlight',
      year: '2026',
      description: 'Vibrant golden sunflower petals reaching outward in radiant bloom, highlighting intricate seed spiral symmetry.',
      imageSrc: '/photography/photo5_sunflower.jpg',
      downloadFileName: 'debendra_golden_sunflower.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-6',
      title: 'Delicate Pink Rose in Bloom',
      category: 'Macro & Florals',
      location: 'Botanical Flora Garden',
      year: '2026',
      description: 'Delicate layers of soft pink rose petals opening in full bloom, capturing subtle petal texture and delicate stamen details.',
      imageSrc: '/photography/photo6_pink_rose.jpg',
      downloadFileName: 'debendra_pink_rose_bloom.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-7',
      title: 'Full Moon Through Night Branches',
      category: 'Nightscape & Atmosphere',
      location: 'Nocturnal Sky & Silhouettes',
      year: '2025',
      description: 'The luminous glow of a full moon veiled behind atmospheric clouds, silhouetted sharply against organic tree branches.',
      imageSrc: '/photography/photo7_moon_branches.jpg',
      downloadFileName: 'debendra_moon_branches.jpg',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      id: 'photo-8',
      title: 'Childhood Joy • Traditional Elegance',
      category: 'Portrait & Culture',
      location: 'Celebration of Innocence',
      year: '2026',
      description: 'A radiant portrait capturing pure childhood delight dressed in vibrant traditional yellow saree, bangles, and a captivating smile.',
      imageSrc: '/photography/photo8_child_traditional_dress.jpg',
      downloadFileName: 'debendra_childhood_joy.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-9',
      title: 'Peach Blossom • Velvet Rose Petals',
      category: 'Botanical & Macro',
      location: 'Sunlit Plant Nursery',
      year: '2026',
      description: 'Warm peach-toned rose blossom glowing softly against rich green foliage, emphasizing gentle organic curvature.',
      imageSrc: '/photography/photo9_peach_rose.jpg',
      downloadFileName: 'debendra_peach_rose_blossom.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-10',
      title: 'Yellow Butterfly on Wildflowers',
      category: 'Wildlife & Nature',
      location: 'Wildflower Meadow',
      year: '2026',
      description: 'A vibrant yellow butterfly resting gracefully atop delicate pink wildflower blossoms amidst lush green leaves.',
      imageSrc: '/photography/photo10_yellow_butterfly.jpg',
      downloadFileName: 'debendra_yellow_butterfly_wildflower.jpg',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      id: 'photo-11',
      title: 'Verdant Fields & Lone Palm Tree',
      category: 'Landscape & Nature',
      location: 'Rural Green Fields',
      year: '2026',
      description: 'Expansive lush green rice paddies stretching toward the horizon, anchored by a lone palm tree under cinematic monsoon clouds.',
      imageSrc: '/photography/photo11_green_fields_palm.jpg',
      downloadFileName: 'debendra_verdant_fields_palm.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-12',
      title: 'Joy by the Waterside • Playful Smile',
      category: 'Portrait & Sunlight',
      location: 'Pondside Rural Pathway',
      year: '2026',
      description: 'A cheerful candid portrait of youthful charm and playful expression framed naturally against serene water and open sky.',
      imageSrc: '/photography/photo12_child_by_water.jpg',
      downloadFileName: 'debendra_joy_waterside.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-13',
      title: 'Rural Wonder • Crimson Floral Dress',
      category: 'Portrait & Culture',
      location: 'Lush Countryside Pathway',
      year: '2026',
      description: 'An endearing candid capture of wide-eyed innocence and curiosity in vibrant floral attire surrounded by green countryside.',
      imageSrc: '/photography/photo13_child_red_dress.jpg',
      downloadFileName: 'debendra_rural_wonder.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-14',
      title: 'Grasshoppers on Green Paddy Grass',
      category: 'Macro & Wildlife',
      location: 'Rice Meadow Foliage',
      year: '2026',
      description: 'Macro perspective on camouflaged green grasshoppers resting on vertical paddy leaf blades in bright afternoon sunlight.',
      imageSrc: '/photography/photo14_grasshopper_paddy.jpg',
      downloadFileName: 'debendra_grasshopper_paddy.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-15',
      title: 'White Bloom • Wild Flora Geometry',
      category: 'Macro & Flora',
      location: 'Natural Meadow Flora',
      year: '2026',
      description: 'Crisp white wildflower petals radiating around a vibrant yellow pistil core, surrounded by dark textured foliage.',
      imageSrc: '/photography/photo15_white_wildflower.jpg',
      downloadFileName: 'debendra_white_wildflower.jpg',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      id: 'photo-16',
      title: 'Emerald Paddy Plains & Azure Skies',
      category: 'Landscape & Nature',
      location: 'Countryside Green Expanse',
      year: '2026',
      description: 'Expansive lush green rice meadows stretching under brilliant blue skies, textured cumulus clouds, and towering coconut palms.',
      imageSrc: '/photography/photo16_emerald_paddy_sky.jpg',
      downloadFileName: 'debendra_emerald_paddy_sky.jpg',
      aspectRatio: 'aspect-[4/3]'
    }
  ];

  // Continuous cycle slideshow: runs non-stop, only pausing when user taps a photo (activePhoto open)
  useEffect(() => {
    if (!activePhoto) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      }, 3500);
    }
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [activePhoto, photos.length]);

  // Lock body scroll and listen for Escape key when activePhoto is open
  useEffect(() => {
    if (!activePhoto) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhoto]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <section
      id="ship-wreck"
      className="w-full relative py-14 md:py-20 bg-[#faf9f6] text-[#18181b] border-y-2 border-[#e7e5e4] transition-colors duration-500 overflow-hidden font-main select-none"
    >
      {/* 1. Full-Section Interactive Ocean Water Simulation Canvas */}
      <ShipwreckWaterCanvas />

      {/* 2. Top Ocean Wave Surface Boundary */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 overflow-hidden pointer-events-none z-20">
        <svg
          className="absolute -top-1 left-0 w-[200%] h-full animate-ocean-wave opacity-25 text-[#0c0d14]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0 C150,90 350,-40 500,45 C650,130 900,-30 1200,30 L1200,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>
        <svg
          className="absolute -top-1 left-0 w-[200%] h-full animate-ocean-wave-slow opacity-20 text-[#0284c7]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0 C200,60 400,-20 600,40 C800,100 1000,-10 1200,20 L1200,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 3. Bottom Ocean Seabed Boundary Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 overflow-hidden pointer-events-none z-20">
        <svg
          className="absolute -bottom-1 left-0 w-[200%] h-full animate-ocean-wave opacity-25 text-[#0c0d14]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,120 C150,30 350,160 500,75 C650,-10 900,150 1200,90 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
        <svg
          className="absolute -bottom-1 left-0 w-[200%] h-full animate-ocean-wave-slow opacity-20 text-[#0284c7]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,120 C200,60 400,140 600,80 C800,20 1000,130 1200,100 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 4. Dynamic Ambient Ocean Water Currents & Shimmer across entire section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Living Aquatic Gradient Swirls */}
        <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[60vh] bg-gradient-to-br from-cyan-400/[0.08] via-teal-500/[0.04] to-transparent rounded-full blur-[140px] animate-caustics" />
        <div
          className="absolute top-[40%] -right-[10%] w-[65vw] h-[65vh] bg-gradient-to-bl from-sky-400/[0.07] via-cyan-600/[0.04] to-transparent rounded-full blur-[150px] animate-caustics"
          style={{ animationDelay: '3.5s' }}
        />
        <div
          className="absolute -bottom-[10%] left-[20%] w-[60vw] h-[50vh] bg-gradient-to-t from-teal-400/[0.08] via-amber-500/[0.02] to-transparent rounded-full blur-[140px] animate-caustics"
          style={{ animationDelay: '6s' }}
        />
      </div>

      {/* Editorial Watermark Texture & Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:28px_28px] opacity-35 pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER: Clean Editorial Title
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-10 border-b-2 border-[#e7e5e4]">
          <div>
            {/* Thematic Maritime Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-900/10 border border-cyan-500/30 text-cyan-800 font-mono text-[0.70rem] font-bold uppercase tracking-wider mb-2.5 shadow-xs">
              <Waves size={13} className="text-cyan-700 animate-pulse" />
              <span>SHIPWRECK ARCHIVE • ORIGINALS &amp; ESSAYS</span>
            </div>

            <h2 className="font-serifDisplay text-[clamp(2.2rem,3.8vw,3.4rem)] font-black text-[#18181b] tracking-tight leading-[1.08]">
              SHIP WRECK.
            </h2>
          </div>

          {/* Minimal Telemetry Tag */}
          <div className="flex items-center gap-6 self-start md:self-end pt-1">
            <div className="border-l-2 border-[#d6d3d1] pl-4">
              <span className="block font-serifDisplay text-2xl font-black text-[#18181b]">{String(photos.length).padStart(2, '0')}</span>
              <span className="font-mono text-[0.75rem] font-semibold text-[#78716c] uppercase tracking-wider">Original Captures</span>
            </div>
            <div className="border-l-2 border-[#d6d3d1] pl-4">
              <span className="block font-serifDisplay text-2xl font-black text-[#18181b]">01</span>
              <span className="font-mono text-[0.75rem] font-semibold text-[#78716c] uppercase tracking-wider">Research Paper</span>
            </div>
          </div>
        </div>


        {/* =========================================================================
            SUBSECTION 1: PHOTOGRAPHY (AUTOMATIC SIDE-WISE SLIDESHOW)
            ========================================================================= */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#18181b] text-white flex items-center justify-center shadow-md">
                <Camera size={20} className="text-[#f59e0b]" />
              </div>
              <div>
                <h3 className="font-serifDisplay text-2xl md:text-3xl font-bold text-[#18181b] tracking-tight">
                  Photography &amp; Visual Art
                </h3>
                <p className="text-[0.88rem] text-[#78716c] font-medium">
                  Tap on any photograph to view high-res pop-up and download.
                </p>
              </div>
            </div>

            {/* Slideshow Navigation Arrows */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="font-mono text-[0.75rem] font-bold text-[#78716c] mr-1 hidden sm:inline">
                AUTO-SLIDE • {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
              </span>

              <button
                type="button"
                onClick={handlePrev}
                className="w-9 h-9 rounded-xl bg-white border border-[#e7e5e4] hover:bg-[#18181b] hover:text-white text-[#18181b] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-9 h-9 rounded-xl bg-white border border-[#e7e5e4] hover:bg-[#18181b] hover:text-white text-[#18181b] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Side-Wise Continuous Cycle Slideshow Viewport */}
          <div
            className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#f5f5f4] border-2 border-[#e7e5e4] shadow-[0_8px_30px_rgba(0,0,0,0.06)] group"
          >
            {/* Horizontal Slide Carousel Track */}
            <div
              className="flex transition-transform duration-700 ease-out will-change-transform"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {photos.map((photo, pIdx) => (
                <div
                  key={photo.id}
                  className="w-full shrink-0 p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row items-center gap-6 md:gap-10 cursor-pointer"
                  onClick={() => setActivePhoto(photo)}
                >
                  {/* Photo Display Card with Adaptive Frame Architecture (Zero Cropping) */}
                  <div className="w-full lg:w-[58%] h-[360px] sm:h-[440px] md:h-[500px] lg:h-[530px] relative rounded-2xl overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.18)] bg-[#09090b] group/img flex items-center justify-center">
                    {/* Ambient Blurred Background matching natural photo colors */}
                    <img
                      src={photo.imageSrc}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
                    />

                    {/* Subtle Vignette & Frame Contrast Overlay */}
                    <div className="absolute inset-0 bg-black/25 pointer-events-none z-[5]" />

                    {/* Uncropped True-Frame Photograph */}
                    <img
                      src={photo.imageSrc}
                      alt={photo.title}
                      className="w-full h-full object-contain relative z-10 p-2 sm:p-4 drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover/img:scale-[1.02]"
                      loading="lazy"
                    />
                    
                    {/* Hover Inspect Pill */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#18181b] font-mono text-[0.82rem] font-bold shadow-2xl transform translate-y-3 group-hover/img:translate-y-0 transition-transform duration-300">
                        <Maximize2 size={16} />
                        <span>TAP TO OPEN &amp; DOWNLOAD</span>
                      </div>
                    </div>

                    {/* Badge on Photo */}
                    <div className="absolute top-4 left-4 font-mono text-[0.72rem] font-bold px-3 py-1 rounded-full bg-black/70 text-white backdrop-blur-md border border-white/20 z-20">
                      {String(pIdx + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Photo Intel & Details (Side-wise) */}
                  <div className="w-full lg:w-[42%] flex flex-col justify-between py-2 text-[#18181b]">
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="font-mono text-[0.75rem] font-bold px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a] uppercase">
                          {photo.category}
                        </span>
                        <span className="font-mono text-[0.72rem] text-[#78716c] flex items-center gap-1">
                          <Calendar size={12} />
                          {photo.year}
                        </span>
                      </div>

                      <h4 className="font-serifDisplay text-2xl sm:text-3xl md:text-4xl font-bold text-[#18181b] leading-tight mb-3">
                        {photo.title}
                      </h4>

                      <div className="flex items-center gap-1.5 font-mono text-[0.8rem] text-[#78716c] mb-4">
                        <MapPin size={14} className="text-[#b45309]" />
                        <span>{photo.location}</span>
                      </div>

                      <p className="text-[0.96rem] md:text-[1.04rem] text-[#57534e] leading-relaxed mb-6 font-normal">
                        {photo.description}
                      </p>
                    </div>

                    {/* Action Bar: Tap to Expand & Quick Download */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#e7e5e4]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePhoto(photo);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18181b] hover:bg-[#b45309] text-white font-mono text-[0.82rem] font-bold transition-all shadow-sm cursor-pointer"
                      >
                        <Maximize2 size={15} />
                        <span>POP-UP VIEW</span>
                      </button>

                      <a
                        href={photo.imageSrc}
                        download={photo.downloadFileName}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-[#18181b]/20 hover:border-[#18181b] text-[#18181b] font-mono text-[0.82rem] font-bold transition-all shadow-xs cursor-pointer"
                        title="Download full photograph file"
                      >
                        <Download size={15} />
                        <span>DOWNLOAD PHOTO</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#e7e5e4] shadow-sm z-20 max-w-[90%] overflow-x-auto">
              {photos.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer shrink-0 ${
                    currentIndex === dotIdx
                      ? 'w-6 bg-[#18181b]'
                      : 'w-2 bg-[#d6d3d1] hover:bg-[#78716c]'
                  }`}
                  aria-label={`Go to photo ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>


        {/* =========================================================================
            SUBSECTION 2: PHILOSOPHY & RESEARCH PAPER
            ========================================================================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#18181b] text-white flex items-center justify-center shadow-md">
                <BookOpen size={20} className="text-[#f59e0b]" />
              </div>
              <div>
                <h3 className="font-serifDisplay text-2xl md:text-3xl font-bold text-[#18181b] tracking-tight">
                  Philosophy &amp; Writing
                </h3>
                <p className="text-[0.88rem] text-[#78716c] font-medium">
                  Reflections on attention, discipline, learning, and timeless wisdom from the Bhagavad Gita.
                </p>
              </div>
            </div>

            {/* Quick Status Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fef3c7] border border-[#f59e0b]/40 text-[#92400e] font-mono text-[0.74rem] font-bold uppercase tracking-wider self-start sm:self-auto shadow-xs">
              <Sparkles size={13} className="text-[#d97706]" />
              <span>PUBLISHED PAPER • 10 PAGES</span>
            </div>
          </div>

          {/* Editorial Research Paper Presentation Card */}
          <div className="w-full rounded-2xl md:rounded-3xl bg-white border-2 border-[#e7e5e4] p-6 sm:p-8 lg:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.05)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_16px_45px_rgba(0,0,0,0.08)]">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column (5 cols): Visible 1st Page Cover Preview Mockup */}
              <div className="lg:col-span-5 flex flex-col items-center">
                
                {/* 3D Paper Cover Mockup Container */}
                <div
                  onClick={() => {
                    setReaderInitialPage(1);
                    setPhilosophyModalOpen(true);
                  }}
                  className="group/cover relative w-full max-w-[340px] sm:max-w-[380px] aspect-[1/1.414] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] shadow-[0_20px_45px_rgba(15,23,42,0.22)] border border-slate-800/20 bg-[#1e293b]"
                  title="Click to read full paper"
                >
                  {/* Subtle Book Spine & Gradient Lighting */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-white/10 pointer-events-none z-10" />

                  {/* 1st Page Cover Image */}
                  <img
                    src="/philosophy/page_1.jpg"
                    alt="The Game of Dopamine - Cover Page (Page 1)"
                    className="w-full h-full object-cover select-none transition-transform duration-700 group-hover/cover:scale-105"
                  />

                  {/* Top Badge: Page 1 Cover Tag */}
                  <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 text-amber-400 font-mono text-[0.72rem] font-bold backdrop-blur-md border border-amber-400/30 shadow-md">
                    <BookOpen size={13} />
                    <span>PAGE 01 • COVER</span>
                  </div>

                  {/* Interactive Hover Overlay */}
                  <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover/cover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center text-white">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mb-3 shadow-xl transform translate-y-3 group-hover/cover:translate-y-0 transition-transform duration-300">
                      <Eye size={26} />
                    </div>
                    <span className="font-serifDisplay text-lg font-bold text-white mb-1">
                      Read Full Paper
                    </span>
                    <span className="font-mono text-[0.75rem] text-amber-300 uppercase tracking-wider">
                      Tap to open interactive 10-page reader
                    </span>
                  </div>

                  {/* Bottom Page Indicator Ribbon */}
                  <div className="absolute bottom-3 right-3 z-20 px-2.5 py-0.5 rounded-md bg-white/90 text-slate-900 font-mono text-[0.68rem] font-bold shadow-xs">
                    10 Pages • PDF
                  </div>
                </div>

                {/* Quick Page Jump Thumbnails Strip */}
                <div className="w-full max-w-[380px] mt-4 pt-3 border-t border-[#e7e5e4] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[0.75rem] font-mono text-[#78716c]">
                    <span className="font-semibold uppercase tracking-wider">Explore Pages</span>
                    <span>1 to 10</span>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((pNum) => (
                      <button
                        key={pNum}
                        type="button"
                        onClick={() => {
                          setReaderInitialPage(pNum);
                          setPhilosophyModalOpen(true);
                        }}
                        className="px-2 py-1 rounded-lg bg-[#f5f5f4] hover:bg-[#18181b] hover:text-white text-[#57534e] font-mono text-[0.72rem] font-bold border border-[#e7e5e4] transition-all cursor-pointer shrink-0"
                        title={`Open Page ${pNum}`}
                      >
                        P.{pNum}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (7 cols): Paper Intel & Key Takeaways */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                
                <div>
                  {/* Category & Date Metadata Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-[0.72rem] font-bold px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a] uppercase">
                      Research Paper
                    </span>
                    <span className="font-mono text-[0.72rem] font-bold px-3 py-1 rounded-full bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] uppercase">
                      Illustrated Edition
                    </span>
                    <span className="font-mono text-[0.72rem] text-[#78716c] flex items-center gap-1">
                      <Calendar size={12} />
                      August 2026
                    </span>
                  </div>

                  {/* Main Title & Subtitle */}
                  <h4 className="font-serifDisplay text-2xl sm:text-3xl lg:text-[2.2rem] font-black text-[#18181b] tracking-tight leading-[1.18] mb-2">
                    THE GAME OF DOPAMINE
                  </h4>
                  <p className="font-serifDisplay text-[1.05rem] sm:text-[1.15rem] italic text-[#b45309] font-semibold mb-3">
                    From the Inner Push to Inner Freedom
                  </p>

                  <p className="text-[0.92rem] sm:text-[0.98rem] text-[#57534e] leading-relaxed mb-5">
                    A reflective research-style synthesis of attention, novelty, discipline, purpose, and the Bhagavad Gita. Analyzing the conflict between immediate reward and meaningful action.
                  </p>

                  {/* Central Proposition Featured Quote Callout */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#fafaf9] border-l-4 border-[#b45309] border-y border-r border-[#e7e5e4] mb-6 shadow-2xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Feather size={14} className="text-[#b45309]" />
                      <span className="font-mono text-[0.72rem] font-bold text-[#92400e] uppercase tracking-wider">
                        Central Proposition
                      </span>
                    </div>
                    <blockquote className="font-serifDisplay text-[0.98rem] sm:text-[1.06rem] text-[#18181b] font-semibold italic leading-relaxed">
                      "Freedom is not the absence of desire. It is the growing ability to notice an impulse, choose according to values, act, and return when the mind wanders."
                    </blockquote>
                  </div>

                  {/* Key Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="p-3.5 rounded-xl bg-[#f5f5f4] border border-[#e7e5e4]">
                      <div className="font-mono text-[0.74rem] font-bold text-[#18181b] mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                        <span>The Dopamine Loop</span>
                      </div>
                      <p className="text-[0.82rem] text-[#57534e] leading-snug">
                        Cue → Anticipation → Easy Reward → Temporary Relief → Cost → Return.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#f5f5f4] border border-[#e7e5e4]">
                      <div className="font-mono text-[0.74rem] font-bold text-[#18181b] mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                        <span>Bhagavad Gita Wisdom</span>
                      </div>
                      <p className="text-[0.82rem] text-[#57534e] leading-snug">
                        Karma Yoga (2.47), Equanimity in Action (2.48), and Svadharma (3.35).
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#f5f5f4] border border-[#e7e5e4]">
                      <div className="font-mono text-[0.74rem] font-bold text-[#18181b] mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                        <span>Mental Strength Protocol</span>
                      </div>
                      <p className="text-[0.82rem] text-[#57534e] leading-snug">
                        Notice → Name → Pause → Choose → Begin Tiny → Return without drama.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#f5f5f4] border border-[#e7e5e4]">
                      <div className="font-mono text-[0.74rem] font-bold text-[#18181b] mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                        <span>Formula for Passion</span>
                      </div>
                      <p className="text-[0.82rem] text-[#57534e] leading-snug">
                        Passion = Curiosity × Practice × Time × Meaningful Feedback.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-[#e7e5e4]">
                  {/* Primary: Open Interactive Reader */}
                  <button
                    type="button"
                    onClick={() => {
                      setReaderInitialPage(1);
                      setPhilosophyModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#18181b] hover:bg-[#b45309] text-white font-mono text-[0.84rem] font-bold transition-all shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <BookOpen size={16} className="text-[#f59e0b]" />
                    <span>READ FULL PAPER (10 PAGES)</span>
                  </button>

                  {/* Secondary: Open Original PDF */}
                  <a
                    href="/philosophy/the-game-of-dopamine.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white border-2 border-[#18181b]/20 hover:border-[#18181b] text-[#18181b] font-mono text-[0.82rem] font-bold transition-all shadow-xs cursor-pointer hover:-translate-y-0.5"
                    title="Open PDF in new browser tab"
                  >
                    <ExternalLink size={15} />
                    <span>OPEN PDF</span>
                  </a>

                  {/* Tertiary: Direct Download */}
                  <a
                    href="/philosophy/the-game-of-dopamine.pdf"
                    download="The-Game-of-Dopamine-Debendranath-Bera.pdf"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#f5f5f4] hover:bg-[#e7e5e4] text-[#18181b] font-mono text-[0.82rem] font-bold transition-all border border-[#d6d3d1] cursor-pointer hover:-translate-y-0.5"
                    title="Download complete PDF document (340 KB)"
                  >
                    <Download size={15} />
                    <span>DOWNLOAD PDF</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>



      {/* =========================================================================
          POP-UP LIGHTBOX MODAL (RENDERED VIA PORTAL TO BODY FOR TOP Z-STACKING)
          ========================================================================= */}
      {activePhoto &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6 animate-fade-in overflow-y-auto"
            onClick={() => setActivePhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo Pop-up View"
          >
            <div
              className="bg-[#101014] text-white rounded-2xl sm:rounded-3xl max-w-[980px] w-full my-auto border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] animate-scale-up flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Modal Header with DOWNLOAD & CLOSE in RIGHT CORNER */}
              <div className="p-3.5 sm:p-4 md:p-5 bg-[#17171d] border-b border-white/10 flex items-center justify-between gap-3 sticky top-0 z-30 shrink-0">
                <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden min-w-0">
                  <span className="font-mono text-[0.70rem] sm:text-[0.75rem] font-bold px-2.5 py-1 rounded-full bg-accent-orange/20 text-accent-orange border border-accent-orange/40 uppercase shrink-0">
                    {activePhoto.category}
                  </span>
                  <h3 className="font-serifDisplay text-sm sm:text-lg md:text-xl font-bold text-white truncate">
                    {activePhoto.title}
                  </h3>
                </div>

                {/* RIGHT CORNER CONTROLS: DOWNLOAD & CLOSE BUTTONS */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activePhoto.imageSrc}
                    download={activePhoto.downloadFileName}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-accent-orange hover:bg-orange-600 text-white font-mono text-[0.74rem] sm:text-[0.80rem] font-bold shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
                    title="Download full resolution photo"
                  >
                    <Download size={15} />
                    <span className="hidden xs:inline sm:inline">DOWNLOAD</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActivePhoto(null)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-rose-500/25 hover:text-rose-400 text-zinc-200 flex items-center justify-center transition-all cursor-pointer border border-white/15 active:scale-95 shrink-0"
                    aria-label="Close Pop-up"
                    title="Close (Esc)"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* High-Resolution Pop-Up Image Stage with Adaptive True-Frame Backdrop */}
              <div className="w-full bg-[#08080c] relative flex items-center justify-center p-3 sm:p-6 min-h-[300px] sm:min-h-[380px] max-h-[64vh] overflow-hidden">
                {/* Ambient Glow matching the photo */}
                <img
                  src={activePhoto.imageSrc}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20 scale-110 pointer-events-none"
                />

                <img
                  src={activePhoto.imageSrc}
                  alt={activePhoto.title}
                  className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-2xl relative z-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.75)]"
                />
              </div>

              {/* Bottom Metadata Intel Panel */}
              <div className="p-4 sm:p-6 bg-[#14141a] text-zinc-200 border-t border-white/10 shrink-0">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2 font-mono text-[0.78rem] sm:text-[0.82rem] text-zinc-400">
                    <MapPin size={15} className="text-accent-orange shrink-0" />
                    <span className="font-bold text-white">{activePhoto.location}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">{activePhoto.year}</span>
                  </div>

                  <span className="font-mono text-[0.72rem] text-zinc-500">
                    Captured by Debendranath Bera
                  </span>
                </div>

                <p className="text-[0.88rem] sm:text-[0.94rem] text-zinc-300 leading-relaxed font-normal">
                  {activePhoto.description}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* =========================================================================
          PHILOSOPHY PAPER INTERACTIVE 10-PAGE READER MODAL
          ========================================================================= */}
      <PhilosophyReaderModal
        isOpen={philosophyModalOpen}
        initialPage={readerInitialPage}
        onClose={() => setPhilosophyModalOpen(false)}
      />

    </section>
  );
};
