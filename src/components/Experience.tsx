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
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const desktopBeamRef = useRef<HTMLDivElement | null>(null);
  const desktopSparkRef = useRef<HTMLDivElement | null>(null);
  const mobileBeamRef = useRef<HTMLDivElement | null>(null);
  const mobileSparkRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeMilestones, setActiveMilestones] = useState<boolean[]>([true, false, false, false, false, false]);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

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

  // 1. Initial Entrance Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.04,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. High-Performance GPU-Accelerated Scroll Beam with Smooth Interpolation
  useEffect(() => {
    let animId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const updateBeamDOM = () => {
      // Smooth lerp for buttery transitions
      currentProgress += (targetProgress - currentProgress) * 0.2;
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }

      const clamped = Math.min(Math.max(currentProgress, 0), 1);

      // Desktop Beam Direct GPU transform (no layout reflow)
      if (desktopBeamRef.current) {
        desktopBeamRef.current.style.transform = `scaleY(${clamped})`;
      }
      if (desktopSparkRef.current) {
        const height = desktopBeamRef.current?.offsetHeight || 800;
        const sparkY = height * clamped;
        desktopSparkRef.current.style.transform = `translate3d(0, ${sparkY}px, 0)`;
        desktopSparkRef.current.style.opacity = clamped > 0.02 && clamped < 0.98 ? '1' : '0';
      }

      // Mobile Beam Direct GPU transform
      if (mobileBeamRef.current) {
        mobileBeamRef.current.style.transform = `scaleY(${clamped})`;
      }
      if (mobileSparkRef.current) {
        const height = mobileBeamRef.current?.offsetHeight || 800;
        const sparkY = height * clamped;
        mobileSparkRef.current.style.transform = `translate3d(0, ${sparkY}px, 0)`;
        mobileSparkRef.current.style.opacity = clamped > 0.02 && clamped < 0.98 ? '1' : '0';
      }

      if (Math.abs(targetProgress - currentProgress) > 0.0005) {
        animId = requestAnimationFrame(updateBeamDOM);
      }
    };

    const handleScroll = () => {
      if (!timelineContainerRef.current) return;
      const rect = timelineContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const triggerStart = windowHeight * 0.78;
      const totalScrollDist = rect.height + (triggerStart - windowHeight * 0.35);
      const scrolled = triggerStart - rect.top;

      targetProgress = Math.min(Math.max(scrolled / totalScrollDist, 0), 1);

      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updateBeamDOM);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 3. Zero-Thrashing IntersectionObserver for Milestone Illumination
  useEffect(() => {
    const itemElements = document.querySelectorAll<HTMLElement>('.timeline-milestone-item');
    if (!itemElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setActiveMilestones((prev) => {
          const next = [...prev];
          entries.forEach((entry) => {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              next[index] = entry.isIntersecting;
            }
          });
          return next;
        });
      },
      {
        rootMargin: '0px 0px -28% 0px',
        threshold: 0.1,
      }
    );

    itemElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getSlideUpStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(35px)',
    transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    willChange: 'opacity, transform',
  });

  return (
    <section
      ref={sectionRef}
      className="pt-16 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 md:px-12 lg:px-16 relative bg-bg-dark overflow-hidden selection:bg-accent-orange/30"
      id="journey"
    >
      {/* Cinematic Ambient Radial Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-orange/[0.04] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1340px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 md:mb-20" style={getSlideUpStyle(0.15)}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange font-mono text-[0.74rem] font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            <GraduationCap size={14} />
            <span>Academic &amp; Growth Timeline</span>
          </div>
          <h2 className="font-display text-[clamp(2.4rem,4.5vw,4.0rem)] font-black text-white leading-[1.12] mb-3 uppercase tracking-[0.02em]">
            MY JOURNEY<span className="text-accent-orange">.</span>
          </h2>
          <p className="text-[1.05rem] text-text-secondary max-w-[720px] leading-[1.65]">
            Academic milestones, national achievements, distinctions, and technical foundations from school to Computer Science Engineering.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CINEMATIC VERTICAL GLOWING TIMELINE (Matches Reference Screenshot)        */}
        {/* ========================================================================= */}
        <div ref={timelineContainerRef} className="relative mb-24">
          
          {/* Desktop Timeline Layout (>= 768px) */}
          <div className="hidden md:block relative">
            
            {/* 1. Base Dim Guide Line Track */}
            <div
              className="absolute left-[200px] lg:left-[220px] top-6 bottom-6 w-[2px] bg-white/[0.07] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* 2. Active Optical Beam (ScaleY GPU-Accelerated, zero layout reflow) */}
            <div
              ref={desktopBeamRef}
              className="absolute left-[200px] lg:left-[220px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-accent-orange via-amber-400 to-accent-orange rounded-full shadow-[0_0_16px_rgba(249,115,22,0.9),0_0_30px_rgba(249,115,22,0.45)] origin-top pointer-events-none z-10"
              style={{ transform: 'scaleY(0)', willChange: 'transform' }}
              aria-hidden="true"
            />

            {/* 3. Photon Spark Particle (Translate3D GPU-Accelerated) */}
            <div
              ref={desktopSparkRef}
              className="absolute left-[200px] lg:left-[220px] top-6 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_24px_#f97316,0_0_40px_#f97316] pointer-events-none z-20 transition-opacity duration-300"
              style={{ transform: 'translate3d(0, 0, 0)', opacity: 0, willChange: 'transform, opacity' }}
              aria-hidden="true"
            />

            {/* Milestones List */}
            <div className="space-y-12 lg:space-y-16">
              {timelineMilestones.map((item, idx) => {
                const isReached = activeMilestones[idx] || false;
                const isHovered = hoveredNode === idx;
                const isHighlighted = isReached || isHovered;

                return (
                  <div
                    key={item.id}
                    data-index={idx}
                    onMouseEnter={() => setHoveredNode(idx)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="timeline-milestone-item grid grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr] gap-0 items-start group relative"
                  >
                    {/* Left Column: Date & Period Tag (Right-Aligned to Timeline) */}
                    <div className="pr-8 lg:pr-10 text-right pt-2 select-none">
                      <div
                        className={`font-cinzel text-[1.05rem] lg:text-[1.18rem] font-bold tracking-[0.06em] uppercase transition-all duration-400 ${
                          isHighlighted
                            ? 'text-white drop-shadow-[0_0_12px_rgba(249,115,22,0.45)]'
                            : 'text-white/35'
                        }`}
                      >
                        {item.year}
                      </div>
                      <div
                        className={`font-mono text-[0.68rem] lg:text-[0.72rem] font-extrabold tracking-[0.16em] uppercase mt-1 transition-colors duration-400 ${
                          isHighlighted ? 'text-accent-orange' : 'text-text-muted'
                        }`}
                      >
                        {item.periodTag}
                      </div>
                    </div>

                    {/* Timeline Multi-Layer Optical Node */}
                    <div className="absolute left-[200px] lg:left-[220px] top-4 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                      <div
                        className={`w-7 h-7 rounded-full transition-all duration-400 flex items-center justify-center ${
                          isHighlighted
                            ? 'bg-[#0e0f18]/90 border-2 border-accent-orange scale-110 shadow-[0_0_22px_rgba(249,115,22,0.9),0_0_40px_rgba(249,115,22,0.35)]'
                            : 'bg-[#09090b] border-2 border-white/15'
                        }`}
                      >
                        {/* Middle Metallic Ring */}
                        <div
                          className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                            isHighlighted ? 'border-amber-400 bg-accent-orange/20' : 'border-white/20'
                          }`}
                        >
                          {/* Inner Core Gem */}
                          <div
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              isHighlighted
                                ? 'bg-accent-orange shadow-[0_0_8px_#f97316]'
                                : 'bg-white/30'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Specular Glass Card with Headline & Highlights */}
                    <div className="pl-8 lg:pl-10">
                      <div
                        className={`specular-card relative rounded-2xl md:rounded-3xl p-6 sm:p-7 md:p-8 bg-gradient-to-br from-[#12131c]/90 via-[#0e0f18]/85 to-[#09090e]/95 border transition-all duration-400 ${
                          isHighlighted
                            ? 'border-accent-orange/40 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(249,115,22,0.1)] translate-x-0 opacity-100'
                            : 'border-white/[0.06] opacity-45 translate-x-1.5'
                        }`}
                        style={{ willChange: 'opacity, transform' }}
                      >
                        {/* Title & Badge */}
                        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                          <h3
                            className={`font-display text-[1.35rem] sm:text-[1.65rem] lg:text-[1.95rem] font-black uppercase tracking-[0.02em] leading-tight transition-colors duration-300 ${
                              isHighlighted ? 'text-white group-hover:text-accent-orange' : 'text-white/70'
                            }`}
                          >
                            {item.title}
                          </h3>
                          {item.badge && (
                            <span
                              className={`font-mono text-[0.68rem] font-bold px-3 py-1 rounded-full border uppercase tracking-wider transition-all duration-300 shrink-0 ${
                                isHighlighted
                                  ? 'text-accent-orange bg-accent-orange/15 border-accent-orange/30 shadow-sm'
                                  : 'text-text-muted bg-white/[0.02] border-white/10'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Subtitle / Institution Pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-accent-orange/10 border border-accent-orange/25 font-mono text-[0.76rem] lg:text-[0.82rem] font-bold text-accent-orange uppercase tracking-wider mb-3.5">
                          <span>▹</span>
                          <span>{item.subtitle}</span>
                        </div>

                        {/* Description */}
                        <p className="text-[0.92rem] lg:text-[0.98rem] text-zinc-300 leading-[1.7] max-w-[760px] mb-4 font-normal">
                          {item.description}
                        </p>

                        {/* Highlights */}
                        {item.highlights && (
                          <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
                            {item.highlights.map((h, hIdx) => (
                              <div
                                key={hIdx}
                                className="flex items-start gap-2.5 text-[0.85rem] lg:text-[0.88rem] text-slate-300 py-1.5 px-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-accent-orange/30 hover:bg-accent-orange/[0.04] transition-all"
                              >
                                <span className="text-accent-orange text-xs mt-0.5">◆</span>
                                <span className="leading-relaxed">{h}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Languages (If Last Milestone) */}
                        {item.languages && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/[0.06]">
                            {item.languages.map((lang, lIdx) => (
                              <div
                                key={lIdx}
                                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-accent-orange/40 hover:bg-accent-orange/[0.04] transition-all flex flex-col gap-1 text-center"
                              >
                                <div className="flex items-center justify-center gap-1.5">
                                  <span className="font-display font-bold text-[0.95rem] text-white">
                                    {lang.name}
                                  </span>
                                  <span className="text-[0.72rem] text-accent-orange font-mono">
                                    ({lang.nativeScript})
                                  </span>
                                </div>
                                <span className="font-mono text-[0.70rem] text-accent-orange font-semibold">
                                  {lang.badge}
                                </span>
                                <span className="text-[0.74rem] text-text-muted">
                                  {lang.detail}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline Layout (< 768px) */}
          <div className="block md:hidden relative pl-5">
            
            {/* 1. Base Dim Line */}
            <div
              className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-white/[0.07] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* 2. Active Optical Beam (ScaleY GPU-Accelerated) */}
            <div
              ref={mobileBeamRef}
              className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent-orange via-amber-400 to-accent-orange rounded-full shadow-[0_0_14px_rgba(249,115,22,0.9)] origin-top pointer-events-none z-10"
              style={{ transform: 'scaleY(0)', willChange: 'transform' }}
              aria-hidden="true"
            />

            {/* 3. Mobile Spark Particle */}
            <div
              ref={mobileSparkRef}
              className="absolute left-[11px] top-4 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#ffffff,0_0_20px_#f97316] pointer-events-none z-20 transition-opacity duration-300"
              style={{ transform: 'translate3d(0, 0, 0)', opacity: 0, willChange: 'transform, opacity' }}
              aria-hidden="true"
            />

            {/* Mobile Milestones List */}
            <div className="space-y-10">
              {timelineMilestones.map((item, idx) => {
                const isReached = activeMilestones[idx] || false;

                return (
                  <div
                    key={item.id}
                    data-index={idx}
                    className="timeline-milestone-item relative pl-6"
                  >
                    {/* Timeline Node */}
                    <div className="absolute -left-[14px] top-3 z-20 flex items-center justify-center pointer-events-none">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-400 ${
                          isReached
                            ? 'bg-[#09090b] border-2 border-accent-orange shadow-[0_0_14px_rgba(249,115,22,0.8)] scale-110'
                            : 'bg-[#09090b] border-2 border-white/20'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isReached ? 'bg-accent-orange' : 'bg-white/30'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Mobile Specular Glass Card */}
                    <div
                      className={`specular-card rounded-2xl p-5 bg-[#0e0f18]/90 border transition-all duration-400 ${
                        isReached
                          ? 'border-accent-orange/40 shadow-lg opacity-100'
                          : 'border-white/[0.08] opacity-50'
                      }`}
                      style={{ willChange: 'opacity, transform' }}
                    >
                      {/* Date & Tag */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span
                          className={`font-cinzel text-[0.88rem] font-bold uppercase ${
                            isReached ? 'text-accent-orange' : 'text-white/50'
                          }`}
                        >
                          {item.year}
                        </span>
                        <span className="text-white/30 text-xs">•</span>
                        <span className="font-mono text-[0.68rem] text-text-muted uppercase">
                          {item.periodTag}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`font-display text-[1.22rem] font-black uppercase tracking-[0.02em] leading-snug mb-1.5 ${
                          isReached ? 'text-white' : 'text-white/70'
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Subtitle */}
                      <div className="font-mono text-[0.74rem] text-accent-orange uppercase mb-3">
                        {item.subtitle}
                      </div>

                      {/* Description */}
                      <p className="text-[0.88rem] text-slate-300 leading-relaxed mb-3 font-normal">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      {item.highlights && (
                        <div className="flex flex-col gap-1.5 pt-2 border-t border-white/[0.06]">
                          {item.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-[0.82rem] text-slate-300">
                              <span className="text-accent-orange text-xs mt-0.5">◆</span>
                              <span className="leading-relaxed">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Languages */}
                      {item.languages && (
                        <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/[0.06]">
                          {item.languages.map((lang, lIdx) => (
                            <div
                              key={lIdx}
                              className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between"
                            >
                              <div className="flex flex-col">
                                <span className="font-bold text-[0.88rem] text-white">
                                  {lang.name} ({lang.nativeScript})
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
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* OTHER ACHIEVEMENTS: Sports, Martial Arts & Academic Honors Grid          */}
        {/* ========================================================================= */}
        <div style={getSlideUpStyle(0.5)}>
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
                  className={`specular-card backdrop-blur-[16px] border ${ach.borderColor} ${ach.accentGlow} rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] group`}
                  style={getSlideUpStyle(0.55 + aIdx * 0.1)}
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
