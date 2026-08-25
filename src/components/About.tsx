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

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.95fr] gap-14 items-start">
          
          {/* Left Column: Story - Staggered Graceful Slide In */}
          <div className="flex flex-col gap-5">
            <p
              className="text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold leading-[1.5] text-white"
              style={getSlideUpStyle(0.35)}
            >
              Hi, I'm <span className="text-accent-cyan font-extrabold">Debendra</span> — a 19-year-old first-year Computer Science and Engineering student from Kolkata, passionate about programming, problem-solving, and software development.
            </p>
            
            <p
              className="text-[1.1rem] leading-[1.75] text-text-secondary"
              style={getSlideUpStyle(0.60)}
            >
              Currently, I’m learning Data Structures and Algorithms using Java while strengthening my programming fundamentals. I also have a basic understanding of Python and enjoy exploring different technologies through hands-on learning and projects.
            </p>
            
            <p
              className="text-[1.1rem] leading-[1.75] text-text-secondary"
              style={getSlideUpStyle(0.85)}
            >
              I’m focused on building a strong foundation in Computer Science, improving my problem-solving skills, and gradually developing practical software development skills.
            </p>
            
            <p
              className="text-[1.1rem] leading-[1.75] text-text-secondary font-medium text-slate-100"
              style={getSlideUpStyle(1.10)}
            >
              I’m always looking to learn, build and grow as a developer.
            </p>

            <p
              className="text-[1.05rem] leading-[1.75] text-slate-300 italic pt-1 flex items-center gap-2"
              style={getSlideUpStyle(1.25)}
            >
              <span>Apart from that, a coffee lover with an interest in philosophy.</span>
              <span className="text-base" aria-hidden="true">☕</span>
            </p>
          </div>

          {/* Right Column: Info Blocks - Slower Sequential Presentation Fly-In */}
          <div className="flex flex-col gap-5">
            
            <div
              className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-7 transition-all duration-300 hover:border-accent-cyan/40 hover:translate-x-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(249,115,22,0.15)]"
              style={getSlideUpStyle(0.40)}
            >
              <span className="font-mono text-[0.78rem] font-semibold text-accent-cyan tracking-[0.16em] block mb-1.5 uppercase">
                LOCATION &amp; AGE
              </span>
              <div className="text-[1.05rem] font-semibold text-slate-100 leading-[1.5] flex items-center gap-2.5 flex-wrap">
                <span>📍 Kolkata, India</span>
                <span className="text-accent-purple font-normal">•</span>
                <span>19 Years Old</span>
              </div>
            </div>

            <div
              className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-7 transition-all duration-300 hover:border-accent-cyan/40 hover:translate-x-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(249,115,22,0.15)]"
              style={getSlideUpStyle(0.60)}
            >
              <span className="font-mono text-[0.78rem] font-semibold text-accent-cyan tracking-[0.16em] block mb-1.5 uppercase">
                CURRENTLY
              </span>
              <div className="text-[1.05rem] font-semibold text-slate-100 leading-[1.5]">
                Computer Science Student • Engineering Foundations
              </div>
            </div>

            <div
              className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-7 transition-all duration-300 hover:border-accent-cyan/40 hover:translate-x-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(249,115,22,0.15)]"
              style={getSlideUpStyle(0.80)}
            >
              <span className="font-mono text-[0.78rem] font-semibold text-accent-cyan tracking-[0.16em] block mb-1.5 uppercase">
                FOCUS
              </span>
              <div className="text-[1.05rem] font-semibold text-slate-100 leading-[1.5]">
                Programming • Data Structures &amp; Algorithms • Exploring Different Fields of Development &amp; AI
              </div>
            </div>

            <div
              className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-7 transition-all duration-300 hover:border-accent-cyan/40 hover:translate-x-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(249,115,22,0.15)]"
              style={getSlideUpStyle(1.00)}
            >
              <span className="font-mono text-[0.78rem] font-semibold text-accent-cyan tracking-[0.16em] block mb-1.5 uppercase">
                INTERESTS
              </span>
              <div className="text-[1.05rem] font-semibold text-slate-100 leading-[1.5]">
                Technology • Entrepreneurship • Tennis • Philosophy • Coffee • Building Useful Software
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
