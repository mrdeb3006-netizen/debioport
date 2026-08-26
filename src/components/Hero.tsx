import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const XIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InteractiveDotMatrix: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = React.useState<{ x: number; y: number } | null>(null);

  const rows = 3;
  const cols = 8;
  const dots = Array.from({ length: rows * cols }, (_, i) => ({
    id: i,
    row: Math.floor(i / cols),
    col: i % cols,
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="mt-8 p-3 -ml-3 grid grid-cols-8 gap-3.5 w-max cursor-pointer rounded-xl select-none relative z-20 group/matrix"
      title="Interactive dot matrix • Hover to distort"
      aria-label="Interactive matrix dots"
    >
      {dots.map((dot) => {
        // Approximate center of each dot relative to container
        const dotX = dot.col * 20 + 8;
        const dotY = dot.row * 20 + 8;

        let scale = 1;
        let isNear = false;
        let transformOffset = { x: 0, y: 0 };

        if (mousePos) {
          const dist = Math.hypot(mousePos.x - dotX, mousePos.y - dotY);
          const maxDist = 70;
          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            const factor = Math.pow(proximity, 1.3);
            scale = 1 + factor * 2.2;
            isNear = true;
            transformOffset = {
              x: (mousePos.x - dotX) * factor * 0.25,
              y: (mousePos.y - dotY) * factor * 0.25,
            };
          }
        }

        return (
          <div
            key={dot.id}
            style={{
              transform: `translate(${transformOffset.x}px, ${transformOffset.y}px) scale(${scale})`,
              transition: mousePos
                ? 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.12s'
                : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s',
            }}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              isNear
                ? 'bg-accent-orange'
                : 'bg-white/20'
            }`}
          />
        );
      })}
    </div>
  );
};

interface HeroProps {
  onOpenCvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal }) => {
  const debendraLetters = ['D', 'E', 'B', 'E', 'N', 'D', 'R', 'A'];
  const nathLetters = ['N', 'A', 'T', 'H'];
  const beraLetters = ['B', 'E', 'R', 'A'];

  return (
    <section className="relative min-h-screen w-full flex items-center pt-[84px] overflow-hidden bg-bg-dark" id="home">
      {/* Background Portrait Image (The First Photo) */}
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-[center_right] md:bg-[80%_center] lg:bg-[85%_center] bg-cover z-[1] pointer-events-none"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        aria-hidden="true"
      >
        {/* Glowing Orange Celestial Eclipse Ring behind the head/silhouette */}
        <div className="absolute top-[8%] right-[-12%] sm:right-[4%] md:right-[8%] lg:right-[10%] w-[330px] sm:w-[440px] md:w-[520px] h-[330px] sm:h-[440px] md:h-[520px] rounded-full border-2 border-orange-500/50 shadow-[0_0_90px_rgba(249,115,22,0.45)] pointer-events-none z-[2] opacity-85" />
        
        {/* Subtle Diagonal Laser Accent Streak Lines */}
        <div className="absolute top-8 -left-24 w-[500px] h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rotate-[-35deg] pointer-events-none z-[2]" />
        <div className="absolute bottom-16 -right-24 w-[600px] h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent rotate-[-35deg] pointer-events-none z-[2]" />

        {/* Cinematic smooth gradient masks for flawless dark mode integration */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/85 sm:via-bg-dark/60 md:via-bg-dark/40 to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/40 z-[2]" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-bg-dark/70 z-[2]" />
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 relative z-10 flex items-center min-h-[calc(100vh-84px)]">
        {/* Left Content Column */}
        <div className="w-full max-w-[800px] flex flex-col justify-center">

          {/* Status Badge: Open to Opportunities */}
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141419]/90 border border-white/10 backdrop-blur-md mb-4 sm:mb-5 w-fit select-none animate-item shadow-sm"
            style={{ ['--delay' as any]: '0.1s' }}
          >
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse shadow-[0_0_8px_#f97316]" />
            <span className="text-[0.78rem] sm:text-[0.84rem] text-slate-200 font-medium tracking-wide">
              Open to Opportunities
            </span>
          </div>

          {/* Main Huge Display Title: Line 1 (DEBENDRA) + Line 2 (NATH BERA) */}
          <div className="mb-4 sm:mb-5 -mt-1 select-none overflow-visible w-full">
            {/* Line 1: DEBENDRA (Solid White) */}
            <div className="overflow-visible pb-0.5 sm:pb-1 w-full">
              <h1 className="font-display text-[2.2rem] xs:text-[2.65rem] sm:text-[3.5rem] md:text-[4.4rem] lg:text-[5.2rem] font-black tracking-[0.01em] sm:tracking-[0.02em] leading-[1.05] whitespace-nowrap inline-flex overflow-visible pb-[0.05em] uppercase">
                {debendraLetters.map((letter, idx) => (
                  <span
                    key={`deb-${idx}`}
                    className="animate-letter-drop text-white inline-block transition-transform duration-300 hover:scale-105 hover:-translate-y-1 cursor-default"
                    style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
            </div>

            {/* Line 2: NATH (Solid White) + BERA (Orange Wireframe) */}
            <div className="overflow-visible pt-0.5 w-full">
              <h2 className="font-display text-[2.2rem] xs:text-[2.65rem] sm:text-[3.5rem] md:text-[4.4rem] lg:text-[5.2rem] font-black tracking-[0.01em] sm:tracking-[0.02em] leading-[1.05] whitespace-nowrap inline-flex items-center gap-2.5 sm:gap-3.5 md:gap-4 overflow-visible pb-[0.05em] uppercase">
                {/* Solid White Letters: N A T H */}
                <span className="inline-flex overflow-visible">
                  {nathLetters.map((letter, idx) => (
                    <span
                      key={`nath-${idx}`}
                      className="animate-letter-drop text-white inline-block transition-transform duration-300 hover:scale-105 hover:-translate-y-1 cursor-default"
                      style={{ animationDelay: `${0.65 + idx * 0.06}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>

                {/* Orange Wireframe Hollow Letters: B E R A */}
                <span className="inline-flex overflow-visible">
                  {beraLetters.map((letter, idx) => (
                    <span
                      key={`bera-${idx}`}
                      className="animate-letter-drop text-transparent [-webkit-text-stroke:1.8px_#f97316] sm:[-webkit-text-stroke:2.4px_#f97316] md:[-webkit-text-stroke:2.8px_#f97316] inline-block transition-transform duration-300 hover:scale-105 hover:-translate-y-1 cursor-default"
                      style={{ animationDelay: `${0.95 + idx * 0.07}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </h2>
            </div>
          </div>

          {/* Tagline Bar: — DEVELOPER • PROBLEM SOLVER • DREAMER */}
          <div className="flex items-center gap-3 mb-5 animate-item" style={{ ['--delay' as any]: '1.3s' }}>
            <div className="w-7 h-[2px] bg-accent-orange rounded-full" />
            <div className="font-mono text-[0.74rem] sm:text-[0.84rem] md:text-[0.88rem] font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-text-primary flex items-center gap-2 flex-wrap">
              <span className="text-slate-200">DEVELOPER</span>
              <span className="text-text-muted text-[0.75rem]">•</span>
              <span className="text-slate-200">PROBLEM SOLVER</span>
              <span className="text-text-muted text-[0.75rem]">•</span>
              <span className="text-accent-orange font-extrabold">DREAMER</span>
            </div>
          </div>

          {/* Description Paragraph */}
          <div className="mb-5 animate-item" style={{ ['--delay' as any]: '1.45s' }}>
            <p className="text-[0.92rem] sm:text-[1.05rem] leading-[1.65] text-[#d4d4d8] font-normal max-w-[560px]">
              Turning ideas into digital reality. I build clean, efficient and impactful solutions for the web.
            </p>
          </div>

          {/* Quote Card (Clean Card with Orange Left Accent) */}
          <div
            className="border-l-[3px] border-accent-orange bg-[#111116]/85 backdrop-blur-md rounded-r-xl p-3.5 sm:p-4 border border-white/[0.06] border-l-0 max-w-[580px] mb-6 animate-item shadow-sm"
            style={{ ['--delay' as any]: '1.55s' }}
          >
            <p className="text-[0.86rem] sm:text-[0.92rem] text-slate-300 italic font-normal leading-[1.55]">
              “Follow your passion, keep learning, and keep growing.”
            </p>
          </div>

          {/* CTA Action Buttons (Stacked Full-Width on Mobile, Row on Desktop) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-7 w-full sm:w-auto animate-item" style={{ ['--delay' as any]: '1.65s' }}>
            <button
              type="button"
              onClick={onOpenCvModal}
              className="w-full sm:w-auto justify-center py-4 px-8 rounded-2xl bg-accent-orange text-bg-dark font-display font-black text-[0.88rem] sm:text-[0.92rem] tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:bg-orange-600 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>DOWNLOAD CV</span>
              <span className="text-base font-black">↓</span>
            </button>

            <a
              href="#work"
              className="w-full sm:w-auto justify-center py-4 px-8 rounded-2xl bg-[#121218]/90 border border-white/15 text-white font-display font-bold text-[0.88rem] sm:text-[0.92rem] tracking-wider uppercase flex items-center gap-2 hover:border-white/30 hover:bg-[#1a1a22] active:scale-[0.98] transition-all shadow-md cursor-pointer text-[0.88rem] sm:text-[0.92rem]"
            >
              <span>VIEW WORK</span>
              <span className="text-base font-bold">→</span>
            </a>
          </div>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-3 animate-item mb-2" style={{ ['--delay' as any]: '1.8s' }}>
            <div className="w-[3px] h-7 bg-accent-orange rounded-full mr-0.5" />
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/mrdeb3006-netizen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#121218]/90 border border-white/15 text-slate-300 flex items-center justify-center transition-all duration-300 hover:text-accent-orange hover:border-accent-orange/40 hover:-translate-y-0.5 shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#121218]/90 border border-white/15 text-slate-300 flex items-center justify-center transition-all duration-300 hover:text-accent-orange hover:border-accent-orange/40 hover:-translate-y-0.5 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#121218]/90 border border-white/15 text-slate-300 flex items-center justify-center transition-all duration-300 hover:text-accent-orange hover:border-accent-orange/40 hover:-translate-y-0.5 shadow-sm"
                aria-label="X (formerly Twitter) Profile"
              >
                <XIcon size={16} />
              </a>
              <a
                href="mailto:mrdeb3006@gmail.com"
                className="w-11 h-11 rounded-xl bg-[#121218]/90 border border-white/15 text-slate-300 flex items-center justify-center transition-all duration-300 hover:text-accent-orange hover:border-accent-orange/40 hover:-translate-y-0.5 shadow-sm"
                aria-label="Email Debendra"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Interactive Cursor-Reactive Dot Matrix Grid */}
          <InteractiveDotMatrix />

        </div>
      </div>

      {/* Slide Down Hint */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#a1a1aa] no-underline font-mono text-[0.72rem] tracking-[0.2em] z-20 transition-all duration-300 hover:text-accent-orange animate-bounce-hint"
        aria-label="Slide down to see more"
      >
        <span>SLIDE DOWN</span>
        <span className="text-accent-orange text-base">↓</span>
      </a>
    </section>
  );
};
