import React, { useEffect, useRef, useState } from 'react';

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
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Cyber-Editorial Portrait Card */}
          <div
            className="relative w-full max-w-[420px] mx-auto lg:mx-0 group"
            style={getSlideUpStyle(0.3)}
          >
            {/* Ambient Warm Amber Glow Behind Photo */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-accent-orange/30 via-accent-orange/10 to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Main Portrait Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-bg-surface backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(249,115,22,0.15)] group-hover:border-accent-orange/50 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(249,115,22,0.3)] transition-all duration-500">
              
              {/* Portrait Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src="/about-portrait.jpg"
                  alt="Debendranath Bera Portrait"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-105 contrast-105"
                />
                {/* Cinematic Gradient Fade at Bottom of Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-80" />
                
                {/* Floating Status Pill */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[0.72rem] font-bold text-slate-200 tracking-wider uppercase">
                    AVAILABLE TO BUILD
                  </span>
                </div>
              </div>

              {/* Bottom Caption Inside Card */}
              <div className="p-6 pt-3 bg-bg-surface relative z-10 flex flex-col gap-1 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
                    DEBENDRANATH <span className="text-accent-orange font-extrabold">BERA</span>
                  </h3>
                  <span className="font-mono text-[0.72rem] text-accent-orange font-semibold tracking-widest">
                    // 01
                  </span>
                </div>
                <p className="text-[0.84rem] text-text-muted">
                  Developer • Problem Solver • Dreamer
                </p>
              </div>

            </div>
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
                className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-6 transition-all duration-300 hover:border-accent-orange/40 hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(249,115,22,0.15)]"
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
                className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-6 transition-all duration-300 hover:border-accent-orange/40 hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(249,115,22,0.15)]"
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
                className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-6 transition-all duration-300 hover:border-accent-orange/40 hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(249,115,22,0.15)]"
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
                className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-6 transition-all duration-300 hover:border-accent-orange/40 hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(249,115,22,0.15)]"
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
