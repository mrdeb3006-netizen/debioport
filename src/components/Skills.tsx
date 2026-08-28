import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Coffee,
  Cpu,
  Brain,
  GitBranch,
  Github,
  Palette,
  Camera,
  Crown,
  Users,
  HeartHandshake,
  Database,
  BookOpen,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface SkillsProps {
  activeFilter: string | null;
  onSelectFilter: (filterKey: string | null) => void;
}

export const Skills: React.FC<SkillsProps> = ({ activeFilter, onSelectFilter }) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Exact 13 skills requested by user with designated Lucide icons and floating physics rhythms
  const skillsList = [
    { label: 'Python', filterKey: 'python', icon: Code2, floatClass: 'animate-float-slow', delay: '0s' },
    { label: 'Java', filterKey: 'java', icon: Coffee, floatClass: 'animate-float-med', delay: '0.4s' },
    { label: 'DSA', filterKey: 'dsa', icon: Cpu, floatClass: 'animate-float-fast', delay: '0.8s' },
    { label: 'Problem Solving', filterKey: 'problem solving', icon: Brain, floatClass: 'animate-float-slow', delay: '0.2s' },
    { label: 'Git', filterKey: 'git', icon: GitBranch, floatClass: 'animate-float-med', delay: '0.6s' },
    { label: 'GitHub', filterKey: 'github', icon: Github, floatClass: 'animate-float-fast', delay: '1s' },
    { label: 'Research & Data', filterKey: 'research & data', icon: Database, floatClass: 'animate-float-slow', delay: '0.3s' },
    { label: 'Canva', filterKey: 'canva', icon: Palette, floatClass: 'animate-float-med', delay: '0.5s' },
    { label: 'Photography', filterKey: 'photography', icon: Camera, floatClass: 'animate-float-fast', delay: '0.9s' },
    { label: 'Philosophy', filterKey: 'philosophy', icon: BookOpen, floatClass: 'animate-float-slow', delay: '0.7s' },
    { label: 'Leadership', filterKey: 'leadership', icon: Crown, floatClass: 'animate-float-med', delay: '0.3s' },
    { label: 'Team Management', filterKey: 'team management', icon: Users, floatClass: 'animate-float-fast', delay: '0.7s' },
    { label: 'Good Cooperator', filterKey: 'cooperator', icon: HeartHandshake, floatClass: 'animate-float-slow', delay: '1.1s' },
  ];

  // Dynamic recurring entrance observer on scroll down or up (seamlessly replays on viewport re-entry)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTagClick = (filterKey: string) => {
    if (activeFilter === filterKey) {
      onSelectFilter(null);
    } else {
      onSelectFilter(filterKey);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const activeSkillObj = skillsList.find((s) => s.filterKey === activeFilter);

  return (
    <section
      ref={sectionRef}
      className="pt-8 md:pt-12 pb-8 md:pb-12 px-6 md:px-12 lg:px-16 relative bg-bg-dark overflow-hidden selection:bg-accent-orange/30"
      id="skills"
    >
      {/* Cinematic Ambient Glow with Dynamic Breathing Reveal */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent-orange/[0.045] rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: isVisible ? 1 : 0 }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* Section Header with Fluid 3D Kinetic Reveal */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange font-mono text-[0.70rem] font-bold uppercase tracking-wider mb-2.5 shadow-[0_0_12px_rgba(249,115,22,0.15)]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(-16px) scale(0.92)',
                filter: isVisible ? 'blur(0px)' : 'blur(4px)',
                transition: isVisible
                  ? 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, filter 0.5s ease-out 0.05s'
                  : 'opacity 0.25s ease-out, transform 0.25s ease-out, filter 0.25s ease-out',
              }}
            >
              <Sparkles size={12} className="animate-spin text-accent-orange" style={{ animationDuration: '6s' }} />
              <span>Core Stack &amp; Abilities</span>
            </div>

            {/* Main Heading */}
            <h2
              className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-black text-white leading-[1.15] uppercase tracking-[0.02em]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0px) scale(1) rotateX(0deg)' : 'translateY(28px) scale(0.96) rotateX(12deg)',
                filter: isVisible ? 'blur(0px)' : 'blur(6px)',
                transition: isVisible
                  ? 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.12s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.12s, filter 0.6s ease-out 0.12s'
                  : 'opacity 0.25s ease-out, transform 0.25s ease-out, filter 0.25s ease-out',
                perspective: 1000,
              }}
            >
              SKILLS<span className="text-accent-orange">.</span>
            </h2>
          </div>

          {/* Ability Chip on the Right */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[0.8rem] font-mono text-text-secondary self-start md:self-auto shadow-sm"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0px) scale(1)' : 'translateX(24px) scale(0.92)',
              filter: isVisible ? 'blur(0px)' : 'blur(4px)',
              transition: isVisible
                ? 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.18s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.18s, filter 0.6s ease-out 0.18s'
                : 'opacity 0.25s ease-out, transform 0.25s ease-out, filter 0.25s ease-out',
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-orange animate-pulse" />
            <span>13 CORE CAPABILITIES • INTERACTIVE FILTER</span>
          </div>
        </div>

        {/* Interactive Floating Skills Constellation Canvas with 3D Expansion & Glass Reveal */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-3xl p-6 md:p-12 border border-white/[0.08] bg-[#0c0d16]/85 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? 'translateY(0px) scale(1) rotateX(0deg)'
              : 'translateY(36px) scale(0.96) rotateX(4deg)',
            filter: isVisible ? 'blur(0px)' : 'blur(10px)',
            transition: isVisible
              ? 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, filter 0.75s ease-out 0.1s'
              : 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out',
            perspective: 1400,
          }}
        >
          {/* Subtle Ambient Grid Watermark */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

          {/* Top Golden Edge Prismatic Sheen */}
          <div
            className="absolute -top-px left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Futuristic Cyber Corner Reticles */}
          <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-400/40 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-400/40 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-400/40 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-400/40 pointer-events-none" />

          {/* Interactive Proximity Spotlight */}
          {mousePos && (
            <div
              className="absolute pointer-events-none transition-opacity duration-300 w-[340px] h-[340px] rounded-full blur-3xl opacity-20 bg-amber-400 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
              }}
            />
          )}

          {/* Floating Pill Cloud with Staggered 3D Spring Appearance Wave */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3.5 md:gap-5 max-w-[1000px] mx-auto py-4 md:py-8">
            {skillsList.map((skill, idx) => {
              const isActive = activeFilter === skill.filterKey;
              const IconComponent = skill.icon;
              const staggerDelay = 0.18 + idx * 0.045; // Silky staggered wave sequence

              return (
                <div
                  key={skill.label}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translateY(0px) scale(1) rotateX(0deg) rotateZ(0deg)'
                      : `translateY(${36 + (idx % 3) * 10}px) scale(0.74) rotateX(${18 + (idx % 2) * 8}deg) rotateZ(${(idx % 2 === 0 ? -1 : 1) * 6}deg)`,
                    filter: isVisible ? 'blur(0px)' : 'blur(8px)',
                    transition: isVisible
                      ? `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}s, transform 0.85s cubic-bezier(0.175, 0.885, 0.32, 1.25) ${staggerDelay}s, filter 0.65s ease-out ${staggerDelay}s`
                      : 'opacity 0.25s ease-out, transform 0.25s ease-out, filter 0.25s ease-out',
                    willChange: 'transform, opacity, filter',
                    perspective: 800,
                  }}
                >
                  <div
                    className={skill.floatClass}
                    style={{ animationDelay: skill.delay }}
                  >
                    <button
                      type="button"
                      onClick={() => handleTagClick(skill.filterKey)}
                      className={`group relative flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 rounded-full font-main text-[0.95rem] md:text-[1.05rem] font-bold tracking-wide transition-all duration-300 cursor-pointer select-none border shadow-md ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-400 to-accent-orange text-black font-extrabold border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-105 -translate-y-1'
                          : 'bg-[#10121d]/90 border-white/[0.1] text-slate-200 hover:border-amber-400/40 hover:text-white hover:bg-[#151828] hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_8px_25px_rgba(0,0,0,0.6)]'
                      }`}
                    >
                      {/* Top Micro Reflection on Hover */}
                      <div
                        className="absolute -top-px left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        aria-hidden="true"
                      />

                      {/* Icon Glyph with Dynamic Rotation/Scale Micro-interaction */}
                      <span
                        className={`p-1 rounded-md transition-all duration-300 ${
                          isActive
                            ? 'bg-black/15 text-black'
                            : 'bg-white/[0.05] text-accent-orange group-hover:bg-accent-orange/20 group-hover:text-amber-400'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-12" />
                      </span>

                      {/* Skill Label */}
                      <span className="relative">
                        {skill.label}
                      </span>

                      {/* Active Check Pulse Dot */}
                      {isActive && (
                        <span className="relative flex h-2 w-2 ml-0.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Filter HUD Feedback Bar with Slide-In Entrance */}
          {activeSkillObj && (
            <div className="relative z-10 mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-3 animate-fade-in">
              <div className="flex items-center gap-2.5 text-[0.88rem] font-mono text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                <span>FILTER ACTIVE:</span>
                <span className="text-white font-bold bg-accent-orange/20 border border-accent-orange/30 px-2.5 py-0.5 rounded-md shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                  {activeSkillObj.label}
                </span>
                <span className="text-text-muted hidden sm:inline">• Projects matching this tag are highlighted below</span>
              </div>

              <button
                type="button"
                onClick={() => onSelectFilter(null)}
                className="inline-flex items-center gap-1.5 text-[0.82rem] font-mono text-accent-orange hover:text-white transition-colors duration-200 cursor-pointer bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-3 py-1.5 rounded-lg active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET FILTER</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

