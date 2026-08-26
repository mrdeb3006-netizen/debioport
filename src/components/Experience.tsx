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
}

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

  // 120 FPS High-Performance Smooth Laser Beam Animation (Zero React Re-renders)
  useEffect(() => {
    let animId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const renderLoop = () => {
      // Damped interpolation for liquid smooth motion
      currentProgress += (targetProgress - currentProgress) * 0.18;
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }

      const clamped = Math.min(Math.max(currentProgress, 0.02), 1);

      // 1. Desktop Beam & Spark Direct GPU Updates
      if (timelineRef.current) {
        const totalHeight = timelineRef.current.offsetHeight || 1000;
        const currentPx = totalHeight * clamped;

        if (desktopBeamRef.current) {
          desktopBeamRef.current.style.height = `${currentPx}px`;
        }

        if (desktopSparkRef.current) {
          desktopSparkRef.current.style.transform = `translate3d(-50%, ${currentPx}px, 0)`;
          desktopSparkRef.current.style.opacity = clamped > 0.03 && clamped < 0.98 ? '1' : '0.4';
        }

        // 2. Mobile Beam & Spark Direct Updates
        if (mobileBeamRef.current) {
          mobileBeamRef.current.style.height = `${currentPx}px`;
        }

        if (mobileSparkRef.current) {
          mobileSparkRef.current.style.transform = `translate3d(-50%, ${currentPx}px, 0)`;
          mobileSparkRef.current.style.opacity = clamped > 0.03 && clamped < 0.98 ? '1' : '0.4';
        }

        // 3. Highlight rows reached by the beam
        const rows = timelineRef.current.querySelectorAll<HTMLElement>('.timeline-row-item');
        rows.forEach((row) => {
          const rowTop = row.offsetTop;
          const node = row.querySelector<HTMLElement>('.timeline-node-circle');
          const title = row.querySelector<HTMLElement>('.timeline-row-title');
          const year = row.querySelector<HTMLElement>('.timeline-row-year');

          if (currentPx >= rowTop - 20) {
            if (node) {
              node.style.borderColor = '#fbbf24';
              node.style.boxShadow = '0 0 20px rgba(251,191,36,0.9), 0 0 35px rgba(249,115,22,0.5)';
              node.style.transform = 'scale(1.2)';
            }
            if (title) title.style.color = '#ffffff';
            if (year) {
              year.style.color = '#fbbf24';
              year.style.textShadow = '0 0 12px rgba(251,191,36,0.6)';
            }
          } else {
            if (node) {
              node.style.borderColor = 'rgba(255,255,255,0.2)';
              node.style.boxShadow = 'none';
              node.style.transform = 'scale(1.0)';
            }
            if (title) title.style.color = '#d4d4d8';
            if (year) {
              year.style.color = '#a1a1aa';
              year.style.textShadow = 'none';
            }
          }
        });
      }

      if (Math.abs(targetProgress - currentProgress) > 0.0005) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.78;
      const total = rect.height + (start - windowHeight * 0.32);
      const scrolled = start - rect.top;

      targetProgress = Math.min(Math.max(scrolled / total, 0.04), 1);

      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(renderLoop);
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
          className="mb-16 md:mb-24 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(24px)',
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

            {/* 2. Active Glowing Golden Laser Beam (Draws Live with Scroll) */}
            <div
              ref={desktopBeamRef}
              className="absolute left-[190px] lg:left-[210px] top-4 w-[2px] bg-gradient-to-b from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_18px_rgba(245,158,11,0.95),0_0_35px_rgba(249,115,22,0.6)] pointer-events-none z-10"
              style={{ height: '30px', willChange: 'height' }}
              aria-hidden="true"
            />

            {/* 3. Leading Radiant Photon Spark Particle */}
            <div
              ref={desktopSparkRef}
              className="absolute left-[190px] lg:left-[210px] top-4 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#ffffff,0_0_25px_#fbbf24,0_0_45px_#f97316] pointer-events-none z-20 transition-opacity duration-300"
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
                    <div className="timeline-row-year font-mono text-[0.92rem] lg:text-[1.0rem] font-bold text-zinc-400 tracking-wider uppercase transition-all duration-300">
                      {item.year}
                    </div>
                    <div className="font-mono text-[0.70rem] lg:text-[0.74rem] font-extrabold text-accent-orange/90 tracking-widest uppercase mt-1">
                      {item.periodTag}
                    </div>
                  </div>

                  {/* Glowing Circular Node (Centered over the Golden Line) */}
                  <div className="absolute left-[190px] lg:left-[210px] top-2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                    <div className="timeline-node-circle w-6 h-6 rounded-full bg-[#09090b] border-2 border-white/20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                    </div>
                  </div>

                  {/* Right Column: Clean, Open Editorial Typography */}
                  <div className="pl-8 lg:pl-10">
                    
                    {/* Bold Uppercase Headline */}
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="timeline-row-title font-display text-[1.45rem] sm:text-[1.8rem] lg:text-[2.15rem] font-black text-zinc-200 uppercase tracking-[0.02em] leading-tight group-hover:text-amber-400 transition-colors duration-200">
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

            {/* Mobile Active Laser Beam */}
            <div
              ref={mobileBeamRef}
              className="absolute left-[11px] top-3 w-[2px] bg-gradient-to-b from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_14px_rgba(245,158,11,0.85)] pointer-events-none z-10"
              style={{ height: '30px', willChange: 'height' }}
              aria-hidden="true"
            />

            {/* Mobile Photon Spark Particle */}
            <div
              ref={mobileSparkRef}
              className="absolute left-[11px] top-3 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_20px_#fbbf24] pointer-events-none z-20 transition-opacity duration-300"
              style={{ transform: 'translate3d(-50%, 0, 0)', willChange: 'transform, opacity' }}
              aria-hidden="true"
            />

            {/* Mobile Milestones */}
            <div className="space-y-12">
              {timelineMilestones.map((item) => (
                <div key={item.id} className="timeline-row-item relative pl-6">
                  
                  {/* Node */}
                  <div className="absolute -left-[14px] top-1 z-20 flex items-center justify-center pointer-events-none">
                    <div className="timeline-node-circle w-5 h-5 rounded-full bg-[#09090b] border-2 border-white/20 flex items-center justify-center transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                  </div>

                  {/* Date & Period */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="timeline-row-year font-mono text-[0.80rem] font-bold text-zinc-400 uppercase transition-colors duration-300">
                      {item.year}
                    </span>
                    <span className="text-white/30 text-xs">•</span>
                    <span className="font-mono text-[0.70rem] text-zinc-500 uppercase">
                      {item.periodTag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="timeline-row-title font-display text-[1.3rem] font-black text-zinc-200 uppercase tracking-[0.02em] leading-snug mb-1 transition-colors duration-300">
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
                  className={`specular-card backdrop-blur-[16px] border ${ach.borderColor} ${ach.accentGlow} rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] group`}
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
