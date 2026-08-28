import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Trophy,
  Medal,
  Shield,
  Star,
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Compass,
  Crown,
  ChevronLeft,
  ChevronRight,
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
/* ACHIEVEMENTS & HONORS DATA                                                */
/* ========================================================================= */
const achievementsData: AchievementCard[] = [
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

/* ========================================================================= */
/* ULTRA-LUXURY 3D SCROLL-STACKED HONORS DECK (DESKTOP: >= 768px)            */
/* ========================================================================= */
const DesktopScrollStackedHonorsDeck: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
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

  const achievements = achievementsData;
  const total = achievements.length;

  // Direct DOM Update Engine (0ms Reflow, Pure GPU Compositing)
  const renderDeckFrame = useCallback(
    (p: number) => {
      const virtualPos = p * (total - 1);
      const activeIdx = Math.min(Math.round(virtualPos), total - 1);
      activeIndexRef.current = activeIdx;

      // Update progress track & percentage at the upper side
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.max(p * 100, 6)}%`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.min(100, Math.max(0, Math.round(p * 100)))}%`;
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

      // Ultra-smooth quintic smootherstep curve (zero 1st & 2nd derivative discontinuity)
      const smootherstep = (t: number) => {
        const c = Math.max(0, Math.min(1, t));
        return c * c * c * (c * (c * 6 - 15) + 10);
      };

      // Direct GPU Transform & Opacity on each Card DOM Element (100% Zero-Repaint Compositor)
      cardsRef.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        const delta = idx - virtualPos;

        let transform = '';
        let opacity = 1;
        let zIndex = 20;

        if (delta > 0) {
          // Card below: graceful, silky float into view
          if (delta >= 1) {
            const extra = delta - 1;
            transform = `translate3d(0, ${105 + extra * 20}%, 45px) rotateX(7deg) scale(0.93)`;
            opacity = 0;
            zIndex = 10;
          } else {
            const ease = smootherstep(delta);
            const yPercent = ease * 100;
            const rotX = ease * 7.0;
            const scale = 0.94 + (1 - ease) * 0.06;
            const zOffset = 30 * (1 - ease);
            transform = `translate3d(0, ${yPercent}%, ${zOffset}px) rotateX(${rotX}deg) scale(${scale})`;
            opacity = Math.min(1, Math.max(0, (1 - ease) * 2.2));
            zIndex = 30 + idx * 4;
          }
        } else {
          // Card active or smoothly receding into background stack
          const depth = -delta;
          const easeDepth = smootherstep(Math.min(depth, 1.0)) + Math.max(0, depth - 1.0);
          const yOffset = -easeDepth * 14;
          const zOffset = -easeDepth * 45;
          const rotX = -easeDepth * 1.5;
          const scale = Math.max(0.88, 1 - easeDepth * 0.035);
          transform = `translate3d(0, ${yOffset}px, ${zOffset}px) rotateX(${rotX}deg) scale(${scale})`;
          opacity = Math.max(0.3, 1 - easeDepth * 0.22);
          zIndex = 30 + idx * 4 - Math.round(depth * 5);
        }

        const isFront = activeIdx === idx;

        cardEl.style.transform = transform;
        cardEl.style.opacity = `${opacity}`;
        cardEl.style.zIndex = `${zIndex}`;
        cardEl.style.borderColor = isFront ? 'rgba(245, 158, 11, 0.45)' : 'rgba(255, 255, 255, 0.1)';
        cardEl.style.pointerEvents = isFront ? 'auto' : 'none';
      });
    },
    [total, achievements]
  );

  // 144Hz Silky-Smooth Bidirectional Lerp Loop & Initial Mount Frame Execution
  useEffect(() => {
    // Immediate frame 0 paint on mount
    renderDeckFrame(0);

    const updatePhysics = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      // Balanced fluid momentum: smooth, soft, and responsive
      currentProgressRef.current += diff * 0.20;

      if (Math.abs(diff) < 0.0001) {
        currentProgressRef.current = targetProgressRef.current;
      }

      renderDeckFrame(currentProgressRef.current);

      if (Math.abs(targetProgressRef.current - currentProgressRef.current) > 0.0001) {
        animFrameRef.current = requestAnimationFrame(updatePhysics);
      } else {
        animFrameRef.current = null;
      }
    };

    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const stickyTop = 90;
      const stickyH = stickyRef.current?.offsetHeight || (windowHeight - 100);
      const totalDistance = rect.height - stickyH;

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

  // Jump to specific card smoothly
  const jumpToCard = useCallback(
    (index: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const windowHeight = window.innerHeight;
      const stickyH = stickyRef.current?.offsetHeight || (windowHeight - 100);
      const totalDistance = rect.height - stickyH;
      const targetProgress = index / (total - 1);
      const stickyTop = 90;
      const targetScrollY = containerTop + targetProgress * totalDistance - stickyTop;

      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'smooth',
      });
    },
    [total]
  );

  const nextCard = () => {
    const nextIdx = Math.min(activeIndexRef.current + 1, total - 1);
    jumpToCard(nextIdx);
  };

  const prevCard = () => {
    const prevIdx = Math.max(activeIndexRef.current - 1, 0);
    jumpToCard(prevIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          nextCard();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          prevCard();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[360vh] md:h-[400vh] w-full"
    >
      {/* Sticky Viewport Window */}
      <div
        ref={stickyRef}
        className="sticky top-[90px] h-[calc(100vh-100px)] min-h-[600px] max-h-[820px] flex flex-col justify-between py-3 max-w-[1180px] mx-auto px-2 sm:px-4 select-none"
      >
        {/* Top Interactive HUD Bar with Live Percentage Progress */}
        <div className="flex items-center justify-between gap-4 mb-2.5 pb-2.5 border-b border-white/[0.08] relative z-40 flex-wrap">
          {/* Active Card Badge & Category Tag */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/15 border border-accent-orange/35 text-accent-orange font-mono text-[0.75rem] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(249,115,22,0.15)]">
              <Trophy size={13} className="text-accent-orange" />
              <span ref={badgeTextRef}>HONOR 01 / 0{total}</span>
            </div>

            <span ref={categoryTextRef} className="font-mono text-[0.68rem] text-zinc-400 hidden md:inline uppercase tracking-wider">
              {achievements[0].category}
            </span>
          </div>

          {/* Center: Live Scroll Progress Track & Percentage Indicator */}
          <div className="flex items-center gap-2.5 flex-1 max-w-[340px] mx-4">
            <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden p-0.5 border border-white/[0.06]">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_12px_#fbbf24]"
                style={{ width: '6%' }}
              />
            </div>
            <div className="font-mono text-[0.78rem] text-amber-400 font-black shrink-0 px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/25 min-w-[44px] text-center shadow-[0_0_10px_rgba(251,191,36,0.15)]">
              <span ref={progressTextRef}>0%</span>
            </div>
          </div>

          {/* Right: Step Pills & Tactile Navigation Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Step Pills */}
            <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
              {achievements.map((_, i) => (
                <button
                  key={i}
                  ref={(el) => {
                    pillsRef.current[i] = el;
                  }}
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
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onClick={() => jumpToCard(idx)}
                className="achievement-scroll-card absolute w-full max-w-[1180px] rounded-3xl border py-6 px-9 bg-[#0c0d16] overflow-hidden cursor-pointer"
                style={{
                  willChange: 'transform, opacity',
                  transform: idx === 0 ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 110%, 80px) scale(0.92)',
                  opacity: idx === 0 ? 1 : 0,
                  zIndex: idx === 0 ? 40 : 10,
                  borderColor: idx === 0 ? 'rgba(245, 158, 11, 0.45)' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: idx === 0
                    ? '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 35px -5px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                    : '0 20px 45px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Active Golden Edge Sheen */}
                <div
                  className="absolute -top-px left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Giant Stylized Index Watermark */}
                <div
                  className="absolute top-2 right-4 font-display font-black text-[5.5rem] leading-none select-none pointer-events-none text-white/[0.03]"
                  aria-hidden="true"
                >
                  0{idx + 1}
                </div>

                {/* Card Content Layout: 2 Columns */}
                <div className="grid grid-cols-[1fr_210px] gap-6 items-center relative z-10">
                  {/* Left Column: Details & Highlights */}
                  <div>
                    {/* Header Chips */}
                    <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                      <span className="font-mono text-[0.74rem] font-black px-3.5 py-1 rounded-full bg-accent-orange/15 border border-accent-orange/35 text-accent-orange uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(249,115,22,0.2)]">
                        <CheckCircle2 size={12} />
                        <span>{item.badge}</span>
                      </span>
                      <span className="font-mono text-[0.66rem] text-zinc-400 uppercase tracking-widest font-medium">
                        {item.category}
                      </span>
                      <span className="text-white/20 text-xs">•</span>
                      <span className="font-mono text-[0.66rem] text-amber-400 font-bold uppercase tracking-wider">
                        {item.yearTag}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-display text-[1.75rem] font-black text-white leading-snug mb-1 tracking-[0.01em]">
                      {item.title}
                    </h4>

                    {/* Monospace Subtitle */}
                    <div className="font-mono text-[0.84rem] font-bold text-amber-400 tracking-wide uppercase mb-2.5 flex items-center gap-1.5">
                      <span className="text-accent-orange">▹</span>
                      <span>{item.subtitle}</span>
                    </div>

                    {/* Description */}
                    <p className="text-[0.93rem] text-zinc-300 leading-relaxed mb-3.5 font-normal max-w-[850px]">
                      {item.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="flex flex-col gap-2 pt-2.5 border-t border-white/[0.08] max-w-[850px]">
                      {item.highlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2.5 text-[0.88rem] text-zinc-300"
                        >
                          <span className="text-accent-orange text-xs mt-0.5 shrink-0">◆</span>
                          <span className="leading-snug">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Hologram Emblem Medallion */}
                  <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08] text-center self-stretch justify-self-center w-full">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-accent-orange/20 border border-amber-400/35 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.25)] mb-2.5">
                      <IconComponent size={28} />
                    </div>
                    <div className="font-display text-[1.35rem] font-black text-white leading-none mb-1">
                      {item.statNumber}
                    </div>
                    <div className="font-mono text-[0.62rem] font-bold text-accent-orange tracking-wider uppercase mb-1.5">
                      {item.statLabel}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[0.62rem] font-mono text-zinc-400 pt-1.5 border-t border-white/[0.06] w-full justify-center">
                      <Star size={11} className="text-amber-400" fill="currentColor" />
                      <span>VERIFIED RECOGNITION</span>
                    </div>
                  </div>
                </div>

                {/* Footnote Status Bar */}
                <div className="pt-2.5 mt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[0.66rem] text-zinc-500 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles size={11} className="text-amber-400" />
                    <span>SCHOLASTIC &amp; SPORTS RECOGNITION</span>
                  </div>
                  <div className="flex items-center gap-1 text-accent-orange font-bold">
                    <span>HONOR 0{idx + 1} OF 05</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Hint Bar */}
        <div className="flex items-center justify-between text-zinc-400 text-xs font-mono pt-2 border-t border-white/[0.08] relative z-40">
          <div className="flex items-center gap-2">
            <MousePointer size={12} className="text-accent-orange animate-bounce" />
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
/* ULTRA-LUXURY INTERACTIVE HONORS SHOWCASE (MOBILE: < 768px)                */
/* Completely natural document flow: zero scroll-trapping up or down         */
/* ========================================================================= */
const MobileHonorsDeck: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const achievements = achievementsData;
  const total = achievements.length;
  const progressPercent = Math.round(((activeIdx + 1) / total) * 100);

  const nextCard = () => {
    setActiveIdx((prev) => Math.min(prev + 1, total - 1));
  };

  const prevCard = () => {
    setActiveIdx((prev) => Math.max(prev - 1, 0));
  };

  // Horizontal-only swipe detection (never interferes with vertical page scrolling)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only swipe cards horizontally when user intentionally drags sideways (> 35px, and horizontal > 1.3x vertical)
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
      if (diffX > 0) {
        nextCard();
      } else {
        prevCard();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="w-full flex flex-col gap-3 py-2 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top HUD Controls: Matching Desktop Architecture */}
      <div className="flex flex-col gap-2 pb-2.5 border-b border-white/[0.08]">
        {/* Row 1: Active Badge, Category, and Percentage */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-orange/15 border border-accent-orange/35 text-accent-orange font-mono text-[0.70rem] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(249,115,22,0.15)]">
              <Trophy size={13} className="text-accent-orange" />
              <span>HONOR 0{activeIdx + 1} / 0{total}</span>
            </div>

            <span className="font-mono text-[0.66rem] text-zinc-400 uppercase tracking-wider truncate max-w-[140px] sm:max-w-[200px]">
              {achievements[activeIdx].category}
            </span>
          </div>

          {/* Top Progress Percentage Badge */}
          <div className="font-mono text-[0.72rem] text-amber-400 font-black px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/25 min-w-[38px] text-center shadow-[0_0_8px_rgba(251,191,36,0.15)]">
            {progressPercent}%
          </div>
        </div>

        {/* Row 2: Live Progress Track + Step Pills + Navigation Arrows */}
        <div className="flex items-center justify-between gap-2">
          {/* Progress Track */}
          <div className="flex-1 max-w-[130px] sm:max-w-[200px] h-1.5 bg-white/[0.08] rounded-full overflow-hidden p-0.5 border border-white/[0.06]">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_8px_#fbbf24] transition-all duration-300"
              style={{ width: `${Math.max(progressPercent, 12)}%` }}
            />
          </div>

          {/* Right Controls: Pills & Arrows */}
          <div className="flex items-center gap-1.5">
            {/* Step Pills */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
              {achievements.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`px-2 py-0.5 rounded-full font-mono text-[0.66rem] font-black transition-all duration-300 cursor-pointer ${
                    i === activeIdx
                      ? 'bg-gradient-to-r from-amber-400 to-accent-orange text-black shadow-[0_0_12px_rgba(251,191,36,0.6)] scale-105'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-label={`View honor 0${i + 1}`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevCard}
                disabled={activeIdx === 0}
                className={`w-7 h-7 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center transition-all duration-200 active:scale-90 shadow-md ${
                  activeIdx === 0
                    ? 'opacity-30 text-zinc-600 cursor-not-allowed'
                    : 'text-zinc-300 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/15 cursor-pointer'
                }`}
                aria-label="Previous Honor"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button"
                onClick={nextCard}
                disabled={activeIdx === total - 1}
                className={`w-7 h-7 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center transition-all duration-200 active:scale-90 shadow-md ${
                  activeIdx === total - 1
                    ? 'opacity-30 text-zinc-600 cursor-not-allowed'
                    : 'text-zinc-300 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/15 cursor-pointer'
                }`}
                aria-label="Next Honor"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Physical Stacking Cards Stage (All 5 Cards Rendered Concurrently with Depth) */}
      <div
        className="relative w-full min-h-[500px] sm:min-h-[460px] flex items-center justify-center mt-1"
        style={{ perspective: 1200 }}
      >
        {achievements.map((item, idx) => {
          const IconComponent = item.icon;
          const delta = idx - activeIdx;
          const isFront = delta === 0;

          let transform = '';
          let opacity = 0;
          let zIndex = 5;

          if (delta === 0) {
            // Front active card: full prominence & crisp 3D elevation
            transform = 'translate3d(0, 0px, 0px) scale(1) rotateX(0deg)';
            opacity = 1;
            zIndex = 30;
          } else if (delta === 1) {
            // Next card: peeking elegantly below and behind in 3D
            transform = 'translate3d(0, 14px, -35px) scale(0.95) rotateX(3.5deg)';
            opacity = 0.45;
            zIndex = 20;
          } else if (delta === 2) {
            // Second next card: subtle deep stack contour
            transform = 'translate3d(0, 26px, -70px) scale(0.90) rotateX(6.5deg)';
            opacity = 0.18;
            zIndex = 10;
          } else if (delta === -1) {
            // Previous card: smoothly receding upward into history
            transform = 'translate3d(0, -14px, -35px) scale(0.95) rotateX(-3.5deg)';
            opacity = 0.35;
            zIndex = 20;
          } else if (delta < -1) {
            // Deep previous cards
            transform = 'translate3d(0, -26px, -70px) scale(0.90) rotateX(-6.5deg)';
            opacity = 0;
            zIndex = 5;
          } else {
            // Far future cards
            transform = 'translate3d(0, 36px, -100px) scale(0.85) rotateX(9deg)';
            opacity = 0;
            zIndex = 5;
          }

          return (
            <div
              key={item.id}
              onClick={() => {
                if (!isFront) setActiveIdx(idx);
              }}
              className={`absolute top-0 left-0 w-full rounded-2xl border p-5 sm:p-6 bg-[#0c0d16]/95 backdrop-blur-xl overflow-hidden select-none transition-all duration-500 ease-out ${
                isFront ? 'cursor-default' : 'cursor-pointer'
              }`}
              style={{
                transform,
                opacity,
                zIndex,
                borderColor: isFront ? 'rgba(245, 158, 11, 0.45)' : 'rgba(255, 255, 255, 0.08)',
                boxShadow: isFront
                  ? '0 20px 50px rgba(0,0,0,0.85), 0 0 30px rgba(245,158,11,0.18), inset 0 1px 0 rgba(255,255,255,0.15)'
                  : '0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                pointerEvents: isFront || Math.abs(delta) <= 1 ? 'auto' : 'none',
                willChange: 'transform, opacity',
              }}
            >
              {/* Top Golden Active Edge Sheen */}
              <div
                className={`absolute -top-px left-8 right-8 h-[2px] transition-opacity duration-500 pointer-events-none ${
                  isFront
                    ? 'bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-100'
                    : 'opacity-0'
                }`}
                aria-hidden="true"
              />

              {/* Giant Watermark Index Number */}
              <div
                className="absolute top-2 right-4 font-display font-black text-[3.8rem] leading-none select-none pointer-events-none text-white/[0.03]"
                aria-hidden="true"
              >
                0{idx + 1}
              </div>

              {/* Header Tags */}
              <div className="flex items-center gap-2 mb-3 flex-wrap relative z-10">
                <span className="font-mono text-[0.68rem] font-black px-3 py-1 rounded-full bg-accent-orange/15 border border-accent-orange/35 text-accent-orange uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(249,115,22,0.2)]">
                  <CheckCircle2 size={12} />
                  <span>{item.badge}</span>
                </span>
                <span className="font-mono text-[0.66rem] text-zinc-400 uppercase tracking-widest font-medium">
                  {item.category}
                </span>
                <span className="text-white/20 text-xs">•</span>
                <span className="font-mono text-[0.66rem] text-amber-400 font-bold uppercase tracking-wider">
                  {item.yearTag}
                </span>
              </div>

              {/* Card Title */}
              <h4 className="font-display text-[1.22rem] sm:text-[1.4rem] font-black text-white leading-snug mb-1 tracking-[0.01em] relative z-10">
                {item.title}
              </h4>

              {/* Subtitle */}
              <div className="font-mono text-[0.76rem] font-bold text-amber-400 tracking-wide uppercase mb-3 flex items-center gap-1.5 relative z-10">
                <span className="text-accent-orange">▹</span>
                <span>{item.subtitle}</span>
              </div>

              {/* Description */}
              <p className="text-[0.88rem] text-zinc-300 leading-relaxed mb-4 font-normal relative z-10">
                {item.description}
              </p>

              {/* Bullet Highlights */}
              <div className="flex flex-col gap-2 pt-3 border-t border-white/[0.08] relative z-10 mb-4">
                {item.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-start gap-2.5 text-[0.82rem] text-zinc-300"
                  >
                    <span className="text-accent-orange text-xs mt-0.5 shrink-0">◆</span>
                    <span className="leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Verified Badge / Emblem Banner */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.2)] shrink-0">
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <div className="font-display text-[1.1rem] font-black text-white leading-tight">
                      {item.statNumber}
                    </div>
                    <div className="font-mono text-[0.62rem] font-bold text-accent-orange tracking-wider uppercase">
                      {item.statLabel}
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 text-[0.62rem] font-mono text-zinc-400 shrink-0">
                  <Star size={11} className="text-amber-400" fill="currentColor" />
                  <span>VERIFIED RECOGNITION</span>
                </div>
              </div>

              {/* Card Footnote */}
              <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[0.66rem] text-zinc-500 relative z-10">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={11} className="text-amber-400" />
                  <span>SCHOLASTIC &amp; SPORTS RECOGNITION</span>
                </div>
                <div className="text-accent-orange font-bold">
                  HONOR 0{idx + 1} OF 0{total}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-between text-zinc-400 text-[0.72rem] font-mono pt-1">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <span className="text-accent-orange">↔</span>
          <span>SWIPE HORIZONTALLY OR TAP PILLS TO BROWSE</span>
        </div>
        <span className="text-amber-400 font-bold">
          0{activeIdx + 1} / 0{total} COMPLETED
        </span>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* COMPOSITE HONORS DECK (DISPATCHES DESKTOP VS MOBILE SHOWCASE)             */
/* ========================================================================= */
const ScrollStackedHonorsDeck: React.FC = () => {
  return (
    <>
      {/* Desktop (>= 768px): 3D Physical Scroll-Stacked Deck */}
      <div className="hidden md:block">
        <DesktopScrollStackedHonorsDeck />
      </div>

      {/* Mobile (< 768px): Ultra-Luxury Interactive Showcase with zero scroll-trapping */}
      <div className="block md:hidden">
        <MobileHonorsDeck />
      </div>
    </>
  );
};

/* ========================================================================= */
/* MAIN EXPERIENCE & JOURNEY COMPONENT                                       */
/* ========================================================================= */
export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const desktopBeamRef = useRef<HTMLDivElement | null>(null);
  const desktopSparkRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
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

  // 144Hz Synchronized Laser Beam & Milestone Particle Engine (0ms Reflow)
  useEffect(() => {
    let animId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    interface LayoutData {
      isDesktop: boolean;
      topY: number;
      bottomY: number;
      trackHeight: number;
      nodeFractions: number[];
    }

    let layoutData: LayoutData = {
      isDesktop: true,
      topY: 0,
      bottomY: 0,
      trackHeight: 1,
      nodeFractions: [0, 0.33, 0.66, 1],
    };

    const measureLayout = () => {
      if (!timelineRef.current) return;
      const isDesktop = window.innerWidth >= 768;

      const rowSelector = isDesktop ? '.timeline-row-desktop' : '.timeline-row-mobile';
      const rows = Array.from(timelineRef.current.querySelectorAll<HTMLElement>(rowSelector));
      if (rows.length === 0) return;

      const containerRect = timelineRef.current.getBoundingClientRect();

      // Measure vertical center of each milestone node relative to the container
      const nodeYs = rows.map((r) => {
        const nw = r.querySelector<HTMLElement>('.timeline-node-wrap');
        if (nw) {
          const rect = nw.getBoundingClientRect();
          if (rect.height > 0) {
            return rect.top + rect.height / 2 - containerRect.top;
          }
        }
        return r.offsetTop + (isDesktop ? 36 : 32);
      });

      const topY = nodeYs[0] ?? (isDesktop ? 36 : 32);
      const bottomY = nodeYs[nodeYs.length - 1] ?? (topY + 600);
      const trackHeight = Math.max(bottomY - topY, 1);

      const nodeFractions = nodeYs.map((y) => Math.min(Math.max((y - topY) / trackHeight, 0), 1));

      layoutData = {
        isDesktop,
        topY,
        bottomY,
        trackHeight,
        nodeFractions,
      };

      // Set Track and Beam dimensions
      if (isDesktop) {
        if (desktopTrackRef.current) {
          desktopTrackRef.current.style.top = `${topY}px`;
          desktopTrackRef.current.style.height = `${trackHeight}px`;
        }
        if (desktopBeamRef.current) {
          desktopBeamRef.current.style.top = `${topY}px`;
          desktopBeamRef.current.style.height = `${trackHeight}px`;
        }
        if (desktopSparkRef.current) {
          desktopSparkRef.current.style.top = `${topY}px`;
        }
      } else {
        if (mobileTrackRef.current) {
          mobileTrackRef.current.style.top = `${topY}px`;
          mobileTrackRef.current.style.height = `${trackHeight}px`;
        }
        if (mobileBeamRef.current) {
          mobileBeamRef.current.style.top = `${topY}px`;
          mobileBeamRef.current.style.height = `${trackHeight}px`;
        }
        if (mobileSparkRef.current) {
          mobileSparkRef.current.style.top = `${topY}px`;
        }
      }
    };

    const updateDOM = () => {
      currentProgress += (targetProgress - currentProgress) * 0.28;
      if (Math.abs(targetProgress - currentProgress) < 0.0005) {
        currentProgress = targetProgress;
      }

      const clamped = Math.min(Math.max(currentProgress, 0), 1);
      const { isDesktop, trackHeight, nodeFractions } = layoutData;

      // 1. Update Laser Beam & Moving Spark
      if (isDesktop) {
        if (desktopBeamRef.current) {
          desktopBeamRef.current.style.transform = `scaleY(${clamped})`;
        }
        if (desktopSparkRef.current) {
          const sparkY = trackHeight * clamped;
          desktopSparkRef.current.style.transform = `translate3d(-50%, calc(${sparkY}px - 50%), 0)`;
          desktopSparkRef.current.style.opacity = currentProgress > -0.02 ? '1' : '0.4';
        }
      } else {
        if (mobileBeamRef.current) {
          mobileBeamRef.current.style.transform = `scaleY(${clamped})`;
        }
        if (mobileSparkRef.current) {
          const sparkY = trackHeight * clamped;
          mobileSparkRef.current.style.transform = `translate3d(-50%, calc(${sparkY}px - 50%), 0)`;
          mobileSparkRef.current.style.opacity = currentProgress > -0.02 ? '1' : '0.4';
        }
      }

      // 2. Update Milestone Node and Year states
      if (timelineRef.current && nodeFractions.length > 0) {
        const rowSelector = isDesktop ? '.timeline-row-desktop' : '.timeline-row-mobile';
        const rows = timelineRef.current.querySelectorAll<HTMLElement>(rowSelector);

        rows.forEach((row, i) => {
          const frac = nodeFractions[i] ?? (i / Math.max(rows.length - 1, 1));
          const nodeCircle = row.querySelector<HTMLElement>('.timeline-node-circle');
          const nodeCore = row.querySelector<HTMLElement>('.timeline-node-core');
          const nodeGlow = row.querySelector<HTMLElement>('.timeline-node-glow');
          const year = row.querySelector<HTMLElement>('.timeline-row-year');

          // Node is active if clamped progress has reached or passed it
          const isReached = clamped >= frac - 0.015;

          if (nodeCircle) {
            if (isReached) {
              nodeCircle.style.borderColor = '#fbbf24';
              nodeCircle.style.backgroundColor = '#0d0e1a';
              nodeCircle.style.boxShadow = '0 0 20px rgba(251,191,36,0.85), 0 0 35px rgba(249,115,22,0.45)';
              nodeCircle.style.transform = 'scale(1.18)';
            } else {
              nodeCircle.style.borderColor = 'rgba(255,255,255,0.2)';
              nodeCircle.style.backgroundColor = '#0a0b12';
              nodeCircle.style.boxShadow = 'none';
              nodeCircle.style.transform = 'scale(1.0)';
            }
          }

          if (nodeCore) {
            if (isReached) {
              nodeCore.style.backgroundColor = '#fbbf24';
              nodeCore.style.boxShadow = '0 0 10px #fbbf24';
              nodeCore.style.transform = 'scale(1.25)';
            } else {
              nodeCore.style.backgroundColor = '#52525b';
              nodeCore.style.boxShadow = 'none';
              nodeCore.style.transform = 'scale(1.0)';
            }
          }

          if (nodeGlow) {
            nodeGlow.style.backgroundColor = isReached ? 'rgba(251,191,36,0.25)' : 'transparent';
          }

          if (year) {
            if (isReached) {
              year.style.color = '#fbbf24';
              year.style.textShadow = '0 0 14px rgba(251,191,36,0.6)';
            } else {
              year.style.color = '#71717a';
              year.style.textShadow = 'none';
            }
          }
        });
      }

      if (Math.abs(targetProgress - currentProgress) > 0.0005) {
        animId = requestAnimationFrame(updateDOM);
      }
    };

    const handleScroll = () => {
      if (!timelineRef.current) return;
      const isDesktop = window.innerWidth >= 768;
      const rowSelector = isDesktop ? '.timeline-row-desktop' : '.timeline-row-mobile';
      const rows = timelineRef.current.querySelectorAll<HTMLElement>(rowSelector);
      if (rows.length === 0) return;

      const firstNode = rows[0].querySelector<HTMLElement>('.timeline-node-wrap') || rows[0];
      const lastNode = rows[rows.length - 1].querySelector<HTMLElement>('.timeline-node-wrap') || rows[rows.length - 1];

      const firstRect = firstNode.getBoundingClientRect();
      const lastRect = lastNode.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Focus trigger line: at 65% of viewport height
      const focusLine = windowHeight * 0.65;
      const totalSpan = lastRect.top - firstRect.top;

      if (totalSpan > 0) {
        const scrolled = focusLine - firstRect.top;
        const progress = scrolled / totalSpan;
        targetProgress = Math.min(Math.max(progress, 0), 1);
      }

      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updateDOM);
    };

    const resizeObserver = new ResizeObserver(() => {
      measureLayout();
      handleScroll();
    });

    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      measureLayout();
      handleScroll();
    }, { passive: true });

    measureLayout();
    handleScroll();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-20 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-16 relative bg-bg-dark overflow-visible selection:bg-accent-orange/30"
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
          className="mb-12 md:mb-16 transition-opacity duration-600 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
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
            
            {/* 1. Base Subtle Guide Line (From First Node to Last Node) */}
            <div
              ref={desktopTrackRef}
              className="absolute left-[190px] lg:left-[210px] -translate-x-1/2 w-[2px] bg-white/[0.08] rounded-full pointer-events-none"
              style={{ top: '36px', height: 'calc(100% - 72px)' }}
              aria-hidden="true"
            />

            {/* 2. Active Glowing Golden Laser Beam (GPU-Accelerated scaleY) */}
            <div
              ref={desktopBeamRef}
              className="absolute left-[190px] lg:left-[210px] -translate-x-1/2 w-[2.5px] bg-gradient-to-b from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.9),0_0_30px_rgba(249,115,22,0.5)] origin-top pointer-events-none z-10"
              style={{ top: '36px', height: 'calc(100% - 72px)', transform: 'scaleY(0)', willChange: 'transform' }}
              aria-hidden="true"
            />

            {/* 3. Leading Radiant Photon Spark Particle */}
            <div
              ref={desktopSparkRef}
              className="absolute left-[190px] lg:left-[210px] w-4 h-4 rounded-full pointer-events-none z-30 transition-opacity duration-200"
              style={{ top: '36px', transform: 'translate3d(-50%, -50%, 0)', willChange: 'transform, opacity' }}
              aria-hidden="true"
            >
              <div className="w-full h-full rounded-full bg-white border-2 border-amber-300 shadow-[0_0_12px_#ffffff,0_0_24px_#fbbf24,0_0_40px_#f97316]" />
              <div className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
            </div>

            {/* Timeline Milestone Rows */}
            <div className="space-y-12 lg:space-y-16">
              {timelineMilestones.map((item, idx) => (
                <div
                  key={item.id}
                  className="timeline-row-desktop grid grid-cols-[190px_1fr] lg:grid-cols-[210px_1fr] gap-0 items-start group relative"
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

                  {/* Glowing Circular Node (Centered over the Line, vertically aligned with header) */}
                  <div className="timeline-node-wrap absolute left-[190px] lg:left-[210px] top-9 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
                    <div className="timeline-node-circle relative w-7 h-7 rounded-full bg-[#0a0b12] border-2 border-white/20 transition-all duration-300 flex items-center justify-center shadow-lg">
                      <div className="timeline-node-core w-2.5 h-2.5 rounded-full bg-zinc-600 transition-all duration-300" />
                      <div className="timeline-node-glow absolute inset-0 rounded-full bg-amber-400/0 blur-sm transition-all duration-300 pointer-events-none" />
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
              ref={mobileTrackRef}
              className="absolute left-[16px] -translate-x-1/2 w-[2px] bg-white/[0.08] rounded-full pointer-events-none"
              style={{ top: '32px', height: 'calc(100% - 64px)' }}
              aria-hidden="true"
            />

            {/* Mobile Active Laser Beam (scaleY GPU) */}
            <div
              ref={mobileBeamRef}
              className="absolute left-[16px] -translate-x-1/2 w-[2px] bg-gradient-to-b from-amber-400 via-accent-orange to-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.85)] origin-top pointer-events-none z-10"
              style={{ top: '32px', height: 'calc(100% - 64px)', transform: 'scaleY(0)', willChange: 'transform' }}
              aria-hidden="true"
            />

            {/* Mobile Photon Spark Particle */}
            <div
              ref={mobileSparkRef}
              className="absolute left-[16px] w-3.5 h-3.5 rounded-full pointer-events-none z-30 transition-opacity duration-200"
              style={{ top: '32px', transform: 'translate3d(-50%, -50%, 0)', willChange: 'transform, opacity' }}
              aria-hidden="true"
            >
              <div className="w-full h-full rounded-full bg-white border-2 border-amber-300 shadow-[0_0_10px_#ffffff,0_0_20px_#fbbf24,0_0_30px_#f97316]" />
              <div className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
            </div>

            {/* Mobile Milestones */}
            <div className="space-y-8">
              {timelineMilestones.map((item, idx) => (
                <div key={item.id} className="timeline-row-mobile relative pl-9 sm:pl-10">
                  
                  {/* Node */}
                  <div className="timeline-node-wrap absolute left-[16px] top-8 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
                    <div className="timeline-node-circle relative w-5 h-5 rounded-full bg-[#0a0b12] border-2 border-white/20 flex items-center justify-center transition-all duration-300 shadow-md">
                      <div className="timeline-node-core w-1.5 h-1.5 rounded-full bg-zinc-600 transition-all duration-300" />
                      <div className="timeline-node-glow absolute inset-0 rounded-full bg-amber-400/0 blur-sm transition-all duration-300 pointer-events-none" />
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
        {/* OTHER ACHIEVEMENTS: 3D SCROLL-DRIVEN STACKING DECK                        */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="flex items-center gap-3.5 mb-8 max-w-[1180px] mx-auto">
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

          {/* 3D Physical Stacking Deck with Upper Percentage Progress */}
          <ScrollStackedHonorsDeck />
        </div>

      </div>
    </section>
  );
};
