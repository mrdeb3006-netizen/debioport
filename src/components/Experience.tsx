import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Trophy,
  Medal,
  Shield,
  Star,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Award,
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
}

interface AchievementCard {
  id: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  highlights: string[];
}

const StackedAchievementDeck: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const achievements: AchievementCard[] = [
    {
      id: 'iit-honour',
      category: 'ACADEMIC EXCELLENCE',
      badge: 'IIT KGP HONOUR',
      title: 'Awarded by IIT Kharagpur Professor',
      subtitle: 'Exceptional Result & Class 10th School Topper',
      description:
        'Felicitated and awarded by an esteemed professor from Indian Institute of Technology (IIT) Kharagpur in recognition of exceptional academic performance and ranking as the School Topper in Class 10.',
      icon: Trophy,
      highlights: [
        'Rank #1 School Topper with 88.71% in Secondary Board',
        'Felicitated by distinguished IIT Kharagpur faculty',
        'Demonstrated foundational brilliance in mathematics & sciences',
      ],
    },
    {
      id: 'karate-bronze',
      category: 'NATIONAL SPORTS • MARTIAL ARTS',
      badge: '2X NATIONAL BRONZE',
      title: '2x Bronze Medalist • All India Karate Championship',
      subtitle: 'All India Level Club Karate Championship',
      description:
        'Secured two Bronze Medals at the prestigious All India Level Club Karate Championship, demonstrating elite competitive Karate combat discipline, Kumite reflexes, and tactical ring composure against top martial arts athletes nationwide.',
      icon: Medal,
      highlights: [
        'Two-time Bronze Medalist at All-India Championship Level',
        'High-intensity Kumite combat sparring & tactical execution',
        'Competitive athletics composure against top national contenders',
      ],
    },
    {
      id: 'karate-brown-belt',
      category: 'MARTIAL ARTS MASTERY',
      badge: 'BROWN BELT SENIOR',
      title: 'Karate Brown Belt',
      subtitle: 'Senior Grade Martial Arts Mastery',
      description:
        'Earned the senior Karate Brown Belt grade following years of rigorous traditional martial arts training, advanced Kata technical mastery, physical conditioning, and full-contact Kumite sparring.',
      icon: Shield,
      highlights: [
        'Senior Grade Brown Belt qualification in Shotokan/Goju Karate',
        '6+ years of disciplined conditioning, Kata & Kumite',
        'Deep mental focus, agility, stamina & tactical precision',
      ],
    },
    {
      id: 'school-topper',
      category: 'SCHOLASTIC DISTINCTION',
      badge: 'RANK #1 TOPPER',
      title: 'School Topper & Science Distinction',
      subtitle: 'Jadavpur High School • Secondary Board',
      description:
        'Ranked #1 as the Secondary Examination School Topper at Jadavpur High School with 88.71%, earning institutional commendations and scientific excellence distinctions.',
      icon: Award,
      highlights: [
        'Rank #1 among all secondary graduation candidates',
        '88.71% aggregate with distinctions across Science & Math',
        'Institutional commendation for academic excellence',
      ],
    },
  ];

  const total = achievements.length;

  const nextCard = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % total);
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning, total]);

  const prevCard = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + total) % total);
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning, total]);

  const goToCard = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 600);
  };

  // Continuous auto-cycle loop (pauses when user hovers)
  useEffect(() => {
    if (isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      nextCard();
    }, 3800);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, nextCard]);

  return (
    <div
      className="relative w-full max-w-[860px] mx-auto pt-6 pb-8 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Stack Container */}
      <div
        className="relative h-[430px] sm:h-[390px] md:h-[360px] w-full flex items-center justify-center"
        style={{ perspective: 1600 }}
      >
        {achievements.map((item, index) => {
          const IconComponent = item.icon;
          
          // Slot position relative to active front card (0 = front, 1 = behind, 2 = 2nd behind, etc.)
          const slot = (index - activeIndex + total) % total;
          const isFront = slot === 0;
          const isOutgoing = isFront && isTransitioning;

          // Compute 3D stacked transform properties
          let transformStyle = '';
          let zIndex = 30 - slot * 5;
          let opacity = 1;
          let filter = 'none';

          if (isOutgoing) {
            // Outgoing animation: flies upward and forward, then glides to the back
            transformStyle =
              'translate3d(0, -95px, 80px) rotateX(-12deg) rotateZ(-3.5deg) scale(1.03)';
            zIndex = 50;
            opacity = 0.85;
            filter = 'blur(1px)';
          } else if (slot === 0) {
            // Front Active Card
            transformStyle = 'translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg) scale(1)';
            zIndex = 40;
            opacity = 1;
          } else if (slot === 1) {
            // 1st Card Behind
            const yOffset = isHovered ? 26 : 20;
            const rot = isHovered ? 2.5 : 1.8;
            transformStyle = `translate3d(0, ${yOffset}px, -50px) rotateX(2deg) rotateZ(${rot}deg) scale(0.95)`;
            opacity = 0.88;
            filter = 'blur(0.3px)';
          } else if (slot === 2) {
            // 2nd Card Behind
            const yOffset = isHovered ? 50 : 38;
            const rot = isHovered ? -2.5 : -1.8;
            transformStyle = `translate3d(0, ${yOffset}px, -100px) rotateX(4deg) rotateZ(${rot}deg) scale(0.90)`;
            opacity = 0.65;
            filter = 'blur(0.8px)';
          } else {
            // Deepest Card in Stack
            const yOffset = isHovered ? 72 : 54;
            transformStyle = `translate3d(0, ${yOffset}px, -150px) rotateX(6deg) rotateZ(1deg) scale(0.85)`;
            opacity = 0.4;
            filter = 'blur(1.5px)';
          }

          return (
            <div
              key={item.id}
              onClick={() => !isFront && goToCard(index)}
              className={`absolute top-0 w-full max-w-[760px] rounded-2xl sm:rounded-3xl border p-6 sm:p-7 md:p-8 bg-[#0c0d13]/95 backdrop-blur-2xl transition-all duration-[650ms] ${
                !isFront ? 'cursor-pointer hover:border-amber-400/40' : 'cursor-default'
              }`}
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
                filter,
                transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.3, 1.15)',
                willChange: 'transform, opacity, filter',
                borderColor: isFront
                  ? 'rgba(245, 158, 11, 0.5)'
                  : 'rgba(255, 255, 255, 0.1)',
                boxShadow: isFront
                  ? '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 35px -5px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
                  : '0 20px 45px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Active Ambient Golden Edge Sheen */}
              {isFront && (
                <div
                  className="absolute -top-px left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              )}

              {/* Card Header: Category Tag & Icon */}
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.70rem] sm:text-[0.74rem] font-bold px-3 py-1 rounded-full bg-accent-orange/15 border border-accent-orange/35 text-accent-orange uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <span className="font-mono text-[0.66rem] text-zinc-500 uppercase tracking-widest hidden sm:inline">
                    {item.category}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                  <IconComponent size={20} />
                </div>
              </div>

              {/* Card Title */}
              <h4 className="font-display text-[1.25rem] sm:text-[1.5rem] md:text-[1.65rem] font-black text-white leading-snug mb-1 tracking-[0.01em]">
                {item.title}
              </h4>

              {/* Subtitle with Amber Accent */}
              <div className="font-mono text-[0.80rem] sm:text-[0.85rem] font-bold text-amber-400 tracking-wide uppercase mb-3 flex items-center gap-1.5">
                <span>▹</span>
                <span>{item.subtitle}</span>
              </div>

              {/* Description */}
              <p className="text-[0.88rem] sm:text-[0.93rem] text-zinc-300 leading-relaxed mb-4 font-normal max-w-[680px]">
                {item.description}
              </p>

              {/* Key Bullet Highlights */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-white/[0.06]">
                {item.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-start gap-2.5 text-[0.82rem] sm:text-[0.86rem] text-zinc-300"
                  >
                    <span className="text-accent-orange text-xs mt-0.5">●</span>
                    <span className="leading-tight">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Footnote Indicator */}
              <div className="pt-3 mt-3 border-t border-white/[0.04] flex items-center justify-between font-mono text-[0.68rem] text-zinc-500">
                <span>VERIFIED RECOGNITION</span>
                <div className="flex items-center gap-1 text-accent-orange font-bold">
                  <Star size={11} fill="currentColor" />
                  <span>HONOUR</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Controls & Pagination Indicators */}
      <div className="mt-8 flex items-center justify-between max-w-[760px] mx-auto px-2">
        {/* Step Indicator Pills */}
        <div className="flex items-center gap-2">
          {achievements.map((_, i) => (
            <button
              key={i}
              onClick={() => goToCard(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-8 bg-gradient-to-r from-amber-400 to-accent-orange shadow-[0_0_10px_rgba(251,191,36,0.7)]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
          <span className="font-mono text-[0.70rem] text-zinc-500 ml-2">
            0{activeIndex + 1} / 0{total}
          </span>
        </div>

        {/* Next / Prev Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevCard}
            disabled={isTransitioning}
            className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-amber-400/50 hover:bg-amber-400/10 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50"
            aria-label="Previous Achievement"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextCard}
            disabled={isTransitioning}
            className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-amber-400/50 hover:bg-amber-400/10 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50"
            aria-label="Next Achievement"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const desktopBeamRef = useRef<HTMLDivElement | null>(null);
  const desktopSparkRef = useRef<HTMLDivElement | null>(null);
  const mobileBeamRef = useRef<HTMLDivElement | null>(null);
  const mobileSparkRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  const timelineMilestones: TimelineMilestone[] = [
    {
      id: 'btech-cse',
      year: '2026 — PRESENT',
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
      year: '2024 — 2026',
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
      year: '2024',
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
      id: 'jadavpur-high-school',
      year: '2018 — 2024',
      periodTag: 'SCHOOLING YEARS',
      title: 'JADAVPUR HIGH SCHOOL',
      subtitle: 'FOUNDATIONAL & SECONDARY EDUCATION',
      badge: 'ALUMNUS & TOPPER',
      description:
        'Completed foundational and secondary schooling at Jadavpur High School, cultivating academic rigor, discipline, and a deep-seated interest in mathematics, science, and technology.',
      highlights: [
        'Six years of foundational academic and extracurricular growth (Class 5 to Class 10).',
        'School Topper in secondary board examination with 88.71% (Rank #1).',
        'Awarded academic honors and recognition for excellence in science.',
      ],
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

  // 144Hz Hyper-Reactive GPU-Accelerated Scroll Beam (0ms Reflow, Zero Layout Thrashing)
  useEffect(() => {
    let animId: number;
    let targetProgress = 0;
    let currentProgress = 0;
    let rowOffsets: number[] = [];

    const measureOffsets = () => {
      if (!timelineRef.current) return;
      const totalH = timelineRef.current.offsetHeight || 1;
      const rows = timelineRef.current.querySelectorAll<HTMLElement>('.timeline-row-item');
      rowOffsets = Array.from(rows).map((r) => r.offsetTop / totalH);
    };

    const updateDOM = () => {
      currentProgress += (targetProgress - currentProgress) * 0.45;
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }

      const clamped = Math.min(Math.max(currentProgress, 0.02), 1);

      // 1. GPU scaleY transform on desktop beam (composite layer only)
      if (desktopBeamRef.current) {
        desktopBeamRef.current.style.transform = `scaleY(${clamped})`;
      }
      if (desktopSparkRef.current && timelineRef.current) {
        const totalHeight = timelineRef.current.offsetHeight || 800;
        const sparkY = totalHeight * clamped;
        desktopSparkRef.current.style.transform = `translate3d(-50%, ${sparkY}px, 0)`;
        desktopSparkRef.current.style.opacity = clamped > 0.03 && clamped < 0.98 ? '1' : '0.4';
      }

      // 2. GPU scaleY transform on mobile beam
      if (mobileBeamRef.current) {
        mobileBeamRef.current.style.transform = `scaleY(${clamped})`;
      }
      if (mobileSparkRef.current && timelineRef.current) {
        const totalHeight = timelineRef.current.offsetHeight || 800;
        const sparkY = totalHeight * clamped;
        mobileSparkRef.current.style.transform = `translate3d(-50%, ${sparkY}px, 0)`;
        mobileSparkRef.current.style.opacity = clamped > 0.03 && clamped < 0.98 ? '1' : '0.4';
      }

      // 3. Update active node states using pre-computed relative offsets
      if (timelineRef.current && rowOffsets.length > 0) {
        const rows = timelineRef.current.querySelectorAll<HTMLElement>('.timeline-row-item');
        rows.forEach((row, i) => {
          const offsetFraction = rowOffsets[i] || 0;
          const node = row.querySelector<HTMLElement>('.timeline-node-circle');
          const title = row.querySelector<HTMLElement>('.timeline-row-title');
          const year = row.querySelector<HTMLElement>('.timeline-row-year');

          const isReached = clamped >= offsetFraction - 0.03;

          if (node) {
            node.style.borderColor = isReached ? '#fbbf24' : 'rgba(255,255,255,0.2)';
            node.style.boxShadow = isReached
              ? '0 0 20px rgba(251,191,36,0.95), 0 0 35px rgba(249,115,22,0.5)'
              : 'none';
            node.style.transform = isReached ? 'scale(1.2)' : 'scale(1.0)';
          }
          if (title) {
            title.style.color = isReached ? '#ffffff' : '#d4d4d8';
          }
          if (year) {
            year.style.color = isReached ? '#fbbf24' : '#a1a1aa';
            year.style.textShadow = isReached ? '0 0 12px rgba(251,191,36,0.6)' : 'none';
          }
        });
      }

      if (Math.abs(targetProgress - currentProgress) > 0.0005) {
        animId = requestAnimationFrame(updateDOM);
      }
    };

    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.78;
      const total = rect.height + (start - windowHeight * 0.3);
      const scrolled = start - rect.top;

      targetProgress = Math.min(Math.max(scrolled / total, 0.03), 1);

      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updateDOM);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      measureOffsets();
      handleScroll();
    }, { passive: true });

    measureOffsets();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
          className="mb-10 md:mb-14 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(24px)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange font-mono text-[0.72rem] font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            <GraduationCap size={13} />
            <span>Academic &amp; Growth Timeline</span>
          </div>
          <h2 className="font-display text-[clamp(1.6rem,3.0vw,2.6rem)] font-black text-white leading-tight uppercase tracking-[0.02em]">
            MY JOURNEY<span className="text-accent-orange">.</span>
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* OPEN CINEMATIC SCROLL-DRIVEN TIMELINE                                     */}
        {/* ========================================================================= */}
        <div ref={timelineRef} className="relative mb-28">
          
          {/* Desktop Timeline Layout (>= 768px) */}
          <div className="hidden md:block relative">
            
            {/* 1. Base Subtle Guide Line */}
            <div
              className="absolute left-[190px] lg:left-[210px] top-4 bottom-4 w-[2px] bg-white/[0.08] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* 2. Active Glowing Golden Laser Beam (GPU-Accelerated scaleY) */}
            <div
              ref={desktopBeamRef}
              className="absolute left-[190px] lg:left-[210px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_18px_rgba(245,158,11,0.95),0_0_35px_rgba(249,115,22,0.6)] origin-top pointer-events-none z-10"
              style={{ transform: 'scaleY(0.04)', willChange: 'transform' }}
              aria-hidden="true"
            />

            {/* 3. Leading Radiant Photon Spark Particle */}
            <div
              ref={desktopSparkRef}
              className="absolute left-[190px] lg:left-[210px] top-4 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#ffffff,0_0_25px_#fbbf24,0_0_45px_#f97316] pointer-events-none z-20 transition-opacity duration-200"
              style={{ transform: 'translate3d(-50%, 0, 0)', willChange: 'transform, opacity' }}
              aria-hidden="true"
            />

            {/* Timeline Milestone Rows */}
            <div className="space-y-16 lg:space-y-24">
              {timelineMilestones.map((item) => (
                <div
                  key={item.id}
                  className="timeline-row-item grid grid-cols-[190px_1fr] lg:grid-cols-[210px_1fr] gap-0 items-start group relative"
                >
                  {/* Left Column: Date / Year Tag (Right-Aligned to the Golden Line) */}
                  <div className="pr-8 lg:pr-10 text-right pt-1 select-none">
                    <div className="timeline-row-year font-mono text-[0.92rem] lg:text-[1.0rem] font-bold text-zinc-400 tracking-wider uppercase transition-all duration-200">
                      {item.year}
                    </div>
                    <div className="font-mono text-[0.70rem] lg:text-[0.74rem] font-extrabold text-accent-orange/90 tracking-widest uppercase mt-1">
                      {item.periodTag}
                    </div>
                  </div>

                  {/* Glowing Circular Node (Centered over the Golden Line) */}
                  <div className="absolute left-[190px] lg:left-[210px] top-2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                    <div className="timeline-node-circle w-6 h-6 rounded-full bg-[#09090b] border-2 border-white/20 transition-all duration-200 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                    </div>
                  </div>

                  {/* Right Column: Clean, Open Editorial Typography */}
                  <div className="pl-8 lg:pl-10">
                    
                    {/* Bold Uppercase Headline */}
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="timeline-row-title font-display text-[1.45rem] sm:text-[1.8rem] lg:text-[2.15rem] font-black text-zinc-200 uppercase tracking-[0.02em] leading-tight group-hover:text-amber-400 transition-colors duration-150">
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

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline Layout (< 768px) */}
          <div className="block md:hidden relative pl-6">
            
            {/* Base Line */}
            <div
              className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-white/[0.08] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* Mobile Active Laser Beam (scaleY GPU) */}
            <div
              ref={mobileBeamRef}
              className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_14px_rgba(245,158,11,0.85)] origin-top pointer-events-none z-10"
              style={{ transform: 'scaleY(0.04)', willChange: 'transform' }}
              aria-hidden="true"
            />

            {/* Mobile Photon Spark Particle */}
            <div
              ref={mobileSparkRef}
              className="absolute left-[11px] top-3 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_20px_#fbbf24] pointer-events-none z-20 transition-opacity duration-200"
              style={{ transform: 'translate3d(-50%, 0, 0)', willChange: 'transform, opacity' }}
              aria-hidden="true"
            />

            {/* Mobile Milestones */}
            <div className="space-y-12">
              {timelineMilestones.map((item) => (
                <div key={item.id} className="timeline-row-item relative pl-6">
                  
                  {/* Node */}
                  <div className="absolute -left-[14px] top-1 z-20 flex items-center justify-center pointer-events-none">
                    <div className="timeline-node-circle w-5 h-5 rounded-full bg-[#09090b] border-2 border-white/20 flex items-center justify-center transition-all duration-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                  </div>

                  {/* Date & Period */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="timeline-row-year font-mono text-[0.80rem] font-bold text-zinc-400 uppercase transition-colors duration-200">
                      {item.year}
                    </span>
                    <span className="text-white/30 text-xs">•</span>
                    <span className="font-mono text-[0.70rem] text-zinc-500 uppercase">
                      {item.periodTag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="timeline-row-title font-display text-[1.3rem] font-black text-zinc-200 uppercase tracking-[0.02em] leading-snug mb-1 transition-colors duration-150">
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
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* OTHER ACHIEVEMENTS: 3D Stacked Deck of Cards with Physics Shuffling      */}
        {/* ========================================================================= */}
        <div className="pt-6 border-t border-white/[0.08]">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="text-accent-orange" size={22} />
            <div>
              <h3 className="font-display text-[1.3rem] md:text-[1.55rem] font-black text-white uppercase tracking-wide">
                OTHER ACHIEVEMENTS &amp; HONORS
              </h3>
              <p className="text-[0.85rem] text-text-muted">
                National-level competitive sports, martial arts excellence, and premier institutional recognitions.
              </p>
            </div>
          </div>

          {/* Interactive 3D Stacked Deck */}
          <StackedAchievementDeck />
        </div>

      </div>
    </section>
  );
};
