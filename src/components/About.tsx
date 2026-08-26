import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  MapPin,
  GraduationCap,
  Code2,
  Compass,
  Languages,
} from 'lucide-react';

interface InteractivePortraitCardProps {
  isVisible: boolean;
}

const InteractivePortraitCard: React.FC<InteractivePortraitCardProps> = ({ isVisible }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const targetStateRef = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const [currentState, setCurrentState] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  // 60fps physics loop with organic ambient wave + cursor tracking
  useEffect(() => {
    let animFrame: number;
    const startTime = performance.now();

    const updatePhysics = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Ambient idle wave
      const idleRx = Math.sin(elapsed * 1.8) * 2.5;
      const idleRy = Math.cos(elapsed * 1.4) * 2.2;
      const idleTy = Math.sin(elapsed * 2.2) * 4.0;

      const targetState = targetStateRef.current;
      const effectiveTargetRx = targetState.rx !== 0 ? targetState.rx : idleRx;
      const effectiveTargetRy = targetState.ry !== 0 ? targetState.ry : idleRy;
      const effectiveTargetTx = targetState.tx;
      const effectiveTargetTy = targetState.ty !== 0 ? targetState.ty : idleTy;

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

  // Section-wide cursor tracking
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

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

      const multiplier = isInside ? 16 : 10;
      const shiftMult = isInside ? 12 : 6;

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
      className="relative w-full max-w-[290px] md:max-w-[330px] lg:max-w-[365px] mx-auto md:mx-0 select-none group/portrait cursor-pointer"
      style={{
        perspective: 1400,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateY(0px) scale(1) rotateX(0deg)'
          : 'translateY(95px) scale(0.68) rotateX(20deg)',
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        transition: isVisible
          ? 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 1.4s cubic-bezier(0.18, 0.95, 0.32, 1.25) 0.1s, filter 1.0s ease-out 0.1s'
          : 'opacity 0.35s ease-out, transform 0.35s ease-out, filter 0.35s ease-out',
        willChange: 'transform, opacity, filter',
      }}
    >
      {/* Ambient Glow */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl transition-all duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(249, 115, 22, 0.1) 50%, transparent 75%)',
          opacity: isHovered ? 1 : 0.5,
          transform: `translate(${currentState.tx * 2}px, ${currentState.ty * 2}px) scale(${isHovered ? 1.05 : 1})`,
        }}
      />

      {/* Main 3D Frame (Responsive to cursor tilt & magnetic micro-shift) */}
      <div
        className="relative rounded-2xl overflow-hidden border bg-[#0d0e12] backdrop-blur-2xl transition-all duration-150"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${currentState.rx}deg) rotateY(${currentState.ry}deg) translate3d(${currentState.tx}px, ${currentState.ty}px, ${isHovered ? 14 : 0}px)`,
          borderColor: isHovered ? 'rgba(245, 158, 11, 0.65)' : 'rgba(255, 255, 255, 0.15)',
          boxShadow: isHovered
            ? '0 25px 60px -10px rgba(0, 0, 0, 0.9), 0 0 35px -5px rgba(245, 158, 11, 0.3)'
            : '0 15px 35px -10px rgba(0, 0, 0, 0.75), 0 0 18px -5px rgba(245, 158, 11, 0.1)',
        }}
      >
        {/* Portrait Image */}
        <div className="relative aspect-[3/3.9] w-full overflow-hidden bg-[#090a0f]">
          <img
            src="/about-portrait.jpg"
            alt="Debendranath Bera Portrait"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/20 opacity-80 pointer-events-none" />

          {/* Status Pill */}
          <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-xl border border-white/20 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            <span className="font-mono text-[0.65rem] font-bold text-slate-100 tracking-wider uppercase">
              AVAILABLE TO BUILD
            </span>
          </div>

          <div className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-slate-300 font-mono text-[0.62rem] font-semibold tracking-widest uppercase">
            DB • 2026
          </div>
        </div>

        {/* Caption */}
        <div className="p-3.5 bg-[#0d0e12] relative z-20 flex flex-col gap-0.5 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-[0.95rem] font-bold text-white tracking-wide flex items-center gap-1">
              <span>DEBENDRANATH</span>
              <span className="text-accent-orange font-extrabold">BERA</span>
            </h3>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-accent-orange/15 border border-accent-orange/30 font-mono text-[0.62rem] text-accent-orange font-bold">
              <Sparkles size={9} />
              <span>ABOUT</span>
            </span>
          </div>
          <p className="text-[0.74rem] text-text-muted font-medium">
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
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
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
      : 'translateY(32px) scale(0.96) rotateX(5deg)',
    transition: isVisible
      ? `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      : 'opacity 0.3s ease-out, transform 0.3s ease-out',
    willChange: 'opacity, transform',
    perspective: 1000,
  });

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-14 px-4 sm:px-6 md:px-10 lg:px-14 relative bg-bg-dark overflow-hidden selection:bg-accent-orange/30 flex flex-col justify-center"
      id="about"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-accent-orange/[0.03] rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1300px] mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-6 md:mb-8" style={getSlideUpStyle(0.1)}>
          <h2 className="font-display text-[clamp(1.4rem,2.8vw,2.3rem)] font-black text-white leading-tight uppercase tracking-[0.02em]">
            I DON'T JUST BUILD; I FEEL<span className="text-accent-orange">.</span>
          </h2>
        </div>

        {/* Compact Split Layout: Portrait Card + Story & Bento Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] xl:grid-cols-[370px_1fr] gap-6 md:gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Interactive 3D Cursor-Physics Portrait Card (Always triggers pop-up on scroll) */}
          <div>
            <InteractivePortraitCard isVisible={isVisible} />
          </div>

          {/* Right Column: Narrative Story & Compact Bento Grid */}
          <div className="flex flex-col gap-4">
            
            {/* Story Header & Bio */}
            <div className="flex flex-col gap-2">
              <p
                className="text-[clamp(1.05rem,1.5vw,1.35rem)] font-semibold leading-snug text-white"
                style={getSlideUpStyle(0.22)}
              >
                Hi, I'm <span className="text-accent-orange font-extrabold">Debendra</span> — a 19-year-old first-year Computer Science &amp; Engineering student from Kolkata, passionate about programming, problem-solving, and software development.
              </p>
              
              <p
                className="text-[0.92rem] md:text-[0.96rem] leading-relaxed text-text-secondary"
                style={getSlideUpStyle(0.28)}
              >
                Currently mastering Data Structures &amp; Algorithms in Java while fortifying software architecture foundations. I build software systems, desktop automation in Python, and full-stack web applications.
              </p>
            </div>

            {/* ========================================================================= */}
            {/* COMPACT BENTO INFO & LANGUAGES GRID                                       */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Card 1: Location & Age */}
              <div
                className="specular-card group relative backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/50 bg-[#0d0e14]/90 rounded-xl p-3.5 sm:p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.6),0_0_15px_rgba(245,158,11,0.1)] flex flex-col justify-between"
                style={getSlideUpStyle(0.32)}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className="font-mono text-[0.68rem] font-bold text-accent-orange tracking-[0.14em] uppercase">
                      LOCATION &amp; AGE
                    </span>
                    <div className="w-6 h-6 rounded-md bg-accent-orange/10 border border-accent-orange/25 flex items-center justify-center text-accent-orange">
                      <MapPin size={13} />
                    </div>
                  </div>
                  <div className="text-[0.92rem] font-bold text-white leading-tight">
                    📍 Kolkata, India • 19 Y/O
                  </div>
                </div>
                <div className="font-mono text-[0.66rem] text-zinc-500 mt-1.5 pt-1.5 border-t border-white/[0.05]">
                  IST (UTC +5:30) • West Bengal
                </div>
              </div>

              {/* Card 2: Current Status */}
              <div
                className="specular-card group relative backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/50 bg-[#0d0e14]/90 rounded-xl p-3.5 sm:p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.6),0_0_15px_rgba(245,158,11,0.1)] flex flex-col justify-between"
                style={getSlideUpStyle(0.38)}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className="font-mono text-[0.68rem] font-bold text-accent-orange tracking-[0.14em] uppercase">
                      CURRENTLY
                    </span>
                    <div className="w-6 h-6 rounded-md bg-accent-orange/10 border border-accent-orange/25 flex items-center justify-center text-accent-orange">
                      <GraduationCap size={13} />
                    </div>
                  </div>
                  <div className="text-[0.92rem] font-bold text-white leading-tight">
                    B.Tech in Computer Science
                  </div>
                </div>
                <div className="font-mono text-[0.66rem] text-zinc-400 mt-1.5 pt-1.5 border-t border-white/[0.05] flex items-center gap-1">
                  <span className="text-accent-orange">▹</span>
                  <span>FIEM (2026 — Present)</span>
                </div>
              </div>

              {/* Card 3: Engineering Focus */}
              <div
                className="specular-card group relative backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/50 bg-[#0d0e14]/90 rounded-xl p-3.5 sm:p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.6),0_0_15px_rgba(245,158,11,0.1)] flex flex-col justify-between"
                style={getSlideUpStyle(0.44)}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className="font-mono text-[0.68rem] font-bold text-accent-orange tracking-[0.14em] uppercase">
                      CORE FOCUS
                    </span>
                    <div className="w-6 h-6 rounded-md bg-accent-orange/10 border border-accent-orange/25 flex items-center justify-center text-accent-orange">
                      <Code2 size={13} />
                    </div>
                  </div>
                  <div className="text-[0.92rem] font-bold text-white leading-tight">
                    DSA • Java OOP • Web &amp; AI
                  </div>
                </div>
                <div className="font-mono text-[0.66rem] text-zinc-400 mt-1.5 pt-1.5 border-t border-white/[0.05] flex items-center gap-1">
                  <span className="text-accent-orange">▹</span>
                  <span>Algorithms &amp; Software Systems</span>
                </div>
              </div>

              {/* Card 4: Interests & Passion */}
              <div
                className="specular-card group relative backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/50 bg-[#0d0e14]/90 rounded-xl p-3.5 sm:p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.6),0_0_15px_rgba(245,158,11,0.1)] flex flex-col justify-between"
                style={getSlideUpStyle(0.50)}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className="font-mono text-[0.68rem] font-bold text-accent-orange tracking-[0.14em] uppercase">
                      INTERESTS
                    </span>
                    <div className="w-6 h-6 rounded-md bg-accent-orange/10 border border-accent-orange/25 flex items-center justify-center text-accent-orange">
                      <Compass size={13} />
                    </div>
                  </div>
                  <div className="text-[0.92rem] font-bold text-white leading-tight">
                    Technology • Tennis • Philosophy ☕
                  </div>
                </div>
                <div className="font-mono text-[0.66rem] text-zinc-400 mt-1.5 pt-1.5 border-t border-white/[0.05] flex items-center gap-1">
                  <span className="text-accent-orange">▹</span>
                  <span>Martial Arts • Creative Problem Solving</span>
                </div>
              </div>

              {/* Card 5 (Full-Width Bento Row): Spoken & Written Languages */}
              <div
                className="specular-card sm:col-span-2 group relative backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/50 bg-[#0d0e14]/90 rounded-xl p-3.5 sm:p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.6),0_0_15px_rgba(245,158,11,0.1)]"
                style={getSlideUpStyle(0.56)}
              >
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-accent-orange/10 border border-accent-orange/25 flex items-center justify-center text-accent-orange">
                      <Languages size={13} />
                    </div>
                    <span className="font-mono text-[0.68rem] font-bold text-accent-orange tracking-[0.14em] uppercase">
                      SPOKEN &amp; WRITTEN LANGUAGES
                    </span>
                  </div>
                  <span className="text-[0.68rem] text-zinc-500 font-mono hidden sm:inline">
                    Multilingual Communication
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* English */}
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/40 hover:bg-amber-400/[0.03] transition-all flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-[0.88rem] text-white leading-tight">
                        English
                      </span>
                      <span className="text-[0.68rem] text-zinc-400">
                        Technical &amp; Fluent
                      </span>
                    </div>
                    <span className="font-mono text-[0.62rem] text-accent-orange font-bold px-2 py-0.5 rounded-full bg-accent-orange/10 border border-accent-orange/25">
                      Fluent
                    </span>
                  </div>

                  {/* Hindi */}
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/40 hover:bg-amber-400/[0.03] transition-all flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-[0.88rem] text-white leading-tight flex items-center gap-1">
                        <span>Hindi</span>
                        <span className="text-[0.68rem] text-amber-400 font-mono">(हिन्दी)</span>
                      </span>
                      <span className="text-[0.68rem] text-zinc-400">
                        Conversational
                      </span>
                    </div>
                    <span className="font-mono text-[0.62rem] text-accent-orange font-bold px-2 py-0.5 rounded-full bg-accent-orange/10 border border-accent-orange/25">
                      Fluent
                    </span>
                  </div>

                  {/* Bengali */}
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/40 hover:bg-amber-400/[0.03] transition-all flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-[0.88rem] text-white leading-tight flex items-center gap-1">
                        <span>Bengali</span>
                        <span className="text-[0.68rem] text-amber-400 font-mono">(বাংলা)</span>
                      </span>
                      <span className="text-[0.68rem] text-zinc-400">
                        Mother Tongue
                      </span>
                    </div>
                    <span className="font-mono text-[0.62rem] text-accent-orange font-bold px-2 py-0.5 rounded-full bg-accent-orange/10 border border-accent-orange/25">
                      Native
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
