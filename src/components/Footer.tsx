import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 md:px-12 lg:px-16 bg-[#040408] border-t border-white/[0.05]">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 flex-wrap">
        
        {/* Brand Block */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-accent-orange/[0.08] border border-accent-orange/35 p-1 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            <img
              src="/db-logo.jpg"
              alt="DB Logo"
              className="h-full w-full object-contain mix-blend-screen filter contrast-125 brightness-150 drop-shadow-[0_0_10px_rgba(249,115,22,0.85)]"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-cinzel text-[1.15rem] font-bold text-white tracking-wider flex items-center gap-1.5">
              <span>DEBENDRANATH</span>
              <span className="text-accent-orange font-extrabold">BERA</span>
            </div>
            <p className="text-[0.82rem] text-text-muted">Developer • Problem Solver • Dreamer</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-7 items-center flex-wrap">
          <a href="#home" className="text-text-secondary no-underline text-[0.95rem] font-medium transition-all hover:text-accent-cyan">/home</a>
          <a href="#about" className="text-text-secondary no-underline text-[0.95rem] font-medium transition-all hover:text-accent-cyan">/about</a>
          <a href="#work" className="text-text-secondary no-underline text-[0.95rem] font-medium transition-all hover:text-accent-cyan">/work</a>
          <a href="#experience" className="text-text-secondary no-underline text-[0.95rem] font-medium transition-all hover:text-accent-cyan">/experience</a>
          <a href="#contact" className="text-text-secondary no-underline text-[0.95rem] font-medium transition-all hover:text-accent-cyan">/contact</a>
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
          <a href="mailto:debendra@example.com" className="text-text-secondary no-underline text-[0.95rem] font-medium transition-all hover:text-accent-cyan">
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
