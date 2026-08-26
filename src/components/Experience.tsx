import React, { useEffect, useRef, useState } from 'react';
import {
  Trophy,
  Medal,
  Shield,
  Star,
  GraduationCap,
} from 'lucide-react';

interface TimelineMilestone {
  id: string;
  year: string;
  periodTag: string;
  title: string;
  subtitle: string;
  badge?: string;
  description: string;
  highlights?: string[];
  languages?: { name: string; level: string; badge: string; detail: string; nativeScript: string }[];
}

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0.15);

  const timelineMilestones: TimelineMilestone[] = [
    {
      id: 'btech-cse',
      year: '2023 — 2027',
      periodTag: 'PRESENT DEGREE',
      title: 'B.TECH IN COMPUTER SCIENCE & ENGINEERING',
      subtitle: 'FUTURE INSTITUTE OF ENGINEERING AND MANAGEMENT (FIEM)',
      badge: 'ACTIVE UNDERGRADUATE',
      description:
        'Pursuing Computer Science & Engineering with intensive focus on Data Structures & Algorithms (DSA), Java Object-Oriented Programming (OOP), software system design, and practical software development.',
      highlights: [
        'Mastering core algorithms, data structures & computational problem solving.',
        'Learning Java OOP and practicing algorithmic optimization daily.',
        'Active development in Python, desktop automation experiments, and modern web software.',
      ],
    },
    {
      id: 'class-12',
      year: '2021 — 2023',
      periodTag: 'HIGHER SECONDARY',
      title: 'CLASS 12 — SCIENCE STREAM',
      subtitle: 'JADAVPUR VIDYAPITH',
      badge: '77.81% SCORE',
      description:
        'Completed Higher Secondary Science education with 77.81%, establishing robust analytical foundations in advanced mathematics, logical reasoning, and scientific methodology.',
      highlights: [
        'Advanced Physics, Chemistry, and Higher Mathematics.',
        'Rigorous quantitative problem solving and analytical thinking.',
      ],
    },
    {
      id: 'class-10',
      year: '2019 — 2021',
      periodTag: 'SECONDARY SCHOOL',
      title: 'CLASS 10 — SECONDARY SCHOOL',
      subtitle: 'JADAVPUR HIGH SCHOOL',
      badge: '88.71% TOPPER',
      description:
        'Graduated as School Topper with 88.71%, demonstrating academic excellence and a deep passion for science, mathematics, and logic.',
      highlights: [
        'Ranked as Class 10 School Topper with 88.71%.',
        'Built early foundations in computational thinking and scientific inquiry.',
      ],
    },
    {
      id: 'distinctions',
      year: '2021 & 2023',
      periodTag: 'ACADEMIC HONORS',
      title: 'ACADEMIC DISTINCTIONS SPOTLIGHT',
      subtitle: 'JADAVPUR HIGH SCHOOL & JADAVPUR VIDYAPITH',
      badge: 'RANK #1 & EXCELLENCE',
      description:
        'Consistent academic distinction across secondary and higher secondary schooling with School Topper status in secondary board examinations and excellence in science education.',
      highlights: [
        'Class 10 School Topper — 88.71% at Jadavpur High School (Rank #1).',
        'Class 12 Science Stream — 77.81% at Jadavpur Vidyapith.',
      ],
    },
    {
      id: 'learning',
      year: '2023 — NOW',
      periodTag: 'TECH RIGOR',
      title: 'CORE LEARNING & SKILL FOCUS',
      subtitle: 'COMPUTATIONAL PROBLEM SOLVING & ARCHITECTURE',
      badge: 'CS FUNDAMENTALS',
      description:
        'Dedicated daily discipline across algorithmic mastery, object-oriented software engineering, and modern full-stack software development.',
      highlights: [
        'Pursuing Computer Science & Engineering with focus on core algorithms & practical development.',
        'Coding actively in Python & automating desktop workflows.',
        'Mastering Java Object-Oriented Programming (OOP) & Data Structures & Algorithms (DSA).',
        'Building real-world software projects and exploring web engineering.',
      ],
    },
    {
      id: 'languages',
      year: 'PROFICIENCY',
      periodTag: 'COMMUNICATION',
      title: 'SPOKEN & WRITTEN LANGUAGES',
      subtitle: 'MULTILINGUAL COLLABORATION',
      badge: 'MULTILINGUAL',
      description:
        'Effective multilingual communication across diverse technical, collaborative, and global settings.',
      languages: [
        { name: 'English', level: 'Fluent', badge: 'Fluent', detail: 'Technical & Professional', nativeScript: 'English' },
        { name: 'Hindi', level: 'Fluent', badge: 'Fluent', detail: 'Conversational & Fluent', nativeScript: 'हिन्दी' },
        { name: 'Bengali', level: 'Native', badge: 'Native', detail: 'Mother Tongue', nativeScript: 'বাংলা' },
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

  // Section Entrance Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.05,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth Scroll Progress & Milestone Tracking
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate smooth beam draw progress
      const start = windowHeight * 0.75;
      const total = rect.height + (start - windowHeight * 0.35);
      const current = start - rect.top;
      const progress = Math.min(Math.max(current / total, 0.05), 1);

      setScrollProgress(progress);

      // Determine active milestone based on viewport position
      const milestoneElements = document.querySelectorAll<HTMLElement>('.milestone-row');
      milestoneElements.forEach((el, index) => {
        const itemRect = el.getBoundingClientRect();
        if (itemRect.top <= windowHeight * 0.65 && itemRect.bottom >= windowHeight * 0.2) {
          setActiveIdx(index);
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-20 md:pt-28 pb-12 md:pb-16 px-4 sm:px-6 md:px-12 lg:px-16 relative bg-bg-dark overflow-hidden selection:bg-accent-orange/30"
      id="journey"
    >
      {/* Cinematic Ambient Golden Bloom */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-accent-orange/[0.035] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div
          className="mb-16 md:mb-24 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange font-mono text-[0.74rem] font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            <GraduationCap size={14} />
            <span>Academic &amp; Growth Timeline</span>
          </div>
          <h2 className="font-display text-[clamp(2.4rem,4.5vw,4.0rem)] font-black text-white leading-[1.1] mb-3 uppercase tracking-[0.02em]">
            MY JOURNEY<span className="text-accent-orange">.</span>
          </h2>
          <p className="text-[1.05rem] text-text-secondary max-w-[700px] leading-[1.65]">
            Academic milestones, national achievements, distinctions, and technical foundations from school to Computer Science Engineering.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* OPEN CINEMATIC TIMELINE (Exactly Matching Reference Aesthetic)            */}
        {/* ========================================================================= */}
        <div ref={timelineRef} className="relative mb-28">
          
          {/* Desktop Timeline Layout (>= 768px) */}
          <div className="hidden md:block relative">
            
            {/* 1. Base Subtle Guide Line */}
            <div
              className="absolute left-[190px] lg:left-[210px] top-6 bottom-6 w-[2px] bg-white/[0.08] rounded-full"
              aria-hidden="true"
            />

            {/* 2. Radiant Golden Laser Beam (Drawn Live with Scroll) */}
            <div
              className="absolute left-[190px] lg:left-[210px] top-6 w-[2px] bg-gradient-to-b from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_18px_rgba(245,158,11,0.9),0_0_35px_rgba(249,115,22,0.6)] transition-[height] duration-150 ease-out z-10"
              style={{
                height: `${Math.min(scrollProgress * 100, 100)}%`,
              }}
              aria-hidden="true"
            >
              {/* Glowing Pulse Lead Point */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_24px_#fbbf24,0_0_40px_#f97316]" />
            </div>

            {/* Timeline Milestone Rows */}
            <div className="space-y-16 lg:space-y-24">
              {timelineMilestones.map((item, idx) => {
                const isCurrent = activeIdx === idx;
                const isHovered = hoveredIdx === idx;
                const isHighlighted = isCurrent || isHovered;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="milestone-row grid grid-cols-[190px_1fr] lg:grid-cols-[210px_1fr] gap-0 items-start group relative transition-all duration-300"
                  >
                    {/* Left Column: Date / Year Tag (Right-Aligned to the Golden Line) */}
                    <div className="pr-8 lg:pr-10 text-right pt-1 select-none">
                      <div
                        className={`font-mono text-[0.92rem] lg:text-[1.0rem] font-bold tracking-wider uppercase transition-colors duration-300 ${
                          isHighlighted ? 'text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]' : 'text-zinc-400'
                        }`}
                      >
                        {item.year}
                      </div>
                      <div
                        className={`font-mono text-[0.70rem] lg:text-[0.74rem] font-extrabold tracking-widest uppercase mt-1 transition-colors duration-300 ${
                          isHighlighted ? 'text-accent-orange' : 'text-zinc-600'
                        }`}
                      >
                        {item.periodTag}
                      </div>
                    </div>

                    {/* Glowing Circular Node (Centered over the Golden Line) */}
                    <div className="absolute left-[190px] lg:left-[210px] top-2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                      <div
                        className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                          isHighlighted
                            ? 'bg-[#09090b] border-2 border-amber-400 scale-125 shadow-[0_0_20px_rgba(251,191,36,0.95),0_0_35px_rgba(249,115,22,0.5)]'
                            : 'bg-[#09090b] border-2 border-white/20 group-hover:border-amber-400/80 group-hover:shadow-[0_0_14px_rgba(251,191,36,0.5)]'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isHighlighted ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-white/40 group-hover:bg-amber-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Right Column: Clean, Open Editorial Typography (No heavy box containers!) */}
                    <div className="pl-8 lg:pl-10">
                      
                      {/* Bold Uppercase Headline */}
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3
                          className={`font-display text-[1.45rem] sm:text-[1.8rem] lg:text-[2.15rem] font-black uppercase tracking-[0.02em] leading-tight transition-colors duration-300 ${
                            isHighlighted ? 'text-white drop-shadow-[0_0_20px_rgba(249,115,22,0.25)]' : 'text-zinc-200 group-hover:text-white'
                          }`}
                        >
                          {item.title}
                        </h3>
                        {item.badge && (
                          <span className="font-mono text-[0.68rem] font-bold text-accent-orange bg-accent-orange/15 px-3 py-0.5 rounded-full border border-accent-orange/30 uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Amber / Gold Monospace Subtitle / Institution */}
                      <div className="font-mono text-[0.80rem] lg:text-[0.88rem] font-bold text-amber-400 tracking-wider uppercase mb-3.5 flex items-center gap-2">
                        <span>▹</span>
                        <span>{item.subtitle}</span>
                      </div>

                      {/* Description Text */}
                      <p className="text-[0.95rem] lg:text-[1.02rem] text-zinc-300 leading-relaxed max-w-[760px] mb-4 font-normal">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      {item.highlights && (
                        <div className="flex flex-col gap-2 max-w-[760px] pt-1">
                          {item.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2.5 text-[0.88rem] lg:text-[0.92rem] text-zinc-300">
                              <span className="text-accent-orange text-xs mt-1">●</span>
                              <span className="leading-relaxed">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Languages Badges (If Last Milestone) */}
                      {item.languages && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-[760px] pt-3">
                          {item.languages.map((lang, lIdx) => (
                            <div
                              key={lIdx}
                              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/50 hover:bg-amber-400/[0.03] transition-all flex flex-col gap-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-display font-bold text-[1.0rem] text-white">
                                  {lang.name}
                                </span>
                                <span className="text-[0.74rem] text-amber-400 font-mono">
                                  {lang.nativeScript}
                                </span>
                              </div>
                              <span className="font-mono text-[0.72rem] text-accent-orange font-semibold">
                                {lang.badge}
                              </span>
                              <span className="text-[0.74rem] text-zinc-500">
                                {lang.detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline Layout (< 768px) */}
          <div className="block md:hidden relative pl-6">
            
            {/* 1. Base Line */}
            <div
              className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-white/[0.08] rounded-full"
              aria-hidden="true"
            />

            {/* 2. Mobile Laser Beam */}
            <div
              className="absolute left-[11px] top-3 w-[2px] bg-gradient-to-b from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_14px_rgba(245,158,11,0.9)] transition-[height] duration-150 ease-out z-10"
              style={{
                height: `${Math.min(scrollProgress * 100, 100)}%`,
              }}
              aria-hidden="true"
            />

            {/* Mobile Milestones */}
            <div className="space-y-12">
              {timelineMilestones.map((item) => (
                <div key={item.id} className="relative pl-6">
                  
                  {/* Node */}
                  <div className="absolute -left-[14px] top-1 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-5 h-5 rounded-full bg-[#09090b] border-2 border-amber-400 flex items-center justify-center shadow-[0_0_12px_rgba(251,191,36,0.7)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                  </div>

                  {/* Date & Period */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-[0.80rem] font-bold text-amber-400 uppercase">
                      {item.year}
                    </span>
                    <span className="text-white/30 text-xs">•</span>
                    <span className="font-mono text-[0.70rem] text-zinc-500 uppercase">
                      {item.periodTag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-[1.3rem] font-black text-white uppercase tracking-[0.02em] leading-snug mb-1">
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <div className="font-mono text-[0.78rem] text-accent-orange uppercase mb-3">
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-[0.90rem] text-zinc-300 leading-relaxed mb-3.5 font-normal">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {item.highlights && (
                    <div className="flex flex-col gap-1.5 mb-3">
                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-[0.84rem] text-zinc-300">
                          <span className="text-accent-orange text-xs mt-0.5">●</span>
                          <span className="leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Languages */}
                  {item.languages && (
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      {item.languages.map((lang, lIdx) => (
                        <div
                          key={lIdx}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between"
                        >
                          <span className="font-bold text-[0.88rem] text-white">
                            {lang.name} ({lang.nativeScript})
                          </span>
                          <span className="font-mono text-[0.70rem] text-amber-400 font-semibold">
                            {lang.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* OTHER ACHIEVEMENTS: Sports, Martial Arts & Academic Honors Grid          */}
        {/* ========================================================================= */}
        <div>
          <div className="flex items-center gap-3 mb-6 pt-8 border-t border-white/[0.08]">
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
            {otherAchievements.map((ach) => {
              const IconComponent = ach.icon;
              return (
                <div
                  key={ach.id}
                  className={`specular-card backdrop-blur-[16px] border ${ach.borderColor} ${ach.accentGlow} rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] group`}
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
