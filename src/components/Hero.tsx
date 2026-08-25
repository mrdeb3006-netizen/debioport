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
        let glowIntensity = 0;

        if (mousePos) {
          const dist = Math.hypot(mousePos.x - dotX, mousePos.y - dotY);
          const maxDist = 70;
          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            const factor = Math.pow(proximity, 1.3);
            scale = 1 + factor * 2.2;
            isNear = true;
            glowIntensity = factor;
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
              boxShadow: isNear
                ? `0 0 ${glowIntensity * 12}px rgba(249, 115, 22, ${glowIntensity * 0.95}), 0 0 4px #fff`
                : 'none',
              transition: mousePos
                ? 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.12s, box-shadow 0.12s'
                : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s, box-shadow 0.4s',
            }}
            className={`w-1.5 h-1.5 rounded-full ${
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
  const lettersSolid = ['B', 'E'];
  const lettersOutline = ['R', 'A'];

  return (
    <section className="relative min-h-screen w-full flex items-center pt-[84px] overflow-hidden bg-bg-dark" id="home">
      {/* Background Portrait Image (The First Photo) */}
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-[center_right] md:bg-[80%_center] lg:bg-[85%_center] bg-cover z-[1] pointer-events-none"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        aria-hidden="true"
      >
        {/* Cinematic smooth gradient masks for flawless dark mode integration */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/85 sm:via-bg-dark/60 md:via-bg-dark/40 to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/40 z-[2]" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-bg-dark/70 z-[2]" />
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 py-12 relative z-10 flex items-center min-h-[calc(100vh-84px)]">
        {/* Left Content Column */}
        <div className="w-full max-w-[760px] flex flex-col justify-center">
          
          {/* Cursive Signature: Debendra */}
          <div className="mb-2 flex items-center overflow-visible">
            <div className="signature-cursive-wrapper">
              <span className="signature-cursive-text select-none">
                Debendra
              </span>
              <div className="signature-pen-stroke" aria-hidden="true" />
            </div>
          </div>

          {/* Main Huge Display Title: BE (Solid Chrome White) + RA (Orange Hollow Wireframe) */}
          <div className="mb-5 overflow-visible">
            <h1 className="font-display text-[clamp(3.8rem,8.5vw,7.4rem)] font-black tracking-[0.04em] leading-[1.05] whitespace-nowrap inline-flex overflow-visible pb-[0.05em] uppercase select-none">
              {/* Solid White Letters: B E */}
              {lettersSolid.map((letter, idx) => (
                <span
                  key={`solid-${idx}`}
                  className="animate-letter-drop text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)] inline-block transition-transform duration-300 hover:scale-105 hover:-translate-y-1 cursor-default"
                  style={{ animationDelay: `${0.35 + idx * 0.12}s` }}
                >
                  {letter}
                </span>
              ))}
              {/* Orange Hollow Wireframe Letters: R A */}
              {lettersOutline.map((letter, idx) => (
                <span
                  key={`outline-${idx}`}
                  className="animate-letter-drop text-transparent [-webkit-text-stroke:2px_#f97316] md:[-webkit-text-stroke:2.5px_#f97316] drop-shadow-[0_0_20px_rgba(249,115,22,0.45)] inline-block transition-transform duration-300 hover:scale-105 hover:-translate-y-1 cursor-default"
                  style={{ animationDelay: `${0.35 + (lettersSolid.length + idx) * 0.12}s` }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Tagline Bar: — DEVELOPER • PROBLEM SOLVER • DREAMER */}
          <div className="flex items-center gap-3.5 mb-6 animate-item" style={{ ['--delay' as any]: '1.35s' }}>
            <div className="w-8 h-[2.5px] bg-accent-orange rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]" />
            <div className="font-mono text-[clamp(0.75rem,0.95vw,0.88rem)] font-bold tracking-[0.18em] uppercase text-text-primary flex items-center gap-2.5 flex-wrap">
              <span className="text-slate-200 tracking-[0.18em]">DEVELOPER</span>
              <span className="text-text-muted text-[0.8rem]">•</span>
              <span className="text-slate-200 tracking-[0.18em]">PROBLEM SOLVER</span>
              <span className="text-text-muted text-[0.8rem]">•</span>
              <span className="text-accent-orange font-extrabold drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]">DREAMER</span>
            </div>
          </div>

          {/* Description Paragraph */}
          <div className="mb-8 animate-item" style={{ ['--delay' as any]: '1.5s' }}>
            <p className="text-[clamp(0.95rem,1.15vw,1.1rem)] leading-[1.75] text-[#a1a1aa] font-normal max-w-[560px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-4">
              Turning ideas into digital reality.<br className="hidden sm:inline" />
              I build clean, efficient and impactful solutions for the web.
            </p>
            
            <div className="border-l-2 border-accent-orange/60 pl-3.5 py-1 max-w-[560px] bg-gradient-to-r from-accent-orange/[0.05] to-transparent rounded-r-lg">
              <p className="text-[0.88rem] md:text-[0.92rem] text-slate-300 italic font-medium tracking-wide leading-relaxed">
                “Be humble, keep smiling, keep learning, keep growing”
              </p>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex items-center gap-4 mb-10 flex-wrap animate-item" style={{ ['--delay' as any]: '1.65s' }}>
            <button
              type="button"
              onClick={onOpenCvModal}
              className="btn-primary group"
            >
              <span>DOWNLOAD CV</span>
              <span className="text-base font-black ml-1 transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </button>

            <a
              href="#work"
              className="btn-secondary group"
            >
              <span>VIEW WORK</span>
              <span className="text-base font-black ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-5 animate-item" style={{ ['--delay' as any]: '1.85s' }}>
            <div className="w-[2px] h-6 bg-accent-orange rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/mrdeb3006-netizen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 text-[#a1a1aa] flex items-center justify-center transition-all duration-300 hover:text-accent-orange hover:border-accent-orange/40 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 text-[#a1a1aa] flex items-center justify-center transition-all duration-300 hover:text-accent-orange hover:border-accent-orange/40 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 text-[#a1a1aa] flex items-center justify-center transition-all duration-300 hover:text-accent-orange hover:border-accent-orange/40 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                aria-label="X (formerly Twitter) Profile"
              >
                <XIcon size={16} />
              </a>
              <a
                href="mailto:debendra@example.com"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 text-[#a1a1aa] flex items-center justify-center transition-all duration-300 hover:text-accent-orange hover:border-accent-orange/40 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(249,115,22,0.3)]"
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
        href="#work"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#a1a1aa] no-underline font-mono text-[0.72rem] tracking-[0.2em] z-20 transition-all duration-300 hover:text-accent-orange animate-bounce-hint"
        aria-label="Slide down to see more"
      >
        <span>SLIDE DOWN</span>
        <span className="text-accent-orange text-base">↓</span>
      </a>
    </section>
  );
};
