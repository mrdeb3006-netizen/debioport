import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 md:px-12 lg:px-16 bg-[#040408] border-t border-white/[0.05]">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 flex-wrap">
        
        {/* Brand Block */}
        <div className="flex items-center gap-3.5">
          <img
            src="/db-logo.jpg"
            alt="DB Logo"
            className="h-11 w-auto object-contain mix-blend-screen select-none filter contrast-125 brightness-125 drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]"
          />
          <div className="flex flex-col">
            <div className="font-cinzel text-[1.1rem] font-bold text-white tracking-wider flex items-center gap-1.5">
              <span>DEBENDRANATH</span>
              <span className="text-accent-orange font-extrabold">BERA</span>
            </div>
            <p className="text-[0.82rem] text-text-muted">Developer • Problem Solver • Dreamer</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-5 sm:gap-6 items-center flex-wrap">
          <a href="#home" className="text-text-secondary no-underline text-[0.92rem] font-medium capitalize transition-all hover:text-accent-orange">home</a>
          <a href="#about" className="text-text-secondary no-underline text-[0.92rem] font-medium capitalize transition-all hover:text-accent-orange">about</a>
          <a href="#work" className="text-text-secondary no-underline text-[0.92rem] font-medium capitalize transition-all hover:text-accent-orange">projects</a>
          <a href="#journey" className="text-text-secondary no-underline text-[0.92rem] font-medium capitalize transition-all hover:text-accent-orange">journey</a>
          <a href="#skills" className="text-text-secondary no-underline text-[0.92rem] font-medium capitalize transition-all hover:text-accent-orange">skills</a>
          <a href="#other-works" className="text-text-secondary no-underline text-[0.92rem] font-medium capitalize transition-all hover:text-accent-orange">other works</a>
          <a href="#contact" className="text-text-secondary no-underline text-[0.92rem] font-medium capitalize transition-all hover:text-accent-orange">contact</a>
        </div>

        {/* Social Links */}
        <div className="flex gap-7 items-center">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary no-underline text-[0.95rem] font-medium transition-all hover:text-accent-cyan">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary no-underline text-[0.95rem] font-medium transition-all hover:text-accent-cyan">
            LinkedIn
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary no-underline text-[0.95rem] font-medium transition-all hover:text-accent-cyan">
            X (Twitter)
          </a>
          <a href="mailto:mrdeb3006@gmail.com" className="text-text-secondary no-underline text-[0.95rem] font-medium transition-all hover:text-accent-cyan">
            Email
          </a>
        </div>

        {/* Copyright */}
        <div className="w-full border-t border-white/[0.04] pt-8 mt-4 text-center font-mono text-[0.82rem] text-text-muted">
          © 2026 MR DEB
        </div>

      </div>
    </footer>
  );
};
