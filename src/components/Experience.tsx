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
  BookOpen,
  Compass,
  Layers,
  Crown,
  MousePointer,
} from 'lucide-react';

interface TimelineMilestone {
  id: string;
  year: string;
  periodTag: string;
  title: string;
  subtitle: string;
  badge?: string;
  icon: React.ElementType;
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

/* ========================================================================= */
/* ULTRA-LUXURY INTERACTIVE MILESTONE CARD (TIMELINE)                        */
/* ========================================================================= */
interface MilestoneCardProps {
  item: TimelineMilestone;
  index: number;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ item, index }) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = item.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos(null);
      }}
      className="milestone-glass-card group relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 transition-all duration-500 overflow-hidden border border-white/[0.08] bg-[#0c0d16]/85 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-amber-400/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.12)] hover:-translate-y-1"
    >
      {/* Interactive Cursor Spotlight Glow */}
      {mousePos && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 w-[380px] h-[380px] rounded-full blur-3xl opacity-15 bg-amber-400 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />
      )}

      {/* Top Prismatic Golden Edge Reflection */}
      <div
        className={`absolute -top-px left-8 right-8 h-[1.5px] transition-opacity duration-500 ${
          isHovered
            ? 'opacity-100 bg-gradient-to-r from-transparent via-amber-400 to-transparent'
            : 'opacity-40 bg-gradient-to-r from-transparent via-white/20 to-transparent'
        }`}
        aria-hidden="true"
      />

      {/* Subtle Background Mesh Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40" />

      {/* Giant Stylized Index Watermark */}
      <div
        className="absolute top-2 right-4 font-display font-black text-[3.8rem] sm:text-[4.8rem] lg:text-[5.4rem] leading-none select-none pointer-events-none transition-all duration-500 text-white/[0.03] group-hover:text-amber-400/[0.08] group-hover:scale-105"
        aria-hidden="true"
      >
        0{index + 1}
      </div>

      {/* Card Header: Icon, Year / Period Tag, Status Badge */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5 flex-wrap relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400/20 via-accent-orange/15 to-transparent border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(251,191,36,0.35)]">
            <IconComponent size={21} />
          </div>
          <div>
            <span className="font-mono text-[0.66rem] sm:text-[0.70rem] text-zinc-400 uppercase tracking-widest block font-medium">
              {item.periodTag}
            </span>
            <span className="font-mono text-[0.76rem] sm:text-[0.82rem] font-black text-amber-400 tracking-wider uppercase">
              {item.year}
            </span>
          </div>
        </div>

        {item.badge && (
          <span className="font-mono text-[0.68rem] sm:text-[0.74rem] font-extrabold px-3.5 py-1 rounded-full bg-accent-orange/15 border border-accent-orange/35 text-accent-orange uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(249,115,22,0.15)] group-hover:border-accent-orange/60 group-hover:bg-accent-orange/20 transition-all duration-300">
            <Sparkles size={12} className="text-accent-orange animate-pulse" />
            <span>{item.badge}</span>
          </span>
        )}
      </div>

      {/* Headline Title */}
      <h3 className="timeline-row-title font-display text-[1.35rem] sm:text-[1.7rem] lg:text-[1.95rem] font-black text-white uppercase tracking-[0.015em] leading-tight mb-2 transition-colors duration-200 relative z-10 group-hover:text-amber-300">
        {item.title}
      </h3>

      {/* Subtitle / Institution */}
      <div className="font-mono text-[0.78rem] sm:text-[0.85rem] font-bold text-amber-400/95 tracking-wide uppercase mb-3.5 sm:mb-4 flex items-center gap-2 relative z-10">
        <span className="text-accent-orange">▹</span>
        <span>{item.subtitle}</span>
      </div>

      {/* Description */}
      <p className="text-[0.90rem] sm:text-[0.98rem] text-zinc-300 leading-relaxed max-w-[780px] mb-5 font-normal relative z-10">
        {item.description}
      </p>

      {/* Highlights List */}
      {item.highlights && item.highlights.length > 0 && (
        <div className="pt-3.5 border-t border-white/[0.08] flex flex-col gap-2 relative z-10">
          {item.highlights.map((h, hIdx) => (
            <div key={hIdx} className="flex items-start gap-2.5 text-[0.85rem] sm:text-[0.91rem] text-zinc-300 group/item">
              <span className="text-accent-orange text-xs mt-1 shrink-0 group-hover/item:text-amber-400 transition-colors">◆</span>
              <span className="leading-relaxed">{h}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ========================================================================= */
/* PRO-LEVEL SCROLL-DRIVEN 3D STACKED HONORS SHOWCASE (DIRECT-DOM GPU ENGINE)*/
/* ========================================================================= */
const ScrollStackedHonorsDeck: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);
  const badgeTextRef = useRef<HTMLSpanElement | null>(null);
  const categoryTextRef = useRef<HTMLSpanElement | null>(null);
  const footerTextRef = useRef<HTMLSpanElement | null>(null);
  const pillsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const isHoveredRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

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
      icon: Crown,
      highlights: [
        'Ranked #1 among all secondary graduation candidates across the institution',
        '88.71% aggregate score with distinctions across Science & Higher Mathematics',
        'Awarded institutional honors for academic dedication and scientific inquiry',
      ],
    },
  ];

  const total = achievements.length;

  // Direct DOM Update Engine (0ms Reflow, Pure GPU Compositing)
  const renderDeckFrame = useCallback(
    (p: number) => {
      const virtualPos = p * (total - 1);
      const activeIdx = Math.min(Math.round(virtualPos), total - 1);
      activeIndexRef.current = activeIdx;

      // Update progress track
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.max(p * 100, 6)}%`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.round(p * 100)}%`;
      }

      // Update HUD labels
      if (badgeTextRef.current) {
        badgeTextRef.current.textContent = `HONOR 0${activeIdx + 1} / 0${total}`;
      }
      if (categoryTextRef.current) {
        categoryTextRef.current.textContent = achievements[activeIdx].category;
      }
      if (footerTextRef.current) {
        footerTextRef.current.textContent = `0${activeIdx + 1} / 0${total} COMPLETED`;
      }

      // Update pill buttons
      pillsRef.current.forEach((btn, i) => {
        if (!btn) return;
        if (i === activeIdx) {
          btn.style.background = 'linear-gradient(to right, #fbbf24, #f97316)';
          btn.style.color = '#000000';
          btn.style.boxShadow = '0 0 15px rgba(251,191,36,0.6)';
          btn.style.transform = 'scale(1.06)';
        } else {
          btn.style.background = 'transparent';
          btn.style.color = '#a1a1aa';
          btn.style.boxShadow = 'none';
          btn.style.transform = 'scale(1.0)';
        }
      });

      // Direct GPU Transform & Opacity on each Card DOM Element
      cardsRef.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        const delta = idx - virtualPos;

        let transform = '';
        let opacity = 1;
        let zIndex = 20;

        if (delta > 0) {
          // Card rising from below
          if (delta >= 1) {
            const extra = delta - 1;
            transform = `translate3d(0, ${110 + extra * 30}%, 80px) rotateX(12deg) scale(0.92)`;
            opacity = 0;
            zIndex = 10;
          } else {
            const yPercent = delta * 105;
            const rotX = delta * 10;
            const scale = 0.94 + (1 - delta) * 0.06;
            transform = `translate3d(0, ${yPercent}%, ${40 * (1 - delta)}px) rotateX(${rotX}deg) scale(${scale})`;
            opacity = Math.min(1, (1 - delta) * 1.8);
            zIndex = 30 + idx * 4;
          }
        } else {
          // Card active or stacking underneath
          const depth = -delta;
          if (depth < 0.12) {
            transform = 'translate3d(0, 0, 0) rotateX(0deg) scale(1)';
            opacity = 1;
            zIndex = 40;
          } else {
            const yOffset = -depth * 18;
            const zOffset = -depth * 65;
            const rotX = -depth * 2.0;
            const scale = Math.max(0.86, 1 - depth * 0.045);
            transform = `translate3d(0, ${yOffset}px, ${zOffset}px) rotateX(${rotX}deg) scale(${scale})`;
            opacity = Math.max(0.25, 1 - depth * 0.25);
            zIndex = 30 + idx * 4 - Math.round(depth * 5);
          }
        }

        const isFront = activeIdx === idx;

        cardEl.style.transform = transform;
        cardEl.style.opacity = `${opacity}`;
        cardEl.style.zIndex = `${zIndex}`;
        cardEl.style.borderColor = isFront ? 'rgba(245, 158, 11, 0.45)' : 'rgba(255, 255, 255, 0.1)';
        cardEl.style.boxShadow = isFront
          ? '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 35px -5px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
          : '0 20px 45px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
        cardEl.style.pointerEvents = isFront || Math.abs(delta) < 0.8 ? 'auto' : 'none';
      });
    },
    [total, achievements]
  );

  // 144Hz Smooth Lerp Loop
  useEffect(() => {
    const updatePhysics = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.15;

      if (Math.abs(diff) < 0.0003) {
        currentProgressRef.current = targetProgressRef.current;
      }

      renderDeckFrame(currentProgressRef.current);

      if (Math.abs(targetProgressRef.current - currentProgressRef.current) > 0.0002) {
        animFrameRef.current = requestAnimationFrame(updatePhysics);
      } else {
        animFrameRef.current = null;
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const stickyTop = window.innerWidth >= 768 ? 90 : 80;
      const totalDistance = rect.height - windowHeight;

      if (totalDistance <= 0) return;

      const scrolled = stickyTop - rect.top;
      const rawProgress = scrolled / totalDistance;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);

      targetProgressRef.current = clamped;

      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(updatePhysics);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [renderDeckFrame]);

  // Jump to specific card by scrolling smoothly
  const jumpToCard = useCallback(
    (index: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const stickyTop = window.innerWidth >= 768 ? 90 : 80;
      const containerScrollTop = window.scrollY + rect.top - stickyTop;
      const totalDistance = rect.height - window.innerHeight;
      const targetProgress = index / (total - 1);
      const targetScrollY = containerScrollTop + targetProgress * totalDistance;

      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'smooth',
      });
    },
    [total]
  );

  const nextCard = useCallback(() => {
    const nextIdx = Math.min(activeIndexRef.current + 1, total - 1);
    jumpToCard(nextIdx);
  }, [total, jumpToCard]);

  const prevCard = useCallback(() => {
    const prevIdx = Math.max(activeIndexRef.current - 1, 0);
    jumpToCard(prevIdx);
  }, [jumpToCard]);

  // Touch Swipe Handlers for Mobile Gesture Support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextCard();
      } else {
        prevCard();
      }
    }
    touchStartY.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHoveredRef.current) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextCard();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard]);

  return (
    <div
      ref={containerRef}
      className="relative h-[280vh] sm:h-[320vh] w-full"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sticky Viewport Window */}
      <div className="sticky top-[80px] md:top-[90px] h-[calc(100dvh-100px)] min-h-[480px] sm:min-h-[520px] max-h-[720px] flex flex-col justify-between py-2.5 max-w-[1240px] mx-auto px-2 sm:px-4 select-none">
        
        {/* Top Interactive HUD Bar */}
        <div className="flex items-center justify-between gap-4 mb-2.5 pb-2.5 border-b border-white/[0.08] relative z-40 flex-wrap">
          
          {/* Active Card Badge & Category Tag */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/15 border border-accent-orange/35 text-accent-orange font-mono text-[0.70rem] sm:text-[0.75rem] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(249,115,22,0.15)]">
              <Trophy size={13} className="text-accent-orange" />
              <span ref={badgeTextRef}>HONOR 01 / 0{total}</span>
            </div>

            <span ref={categoryTextRef} className="font-mono text-[0.68rem] text-zinc-400 hidden md:inline uppercase tracking-wider">
              {achievements[0].category}
            </span>
          </div>

          {/* Center: Live Scroll Progress Track */}
          <div className="hidden lg:flex items-center gap-2 flex-1 max-w-[320px] mx-4">
            <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden p-0.5">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_10px_#fbbf24]"
                style={{ width: '6%' }}
              />
            </div>
            <span ref={progressTextRef} className="font-mono text-[0.66rem] text-zinc-400 font-bold shrink-0">
              0%
            </span>
          </div>

          {/* Right: Step Pills & Tactile Navigation Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Step Pills */}
            <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
              {achievements.map((_, i) => (
                <button
                  key={i}
                  ref={(el) => (pillsRef.current[i] = el)}
                  onClick={() => jumpToCard(i)}
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[0.66rem] font-black transition-all duration-200 cursor-pointer ${
                    i === 0
                      ? 'bg-gradient-to-r from-amber-400 to-accent-orange text-black shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-105'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                  aria-label={`Jump to achievement ${i + 1}`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>

            {/* Next / Prev Arrow Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={prevCard}
                className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 hover:border-amber-400/50 hover:bg-amber-400/15 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-md"
                aria-label="Previous Achievement"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextCard}
                className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 hover:border-amber-400/50 hover:bg-amber-400/15 text-zinc-300 hover:text-amber-400 flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-md"
                aria-label="Next Achievement"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* 3D Physical Stacking Cards Stage */}
        <div
          className="relative flex-1 w-full flex items-center justify-center"
          style={{ perspective: 1800 }}
        >
          {achievements.map((item, idx) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                onClick={() => jumpToCard(idx)}
                className="achievement-scroll-card absolute w-full max-w-[1180px] rounded-2xl sm:rounded-3xl border p-4 sm:p-5 md:py-5 md:px-7 lg:py-5 lg:px-8 bg-[#0c0d16] overflow-hidden cursor-pointer shadow-xl"
                style={{
                  willChange: 'transform, opacity',
                  transform: idx === 0 ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 110%, 80px) scale(0.92)',
                  opacity: idx === 0 ? 1 : 0,
                  zIndex: idx === 0 ? 40 : 10,
                  borderColor: idx === 0 ? 'rgba(245, 158, 11, 0.45)' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: idx === 0
                    ? '0 25px 70px -15px rgba(0, 0, 0, 0.95), 0 0 30px -5px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                    : '0 15px 35px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Active Golden Edge Sheen */}
                <div
                  className="absolute -top-px left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Giant Stylized Index Watermark */}
                <div
                  className="absolute top-1.5 right-4 font-display font-black text-[3.2rem] sm:text-[4.2rem] lg:text-[4.8rem] leading-none select-none pointer-events-none text-white/[0.03]"
                  aria-hidden="true"
                >
                  0{idx + 1}
                </div>

                {/* Card Content Layout */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_190px] gap-4 sm:gap-5 items-center relative z-10">
                  
                  {/* Left Column: Details & Highlights */}
                  <div>
                    {/* Header Chips */}
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[0.66rem] sm:text-[0.72rem] font-black px-3 py-0.5 rounded-full bg-accent-orange/15 border border-accent-orange/35 text-accent-orange uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(249,115,22,0.2)]">
                          <CheckCircle2 size={11} />
                          <span>{item.badge}</span>
                        </span>
                        <span className="font-mono text-[0.64rem] text-zinc-400 uppercase tracking-widest font-medium">
                          {item.category}
                        </span>
                        <span className="text-white/20 text-xs hidden sm:inline">•</span>
                        <span className="font-mono text-[0.64rem] text-amber-400 font-bold uppercase tracking-wider hidden sm:inline">
                          {item.yearTag}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-display text-[1.2rem] sm:text-[1.45rem] md:text-[1.65rem] font-black text-white leading-snug mb-1 tracking-[0.01em]">
                      {item.title}
                    </h4>

                    {/* Monospace Subtitle */}
                    <div className="font-mono text-[0.74rem] sm:text-[0.80rem] font-bold text-amber-400 tracking-wide uppercase mb-2 flex items-center gap-1.5">
                      <span className="text-accent-orange">▹</span>
                      <span>{item.subtitle}</span>
                    </div>

                    {/* Description */}
                    <p className="text-[0.84rem] sm:text-[0.90rem] text-zinc-300 leading-relaxed mb-2.5 font-normal max-w-[850px]">
                      {item.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="flex flex-col gap-1 sm:gap-1.5 pt-2 border-t border-white/[0.08] max-w-[850px]">
                      {item.highlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2 text-[0.80rem] sm:text-[0.85rem] text-zinc-300"
                        >
                          <span className="text-accent-orange text-xs mt-0.5 shrink-0">◆</span>
                          <span className="leading-snug">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Hologram Emblem Medallion */}
                  <div className="hidden md:flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-white/[0.025] border border-white/[0.08] text-center self-stretch justify-self-center w-full">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-400/20 to-accent-orange/20 border border-amber-400/35 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.25)] mb-2">
                      <IconComponent size={26} />
                    </div>
                    <div className="font-display text-[1.25rem] font-black text-white leading-none mb-1">
                      {item.statNumber}
                    </div>
                    <div className="font-mono text-[0.60rem] font-bold text-accent-orange tracking-wider uppercase mb-1.5">
                      {item.statLabel}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[0.60rem] font-mono text-zinc-400 pt-1.5 border-t border-white/[0.06] w-full justify-center">
                      <Star size={10} className="text-amber-400" fill="currentColor" />
                      <span>VERIFIED RECOGNITION</span>
                    </div>
                  </div>

                </div>

                {/* Footnote Status Bar */}
                <div className="pt-2 mt-2.5 border-t border-white/[0.06] flex items-center justify-between font-mono text-[0.64rem] text-zinc-500 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Layers size={11} className="text-amber-400" />
                    <span>SCROLL-DRIVEN 3D SHOWCASE</span>
                    <span className="text-zinc-400 hidden sm:inline">• SCROLL DOWN TO REVEAL NEXT HONOR</span>
                  </div>
                  <div className="flex items-center gap-1 text-accent-orange font-bold">
                    <Sparkles size={10} />
                    <span>ACHIEVEMENT 0{idx + 1} OF 0{total}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Scroll Helper Hint */}
        <div className="flex items-center justify-between font-mono text-[0.66rem] text-zinc-500 pt-2 px-1 border-t border-white/[0.04]">
          <div className="flex items-center gap-2">
            <MousePointer size={11} className="text-accent-orange animate-bounce" />
            <span>SCROLL DOWN TO PROGRESS • ARROW KEYS TO NAVIGATE</span>
          </div>
          <span ref={footerTextRef} className="text-zinc-400 font-bold">
            01 / 0{total} COMPLETED
          </span>
        </div>

      </div>
    </div>
  );
};

/* ========================================================================= */
/* MAIN EXPERIENCE & JOURNEY COMPONENT                                       */
/* ========================================================================= */
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
      periodTag: 'CURRENT DEGREE',
      icon: GraduationCap,
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
      icon: BookOpen,
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
      icon: Award,
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
      icon: Compass,
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

      // Usable beam lengths
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
          const year = row.querySelector<HTMLElement>('.timeline-row-year');

          const isReached = clamped >= offsetFraction - 0.03;

          if (node) {
            node.style.borderColor = isReached ? '#fbbf24' : 'rgba(255,255,255,0.2)';
            node.style.boxShadow = isReached
              ? '0 0 24px rgba(251,191,36,0.95), 0 0 45px rgba(249,115,22,0.5)'
              : 'none';
            node.style.transform = isReached ? 'scale(1.25)' : 'scale(1.0)';
          }
          if (year) {
            year.style.color = isReached ? '#fbbf24' : '#a1a1aa';
            year.style.textShadow = isReached ? '0 0 14px rgba(251,191,36,0.65)' : 'none';
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
      className="pt-20 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-16 relative bg-bg-dark overflow-x-clip selection:bg-accent-orange/30"
      id="journey"
    >
      {/* Cinematic Ambient Golden Bloom */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-orange/[0.04] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-amber-400/[0.025] rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div
          className="mb-12 md:mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(24px)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange font-mono text-[0.72rem] font-bold uppercase tracking-wider mb-3.5 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            <GraduationCap size={13} />
            <span>Academic &amp; Growth Timeline</span>
          </div>
          <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.9rem)] font-black text-white leading-tight uppercase tracking-[0.02em]">
            MY JOURNEY<span className="text-accent-orange">.</span>
          </h2>
          <p className="text-zinc-400 text-[0.92rem] sm:text-[1.02rem] max-w-[620px] mt-2 leading-relaxed">
            Scholastic distinctions, higher secondary science foundations, and active Computer Science engineering progression.
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
            <div className="space-y-12 lg:space-y-16">
              {timelineMilestones.map((item, idx) => (
                <div
                  key={item.id}
                  className="timeline-row-item grid grid-cols-[190px_1fr] lg:grid-cols-[210px_1fr] gap-0 items-start group relative"
                >
                  {/* Left Column: Date / Year Tag (Right-Aligned to the Golden Line) */}
                  <div className="pr-8 lg:pr-10 text-right pt-6 select-none">
                    <div className="timeline-row-year font-mono text-[0.95rem] lg:text-[1.05rem] font-black text-zinc-400 tracking-wider uppercase transition-all duration-300">
                      {item.year}
                    </div>
                    <div className="font-mono text-[0.70rem] lg:text-[0.74rem] font-extrabold text-accent-orange tracking-widest uppercase mt-1">
                      {item.periodTag}
                    </div>
                  </div>

                  {/* Glowing Circular Node (Centered over the Golden Line) */}
                  <div className="absolute left-[190px] lg:left-[210px] top-7 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                    <div className="timeline-node-circle w-7 h-7 rounded-full bg-[#08090f] border-2 border-white/20 transition-all duration-300 flex items-center justify-center shadow-lg">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
                    </div>
                  </div>

                  {/* Right Column: Ultra-Luxury Glass Milestone Card */}
                  <div className="pl-8 lg:pl-10">
                    <MilestoneCard item={item} index={idx} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline Layout (< 768px) */}
          <div className="block md:hidden relative">
            
            {/* Base Line */}
            <div
              className="absolute left-[14px] -translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/[0.08] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* Mobile Active Laser Beam (scaleY GPU) */}
            <div
              ref={mobileBeamRef}
              className="absolute left-[14px] -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_14px_rgba(245,158,11,0.85)] origin-top pointer-events-none z-10"
              style={{ transform: 'scaleY(0.04)', willChange: 'transform' }}
              aria-hidden="true"
            />

            {/* Mobile Photon Spark Particle */}
            <div
              ref={mobileSparkRef}
              className="absolute left-[14px] top-4 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_20px_#fbbf24] pointer-events-none z-20 transition-opacity duration-200"
              style={{ transform: 'translate3d(-50%, -50%, 0)', willChange: 'transform, opacity' }}
              aria-hidden="true"
            />

            {/* Mobile Milestones */}
            <div className="space-y-8">
              {timelineMilestones.map((item, idx) => (
                <div key={item.id} className="timeline-row-item relative pl-9 sm:pl-10">
                  
                  {/* Node */}
                  <div className="absolute left-[14px] -translate-x-1/2 top-6 z-20 flex items-center justify-center pointer-events-none">
                    <div className="timeline-node-circle w-5 h-5 rounded-full bg-[#08090f] border-2 border-white/20 flex items-center justify-center transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                  </div>

                  {/* Mobile Milestone Card */}
                  <MilestoneCard item={item} index={idx} />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* OTHER ACHIEVEMENTS: PRO-LEVEL SCROLL-DRIVEN 3D STACKED SHOWCASE           */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-accent-orange/15 border border-accent-orange/30 text-accent-orange flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]">
              <Trophy size={20} />
            </div>
            <div>
              <h3 className="font-display text-[1.35rem] md:text-[1.65rem] font-black text-white uppercase tracking-wide">
                OTHER ACHIEVEMENTS &amp; HONORS
              </h3>
              <p className="text-[0.86rem] text-zinc-400">
                National-level competitive sports, martial arts excellence, and premier institutional recognitions.
              </p>
            </div>
          </div>

          {/* Pro Scroll-Driven Stacking Cards */}
          <ScrollStackedHonorsDeck />
        </div>

      </div>
    </section>
  );
};
