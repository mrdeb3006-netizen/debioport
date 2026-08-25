import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 md:px-12 lg:px-16 bg-[#040408] border-t border-white/[0.05]">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 flex-wrap">
        
        {/* Brand Block */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[0.75rem] font-bold tracking-[0.2em] text-accent-cyan">MR DEB</span>
          <h4 className="font-display text-[1.4rem] font-black text-white">DEBENDRA</h4>
          <p className="text-[0.85rem] text-text-muted">Developer • Problem Solver • Dreamer</p>
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
