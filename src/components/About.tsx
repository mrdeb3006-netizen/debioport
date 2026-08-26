import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

const InteractivePortraitCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const targetStateRef = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const [currentState, setCurrentState] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  // 60fps high-precision physics loop with continuous organic wave + responsive proximity tracking
  useEffect(() => {
    let animFrame: number;
    const startTime = performance.now();

    const updatePhysics = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Ambient idle wave baseline
      const idleRx = Math.sin(elapsed * 1.8) * 3.0;
      const idleRy = Math.cos(elapsed * 1.4) * 2.6;
      const idleTy = Math.sin(elapsed * 2.2) * 5.5;

      const targetState = targetStateRef.current;
      const effectiveTargetRx = targetState.rx !== 0 ? targetState.rx : idleRx;
      const effectiveTargetRy = targetState.ry !== 0 ? targetState.ry : idleRy;
      const effectiveTargetTx = targetState.tx;
      const effectiveTargetTy = targetState.ty !== 0 ? targetState.ty : idleTy;

      // Ultra-reactive snappy damping (0.22 for instant, fluid tracking)
      setCurrentState((prev) => ({
        rx: prev.rx + (effectiveTargetRx - prev.rx) * 0.22,
        ry: prev.ry + (effectiveTargetRy - prev.ry) * 0.22,
        tx: prev.tx + (effectiveTargetTx - prev.tx) * 0.22,
        ty: prev.ty + (effectiveTargetTy - prev.ty) * 0.22,
      }));

      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Section-wide & viewport reactive cursor proximity tracking
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      // Calculate normalized cursor vector relative to card center
      const distX = (e.clientX - cardCenterX) / (window.innerWidth * 0.5);
      const distY = (e.clientY - cardCenterY) / (window.innerHeight * 0.5);

      const clampedX = Math.max(-1, Math.min(1, distX));
      const clampedY = Math.max(-1, Math.min(1, distY));

      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsHovered(isInside);

      const multiplier = isInside ? 18 : 12;
      const shiftMult = isInside ? 14 : 8;

      targetStateRef.current = {
        rx: -clampedY * multiplier,
        ry: clampedX * multiplier,
        tx: clampedX * shiftMult,
        ty: clampedY * shiftMult,
      };
    };

    const handleMouseLeaveWindow = () => {
      setIsHovered(false);
      targetStateRef.current = { rx: 0, ry: 0, tx: 0, ty: 0 };
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-[360px] md:max-w-full mx-auto md:mx-0 select-none group/portrait cursor-pointer"
      style={{ perspective: 1400 }}
    >
      {/* Atmospheric Ambient Glow behind Frame (Reacts to cursor direction) */}
      <div
        className="absolute -inset-6 rounded-3xl blur-3xl transition-all duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(249, 115, 22, 0.12) 50%, transparent 75%)',
          opacity: isHovered ? 1 : 0.55,
          transform: `translate(${currentState.tx * 2.2}px, ${currentState.ty * 2.2}px) scale(${isHovered ? 1.06 : 1})`,
        }}
      />

      {/* Main Glassmorphic Frame (Highly Reactive 3D Tilt & Magnetic Micro-Shift) */}
      <div
        className="relative rounded-3xl overflow-hidden border bg-[#0d0e12] backdrop-blur-2xl transition-all duration-150"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${currentState.rx}deg) rotateY(${currentState.ry}deg) translate3d(${currentState.tx}px, ${currentState.ty}px, ${isHovered ? 18 : 0}px)`,
          borderColor: isHovered ? 'rgba(245, 158, 11, 0.65)' : 'rgba(255, 255, 255, 0.16)',
          boxShadow: isHovered
            ? '0 35px 85px -15px rgba(0, 0, 0, 0.95), 0 0 50px -10px rgba(245, 158, 11, 0.35)'
            : '0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 25px -5px rgba(245, 158, 11, 0.12)',
        }}
      >
        {/* Clean, Natural Portrait Image (Does NOT react to cursor, perfectly crisp) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#090a0f]">
          <img
            src="/about-portrait.jpg"
            alt="Debendranath Bera Portrait"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
          />

          {/* Cinematic Editorial Gradient Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/20 opacity-85 pointer-events-none" />

          {/* Status Pill */}
          <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-xl border border-white/20 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="font-mono text-[0.72rem] font-bold text-slate-100 tracking-wider uppercase">
              AVAILABLE TO BUILD
            </span>
          </div>

          {/* Corner Watermark */}
          <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-slate-300 font-mono text-[0.68rem] font-semibold tracking-widest uppercase">
            DB • 2026
          </div>

          {/* Authentic Handwritten Signature in Corner of Photo */}
          <div className="absolute bottom-3 right-4 z-20 pointer-events-none select-none flex flex-col items-end transform transition-all duration-300 group-hover/portrait:scale-105 group-hover/portrait:-rotate-1">
            <span
              style={{ fontFamily: "'Alex Brush', 'Great Vibes', 'Dancing Script', cursive" }}
              className="text-[2.1rem] sm:text-[2.4rem] leading-none text-accent-orange font-normal -rotate-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_0_8px_rgba(249,115,22,0.45)] tracking-wide"
            >
              Debendra
            </span>
            <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-accent-orange/70 to-accent-orange rounded-full -mt-1 shadow-[0_0_6px_rgba(249,115,22,0.5)]" />
          </div>
        </div>

        {/* Bottom Card Caption */}
        <div className="p-5 pt-3 bg-[#0d0e12] relative z-20 flex flex-col gap-1 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-lg font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>DEBENDRANATH</span>
              <span className="text-accent-orange font-extrabold">BERA</span>
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-orange/15 border border-accent-orange/30 font-mono text-[0.68rem] text-accent-orange font-bold tracking-wider">
              <Sparkles size={10} />
              <span>ABOUT</span>
            </span>
          </div>
          <p className="text-[0.82rem] text-text-muted font-medium">
            Developer • Problem Solver • Thinker
          </p>
        </div>

      </div>
    </div>
  );
};

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSlideUpStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(55px)',
    transition: `opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 1.4s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    willChange: 'opacity, transform',
  });

  return (
    <section
      ref={sectionRef}
      className="pt-10 md:pt-14 pb-24 md:pb-28 px-6 md:px-12 lg:px-16 relative bg-bg-dark overflow-hidden"
      id="about"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header - Slower, Elegant PowerPoint Slide Up Reveal */}
        <div className="mb-14" style={getSlideUpStyle(0.15)}>
          <h2 className="font-display text-[clamp(0.75rem,3.6vw,1.35rem)] md:text-[clamp(1.5rem,2.8vw,2.6rem)] font-black text-white leading-[1.15] uppercase tracking-[0.01em] md:tracking-[0.02em] whitespace-nowrap">
            I DON'T JUST BUILD; I FEEL.
          </h2>
        </div>

        {/* Split Layout: Portrait Card + Story & Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-8 md:gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Interactive 3D Cursor-Physics Portrait Card */}
          <div style={getSlideUpStyle(0.3)}>
            <InteractivePortraitCard />
          </div>

          {/* Right Column: Narrative Story & 2x2 Info Grid */}
          <div className="flex flex-col gap-8">
            
            {/* Story Paragraphs */}
            <div className="flex flex-col gap-5">
              <p
                className="text-[clamp(1.35rem,2.1vw,1.75rem)] font-semibold leading-[1.5] text-white"
                style={getSlideUpStyle(0.35)}
              >
                Hi, I'm <span className="text-accent-orange font-extrabold">Debendra</span> — a 19-year-old first-year Computer Science and Engineering student from Kolkata, passionate about programming, problem-solving, and software development.
              </p>
              
              <p
                className="text-[1.08rem] leading-[1.75] text-text-secondary"
                style={getSlideUpStyle(0.55)}
              >
                Currently, I’m learning Data Structures and Algorithms using Java while strengthening my programming fundamentals. I also have a solid foundation in Python and enjoy exploring different technologies through hands-on learning and practical projects.
              </p>
              
              <p
                className="text-[1.08rem] leading-[1.75] text-text-secondary"
                style={getSlideUpStyle(0.75)}
              >
                I’m focused on building a strong foundation in Computer Science, improving my problem-solving skills, and gradually developing scalable full-stack software development capabilities.
              </p>
              
              <div
                className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-white/[0.06]"
                style={getSlideUpStyle(0.95)}
              >
                <p className="text-[1.02rem] text-slate-300 italic flex items-center gap-2">
                  <span>Apart from that, a coffee lover with an interest in philosophy.</span>
                  <span className="text-base" aria-hidden="true">☕</span>
                </p>
              </div>
            </div>

            {/* 2x2 Info Specular Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div
                className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-6 transition-all duration-300 hover:border-white/30 hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-xl"
                style={getSlideUpStyle(0.40)}
              >
                <span className="font-mono text-[0.76rem] font-semibold text-accent-orange tracking-[0.16em] block mb-1.5 uppercase">
                  LOCATION &amp; AGE
                </span>
                <div className="text-[1rem] font-semibold text-slate-100 leading-[1.5] flex items-center gap-2 flex-wrap">
                  <span>📍 Kolkata, India</span>
                  <span className="text-accent-orange font-normal">•</span>
                  <span>19 Years Old</span>
                </div>
              </div>

              <div
                className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-6 transition-all duration-300 hover:border-white/30 hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-xl"
                style={getSlideUpStyle(0.55)}
              >
                <span className="font-mono text-[0.76rem] font-semibold text-accent-orange tracking-[0.16em] block mb-1.5 uppercase">
                  CURRENTLY
                </span>
                <div className="text-[1rem] font-semibold text-slate-100 leading-[1.5]">
                  Computer Science Student • Engineering Foundations
                </div>
              </div>

              <div
                className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-6 transition-all duration-300 hover:border-white/30 hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-xl"
                style={getSlideUpStyle(0.70)}
              >
                <span className="font-mono text-[0.76rem] font-semibold text-accent-orange tracking-[0.16em] block mb-1.5 uppercase">
                  FOCUS
                </span>
                <div className="text-[1rem] font-semibold text-slate-100 leading-[1.5]">
                  Programming • DSA • Web Development &amp; AI
                </div>
              </div>

              <div
                className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-6 transition-all duration-300 hover:border-white/30 hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-xl"
                style={getSlideUpStyle(0.85)}
              >
                <span className="font-mono text-[0.76rem] font-semibold text-accent-orange tracking-[0.16em] block mb-1.5 uppercase">
                  INTERESTS
                </span>
                <div className="text-[1rem] font-semibold text-slate-100 leading-[1.5]">
                  Technology • Entrepreneurship • Tennis • Philosophy
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
