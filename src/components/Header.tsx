import React, { useState, useEffect } from 'react';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'home' },
    { id: 'work', label: 'work' },
    { id: 'experience', label: 'experience' },
    { id: 'about', label: 'about' },
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
      <div className="max-w-[1600px] h-full mx-auto flex items-center justify-between gap-6">
        
        {/* Brand Logo Lockup with Uploaded DB Monogram */}
        <a href="#home" className="flex items-center gap-3 no-underline text-white group" aria-label="Debendranath Bera Portfolio Home">
          <div className="h-[36px] w-[36px] rounded-lg overflow-hidden border border-white/10 bg-black/60 flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:border-accent-orange/40 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]">
            <img
              src="/db-logo.jpg"
              alt="DB Monogram Logo"
              className="w-full h-full object-contain filter brightness-110"
            />
          </div>
          <span className="font-cinzel text-[1rem] md:text-[1.12rem] font-bold tracking-[0.14em] text-white uppercase transition-colors duration-300 group-hover:text-accent-orange">
            DEBENDRANATH BERA
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center ml-auto gap-8" aria-label="Main Navigation">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative text-[0.92rem] font-medium tracking-[0.04em] py-1 px-1 inline-flex items-center transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-accent-orange font-semibold drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  <span className={`font-semibold mr-0.5 transition-all duration-300 ${
                    activeSection === item.id ? 'text-accent-orange opacity-100' : 'text-text-muted group-hover:text-accent-orange'
                  }`}>
                    /
                  </span>
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-accent-orange to-accent-purple rounded shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Top-Right Action Button: Let's connect → */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-md bg-accent-orange text-bg-dark font-display font-extrabold text-[0.75rem] tracking-wider uppercase hover:bg-orange-600 hover:shadow-[0_0_16px_rgba(249,115,22,0.4)] transition-all duration-300 cursor-pointer shadow-sm"
          >
            <span>Let's connect</span>
            <span className="text-sm font-bold">→</span>
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 bg-transparent border-0 cursor-pointer ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`w-[26px] h-[2px] bg-white rounded transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-[26px] h-[2px] bg-white rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-[26px] h-[2px] bg-white rounded transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <ul className="list-none flex flex-col gap-7 text-center">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`text-[1.8rem] font-bold no-underline font-display transition-all duration-300 ${
                  activeSection === item.id ? 'text-accent-orange drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]' : 'text-slate-300 hover:text-accent-orange'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                /{item.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 py-2.5 px-6 rounded-lg bg-accent-orange text-bg-dark font-display font-extrabold text-[0.88rem] tracking-wider uppercase shadow-md"
            >
              <span>Let's connect</span>
              <span>→</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
