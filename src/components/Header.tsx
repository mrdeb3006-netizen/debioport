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
        <div className="max-w-[1600px] h-full mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
          
          {/* Brand Logo Lockup */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2 sm:gap-2.5 md:gap-3 no-underline text-white group shrink-0 min-w-0"
            aria-label="Debendranath Bera Portfolio Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-black border border-white/20 p-1 flex items-center justify-center shadow-sm shrink-0">
              <img
                src="/db-logo.jpg"
                alt="DB Monogram Logo"
                className="w-full h-full object-contain mix-blend-screen select-none filter contrast-125 brightness-125 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="font-cinzel text-[0.78rem] sm:text-[0.88rem] md:text-[1.05rem] font-bold tracking-[0.06em] sm:tracking-[0.10em] text-white uppercase whitespace-nowrap transition-colors duration-300 group-hover:text-accent-orange">
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

            {/* Top-Right Action Button: CONNECT → */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg bg-accent-orange text-bg-dark font-display font-black text-[0.74rem] tracking-wider uppercase hover:bg-orange-600 hover:shadow-[0_0_16px_rgba(249,115,22,0.4)] transition-all duration-300 cursor-pointer shadow-sm ml-2 shrink-0"
            >
              <span>CONNECT</span>
              <span className="text-sm font-bold">→</span>
            </a>
          </nav>

          {/* Mobile Right Controls: CONNECT + Hamburger Button (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-2.5 ml-auto shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className="inline-flex items-center gap-1 py-1.5 px-3 sm:px-3.5 rounded-lg bg-accent-orange text-bg-dark font-display font-black text-[0.68rem] sm:text-[0.74rem] tracking-wider uppercase hover:bg-orange-600 active:scale-95 transition-all shadow-[0_0_12px_rgba(249,115,22,0.35)] shrink-0"
            >
              <span>CONNECT</span>
              <span className="text-xs font-black">→</span>
            </a>

            <button
              type="button"
              className={`mobile-hamburger-btn relative flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-xl border active:scale-95 transition-all duration-200 cursor-pointer z-[99999] shrink-0 ${
                mobileMenuOpen
                  ? 'bg-accent-orange/20 border-accent-orange shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'bg-[#141419] border-white/20 hover:border-accent-orange hover:bg-[#1c1c24] shadow-[0_0_10px_rgba(0,0,0,0.5)]'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className={`w-5 h-[2px] bg-accent-orange rounded-full transition-all duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`w-5 h-[2px] bg-white rounded-full transition-all duration-200 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`w-5 h-[2px] bg-accent-orange rounded-full transition-all duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </button>
          </div>

        </div>
      </header>

      {/* Compact Upper Floating Mobile Menu */}
      {mobileMenuOpen &&
        createPortal(
          <>
            {/* Click-outside transparent backdrop */}
            <div
              className="fixed inset-0 z-[9999998] bg-black/30 backdrop-blur-[2px] animate-in fade-in duration-150"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Compact Floating Dropdown Panel (Upper Part of Screen) */}
            <div
              className="fixed top-[66px] sm:top-[74px] right-2.5 sm:right-6 w-[230px] sm:w-[250px] z-[9999999] bg-[#0c0d14]/95 backdrop-blur-2xl border border-accent-orange/40 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(249,115,22,0.2)] animate-in fade-in slide-in-from-top-3 zoom-in-95 duration-150"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              {/* Header Label inside small panel */}
              <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-white/[0.08]">
                <span className="font-mono text-[0.66rem] font-bold text-accent-orange tracking-widest uppercase">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-white text-xs px-1 py-0.5 rounded cursor-pointer"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Compact Menu Links */}
              <ul className="list-none flex flex-col gap-0.5 p-0 m-0">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-accent-orange/15 border border-accent-orange/40 text-accent-orange shadow-[0_0_10px_rgba(249,115,22,0.2)] font-black'
                            : 'text-slate-200 hover:text-white hover:bg-white/[0.06] border border-transparent font-semibold'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-left">
                          <span className={`font-mono text-[0.68rem] ${
                            isActive ? 'text-accent-orange font-bold' : 'text-slate-500'
                          }`}>
                            0{idx + 1}.
                          </span>
                          <span className="font-display text-[0.84rem] sm:text-[0.88rem] uppercase tracking-wide">
                            {item.label}
                          </span>
                        </div>

                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange shadow-[0_0_6px_#f97316]" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>,
          document.body
        )}
    </>
  );
};
