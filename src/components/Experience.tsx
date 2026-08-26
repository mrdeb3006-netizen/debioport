import React, { useEffect, useRef, useState } from 'react';
import {
  Award,
  Globe2,
  BookOpen,
  CheckCircle2,
  Sparkles,
  MapPin,
  Trophy,
  Medal,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

interface JourneyCard {
  id: string;
  number: string;
  tag: string;
  badge: string;
  badgeType?: 'emerald' | 'orange' | 'cyan';
  title: string;
  institution: string;
  period: string;
  description: string;
  type: 'milestone' | 'distinctions' | 'learning' | 'languages';
  highlights?: string[];
  distinctions?: { title: string; institution: string; type: string }[];
  learningItems?: string[];
  languages?: { name: string; level: string; badge: string; detail: string }[];
}

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Responsive width calculations
  const [cardWidth, setCardWidth] = useState(620);
  const [containerWidth, setContainerWidth] = useState(1200);

  // Touch / mouse drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateWidths = () => {
      if (containerRef.current) {
        const cWidth = containerRef.current.clientWidth;
        setContainerWidth(cWidth);
        if (cWidth < 640) {
          setCardWidth(Math.min(cWidth - 28, 480));
        } else if (cWidth < 1024) {
          setCardWidth(Math.min(cWidth - 80, 580));
        } else {
          setCardWidth(640);
        }
      }
    };

    updateWidths();
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => Math.min(journeyCards.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  // Pointer drag events
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 6) {
      hasDragged.current = true;
    }
    setDragOffset(deltaX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }

    const deltaX = dragOffset;
    setDragOffset(0);

    if (deltaX < -50 && activeIndex < journeyCards.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (deltaX > 50 && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const getSlideUpStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(35px)',
    transition: `opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    willChange: 'opacity, transform',
  });

  const journeyCards: JourneyCard[] = [
    {
      id: 'btech-cse',
      number: '01',
      tag: 'CURRENT DEGREE',
      badge: 'PRESENT',
      badgeType: 'emerald',
      title: 'B.Tech in Computer Science & Engineering',
      institution: 'Future Institute of Engineering and Management (FIEM)',
      period: '2023 — Present (Active)',
      description:
        'Pursuing Computer Science & Engineering with a strong focus on core algorithms, Java Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), and hands-on software development.',
      type: 'milestone',
      highlights: [
        'Core algorithms, data structures & computational problem solving.',
        'Learning Java OOP and practicing algorithm optimization daily.',
        'Active development in Python and building modern software projects.',
      ],
    },
    {
      id: 'class-12',
      number: '02',
      tag: 'HIGHER SECONDARY',
      badge: '77.81%',
      badgeType: 'emerald',
      title: 'Class 12 — Science Stream',
      institution: 'Jadavpur Vidyapith',
      period: 'Completed • 77.81%',
      description:
        'Completed Higher Secondary Science education with 77.81%, establishing robust analytical foundations in advanced mathematics, logical reasoning, and scientific methodology.',
      type: 'milestone',
      highlights: [
        'Physics, Chemistry, and Higher Mathematics.',
        'Rigorous analytical foundations and quantitative problem solving.',
      ],
    },
    {
      id: 'class-10',
      number: '03',
      tag: 'SECONDARY EDUCATION',
      badge: '88.71% TOPPER',
      badgeType: 'orange',
      title: 'Class 10 — Secondary School',
      institution: 'Jadavpur High School',
      period: 'Completed • 88.71%',
      description:
        'Graduated as School Topper with 88.71%, demonstrating academic excellence and a passion for science, mathematics, and logic.',
      type: 'milestone',
      highlights: [
        'Ranked as Class 10 School Topper with 88.71%.',
        'Built early foundations in computational thinking and scientific inquiry.',
      ],
    },
    {
      id: 'distinctions',
      number: '04',
      tag: 'ACADEMIC HONORS',
      badge: 'RANK #1 TOPPER',
      badgeType: 'orange',
      title: 'Academic Distinctions Spotlight',
      institution: 'Jadavpur High School & Jadavpur Vidyapith',
      period: 'Academic Board Distinctions',
      description:
        'Consistent academic distinctions, securing School Topper rank in secondary schooling and advanced foundational rigor in higher secondary science.',
      type: 'distinctions',
      distinctions: [
        {
          title: 'Class 10 School Topper — 88.71%',
          institution: 'Jadavpur High School',
          type: 'Rank #1 School Topper',
        },
        {
          title: 'Class 12 Science Stream — 77.81%',
          institution: 'Jadavpur Vidyapith',
          type: 'Academic Excellence in Science',
        },
      ],
    },
    {
      id: 'learning',
      number: '05',
      tag: 'SKILL FOCUS',
      badge: 'ENGINEERING',
      badgeType: 'cyan',
      title: 'Learning & Technical Focus',
      institution: 'Computer Science Fundamentals',
      period: 'Continuous Rigor',
      description:
        'Systematic daily discipline across algorithmic mastery, object-oriented software engineering, and full-stack software development.',
      type: 'learning',
      learningItems: [
        'Pursuing Computer Science & Engineering with focus on core algorithms & practical development',
        'Coding actively in Python & automating workflows',
        'Mastering Java Object-Oriented Programming (OOP)',
        'Practicing Data Structures & Algorithms (DSA) daily',
        'Building projects and exploring modern web & software stacks',
      ],
    },
    {
      id: 'languages',
      number: '06',
      tag: 'LANGUAGES',
      badge: 'MULTILINGUAL',
      badgeType: 'orange',
      title: 'Spoken & Written Languages',
      institution: 'Communication Proficiency',
      period: 'Multilingual Communication',
      description:
        'Fluent multilingual communication skills tailored for collaborative team engineering, technical discussions, and professional presentations.',
      type: 'languages',
      languages: [
        { name: 'English', level: 'Fluent', badge: 'Fluent', detail: 'Technical & Professional' },
        { name: 'Hindi', level: 'Fluent', badge: 'Fluent', detail: 'Conversational & Fluent' },
        { name: 'Bengali', level: 'Native', badge: 'Native', detail: 'Mother Tongue' },
      ],
    },
  ];

  const otherAchievements = [
    {
      id: 'iit',
      category: 'ACADEMIC EXCELLENCE',
      badge: 'IIT KGP HONOUR',
      title: 'Awarded by IIT Kharagpur Professor',
      subtitle: 'Exceptional Result & Class 10th School Topper',
      description:
        'Felicitated and awarded by an esteemed professor from Indian Institute of Technology (IIT) Kharagpur in recognition of exceptional academic performance and ranking as the School Topper in Class 10.',
      icon: Trophy,
      accentGlow: 'bg-[#0f1019]/90',
      borderColor: 'border-white/[0.08] hover:border-accent-orange/50',
      badgeColor: 'text-accent-orange bg-accent-orange/10 border-accent-orange/30',
    },
    {
      id: 'medals',
      category: 'NATIONAL SPORTS • KARATE',
      badge: '2X KARATE BRONZE',
      title: '2x Bronze Medalist • All India Karate Championship',
      subtitle: 'All India Level Club Karate Championship',
      description:
        'Secured two Bronze Medals at the prestigious All India Level Club Karate Championship, demonstrating elite competitive Karate combat discipline, Kumite reflexes, and tactical ring composure against top martial arts athletes nationwide.',
      icon: Medal,
      accentGlow: 'bg-[#0f1019]/90',
      borderColor: 'border-white/[0.08] hover:border-accent-orange/50',
      badgeColor: 'text-accent-orange bg-accent-orange/10 border-accent-orange/30',
    },
    {
      id: 'karate',
      category: 'MARTIAL ARTS',
      badge: 'BROWN BELT',
      title: 'Karate Brown Belt',
      subtitle: 'Senior Grade Martial Arts Mastery',
      description:
        'Earned the senior Karate Brown Belt grade following years of rigorous traditional martial arts training, advanced Kata technical mastery, physical conditioning, and full-contact Kumite sparring.',
      icon: Shield,
      accentGlow: 'bg-[#0f1019]/90',
      borderColor: 'border-white/[0.08] hover:border-accent-orange/50',
      badgeColor: 'text-accent-orange bg-accent-orange/10 border-accent-orange/30',
    },
  ];

  // Calculate sliding track translation
  const cardGap = 24;
  const totalCardStep = cardWidth + cardGap;
  const centerOffset = containerWidth / 2 - cardWidth / 2;
  const trackTranslateX = centerOffset - activeIndex * totalCardStep + dragOffset;

  return (
    <section
      ref={sectionRef}
      className="pt-16 md:pt-20 pb-8 md:pb-10 px-4 sm:px-6 md:px-12 lg:px-16 relative bg-bg-dark overflow-hidden"
      id="journey"
    >
      {/* Subtle Parallax Background Ambient Beam */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-accent-orange/[0.03] rounded-full blur-[120px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${-activeIndex * 35 + dragOffset * 0.1}px, 0, 0)`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-10 text-center sm:text-left" style={getSlideUpStyle(0.15)}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 border border-accent-orange/25 text-accent-orange font-mono text-[0.72rem] font-bold uppercase tracking-wider mb-3">
            <GraduationCap size={13} />
            <span>Academic &amp; Growth Journey</span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-black text-white leading-[1.15] mb-2 uppercase tracking-[0.02em]">
            MY JOURNEY<span className="text-accent-orange">.</span>
          </h2>
          <p className="text-[1.02rem] text-text-secondary max-w-[680px] leading-[1.6]">
            Academic milestones, national achievements, distinctions, and technical foundations from school to Computer Science Engineering.
          </p>
        </div>

        {/* Interactive Step Navigator Bar */}
        <div className="mb-6 md:mb-8 overflow-x-auto no-scrollbar pb-2" style={getSlideUpStyle(0.22)}>
          <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 min-w-max mx-auto px-2">
            {journeyCards.map((card, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'bg-accent-orange/15 border border-accent-orange/50 text-white shadow-[0_0_20px_rgba(249,115,22,0.25)] scale-[1.03]'
                      : 'bg-white/[0.03] border border-white/[0.08] text-text-muted hover:text-slate-200 hover:border-white/20'
                  }`}
                  aria-label={`Jump to milestone ${card.number} ${card.title}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isActive ? 'bg-accent-orange shadow-[0_0_8px_#f97316]' : 'bg-white/20 group-hover:bg-white/40'
                    }`}
                  />
                  <span className="font-mono text-[0.72rem] font-bold">
                    {card.number}
                  </span>
                  <span className="font-display text-[0.78rem] font-semibold whitespace-nowrap">
                    {card.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Smooth 60FPS Horizontal Sliding Showcase */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden py-4 select-none touch-pan-y"
          style={getSlideUpStyle(0.3)}
        >
          {/* Edge Fade Gradients for cinematic visual focus */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-bg-dark to-transparent z-20 pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-bg-dark to-transparent z-20 pointer-events-none" />

          {/* Cards Track */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`flex items-stretch cursor-grab active:cursor-grabbing ${
              isDragging ? '' : 'transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
            }`}
            style={{
              transform: `translate3d(${trackTranslateX}px, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {journeyCards.map((card, idx) => {
              const distance = Math.abs(idx - activeIndex);
              const isActive = distance === 0;

              // Subtle scale (1.0 for active, 0.94-0.97 for surrounding) & soft opacity changes
              const scale = isActive ? 1 : distance === 1 ? 0.95 : 0.91;
              const opacity = isActive ? 1 : distance === 1 ? 0.6 : 0.28;
              const zIndex = 10 - distance;

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    if (!hasDragged.current && !isActive) {
                      setActiveIndex(idx);
                    }
                  }}
                  style={{
                    width: `${cardWidth}px`,
                    marginRight: `${cardGap}px`,
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transition: isDragging
                      ? 'opacity 0.2s, transform 0.2s'
                      : 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s',
                    willChange: 'transform, opacity',
                  }}
                  className={`shrink-0 specular-card backdrop-blur-[16px] rounded-2xl md:rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between relative overflow-hidden transition-colors duration-300 ${
                    isActive
                      ? 'border border-accent-orange/50 bg-[#0d0e17]/95 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(249,115,22,0.18)]'
                      : 'border border-white/[0.08] bg-[#0b0c14]/80 hover:border-white/20 cursor-pointer shadow-lg'
                  }`}
                >
                  <div>
                    {/* Top Tag, Badge & Big Wireframe Number */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-[0.72rem] font-bold text-accent-orange bg-accent-orange/15 px-2.5 py-0.5 rounded-full border border-accent-orange/30 uppercase tracking-wider">
                          {card.tag}
                        </span>
                        <span
                          className={`font-mono text-[0.72rem] font-semibold px-2.5 py-0.5 rounded-full border ${
                            card.badgeType === 'orange'
                              ? 'text-accent-orange bg-accent-orange/10 border-accent-orange/30'
                              : card.badgeType === 'cyan'
                              ? 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/30'
                              : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
                          }`}
                        >
                          {card.badge}
                        </span>
                      </div>
                      <div className="font-display text-3xl md:text-4xl font-black text-white/15 [-webkit-text-stroke:1px_rgba(249,115,22,0.3)] leading-none select-none">
                        {card.number}
                      </div>
                    </div>

                    {/* Degree / Milestone Title */}
                    <h3 className="font-display text-[1.25rem] sm:text-[1.35rem] md:text-[1.45rem] font-black text-white leading-snug mb-1">
                      {card.title}
                    </h3>

                    {/* Institution / Subtitle */}
                    <div className="flex items-center gap-2 text-[0.88rem] sm:text-[0.92rem] text-accent-orange/90 font-medium mb-3">
                      <MapPin size={14} className="shrink-0 text-accent-orange" />
                      <span>{card.institution}</span>
                    </div>

                    {/* Description */}
                    <p className="text-[0.88rem] sm:text-[0.92rem] text-text-secondary leading-relaxed mb-4">
                      {card.description}
                    </p>

                    {/* 1. Milestone Highlights */}
                    {card.type === 'milestone' && card.highlights && (
                      <div className="flex flex-col gap-1.5 pt-3 border-t border-white/[0.06]">
                        {card.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-[0.84rem] text-slate-300">
                            <CheckCircle2 size={13} className="text-accent-orange shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 2. Academic Distinctions Spotlight */}
                    {card.type === 'distinctions' && card.distinctions && (
                      <div className="flex flex-col gap-2.5 pt-2 border-t border-white/[0.06]">
                        <div className="flex items-center gap-1.5 text-accent-orange font-mono text-[0.74rem] font-bold uppercase tracking-wider mb-1">
                          <Award size={14} />
                          <span>Academic Honors &amp; Merit</span>
                        </div>
                        {card.distinctions.map((dist, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2"
                          >
                            <div className="flex flex-col">
                              <span className="font-bold text-[0.90rem] text-white">
                                {dist.title}
                              </span>
                              <span className="text-[0.78rem] text-text-muted">
                                📍 {dist.institution}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="font-mono text-[0.70rem] text-accent-orange font-semibold">
                                {dist.type}
                              </span>
                              <Sparkles size={12} className="text-accent-orange" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 3. Skill & Learning Focus */}
                    {card.type === 'learning' && card.learningItems && (
                      <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
                        <div className="flex items-center gap-1.5 text-accent-orange font-mono text-[0.74rem] font-bold uppercase tracking-wider mb-1">
                          <BookOpen size={14} />
                          <span>Core Technical Foundations</span>
                        </div>
                        <ul className="list-none flex flex-col gap-2 p-0 m-0">
                          {card.learningItems.map((hl, hlIdx) => (
                            <li
                              key={hlIdx}
                              className="relative pl-4 text-[0.84rem] text-slate-300 leading-relaxed before:content-['▹'] before:absolute before:left-0 before:text-accent-orange before:font-bold"
                            >
                              {hl}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 4. Spoken Languages (Put Last as requested) */}
                    {card.type === 'languages' && card.languages && (
                      <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
                        <div className="flex items-center gap-1.5 text-accent-orange font-mono text-[0.74rem] font-bold uppercase tracking-wider mb-1">
                          <Globe2 size={14} />
                          <span>Languages Spoken &amp; Written</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {card.languages.map((lang, lIdx) => (
                            <div
                              key={lIdx}
                              className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center flex flex-col gap-1 hover:border-accent-orange/40 transition-colors"
                            >
                              <span className="font-bold text-[0.92rem] text-white">
                                {lang.name}
                              </span>
                              <span className="font-mono text-[0.72rem] text-accent-orange font-semibold">
                                {lang.badge}
                              </span>
                              <span className="text-[0.72rem] text-text-muted">
                                {lang.detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footnote Period Indicator */}
                  <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[0.72rem] text-text-muted">
                    <span className="text-accent-orange font-semibold">{card.period}</span>
                    <span className="flex items-center gap-1 text-white/40">
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                      <span>/</span>
                      <span>{String(journeyCards.length).padStart(2, '0')}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation & Indicator Controls */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-2 max-w-[900px] mx-auto px-2 mb-16"
          style={getSlideUpStyle(0.4)}
        >
          {/* Drag Hint */}
          <div className="flex items-center gap-2 text-text-muted font-mono text-[0.75rem]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
            <span>Swipe or click arrows to explore timeline</span>
          </div>

          {/* Arrows & Pagination Dots */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center transition-all duration-200 hover:bg-accent-orange/20 hover:border-accent-orange/50 hover:text-accent-orange disabled:opacity-30 disabled:hover:bg-white/[0.04] disabled:hover:border-white/10 disabled:hover:text-white cursor-pointer disabled:cursor-not-allowed"
              aria-label="Previous milestone"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1.5">
              {journeyCards.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveIndex(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === activeIndex
                      ? 'w-7 bg-accent-orange shadow-[0_0_8px_#f97316]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActiveIndex((prev) => Math.min(journeyCards.length - 1, prev + 1))}
              disabled={activeIndex === journeyCards.length - 1}
              className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center transition-all duration-200 hover:bg-accent-orange/20 hover:border-accent-orange/50 hover:text-accent-orange disabled:opacity-30 disabled:hover:bg-white/[0.04] disabled:hover:border-white/10 disabled:hover:text-white cursor-pointer disabled:cursor-not-allowed"
              aria-label="Next milestone"
            >
              <ChevronRight size={18} />
            </button>

            <span className="font-mono text-[0.78rem] text-text-muted ml-1">
              <span className="text-white font-bold">{String(activeIndex + 1).padStart(2, '0')}</span> / {String(journeyCards.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OTHER ACHIEVEMENTS: Sports, Martial Arts & Academic Honors Grid          */}
        {/* ========================================================================= */}
        <div style={getSlideUpStyle(0.55)}>
          <div className="flex items-center gap-3 mb-6 pt-6 border-t border-white/[0.08]">
            <Trophy className="text-accent-orange" size={22} />
            <div>
              <h3 className="font-display text-[1.4rem] md:text-[1.65rem] font-black text-white uppercase tracking-wide">
                OTHER ACHIEVEMENTS &amp; HONORS
              </h3>
              <p className="text-[0.88rem] text-text-muted">
                National-level competitive sports, martial arts excellence, and premier institutional recognitions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherAchievements.map((ach, aIdx) => {
              const IconComponent = ach.icon;
              return (
                <div
                  key={ach.id}
                  className={`specular-card backdrop-blur-[16px] border ${ach.borderColor} ${ach.accentGlow} rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] group`}
                  style={getSlideUpStyle(0.6 + aIdx * 0.12)}
                >
                  <div>
                    {/* Header Pill & Icon */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className={`font-mono text-[0.72rem] font-bold px-2.5 py-0.5 rounded-full border ${ach.badgeColor} uppercase tracking-wider`}>
                        {ach.badge}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-accent-orange group-hover:scale-110 group-hover:border-accent-orange/40 transition-transform">
                        <IconComponent size={18} />
                      </div>
                    </div>

                    {/* Achievement Title */}
                    <h4 className="font-display text-[1.15rem] font-bold text-white leading-snug mb-1">
                      {ach.title}
                    </h4>

                    {/* Subtitle */}
                    <div className="text-[0.82rem] text-accent-orange font-mono font-medium mb-3">
                      {ach.subtitle}
                    </div>

                    {/* Description */}
                    <p className="text-[0.88rem] text-text-secondary leading-relaxed">
                      {ach.description}
                    </p>
                  </div>

                  {/* Footnote Indicator */}
                  <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[0.7rem] text-text-muted">
                    <span>{ach.category}</span>
                    <Star size={12} className="text-accent-orange" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
