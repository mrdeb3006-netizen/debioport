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
    { id: 'work', label: 'work' },
    { id: 'experience', label: 'experience' },
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
          ? 'bg-bg-dark/85 backdrop-blur-[16px] border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent shadow-none backdrop-blur-none'
      }`}
    >
      <div className="max-w-[1600px] h-full mx-auto flex items-center justify-between">
        
        {/* Brand Logo Lockup: DB Logo + MR DEB Text */}
        <a href="#home" className="flex items-center gap-3.5 no-underline text-white group" aria-label="DB MR DEB Home">
          <div className="w-[42px] h-[32px] flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(56,189,248,0.45)] drop-shadow-[0_0_14px_rgba(99,102,241,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
            <svg viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="db-grad-1" x1="2" y1="2" x2="24" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#38bdf8"/>
                  <stop offset="100%" stopColor="#6366f1"/>
                </linearGradient>
                <linearGradient id="db-grad-2" x1="16" y1="2" x2="44" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="100%" stopColor="#818cf8"/>
                </linearGradient>
              </defs>
              {/* D Glyph */}
              <path d="M4 5H15C21.5 5 25.5 9 25.5 17C25.5 25 21.5 29 15 29H4V5Z" stroke="url(#db-grad-1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11V23" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.85"/>
              {/* B Glyph */}
              <path d="M25.5 5H35.5C39 5 41.5 7.2 41.5 11C41.5 14.2 39.2 16.5 35.5 17C39.8 17.5 42.5 20 42.5 23.5C42.5 27.5 39.5 29 35.5 29H25.5" stroke="url(#db-grad-2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="25.5" y1="17" x2="35.5" y2="17" stroke="url(#db-grad-2)" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="25.5" cy="17" r="2.2" fill="#38bdf8"/>
            </svg>
          </div>
          <span className="font-display text-[1.3rem] font-black tracking-[0.14em] text-white uppercase">MR DEB</span>
        </a>

        {/* Desktop Navigation - Shifted Right */}
        <nav className="hidden md:flex items-center ml-auto" aria-label="Main Navigation">
          <ul className="flex items-center gap-9 list-none m-0 p-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative text-[0.95rem] font-medium tracking-[0.04em] py-1.5 px-1 inline-flex items-center transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-accent-cyan font-semibold drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  <span className={`font-semibold mr-0.5 transition-all duration-300 ${
                    activeSection === item.id ? 'text-accent-purple opacity-100' : 'text-accent-purple/70 group-hover:text-accent-cyan'
                  }`}>
                    /
                  </span>
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-nav-active rounded shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                  )}
                </a>
              </li>
            ))}
          </ul>
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
                  activeSection === item.id ? 'text-accent-cyan drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]' : 'text-slate-300 hover:text-accent-cyan'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                /{item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
