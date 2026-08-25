import React, { useState, useEffect } from 'react';

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
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[84px] z-[1000] px-4 md:px-10 lg:px-16 transition-all duration-300 slide-down ${
        isScrolled
          ? 'bg-bg-dark/90 backdrop-blur-[16px] border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent shadow-none backdrop-blur-none'
      }`}
    >
      <div className="max-w-[1600px] h-full mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
        
        {/* Brand Logo Lockup */}
        <a href="#home" className="flex items-center gap-2 sm:gap-3 no-underline text-white group shrink-0 min-w-0" aria-label="Debendranath Bera Portfolio Home">
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
            className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-md bg-accent-orange text-bg-dark font-display font-extrabold text-[0.74rem] tracking-wider uppercase hover:bg-orange-600 hover:shadow-[0_0_16px_rgba(249,115,22,0.4)] transition-all duration-300 cursor-pointer shadow-sm ml-2 shrink-0"
          >
            <span>Let's connect</span>
            <span className="text-sm font-bold">→</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button (Visible on Mobile & Tablet < 1024px) */}
        <button
          type="button"
          className="mobile-hamburger-btn flex lg:hidden relative flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-xl bg-[#141419] border border-accent-orange/40 hover:border-accent-orange hover:bg-[#1c1c24] active:scale-95 transition-all duration-200 cursor-pointer ml-auto z-[1600] shadow-[0_0_12px_rgba(249,115,22,0.2)] shrink-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span className={`w-5 h-[2.5px] bg-accent-orange rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-[2.5px] bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`w-5 h-[2.5px] bg-accent-orange rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Fullscreen Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-[1500] bg-[#07080f]/98 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-center items-center px-6 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Top bar with close */}
        <div className="absolute top-5 right-5">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="w-11 h-11 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white text-lg hover:text-accent-orange hover:border-accent-orange transition-all cursor-pointer shadow-md"
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <ul className="list-none flex flex-col gap-4 text-center w-full max-w-[300px] p-0 m-0">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-2 text-[1.45rem] font-bold font-display capitalize transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-accent-orange drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] font-black'
                    : 'text-slate-300 hover:text-accent-orange'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full justify-center py-3.5 rounded-xl text-[0.92rem] font-bold text-white shadow-lg flex items-center gap-2"
            >
              <span>Let's connect</span>
              <span className="text-lg">→</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
