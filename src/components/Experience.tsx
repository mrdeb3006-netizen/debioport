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
  languages?: { name: string; level: string; badge: string; detail: string }[];
}

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeNode, setActiveNode] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSlideUpStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(35px)',
    transition: `opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    willChange: 'opacity, transform',
  });

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

  return (
    <section
      ref={sectionRef}
      className="pt-16 md:pt-20 pb-8 md:pb-10 px-4 sm:px-6 md:px-12 lg:px-16 relative bg-bg-dark overflow-hidden"
      id="journey"
    >
      {/* Cinematic Ambient Radial Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent-orange/[0.035] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1300px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16" style={getSlideUpStyle(0.15)}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange font-mono text-[0.72rem] font-bold uppercase tracking-wider mb-3">
            <GraduationCap size={13} />
            <span>Academic &amp; Growth Timeline</span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-black text-white leading-[1.15] mb-2 uppercase tracking-[0.02em]">
            MY JOURNEY<span className="text-accent-orange">.</span>
          </h2>
          <p className="text-[1.02rem] text-text-secondary max-w-[700px] leading-[1.6]">
            Academic milestones, national achievements, distinctions, and technical foundations from school to Computer Science Engineering.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CINEMATIC VERTICAL GLOWING TIMELINE (Matches Reference Screenshot)        */}
        {/* ========================================================================= */}
        <div className="relative mb-20">
          
          {/* Desktop Timeline Layout (>= 768px) */}
          <div className="hidden md:block relative">
            
            {/* The Vertical Golden / Orange Line Beam */}
            <div
              className="absolute left-[200px] lg:left-[220px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent-orange via-amber-500 to-accent-orange/40 shadow-[0_0_12px_rgba(249,115,22,0.7)]"
              aria-hidden="true"
            />

            {/* Milestones List */}
            <div className="space-y-12 lg:space-y-16">
              {timelineMilestones.map((item, idx) => {
                const isHovered = activeNode === idx;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveNode(idx)}
                    className="grid grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr] gap-0 items-start group relative transition-all duration-300"
                    style={getSlideUpStyle(0.2 + idx * 0.1)}
                  >
                    {/* Left Column: Date & Period Tag (Right-Aligned to Timeline) */}
                    <div className="pr-8 text-right pt-1 select-none">
                      <div className="font-mono text-[0.88rem] lg:text-[0.95rem] font-bold text-white tracking-wider uppercase group-hover:text-accent-orange transition-colors">
                        {item.year}
                      </div>
                      <div className="font-mono text-[0.70rem] lg:text-[0.75rem] font-bold text-accent-orange/90 tracking-widest uppercase mt-0.5">
                        {item.periodTag}
                      </div>
                    </div>

                    {/* Timeline Node (Positioned directly over the vertical line) */}
                    <div className="absolute left-[200px] lg:left-[220px] top-2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                      <div
                        className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                          isHovered
                            ? 'bg-accent-orange/25 border-2 border-accent-orange scale-125 shadow-[0_0_18px_rgba(249,115,22,0.9)]'
                            : 'bg-[#09090b] border-2 border-accent-orange/80 group-hover:border-accent-orange group-hover:shadow-[0_0_14px_rgba(249,115,22,0.6)]'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isHovered ? 'bg-accent-orange scale-110 shadow-[0_0_8px_#f97316]' : 'bg-white group-hover:bg-accent-orange'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Right Column: Title, Subtitle, Description & Highlights */}
                    <div className="pl-8 lg:pl-10">
                      
                      {/* Badge Pill & Title */}
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <h3 className="font-display text-[1.45rem] lg:text-[1.85rem] font-black text-white uppercase tracking-[0.02em] leading-tight group-hover:text-accent-orange transition-colors">
                          {item.title}
                        </h3>
                        {item.badge && (
                          <span className="font-mono text-[0.68rem] font-bold text-accent-orange bg-accent-orange/15 px-2.5 py-0.5 rounded-full border border-accent-orange/30 uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Subtitle / Institution */}
                      <div className="font-mono text-[0.80rem] lg:text-[0.88rem] font-bold text-text-secondary tracking-wider uppercase mb-3 flex items-center gap-2">
                        <span className="text-accent-orange">▹</span>
                        <span>{item.subtitle}</span>
                      </div>

                      {/* Description */}
                      <p className="text-[0.92rem] lg:text-[1.0rem] text-slate-300 leading-relaxed max-w-[760px] mb-3.5 font-normal">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      {item.highlights && (
                        <div className="flex flex-col gap-1.5 max-w-[760px] pt-1">
                          {item.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2.5 text-[0.86rem] lg:text-[0.90rem] text-slate-300">
                              <span className="text-accent-orange text-xs mt-0.5">●</span>
                              <span className="leading-relaxed">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Languages (If Last Milestone) */}
                      {item.languages && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[760px] pt-2">
                          {item.languages.map((lang, lIdx) => (
                            <div
                              key={lIdx}
                              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-accent-orange/40 transition-colors flex flex-col gap-1"
                            >
                              <span className="font-display font-bold text-[0.95rem] text-white">
                                {lang.name}
                              </span>
                              <span className="font-mono text-[0.72rem] text-accent-orange font-semibold">
                                {lang.badge}
                              </span>
                              <span className="text-[0.75rem] text-text-muted">
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
            
            {/* The Vertical Golden / Orange Line Beam */}
            <div
              className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-accent-orange via-amber-500 to-accent-orange/40 shadow-[0_0_10px_rgba(249,115,22,0.7)]"
              aria-hidden="true"
            />

            {/* Mobile Milestones List */}
            <div className="space-y-10">
              {timelineMilestones.map((item, idx) => (
                <div
                  key={item.id}
                  className="relative pl-6"
                  style={getSlideUpStyle(0.2 + idx * 0.1)}
                >
                  {/* Timeline Node */}
                  <div className="absolute -left-[14px] top-1.5 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-5 h-5 rounded-full bg-[#09090b] border-2 border-accent-orange flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.6)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                    </div>
                  </div>

                  {/* Date & Tag */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-[0.78rem] font-bold text-accent-orange uppercase">
                      {item.year}
                    </span>
                    <span className="text-white/30 text-xs">•</span>
                    <span className="font-mono text-[0.68rem] text-text-muted uppercase">
                      {item.periodTag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-[1.25rem] font-black text-white uppercase tracking-[0.02em] leading-snug mb-1">
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <div className="font-mono text-[0.78rem] text-text-secondary uppercase mb-2.5">
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-[0.88rem] text-slate-300 leading-relaxed mb-3 font-normal">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {item.highlights && (
                    <div className="flex flex-col gap-1.5">
                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-[0.82rem] text-slate-300">
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
                          <div className="flex flex-col">
                            <span className="font-bold text-[0.88rem] text-white">
                              {lang.name}
                            </span>
                            <span className="text-[0.72rem] text-text-muted">
                              {lang.detail}
                            </span>
                          </div>
                          <span className="font-mono text-[0.70rem] text-accent-orange font-semibold">
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
        <div style={getSlideUpStyle(0.65)}>
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
                  style={getSlideUpStyle(0.7 + aIdx * 0.12)}
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
