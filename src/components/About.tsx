import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

const InteractivePortraitCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 }); // normalized -1 to +1
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [targetState, setTargetState] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const [currentState, setCurrentState] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  // High-precision organic damping physics loop (buttery smooth 60fps)
  useEffect(() => {
    let animFrame: number;
    const updatePhysics = () => {
      setCurrentState((prev) => ({
        rx: prev.rx + (targetState.rx - prev.rx) * 0.08,
        ry: prev.ry + (targetState.ry - prev.ry) * 0.08,
        tx: prev.tx + (targetState.tx - prev.tx) * 0.08,
        ty: prev.ty + (targetState.ty - prev.ty) * 0.08,
      }));
      animFrame = requestAnimationFrame(updatePhysics);
    };
    animFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrame);
  }, [targetState]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1

    const normX = (x - 0.5) * 2; // -1 to +1
    const normY = (y - 0.5) * 2; // -1 to +1

    setCoords({ x: normX, y: normY });
    setTargetState({
      rx: -normY * 8.5,  // Subtle, refined vertical tilt (luxury feel, no extreme warp)
      ry: normX * 8.5,   // Subtle, refined horizontal tilt
      tx: normX * 6,     // Magnetic micro-translation
      ty: normY * 6,
    });
    setGlare({
      x: x * 100,
      y: y * 100,
      opacity: 1,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
    setTargetState({ rx: 0, ry: 0, tx: 0, ty: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[360px] md:max-w-full mx-auto md:mx-0 select-none group/portrait cursor-pointer"
      style={{ perspective: 1400 }}
    >
      {/* Soft Atmospheric Ambient Backlight (Gentle & Diffused) */}
      <div
        className="absolute -inset-6 rounded-3xl blur-3xl transition-all duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(249, 115, 22, 0.08) 50%, transparent 80%)',
          opacity: isHovered ? 0.9 : 0.4,
          transform: `translate(${currentState.tx * 2}px, ${currentState.ty * 2}px) scale(${isHovered ? 1.05 : 1})`,
        }}
      />

      {/* Main Glassmorphic Portrait Frame */}
      <div
        className="relative rounded-3xl overflow-hidden border bg-[#0d0e12]/95 backdrop-blur-2xl transition-all duration-300"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${currentState.rx}deg) rotateY(${currentState.ry}deg) translate3d(${currentState.tx}px, ${currentState.ty}px, ${isHovered ? 12 : 0}px)`,
          borderColor: isHovered ? 'rgba(245, 158, 11, 0.45)' : 'rgba(255, 255, 255, 0.12)',
          boxShadow: isHovered
            ? '0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 45px -10px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 20px 50px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Prismatic Specular Light Glare (Realistic Glass Reflection) */}
        <div
          className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-500 rounded-3xl"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 420px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(251, 191, 36, 0.12) 35%, rgba(14, 165, 233, 0.04) 65%, transparent 85%)`,
          }}
        />

        {/* Diagonal Soft Sheen Highlight */}
        <div
          className="absolute inset-0 z-25 pointer-events-none opacity-0 group-hover/portrait:opacity-30 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
          style={{
            transform: `translate(${coords.x * 30}px, ${coords.y * 30}px)`,
          }}
        />

        {/* Portrait Image Stage */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#090a0f]">
          <img
            src="/about-portrait.jpg"
            alt="Debendranath Bera Portrait"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
          />

          {/* Cinematic Editorial Gradient Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/20 opacity-85 pointer-events-none" />

          {/* Minimalist Status Pill */}
          <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-xl border border-white/20 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="font-mono text-[0.72rem] font-bold text-slate-100 tracking-wider uppercase">
              AVAILABLE TO BUILD
            </span>
          </div>

          {/* Refined Monogram Watermark on Corner */}
          <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-slate-300 font-mono text-[0.68rem] font-semibold tracking-widest uppercase">
            DB • 2026
          </div>
        </div>

        {/* Bottom Card Caption & Monogram */}
        <div
          className="p-5 pt-3 bg-[#0d0e12] relative z-20 flex flex-col gap-1 border-t border-white/[0.08]"
          style={{
            transform: `translateZ(15px)`,
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-lg font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>DEBENDRANATH</span>
              <span className="text-accent-orange font-extrabold">BERA</span>
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-orange/15 border border-accent-orange/30 font-mono text-[0.68rem] text-accent-orange font-bold tracking-wider">
              <Sparkles size={10} />
              <span>// 01</span>
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
          <div className="font-mono text-[0.85rem] tracking-[0.18em] text-accent-cyan font-semibold mb-3 inline-block">
            // 01. /ABOUT
          </div>
          <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-black text-white leading-[1.15] mb-3 uppercase tracking-[0.02em]">
            ABOUT<br />ME.
          </h2>
          <p className="text-[1.1rem] text-text-secondary max-w-[640px] leading-[1.65]">
            Turning curiosity and algorithmic problem solving into useful digital solutions.
          </p>
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
