import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  MapPin,
  GraduationCap,
  Code2,
  Compass,
  Languages,
} from 'lucide-react';

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
      {/* Atmospheric Ambient Glow behind Frame */}
      <div
        className="absolute -inset-6 rounded-3xl blur-3xl transition-all duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(249, 115, 22, 0.12) 50%, transparent 75%)',
          opacity: isHovered ? 1 : 0.55,
          transform: `translate(${currentState.tx * 2.2}px, ${currentState.ty * 2.2}px) scale(${isHovered ? 1.06 : 1})`,
        }}
      />

      {/* Main Glassmorphic Frame */}
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
        {/* Portrait Image */}
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
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSlideUpStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? 'translateY(0px) scale(1) rotateX(0deg)'
      : 'translateY(40px) scale(0.95) rotateX(6deg)',
    transition: `opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    willChange: 'opacity, transform',
    perspective: 1000,
  });

  return (
    <section
      ref={sectionRef}
      className="pt-10 md:pt-14 pb-24 md:pb-28 px-6 md:px-12 lg:px-16 relative bg-bg-dark overflow-hidden selection:bg-accent-orange/30"
      id="about"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[700px] h-[500px] bg-accent-orange/[0.03] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16" style={getSlideUpStyle(0.1)}>
          <h2 className="font-display text-[clamp(1.5rem,3.2vw,2.8rem)] font-black text-white leading-[1.15] uppercase tracking-[0.02em]">
            I DON'T JUST BUILD; I FEEL<span className="text-accent-orange">.</span>
          </h2>
        </div>

        {/* Split Layout: Portrait Card + Story & Unified Bento Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-8 md:gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Interactive 3D Cursor-Physics Portrait Card */}
          <div style={getSlideUpStyle(0.2)}>
            <InteractivePortraitCard />
          </div>

          {/* Right Column: Narrative Story & Unified Bento Grid */}
          <div className="flex flex-col gap-8">
            
            {/* Story Paragraphs */}
            <div className="flex flex-col gap-4">
              <p
                className="text-[clamp(1.2rem,1.9vw,1.6rem)] font-semibold leading-[1.5] text-white"
                style={getSlideUpStyle(0.25)}
              >
                Hi, I'm <span className="text-accent-orange font-extrabold">Debendra</span> — a 19-year-old first-year Computer Science &amp; Engineering student from Kolkata, passionate about programming, problem-solving, and building intelligent software.
              </p>
              
              <p
                className="text-[1.02rem] leading-[1.7] text-text-secondary"
                style={getSlideUpStyle(0.35)}
              >
                Currently mastering Data Structures &amp; Algorithms in Java while fortifying software architecture fundamentals. With a solid foundation in Python, I engineer practical software, automation tools, and modern web applications.
              </p>
              
              <div
                className="flex items-center justify-between flex-wrap gap-4 pt-3 border-t border-white/[0.08]"
                style={getSlideUpStyle(0.45)}
              >
                <p className="text-[0.96rem] text-zinc-300 italic flex items-center gap-2">
                  <span>Apart from that, a coffee lover with an interest in philosophy.</span>
                  <span className="text-base" aria-hidden="true">☕</span>
                </p>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* UNIFIED BENTO INFO & LANGUAGES GRID (Staggered Pop Animation)             */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
              
              {/* Card 1: Location & Age */}
              <div
                className="specular-card group relative backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/50 bg-[#0d0e14]/90 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.1)] flex flex-col justify-between"
                style={getSlideUpStyle(0.4)}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[0.72rem] font-bold text-accent-orange tracking-[0.16em] uppercase">
                      LOCATION &amp; AGE
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-accent-orange/10 border border-accent-orange/25 flex items-center justify-center text-accent-orange group-hover:scale-110 transition-transform">
                      <MapPin size={15} />
                    </div>
                  </div>
                  <div className="text-[1.05rem] font-bold text-white leading-snug flex items-center gap-2 flex-wrap">
                    <span>📍 Kolkata, India</span>
                    <span className="text-accent-orange font-normal">•</span>
                    <span>19 Years Old</span>
                  </div>
                </div>
                <div className="font-mono text-[0.72rem] text-zinc-500 mt-3 pt-2.5 border-t border-white/[0.05]">
                  IST (UTC +5:30) • West Bengal
                </div>
              </div>

              {/* Card 2: Current Status */}
              <div
                className="specular-card group relative backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/50 bg-[#0d0e14]/90 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.1)] flex flex-col justify-between"
                style={getSlideUpStyle(0.5)}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[0.72rem] font-bold text-accent-orange tracking-[0.16em] uppercase">
                      CURRENTLY
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-accent-orange/10 border border-accent-orange/25 flex items-center justify-center text-accent-orange group-hover:scale-110 transition-transform">
                      <GraduationCap size={15} />
                    </div>
                  </div>
                  <div className="text-[1.05rem] font-bold text-white leading-snug">
                    B.Tech in Computer Science
                  </div>
                </div>
                <div className="font-mono text-[0.72rem] text-zinc-400 mt-3 pt-2.5 border-t border-white/[0.05] flex items-center gap-1.5">
                  <span className="text-accent-orange">▹</span>
                  <span>FIEM (2026 — Present)</span>
                </div>
              </div>

              {/* Card 3: Engineering Focus */}
              <div
                className="specular-card group relative backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/50 bg-[#0d0e14]/90 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.1)] flex flex-col justify-between"
                style={getSlideUpStyle(0.6)}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[0.72rem] font-bold text-accent-orange tracking-[0.16em] uppercase">
                      CORE FOCUS
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-accent-orange/10 border border-accent-orange/25 flex items-center justify-center text-accent-orange group-hover:scale-110 transition-transform">
                      <Code2 size={15} />
                    </div>
                  </div>
                  <div className="text-[1.05rem] font-bold text-white leading-snug">
                    DSA • Java OOP • Web &amp; AI
                  </div>
                </div>
                <div className="font-mono text-[0.72rem] text-zinc-400 mt-3 pt-2.5 border-t border-white/[0.05] flex items-center gap-1.5">
                  <span className="text-accent-orange">▹</span>
                  <span>Algorithmic Optimization &amp; Software Systems</span>
                </div>
              </div>

              {/* Card 4: Interests & Passion */}
              <div
                className="specular-card group relative backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/50 bg-[#0d0e14]/90 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.1)] flex flex-col justify-between"
                style={getSlideUpStyle(0.7)}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[0.72rem] font-bold text-accent-orange tracking-[0.16em] uppercase">
                      INTERESTS
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-accent-orange/10 border border-accent-orange/25 flex items-center justify-center text-accent-orange group-hover:scale-110 transition-transform">
                      <Compass size={15} />
                    </div>
                  </div>
                  <div className="text-[1.05rem] font-bold text-white leading-snug">
                    Technology • Tennis • Philosophy
                  </div>
                </div>
                <div className="font-mono text-[0.72rem] text-zinc-400 mt-3 pt-2.5 border-t border-white/[0.05] flex items-center gap-1.5">
                  <span className="text-accent-orange">▹</span>
                  <span>Martial Arts • Creative Problem Solving</span>
                </div>
              </div>

              {/* Card 5 (Full-Width Bento Row): Spoken & Written Languages */}
              <div
                className="specular-card sm:col-span-2 group relative backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/50 bg-[#0d0e14]/90 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.1)]"
                style={getSlideUpStyle(0.8)}
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-accent-orange/10 border border-accent-orange/25 flex items-center justify-center text-accent-orange group-hover:scale-110 transition-transform">
                      <Languages size={15} />
                    </div>
                    <div>
                      <span className="font-mono text-[0.74rem] font-bold text-accent-orange tracking-[0.16em] uppercase block">
                        SPOKEN &amp; WRITTEN LANGUAGES
                      </span>
                      <span className="text-[0.75rem] text-zinc-500 font-mono">
                        Multilingual Communication &amp; Global Collaboration
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* English */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/40 hover:bg-amber-400/[0.03] transition-all flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-[0.98rem] text-white">
                        English
                      </span>
                      <span className="font-mono text-[0.68rem] text-accent-orange font-bold px-2 py-0.5 rounded-full bg-accent-orange/10 border border-accent-orange/25">
                        Fluent
                      </span>
                    </div>
                    <span className="text-[0.76rem] text-zinc-400 font-normal">
                      Technical &amp; Professional
                    </span>
                  </div>

                  {/* Hindi */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/40 hover:bg-amber-400/[0.03] transition-all flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-bold text-[0.98rem] text-white">
                          Hindi
                        </span>
                        <span className="text-[0.72rem] text-amber-400 font-mono">
                          (हिन्दी)
                        </span>
                      </div>
                      <span className="font-mono text-[0.68rem] text-accent-orange font-bold px-2 py-0.5 rounded-full bg-accent-orange/10 border border-accent-orange/25">
                        Fluent
                      </span>
                    </div>
                    <span className="text-[0.76rem] text-zinc-400 font-normal">
                      Conversational &amp; Fluent
                    </span>
                  </div>

                  {/* Bengali */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/40 hover:bg-amber-400/[0.03] transition-all flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-bold text-[0.98rem] text-white">
                          Bengali
                        </span>
                        <span className="text-[0.72rem] text-amber-400 font-mono">
                          (বাংলা)
                        </span>
                      </div>
                      <span className="font-mono text-[0.68rem] text-accent-orange font-bold px-2 py-0.5 rounded-full bg-accent-orange/10 border border-accent-orange/25">
                        Native
                      </span>
                    </div>
                    <span className="text-[0.76rem] text-zinc-400 font-normal">
                      Mother Tongue
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
