import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'home' },
    { id: 'about', label: 'about' },
    { id: 'work', label: 'projects' },
    { id: 'journey', label: 'journey' },
    { id: 'skills', label: 'skills' },
    { id: 'other-works', label: 'other works' },
    { id: 'contact', label: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-[76px] sm:h-[84px] z-[99999] px-4 md:px-10 lg:px-16 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#09090b]/95 backdrop-blur-[16px] border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
            : 'bg-transparent border-b border-transparent shadow-none backdrop-blur-none'
        }`}
      >
        <div className="max-w-[1600px] h-full mx-auto flex items-center justify-between gap-3 sm:gap-4 md:gap-6">
          
          {/* Brand Logo Lockup */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2.5 sm:gap-3 no-underline text-white group shrink-0 min-w-0"
            aria-label="Debendranath Bera Portfolio Home"
          >
            <img
              src="/db-logo.jpg"
              alt="DB Monogram Logo"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain mix-blend-screen select-none transition-all duration-300 filter contrast-125 brightness-125 drop-shadow-[0_0_12px_rgba(249,115,22,0.5)] group-hover:scale-105"
            />
            <span className="font-cinzel text-[0.80rem] sm:text-[0.92rem] md:text-[1.05rem] font-bold tracking-[0.08em] sm:tracking-[0.12em] text-white uppercase whitespace-nowrap transition-colors duration-300 group-hover:text-accent-orange">
              DEBENDRANATH <span className="text-accent-orange font-extrabold">BERA</span>
            </span>
          </a>

          {/* Desktop Navigation (Visible on Large Screens >= 1024px) */}
          <nav className="desktop-nav hidden lg:flex items-center ml-auto gap-4 xl:gap-6" aria-label="Main Navigation">
            <ul className="flex items-center gap-3 lg:gap-4.5 xl:gap-5.5 list-none m-0 p-0">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`relative text-[0.88rem] lg:text-[0.92rem] font-medium py-1 px-1 inline-flex items-center capitalize transition-all duration-300 ${
                      activeSection === item.id
                        ? 'text-accent-orange font-bold drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                        : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent-orange rounded shadow-[0_0_6px_rgba(249,115,22,0.5)]" />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Top-Right Action Button: Let's connect → */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-md bg-accent-orange text-bg-dark font-display font-extrabold text-[0.74rem] tracking-wider uppercase hover:bg-orange-600 hover:shadow-[0_0_16px_rgba(249,115,22,0.4)] transition-all duration-300 cursor-pointer shadow-sm ml-2 shrink-0"
            >
              <span>Let's connect</span>
              <span className="text-sm font-bold">→</span>
            </a>
          </nav>

          {/* Mobile Hamburger Button (Visible on Mobile & Tablet < 1024px) */}
          <button
            type="button"
            className="mobile-hamburger-btn flex lg:hidden relative flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-xl bg-[#141419] border border-accent-orange/50 hover:border-accent-orange hover:bg-[#1c1c24] active:scale-95 transition-all duration-200 cursor-pointer ml-auto z-[99999] shadow-[0_0_12px_rgba(249,115,22,0.25)] shrink-0"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="w-5 h-[2.5px] bg-accent-orange rounded-full" />
            <span className="w-5 h-[2.5px] bg-white rounded-full" />
            <span className="w-5 h-[2.5px] bg-accent-orange rounded-full" />
          </button>

        </div>
      </header>

      {/* Fullscreen Mobile Drawer Portal (Mounts directly on document.body with max z-index) */}
      {mobileMenuOpen &&
        createPortal(
          <div
            className="fixed inset-0 w-screen h-screen z-[9999999] bg-[#050508]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Top Bar with Brand & Close Button */}
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.1] shrink-0">
              <div className="flex items-center gap-2.5">
                <img
                  src="/db-logo.jpg"
                  alt="DB Monogram"
                  className="h-8 w-auto object-contain mix-blend-screen filter contrast-125 brightness-125 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                />
                <span className="font-cinzel text-[0.88rem] sm:text-[0.95rem] font-bold text-white tracking-wider">
                  DEBENDRANATH <span className="text-accent-orange font-extrabold">BERA</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-white text-xl hover:text-accent-orange hover:border-accent-orange active:scale-95 transition-all cursor-pointer shadow-md"
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            </div>

            {/* Navigation Links (Crystal Clear, Numbered, High Contrast) */}
            <div className="py-6 my-auto shrink-0">
              <ul className="list-none flex flex-col gap-2 max-w-[360px] mx-auto p-0 m-0">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between py-3.5 px-4 rounded-xl transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-accent-orange/15 border border-accent-orange/50 text-accent-orange shadow-[0_0_18px_rgba(249,115,22,0.25)] font-black'
                            : 'text-slate-100 hover:text-white hover:bg-white/[0.06] border border-transparent font-bold'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 text-left">
                          <span className={`font-mono text-[0.80rem] ${
                            isActive ? 'text-accent-orange font-bold' : 'text-slate-400 font-semibold'
                          }`}>
                            0{idx + 1}.
                          </span>
                          <span className="font-display text-[1.35rem] sm:text-[1.5rem] uppercase tracking-wide">
                            {item.label}
                          </span>
                        </div>

                        {isActive && (
                          <span className="w-2.5 h-2.5 rounded-full bg-accent-orange shadow-[0_0_10px_#f97316]" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Bottom Actions & Contact Links */}
            <div className="pt-5 border-t border-white/[0.1] flex flex-col gap-4 max-w-[360px] mx-auto w-full shrink-0">
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="btn-primary w-full justify-center py-4 rounded-xl text-[0.98rem] font-bold text-white shadow-[0_0_22px_rgba(249,115,22,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <span>Let's connect</span>
                <span className="text-lg">→</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[0.82rem] font-mono text-slate-300">
                <a
                  href="https://github.com/mrdeb3006-netizen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-orange transition-colors"
                >
                  GitHub ↗
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-orange transition-colors"
                >
                  LinkedIn ↗
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href="mailto:mrdeb3006@gmail.com"
                  className="hover:text-accent-orange transition-colors"
                >
                  Email ↗
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
