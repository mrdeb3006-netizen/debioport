import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Terminal, Coffee, Code2 } from 'lucide-react';

const InteractivePortraitCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 }); // -1 to 1
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [targetRot, setTargetRot] = useState({ rx: 0, ry: 0 });
  const [currentRot, setCurrentRot] = useState({ rx: 0, ry: 0 });

  // Smooth animation frame loop for organic spring dampening
  useEffect(() => {
    let animFrame: number;
    const updatePhysics = () => {
      setCurrentRot((prev) => ({
        rx: prev.rx + (targetRot.rx - prev.rx) * 0.12,
        ry: prev.ry + (targetRot.ry - prev.ry) * 0.12,
      }));
      animFrame = requestAnimationFrame(updatePhysics);
    };
    animFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrame);
  }, [targetRot]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1

    const normX = (x - 0.5) * 2; // -1 to 1
    const normY = (y - 0.5) * 2; // -1 to 1

    setCoords({ x: normX, y: normY });
    setTargetRot({
      rx: -normY * 20, // dynamic 3D tilt up/down
      ry: normX * 20,  // dynamic 3D tilt left/right
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
    setTargetRot({ rx: 0, ry: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[360px] md:max-w-full mx-auto md:mx-0 select-none group/portrait cursor-grab active:cursor-grabbing"
      style={{ perspective: 1200 }}
    >
      {/* Ambient Dynamic Cursor-Reactive Neon Glow */}
      <div
        className="absolute -inset-4 bg-gradient-to-tr from-accent-orange/20 via-amber-500/15 to-transparent rounded-3xl blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          opacity: isHovered ? 0.85 : 0.35,
          transform: `translate(${coords.x * 24}px, ${coords.y * 24}px) scale(${isHovered ? 1.08 : 1})`,
        }}
      />

      {/* 3D Main Card Container */}
      <div
        className="relative rounded-3xl overflow-hidden border border-white/15 bg-bg-surface backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-all duration-200"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${currentRot.rx}deg) rotateY(${currentRot.ry}deg) translateZ(${isHovered ? 25 : 0}px)`,
          borderColor: isHovered ? 'rgba(249, 115, 22, 0.5)' : 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Dynamic Interactive Specular Light Lens Glare */}
        <div
          className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 rounded-3xl"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 340px at ${glare.x}% ${glare.y}%, rgba(249, 115, 22, 0.35), rgba(255, 255, 255, 0.18) 25%, transparent 70%)`,
          }}
        />

        {/* Cyberpunk HUD Corner Brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-accent-orange/60 z-20 pointer-events-none transition-transform duration-300 group-hover/portrait:scale-110" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-accent-orange/60 z-20 pointer-events-none transition-transform duration-300 group-hover/portrait:scale-110" />
        <div className="absolute bottom-16 left-3 w-4 h-4 border-b-2 border-l-2 border-accent-orange/40 z-20 pointer-events-none transition-transform duration-300 group-hover/portrait:scale-110" />
        <div className="absolute bottom-16 right-3 w-4 h-4 border-b-2 border-r-2 border-accent-orange/40 z-20 pointer-events-none transition-transform duration-300 group-hover/portrait:scale-110" />

        {/* Portrait Image Stage */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
          <img
            src="/about-portrait.jpg"
            alt="Debendranath Bera Portrait"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105 transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `scale(${isHovered ? 1.1 : 1.02}) translate(${coords.x * -12}px, ${coords.y * -12}px)`,
            }}
          />

          {/* Cinematic Lighting Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-black/20 opacity-80 pointer-events-none" />

          {/* Floating HUD Badge 1: Top-Left Available Pill */}
          <div
            className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 shadow-xl transition-transform duration-300"
            style={{
              transform: `translateZ(45px) translate(${coords.x * 10}px, ${coords.y * 10}px)`,
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="font-mono text-[0.7rem] font-bold text-slate-100 tracking-wider uppercase">
              AVAILABLE TO BUILD
            </span>
          </div>

          {/* Floating HUD Badge 2: Top-Right Dynamic Cursor Telemetry Tracker */}
          <div
            className="absolute top-4 right-4 z-20 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/30 text-accent-orange font-mono text-[0.66rem] font-bold shadow-xl transition-transform duration-300"
            style={{
              transform: `translateZ(40px) translate(${coords.x * -8}px, ${coords.y * -8}px)`,
            }}
          >
            <Terminal size={11} />
            <span>
              {isHovered
                ? `TILT: ${Math.round(currentRot.ry)}° / ${Math.round(currentRot.rx)}°`
                : 'INTERACTIVE 3D'}
            </span>
          </div>

          {/* Floating Pill Tags: Pop Out in 3D over Photo on Hover */}
          <div
            className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              transform: `translateZ(50px) translate(${coords.x * 12}px, ${coords.y * 12}px)`,
              opacity: isHovered ? 1 : 0.85,
            }}
          >
            <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-slate-200 font-mono text-[0.68rem] font-bold flex items-center gap-1 shadow-md">
              <Code2 size={11} className="text-accent-orange" />
              <span>Java • Python</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-slate-200 font-mono text-[0.68rem] font-bold flex items-center gap-1 shadow-md">
              <Coffee size={11} className="text-amber-400" />
              <span>Coffee &amp; Philosophy</span>
            </span>
          </div>
        </div>

        {/* Bottom Card Intel & Caption */}
        <div
          className="p-5 pt-3.5 bg-bg-surface relative z-20 flex flex-col gap-1 border-t border-white/[0.08]"
          style={{
            transform: `translateZ(30px)`,
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-lg font-bold text-white tracking-wide flex items-center gap-2">
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
