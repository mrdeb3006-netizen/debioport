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

interface HeroProps {
  onOpenCvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal }) => {
  return (
    <section className="relative min-h-screen w-full flex items-center pt-[84px] overflow-hidden" id="home">
      {/* Background Portrait treatment (Exact Master Design System) */}
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-[right_top] bg-cover bg-bg-dark z-[1] pointer-events-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        aria-hidden="true"
      />

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 py-8 relative z-10 flex items-center">
        {/* Left Content Column */}
        <div className="w-full max-w-[720px] flex flex-col justify-center">
          
          {/* Cursive Signature Line: hey, I am */}
          <div className="mb-2.5 flex items-center overflow-visible">
            <div className="signature-cursive-wrapper">
              <span className="signature-cursive-text select-none">
                Hey, I am
              </span>
              <div className="signature-pen-stroke" aria-hidden="true" />
            </div>
          </div>

          {/* Main Huge Title: DEBENDRA - Dropping letter by letter */}
          <div className="mb-5 overflow-visible">
            <h1 className="font-display text-[clamp(2.8rem,5.2vw,4.6rem)] font-black tracking-[0.02em] leading-[1.1] whitespace-nowrap inline-flex overflow-visible pb-[0.08em] uppercase">
              {['D', 'E', 'B', 'E', 'N', 'D', 'R', 'A'].map((letter, idx) => (
                <span
                  key={idx}
                  className="animate-letter-drop bg-hero-name bg-clip-text text-transparent inline-block transition-transform duration-300 hover:scale-110 hover:-translate-y-2 cursor-default"
                  style={{ animationDelay: `${0.45 + idx * 0.12}s` }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-5 mb-7 animate-item" style={{ ['--delay' as any]: '1.55s' }}>
            <div className="w-7 h-[2px] bg-gradient-to-r from-accent-cyan to-accent-purple rounded shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
            <div className="font-main text-[clamp(0.78rem,1.05vw,0.92rem)] font-semibold tracking-[0.2em] uppercase text-text-primary flex items-center gap-3 flex-wrap">
              <span className="text-slate-200 tracking-[0.2em] hover:text-accent-cyan hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all">DEVELOPER</span>
              <span className="text-accent-purple text-[0.85rem] opacity-80">•</span>
              <span className="text-slate-200 tracking-[0.2em] hover:text-accent-cyan hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all">PROBLEM SOLVER</span>
              <span className="text-accent-purple text-[0.85rem] opacity-80">•</span>
              <span className="text-accent-purple font-bold">DREAMER</span>
            </div>
          </div>

          {/* Description & Motto Block */}
          <div className="mb-9 animate-item" style={{ ['--delay' as any]: '1.7s' }}>
            <p className="text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.75] text-[#94a3b8] font-normal max-w-[540px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-4">
              Turning ideas into digital reality. I build clean, efficient, and impactful solutions for the web.
            </p>
            
            <div className="border-l-2 border-accent-cyan/60 pl-3.5 py-1 max-w-[540px] bg-gradient-to-r from-accent-cyan/[0.04] to-transparent rounded-r-lg">
              <p className="text-[0.92rem] md:text-[0.96rem] text-slate-200/95 italic font-medium tracking-wide leading-relaxed">
                “Be humble, keep smiling, keep learning, keep growing”
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-6 mb-12 flex-wrap animate-item" style={{ ['--delay' as any]: '1.85s' }}>
            <a
              href="#work"
              className="btn-primary group"
            >
              <span>VIEW WORK</span>
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <button
              type="button"
              onClick={onOpenCvModal}
              className="btn-secondary"
            >
              <span>DOWNLOAD CV</span>
              <span className="text-lg ml-2">↓</span>
            </button>
          </div>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-5 animate-item" style={{ ['--delay' as any]: '2.1s' }}>
            <div className="w-[2px] h-7 bg-gradient-to-b from-accent-cyan to-accent-purple rounded shadow-[0_0_8px_rgba(56,189,248,0.4)]" />
            <div className="flex items-center gap-5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8b92ab] flex items-center justify-center transition-all duration-300 hover:text-accent-cyan hover:-translate-y-0.5 hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8b92ab] flex items-center justify-center transition-all duration-300 hover:text-accent-cyan hover:-translate-y-0.5 hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8b92ab] flex items-center justify-center transition-all duration-300 hover:text-accent-cyan hover:-translate-y-0.5 hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                aria-label="X (formerly Twitter) Profile"
              >
                <XIcon size={18} />
              </a>
              <a
                href="mailto:debendra@example.com"
                className="text-[#8b92ab] flex items-center justify-center transition-all duration-300 hover:text-accent-cyan hover:-translate-y-0.5 hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                aria-label="Email Debendra"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Down Hint */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#94a3b8] no-underline font-mono text-[0.75rem] tracking-[0.2em] z-20 transition-all duration-300 hover:text-accent-cyan hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] animate-bounce-hint"
        aria-label="Slide down to see more"
      >
        <span>SLIDE DOWN</span>
        <span className="text-accent-cyan text-lg">↓</span>
      </a>
    </section>
  );
};
