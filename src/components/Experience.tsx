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
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shuffle,
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
  yearTag: string;
  statNumber: string;
  statLabel: string;
  description: string;
  icon: React.ElementType;
  highlights: string[];
}

const PhysicalShuffleDeck: React.FC = () => {
  const achievements: AchievementCard[] = [
    {
      id: 'jhs-counselling-honour',
      category: 'INSTITUTIONAL COMMENDATION',
      badge: 'COUNSELLING COMMITTEE HONOUR',
      yearTag: 'JADAVPUR HIGH SCHOOL',
      statNumber: 'HONOUR',
      statLabel: 'COUNSELLING COMMITTEE',
      title: 'Jadavpur High School Counselling Committee Honour',
      subtitle: 'Institutional Commendation & Academic Guidance Felicitation',
      description:
        'Felicitated and honored by the esteemed Jadavpur High School Counselling Committee in recognition of scholastic excellence, discipline, and exemplary performance as the Secondary School Topper.',
      icon: Award,
      highlights: [
        'Felicitated in person by the Jadavpur High School Counselling Committee for scholastic distinction',
        'Recognized for exceptional academic consistency, moral discipline, and secondary school leadership',
        'Honored by school mentors for dedication, diligence, and academic brilliance in science & mathematics',
      ],
    },
    {
      id: 'iit-kgp-consultant-honour',
      category: 'ENGINEERING & ALUMNI HONOUR',
      badge: 'IIT KGP ALUMNUS HONOUR',
      yearTag: 'CONSULTANT ENGINEER AWARD',
      statNumber: 'IIT KGP',
      statLabel: 'CONSULTANT ENGINEER',
      title: 'Awarded by IIT Kharagpur Passed Out Consultant Engineer',
      subtitle: 'Distinguished IIT Kharagpur Alumnus & Senior Consultant Felicitation',
      description:
        'Felicitated and awarded a prestigious commendation in person by an esteemed IIT Kharagpur passed out Consultant Engineer in recognition of academic brilliance, analytical rigor, and scholastic excellence in Class 10.',
      icon: Trophy,
      highlights: [
        'Felicitated in person by an IIT Kharagpur alumnus and practicing Consultant Engineer',
        'Recognized for sharp analytical aptitude, problem-solving skills, and academic brilliance',
        'Awarded for ranking as the #1 School Topper with 88.71% in the Secondary Board Examination',
      ],
    },
    {
      id: 'karate-bronze',
      category: 'NATIONAL SPORTS • MARTIAL ARTS',
      badge: '2X NATIONAL BRONZE',
      yearTag: 'ALL INDIA CHAMPIONSHIP',
      statNumber: '2X BRONZE',
      statLabel: 'NATIONAL LEVEL',
      title: '2x Bronze Medalist • All India Karate Championship',
      subtitle: 'All India Level Club Karate Championship',
      description:
        'Secured two Bronze Medals at the prestigious All India Level Club Karate Championship, demonstrating competitive Karate combat discipline, rapid Kumite reflexes, and tactical ring composure against top martial arts athletes nationwide.',
      icon: Medal,
      highlights: [
        'Two-time Bronze Medalist at All-India Club Karate Championship Level',
        'High-intensity competitive Kumite combat sparring & tactical execution',
        'Demonstrated athletic discipline, physical stamina and composure under pressure',
      ],
    },
    {
      id: 'karate-brown-belt',
      category: 'MARTIAL ARTS MASTERY',
      badge: 'BROWN BELT SENIOR',
      yearTag: 'SENIOR GRADE MASTERY',
      statNumber: 'BROWN BELT',
      statLabel: 'SENIOR GRADE',
      title: 'Karate Brown Belt Senior Grade',
      subtitle: 'Advanced Martial Arts Conditioning & Sparring',
      description:
        'Earned the senior Karate Brown Belt grade following years of rigorous traditional martial arts training, advanced Kata technical mastery, physical conditioning, and full-contact Kumite sparring.',
      icon: Shield,
      highlights: [
        'Senior Grade Brown Belt qualification in traditional Karate discipline',
        '6+ years of disciplined conditioning, advanced Kata forms & full-contact sparring',
        'Cultivated mental focus, physical endurance, agility & situational awareness',
      ],
    },
    {
      id: 'school-topper',
      category: 'SCHOLASTIC DISTINCTION',
      badge: 'RANK #1 TOPPER',
      yearTag: 'SECONDARY EXCELLENCE',
      statNumber: '88.71%',
      statLabel: 'BOARD SCORE',
      title: 'School Topper & Science Distinction',
      subtitle: 'Jadavpur High School • Secondary Board',
      description:
        'Ranked #1 as the Secondary Examination School Topper at Jadavpur High School with 88.71%, earning institutional commendations and scientific excellence distinctions.',
      icon: Award,
      highlights: [
        'Ranked #1 among all secondary graduation candidates across the institution',
        '88.71% aggregate score with distinctions across Science & Higher Mathematics',
        'Awarded institutional honors for academic dedication and scientific inquiry',
      ],
    },
  ];

  const total = achievements.length;
  const [deckOrder, setDeckOrder] = useState<number[]>(() => achievements.map((_, i) => i));
  const [isHovered, setIsHovered] = useState(false);
  const [isDealing, setIsDealing] = useState(false);
  const [deckHeight, setDeckHeight] = useState<number>(460);
  const frontCardRef = useRef<HTMLDivElement | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (dealTimerRef.current) clearTimeout(dealTimerRef.current);
  }, []);

  // Dynamically measure active front card height to ensure 100% zero bottom cut-off on any screen/device
  useEffect(() => {
    const measureHeight = () => {
      if (frontCardRef.current) {
        const height = frontCardRef.current.offsetHeight;
        if (height > 0) {
          // 28px top anchor + 40px buffer for 3D card tilt & bottom shadow clearance
          setDeckHeight(height + 68);
        }
      }
    };

    measureHeight();

    const ro = new ResizeObserver(measureHeight);
    if (frontCardRef.current) {
      ro.observe(frontCardRef.current);
    }
    window.addEventListener('resize', measureHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measureHeight);
    };
  }, [deckOrder]);

  // Physical "Swipe & Re-deal to Back" Shuffle Execution
  const shuffleNext = useCallback(() => {
    if (isDealing) return;
    setIsDealing(true);

    dealTimerRef.current = setTimeout(() => {
      // Phase 2: Shift array order (front card goes to back)
      setDeckOrder((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setIsDealing(false);
    }, 680);
  }, [isDealing]);

  const shufflePrev = useCallback(() => {
    if (isDealing) return;
    setIsDealing(true);

    dealTimerRef.current = setTimeout(() => {
      setDeckOrder((prev) => {
        const last = prev[prev.length - 1];
        const rest = prev.slice(0, prev.length - 1);
        return [last, ...rest];
      });
      setIsDealing(false);
    }, 680);
  }, [isDealing]);

  const bringToFront = (targetIndex: number) => {
    if (isDealing || deckOrder[0] === targetIndex) return;
    setIsDealing(true);

    dealTimerRef.current = setTimeout(() => {
      setDeckOrder((prev) => {
        const itemPos = prev.indexOf(targetIndex);
        if (itemPos === -1) return prev;
        const newOrder = [...prev.slice(itemPos), ...prev.slice(0, itemPos)];
        return newOrder;
      });
      setIsDealing(false);
    }, 680);
  };

  // Continuous auto-shuffle timer
  useEffect(() => {
    if (isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      shuffleNext();
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, shuffleNext]);

  return (
    <div
      className="relative w-full max-w-[1060px] mx-auto select-none pt-4 pb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Physical Deck Container - Dynamically sized to active card + responsive fallbacks */}
      <div
        className="relative w-full flex items-center justify-center py-2 transition-[min-height] duration-300 ease-out min-h-[600px] sm:min-h-[520px] md:min-h-[480px] lg:min-h-[460px]"
        style={{
          perspective: 1800,
          minHeight: `${Math.max(deckHeight, 460)}px`,
        }}
      >
        {/* Flanking Side Arrows for Direct Manual Shuffling */}
        <button
          onClick={shufflePrev}
          disabled={isDealing}
          className="absolute -left-1 sm:-left-3 md:-left-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0c0d14]/90 backdrop-blur-xl border border-white/20 hover:border-amber-400 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 shadow-[0_10px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(245,158,11,0.25)] disabled:opacity-30 disabled:cursor-not-allowed group/deck-prev"
          aria-label="Previous Achievement Card"
          title="Previous Card (Shuffle Back)"
        >
          <ChevronLeft size={20} className="transition-transform duration-200 group-hover/deck-prev:-translate-x-0.5" />
        </button>

        <button
          onClick={shuffleNext}
          disabled={isDealing}
          className="absolute -right-1 sm:-right-3 md:-right-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0c0d14]/90 backdrop-blur-xl border border-white/20 hover:border-amber-400 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 shadow-[0_10px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(245,158,11,0.25)] disabled:opacity-30 disabled:cursor-not-allowed group/deck-next"
          aria-label="Next / Shuffle Achievement Card"
          title="Next Card (Shuffle Forward)"
        >
          <ChevronRight size={20} className="transition-transform duration-200 group-hover/deck-next:translate-x-0.5" />
        </button>

        {deckOrder.map((achIdx, slotPosition) => {
          const item = achievements[achIdx];
          const IconComponent = item.icon;
          const isFront = slotPosition === 0;

          // Slot-based 3D Physical Deck Positioning
          let transform = '';
          let zIndex = 40 - slotPosition * 8;
          let opacity = 1;
          let filter = 'none';

          if (isFront && isDealing) {
            // Lift the active card above the stack before sending it away.
            transform =
              'translate3d(112%, -34px, 150px) rotateY(-22deg) rotateZ(10deg) scale(0.9)';
            opacity = 0.08;
            zIndex = 50;
            filter = 'blur(1.5px)';
          } else if (slotPosition === 0) {
            // Front Active Card
            transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg) scale(1)';
            opacity = 1;
            zIndex = 35;
          } else if (slotPosition === 1) {
            // 1st Card Behind Deck
            const yOffset = isHovered ? -26 : -18;
            const xOffset = isHovered ? 20 : 12;
            const rot = isHovered ? 2.5 : 1.5;
            transform = `translate3d(${xOffset}px, ${yOffset}px, -60px) rotateZ(${rot}deg) scale(0.96)`;
            opacity = 0.85;
            filter = 'blur(0.4px)';
          } else if (slotPosition === 2) {
            // 2nd Card Behind Deck
            const yOffset = isHovered ? -48 : -34;
            const xOffset = isHovered ? -18 : -10;
            const rot = isHovered ? -2.2 : -1.2;
            transform = `translate3d(${xOffset}px, ${yOffset}px, -120px) rotateZ(${rot}deg) scale(0.92)`;
            opacity = 0.6;
            filter = 'blur(0.8px)';
          } else if (slotPosition === 3) {
            // 3rd Card Behind Deck
            const yOffset = isHovered ? -68 : -48;
            const xOffset = isHovered ? 14 : 8;
            const rot = isHovered ? 1.8 : 0.8;
            transform = `translate3d(${xOffset}px, ${yOffset}px, -180px) rotateZ(${rot}deg) scale(0.88)`;
            opacity = 0.35;
            filter = 'blur(1.2px)';
          } else {
            // Deepest Card in Deck (4th+ Behind Deck)
            const yOffset = isHovered ? -84 : -60;
            const xOffset = isHovered ? -10 : -6;
            const rot = isHovered ? -1.4 : -0.6;
            transform = `translate3d(${xOffset}px, ${yOffset}px, -240px) rotateZ(${rot}deg) scale(0.84)`;
            opacity = 0.2;
            filter = 'blur(1.5px)';
          }

          return (
            <div
              key={item.id}
              ref={isFront ? frontCardRef : null}
              onClick={() => !isFront && bringToFront(achIdx)}
              className={`achievement-deck-card absolute top-5 sm:top-6 w-full max-w-[1000px] rounded-2xl sm:rounded-3xl border p-5 sm:p-7 md:p-8 bg-[#0c0d14]/95 backdrop-blur-2xl ${
                !isFront ? 'cursor-pointer hover:border-amber-400/50' : 'cursor-default'
              }`}
              style={{
                transform,
                opacity,
                zIndex,
                filter,
                borderColor: isFront
                  ? 'rgba(245, 158, 11, 0.5)'
                  : 'rgba(255, 255, 255, 0.1)',
                boxShadow: isFront
                  ? '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 35px -5px rgba(245, 158, 11, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.14)'
                  : '0 20px 45px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Active Golden Edge Sheen */}
              {isFront && (
                <div
                  className="absolute -top-px left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              )}

              {/* Responsive 2-Column Wide Card Layout */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_210px] gap-4 sm:gap-6 items-center">
                
                {/* Left Area: Content, Badges & Highlights */}
                <div>
                  {/* Category Pill Bar & Top Shuffle Arrow Button */}
                  <div className="flex items-center justify-between gap-2.5 mb-2.5 sm:mb-3 flex-wrap">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono text-[0.68rem] sm:text-[0.74rem] font-bold px-3 py-1 rounded-full bg-accent-orange/15 border border-accent-orange/35 text-accent-orange uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 size={12} />
                        <span>{item.badge}</span>
                      </span>
                      <span className="font-mono text-[0.66rem] text-zinc-400 uppercase tracking-widest">
                        {item.category}
                      </span>
                      <span className="text-white/20 text-xs hidden sm:inline">•</span>
                      <span className="font-mono text-[0.66rem] text-amber-400 font-bold uppercase tracking-wider hidden sm:inline">
                        {item.yearTag}
                      </span>
                    </div>

                    {/* Quick Shuffle Arrow Button on Card Header */}
                    {isFront && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shuffleNext();
                        }}
                        disabled={isDealing}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/35 hover:border-amber-400/70 text-amber-400 hover:text-amber-300 text-[0.68rem] sm:text-[0.70rem] font-mono font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 group/shufbtn shadow-[0_0_15px_rgba(245,158,11,0.15)] ml-auto cursor-pointer"
                        title="Click arrow to shuffle next card"
                        aria-label="Shuffle to next card"
                      >
                        <Shuffle size={11} className="text-amber-400" />
                        <span>Shuffle</span>
                        <ArrowRight size={13} className="transition-transform duration-200 group-hover/shufbtn:translate-x-1 text-accent-orange" />
                      </button>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-[1.25rem] sm:text-[1.55rem] md:text-[1.8rem] font-black text-white leading-snug mb-1 tracking-[0.01em]">
                    {item.title}
                  </h4>

                  {/* Monospace Subtitle */}
                  <div className="font-mono text-[0.76rem] sm:text-[0.84rem] font-bold text-amber-400 tracking-wide uppercase mb-2 sm:mb-2.5 flex items-center gap-1.5">
                    <span>▹</span>
                    <span>{item.subtitle}</span>
                  </div>

                  {/* Description */}
                  <p className="text-[0.85rem] sm:text-[0.91rem] text-zinc-300 leading-relaxed mb-3 sm:mb-4 font-normal max-w-[740px]">
                    {item.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="flex flex-col gap-1.5 sm:gap-2 pt-2.5 border-t border-white/[0.06] max-w-[740px]">
                    {item.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2 text-[0.80rem] sm:text-[0.85rem] text-zinc-300"
                      >
                        <span className="text-accent-orange text-xs mt-0.5 shrink-0">●</span>
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Area: Hologram Emblem Tile & Manual Shuffle Action */}
                <div className="hidden md:flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08] text-center self-stretch">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-accent-orange/20 border border-amber-400/35 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.25)] mb-3">
                    <IconComponent size={30} />
                  </div>
                  <div className="font-display text-[1.4rem] font-black text-white leading-none mb-1">
                    {item.statNumber}
                  </div>
                  <div className="font-mono text-[0.62rem] font-bold text-accent-orange tracking-wider uppercase mb-2">
                    {item.statLabel}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[0.64rem] font-mono text-zinc-400 pt-2 border-t border-white/[0.06] w-full justify-center">
                    <Star size={11} className="text-amber-400" fill="currentColor" />
                    <span>VERIFIED</span>
                  </div>

                  {/* Quick Card Action on the front card */}
                  {isFront && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        shuffleNext();
                      }}
                      disabled={isDealing}
                      className="mt-3 w-full py-1.5 px-2 rounded-xl bg-gradient-to-r from-amber-400/15 to-accent-orange/15 hover:from-amber-400/25 hover:to-accent-orange/25 border border-amber-400/30 hover:border-amber-400/60 text-amber-300 text-[0.66rem] font-mono font-bold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 group/tile-shuf cursor-pointer"
                      title="Shuffle to next card"
                      aria-label="Shuffle to next card"
                    >
                      <span>NEXT CARD</span>
                      <ArrowRight size={12} className="transition-transform duration-200 group-hover/tile-shuf:translate-x-1 text-accent-orange" />
                    </button>
                  )}
                </div>

              </div>

              {/* Footnote Bar with quick arrows */}
              <div className="pt-2.5 sm:pt-3 mt-3 sm:mt-4 border-t border-white/[0.04] flex items-center justify-between font-mono text-[0.68rem] text-zinc-500 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span>3D PHYSICAL SHUFFLE DECK</span>
                  {isFront && (
                    <span className="text-zinc-400 hidden sm:inline">• CLICK ARROWS OR CARDS TO SHUFFLE</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-accent-orange font-bold">
                    <Sparkles size={11} />
                    <span>DECK 0{achIdx + 1} OF 0{total}</span>
                  </div>
                  {isFront && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shufflePrev();
                        }}
                        disabled={isDealing}
                        className="w-6 h-6 rounded-md bg-white/[0.06] hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 text-zinc-300 hover:text-amber-300 flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
                        aria-label="Previous card"
                        title="Previous card"
                      >
                        <ChevronLeft size={13} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shuffleNext();
                        }}
                        disabled={isDealing}
                        className="w-6 h-6 rounded-md bg-white/[0.06] hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 text-zinc-300 hover:text-amber-300 flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
                        aria-label="Next card"
                        title="Next card"
                      >
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls & Pagination with guaranteed clean clearance */}
      <div className="mt-8 sm:mt-10 flex items-center justify-between max-w-[1000px] mx-auto px-2 relative z-20">
        {/* Step Indicator Pills */}
        <div className="flex items-center gap-2">
          {achievements.map((_, i) => (
            <button
              key={i}
              onClick={() => bringToFront(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                deckOrder[0] === i
                  ? 'w-10 bg-gradient-to-r from-amber-400 to-accent-orange shadow-[0_0_12px_rgba(251,191,36,0.7)]'
                  : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Deal card ${i + 1}`}
            />
          ))}
          <span className="font-mono text-[0.72rem] text-zinc-500 ml-2">
            0{deckOrder[0] + 1} / 0{total}
          </span>
        </div>

        {/* Next / Prev Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={shufflePrev}
            disabled={isDealing}
            className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-amber-400/50 hover:bg-amber-400/10 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
            aria-label="Previous Achievement"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={shuffleNext}
            disabled={isDealing}
            className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-amber-400/50 hover:bg-amber-400/10 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
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
    let desktopBeamHeight = 0;
    let mobileBeamHeight = 0;
    let rowOffsets: number[] = [];

    const measureOffsets = () => {
      if (!timelineRef.current) return;
      const totalH = timelineRef.current.offsetHeight || 1;

      if (desktopBeamRef.current) {
        desktopBeamHeight = desktopBeamRef.current.offsetHeight;
      }
      if (mobileBeamRef.current) {
        mobileBeamHeight = mobileBeamRef.current.offsetHeight;
      }

      if (!desktopBeamHeight) {
        desktopBeamHeight = Math.max(totalH - 32, 1);
      }
      if (!mobileBeamHeight) {
        mobileBeamHeight = Math.max(totalH - 24, 1);
      }

      const rows = timelineRef.current.querySelectorAll<HTMLElement>('.timeline-row-item');
      rowOffsets = Array.from(rows).map((r) => {
        if (r.offsetHeight === 0) return 0;
        return r.offsetTop / totalH;
      });
    };

    const updateDOM = () => {
      currentProgress += (targetProgress - currentProgress) * 0.45;
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }

      const clamped = Math.min(Math.max(currentProgress, 0.02), 1);

      // Usable beam lengths (exact unscaled height of the beam line)
      const dHeight = desktopBeamHeight || (desktopBeamRef.current?.offsetHeight ?? (timelineRef.current ? timelineRef.current.offsetHeight - 32 : 800));
      const mHeight = mobileBeamHeight || (mobileBeamRef.current?.offsetHeight ?? (timelineRef.current ? timelineRef.current.offsetHeight - 24 : 800));

      // 1. GPU scaleY transform on desktop beam & perfectly synchronized leading spark dot
      if (desktopBeamRef.current) {
        desktopBeamRef.current.style.transform = `scaleY(${clamped})`;
      }
      if (desktopSparkRef.current) {
        const sparkY = dHeight * clamped;
        desktopSparkRef.current.style.transform = `translate3d(-50%, calc(${sparkY}px - 50%), 0)`;
        desktopSparkRef.current.style.opacity = clamped > 0.02 && clamped < 0.99 ? '1' : '0.4';
      }

      // 2. GPU scaleY transform on mobile beam & perfectly synchronized leading spark dot
      if (mobileBeamRef.current) {
        mobileBeamRef.current.style.transform = `scaleY(${clamped})`;
      }
      if (mobileSparkRef.current) {
        const sparkY = mHeight * clamped;
        mobileSparkRef.current.style.transform = `translate3d(-50%, calc(${sparkY}px - 50%), 0)`;
        mobileSparkRef.current.style.opacity = clamped > 0.02 && clamped < 0.99 ? '1' : '0.4';
      }

      // 3. Update active node states using pre-computed relative offsets
      if (timelineRef.current && rowOffsets.length > 0) {
        const rows = timelineRef.current.querySelectorAll<HTMLElement>('.timeline-row-item');
        rows.forEach((row, i) => {
          const offsetFraction = rowOffsets[i] || 0;
          if (offsetFraction === 0 && row.offsetHeight === 0) return;

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
      className="pt-20 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-16 relative bg-bg-dark overflow-hidden selection:bg-accent-orange/30"
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
              className="absolute left-[190px] lg:left-[210px] -translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/[0.08] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* 2. Active Glowing Golden Laser Beam (GPU-Accelerated scaleY) */}
            <div
              ref={desktopBeamRef}
              className="absolute left-[190px] lg:left-[210px] -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_18px_rgba(245,158,11,0.95),0_0_35px_rgba(249,115,22,0.6)] origin-top pointer-events-none z-10"
              style={{ transform: 'scaleY(0.04)', willChange: 'transform' }}
              aria-hidden="true"
            />

            {/* 3. Leading Radiant Photon Spark Particle */}
            <div
              ref={desktopSparkRef}
              className="absolute left-[190px] lg:left-[210px] top-4 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#ffffff,0_0_25px_#fbbf24,0_0_45px_#f97316] pointer-events-none z-20 transition-opacity duration-200"
              style={{ transform: 'translate3d(-50%, -50%, 0)', willChange: 'transform, opacity' }}
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
          <div className="block md:hidden relative">
            
            {/* Base Line */}
            <div
              className="absolute left-[12px] -translate-x-1/2 top-3 bottom-3 w-[2px] bg-white/[0.08] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* Mobile Active Laser Beam (scaleY GPU) */}
            <div
              ref={mobileBeamRef}
              className="absolute left-[12px] -translate-x-1/2 top-3 bottom-3 w-[2px] bg-gradient-to-b from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_14px_rgba(245,158,11,0.85)] origin-top pointer-events-none z-10"
              style={{ transform: 'scaleY(0.04)', willChange: 'transform' }}
              aria-hidden="true"
            />

            {/* Mobile Photon Spark Particle */}
            <div
              ref={mobileSparkRef}
              className="absolute left-[12px] top-3 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_20px_#fbbf24] pointer-events-none z-20 transition-opacity duration-200"
              style={{ transform: 'translate3d(-50%, -50%, 0)', willChange: 'transform, opacity' }}
              aria-hidden="true"
            />

            {/* Mobile Milestones */}
            <div className="space-y-12">
              {timelineMilestones.map((item) => (
                <div key={item.id} className="timeline-row-item relative pl-8 sm:pl-9">
                  
                  {/* Node */}
                  <div className="absolute left-[12px] -translate-x-1/2 top-1 z-20 flex items-center justify-center pointer-events-none">
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
        {/* OTHER ACHIEVEMENTS: 3D Physical Card Shuffler                             */}
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

          {/* 3D Physical Shuffler Deck */}
          <PhysicalShuffleDeck />
        </div>

      </div>
    </section>
  );
};
