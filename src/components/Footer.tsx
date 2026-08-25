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
            className="h-11 w-auto rounded-xl object-contain mix-blend-screen select-none transition-transform duration-300"
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
        <div className="flex gap-6 sm:gap-7 items-center flex-wrap">
          <a
            href="https://github.com/mrdeb3006-netizen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary no-underline text-[0.92rem] font-medium transition-all hover:text-accent-orange"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary no-underline text-[0.92rem] font-medium transition-all hover:text-accent-orange"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary no-underline text-[0.92rem] font-medium transition-all hover:text-accent-orange"
          >
            X (Twitter)
          </a>
          <a
            href="https://wa.me/916289214258"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary no-underline text-[0.92rem] font-medium transition-all hover:text-emerald-400"
          >
            WhatsApp
          </a>
          <a
            href="mailto:mrdeb3006@gmail.com"
            className="text-text-secondary no-underline text-[0.92rem] font-medium transition-all hover:text-accent-orange"
          >
            Email
          </a>
        </div>

        {/* Bottom Attribution & Philosophical Quote */}
        <div className="w-full border-t border-white/[0.06] pt-8 mt-2 flex flex-col items-center justify-center text-center gap-3">
          <p className="font-mono text-[0.84rem] text-slate-300 tracking-wide">
            © {new Date().getFullYear()} <span className="font-bold text-white">DEBENDRANATH BERA</span>. All Rights Reserved.
          </p>

          {/* Inspirational Philosophy Quote */}
          <div className="max-w-[760px] mx-auto px-4">
            <p className="font-serifDisplay italic text-[0.92rem] sm:text-[1.02rem] text-accent-orange/90 leading-relaxed drop-shadow-[0_0_12px_rgba(249,115,22,0.25)]">
              “Yesterday is history, tomorrow is a mystery, and today is a gift — that's why it is called the present.”
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
