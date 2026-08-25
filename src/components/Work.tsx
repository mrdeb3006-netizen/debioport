import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { SnakeWaterGunVisualizer } from './work/SnakeWaterGunVisualizer';
import { StonePaperScissorVisualizer } from './work/StonePaperScissorVisualizer';
import { YouTubeReelScrollerVisualizer } from './work/YouTubeReelScrollerVisualizer';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Code, Github } from 'lucide-react';

interface WorkProps {
  onOpenProjectModal: (id: string) => void;
  activeFilter: string | null;
}

export const Work: React.FC<WorkProps> = ({ onOpenProjectModal, activeFilter }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const projects: Project[] = [
    {
      id: '01',
      number: '01',
      title: 'SNAKE WATER GUN GAME',
      tagline: 'A Python command-line game against the computer.',
      description: 'A simple interactive Snake Water Gun game built with Python, using user input, randomized computer choices, and score-based win logic.',
      fileName: 'main.py',
      tech: ['PYTHON', 'MAIN.PY', 'CLI', 'GAME LOGIC'],
      theme: 'cyan',
      titleBar: 'mrdeb / snake-water-gun (main.py)',
      githubUrl: 'https://github.com/mrdeb3006-netizen',
      vscodeUrl: 'https://github.dev/mrdeb3006-netizen',
      overview: 'A Python command-line game against the computer. Built with clean input handling, randomized AI choices, and score-based game loop logic.',
      highlights: [
        'Command-line interactive gameplay against random computer choices in Python.',
        'Modular game logic in main.py evaluating win/loss conditions (Snake drinks Water, Water drowns Gun, Gun shoots Snake).',
        'Real-time score keeping, round stats, and robust user input validation.'
      ],
    },
    {
      id: '02',
      number: '02',
      title: 'STONE PAPER SCICCOR GAME',
      tagline: 'A classic Stone Paper Sciccor game written in Python.',
      description: 'A command-line implementation of the classic hand game, with Python input handling and outcome comparison for player-versus-computer rounds.',
      fileName: 'sps.py',
      tech: ['PYTHON', 'SPS.PY', 'CLI', 'CONDITIONAL LOGIC'],
      theme: 'purple',
      titleBar: 'mrdeb / stone-paper-scissor (sps.py)',
      githubUrl: 'https://github.com/mrdeb3006-netizen',
      vscodeUrl: 'https://github.dev/mrdeb3006-netizen',
      overview: 'A classic Stone Paper Sciccor game written in Python. Features player vs bot rounds, outcome comparisons, and win-streak tracking.',
      highlights: [
        'Engineered in sps.py with clean conditional branching logic and random module integration.',
        'Tracks player win streaks, round comparisons, and match telemetry.',
        'Lightweight, fast execution in any Python terminal environment.'
      ],
    },
    {
      id: '03',
      number: '03',
      title: 'YOUTUBE AUTOMATIC REEL SCROLLING',
      tagline: 'A Python automation script for scrolling through YouTube reels.',
      description: 'A Python automation experiment that helps move through YouTube reel content automatically with the ytlimit.py script.',
      fileName: 'ytlimit.py',
      tech: ['PYTHON', 'YTLIMIT.PY', 'AUTOMATION', 'YOUTUBE'],
      theme: 'magenta',
      titleBar: 'mrdeb / youtube-auto-reel (ytlimit.py)',
      githubUrl: 'https://github.com/mrdeb3006-netizen',
      vscodeUrl: 'https://github.dev/mrdeb3006-netizen',
      overview: 'A Python automation script for scrolling through YouTube reels and Shorts feeds automatically with custom duration timeouts.',
      highlights: [
        'Automates desktop YouTube Shorts browsing via Python automation scripting.',
        'Timed interval controls for hands-free video reel transitions.',
        'Handles execution states, keyboard event triggers, and loop limits with ytlimit.py.'
      ],
    },
  ];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sticky Horizontal Scroll Engine (Desktop & Tablet)
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalDistance = containerHeight - windowHeight;

      if (totalDistance <= 0) return;

      // Distance scrolled inside the pinned container [0 -> totalDistance]
      const scrolledInside = -rect.top;
      const rawProgress = scrolledInside / totalDistance;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
      setScrollProgress(clampedProgress);

      const numSlides = projects.length; // 3
      const numTransitions = numSlides - 1; // 2

      // Calibrated easing with hold buffer at start and end
      let slideFraction = 0;
      if (clampedProgress <= 0.04) {
        slideFraction = 0;
      } else if (clampedProgress >= 0.92) {
        slideFraction = 1;
      } else {
        slideFraction = (clampedProgress - 0.04) / 0.88;
      }

      // Calculate translation: Each slide is 100vw
      const slideWidth = window.innerWidth;
      const maxTranslate = numTransitions * slideWidth;
      const targetX = -(slideFraction * maxTranslate);
      setTranslateX(targetX);

      // Determine active slide index
      const slideIdx = Math.min(
        Math.floor(slideFraction * numSlides * 0.999),
        numSlides - 1
      );
      setActiveSlide(slideIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isMobile, projects.length]);

  // Keyboard Arrow Navigation
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      if (!inView) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (activeSlide < projects.length - 1) {
          e.preventDefault();
          scrollToSlide(activeSlide + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (activeSlide > 0) {
          e.preventDefault();
          scrollToSlide(activeSlide - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide, isMobile, projects.length]);

  // Jump to specific slide
  const scrollToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = window.pageYOffset + container.getBoundingClientRect().top;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalDistance = containerHeight - windowHeight;

    const targetFraction = index / (projects.length - 1);
    const targetY = containerTop + targetFraction * totalDistance;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={containerRef}
      id="work"
      className={`relative bg-[#070811] text-white w-full ${
        isMobile ? 'py-20 px-6' : 'h-[300vh]'
      }`}
    >
      {/* ========================================================================= */}
      {/* DESKTOP & TABLET: CINEMATIC STICKY HORIZONTAL SLIDE SHOWCASE               */}
      {/* ========================================================================= */}
      {!isMobile ? (
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-16 md:pt-14 pb-3 z-10">
          
          {/* Ambient Background Glows */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent-cyan/[0.03] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-purple/[0.03] rounded-full blur-[140px] pointer-events-none" />

          {/* Section Header */}
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 flex items-end justify-between gap-4 shrink-0 pb-2.5 border-b border-white/[0.06] relative z-20">
            <div>
              <div className="font-mono text-[0.82rem] tracking-[0.2em] text-accent-cyan font-semibold mb-1 uppercase flex items-center gap-2">
                <span>// 02. /WORK</span>
                <span className="text-text-muted">•</span>
                <span className="text-text-secondary text-[0.74rem]">PROJECTS REPOSITORY</span>
              </div>
              <h2 className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-black text-white uppercase tracking-[0.02em] leading-tight">
                SELECTED<br className="sm:hidden" /> PROJECTS
              </h2>
            </div>

            {/* Slide Navigation Telemetry */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 font-mono text-[0.9rem]">
                <span className="text-accent-cyan font-bold text-lg">0{activeSlide + 1}</span>
                <span className="text-text-muted">/</span>
                <span className="text-text-muted">0{projects.length}</span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
                  disabled={activeSlide === 0}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-white hover:border-accent-cyan hover:text-accent-cyan disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white transition-all cursor-pointer shadow-md"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSlide(Math.min(projects.length - 1, activeSlide + 1))}
                  disabled={activeSlide === projects.length - 1}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-white hover:border-accent-cyan hover:text-accent-cyan disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white transition-all cursor-pointer shadow-md"
                  aria-label="Next project"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Sliding Track (100vw per slide, full screen width) */}
          <div className="flex-1 w-full min-h-0 flex items-center overflow-hidden relative z-10 py-1 my-auto">
            <div
              ref={trackRef}
              style={{
                width: `${projects.length * 100}vw`,
                transform: `translate3d(${translateX}px, 0, 0)`,
              }}
              className="flex h-full will-change-transform transition-transform duration-75 ease-out"
            >
              {projects.map((proj, idx) => {
                const isMatch = activeFilter
                  ? proj.tech.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase())) ||
                    proj.description.toLowerCase().includes(activeFilter.toLowerCase())
                  : false;

                // Subtle depth relative to active slide
                const distance = idx - (scrollProgress * (projects.length - 1));
                const slideScale = Math.max(0.95, 1 - Math.abs(distance) * 0.05);
                const slideOpacity = Math.max(0.4, 1 - Math.abs(distance) * 0.6);

                return (
                  <div
                    key={proj.id}
                    className="w-screen h-full shrink-0 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-12"
                  >
                    <article
                      id={`project-${proj.id}`}
                      style={{
                        transform: `scale(${slideScale})`,
                        opacity: slideOpacity,
                      }}
                      className={`w-full max-w-[1400px] h-[calc(100vh-190px)] min-h-[440px] max-h-[580px] specular-card backdrop-blur-[20px] border border-white/[0.09] rounded-2xl md:rounded-3xl p-5 md:p-7 lg:p-8 transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)] ${
                        isMatch
                          ? 'border-accent-cyan/60 shadow-[0_0_30px_rgba(249,115,22,0.3)]'
                          : 'hover:border-accent-cyan/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_25px_rgba(249,115,22,0.15)]'
                      }`}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-6 lg:gap-8 xl:gap-10 items-center h-full min-h-0">
                        
                        {/* ========================================= */}
                        {/* LEFT COLUMN: 38% Width - Information      */}
                        {/* ========================================= */}
                        <div className="flex flex-col justify-between h-full min-h-0 py-1">
                          
                          <div>
                            {/* Top Tagline & Oversized Subtle Project Number */}
                            <div className="flex items-center justify-between mb-1">
                              <div className="font-display text-[clamp(2rem,3.4vw,2.8rem)] font-black text-white/15 [-webkit-text-stroke:1px_rgba(249,115,22,0.4)] leading-none">
                                {proj.number}
                              </div>
                              <span className="font-mono text-[0.7rem] font-bold px-2.5 py-0.5 rounded-full bg-accent-purple/15 text-accent-purple border border-accent-purple/30">
                                PYTHON
                              </span>
                            </div>

                            {/* Project Name */}
                            <h3 className="font-display text-[clamp(1.2rem,1.7vw,1.65rem)] font-extrabold text-white leading-snug mb-1.5">
                              {proj.title}
                            </h3>

                            {/* Short Tagline */}
                            {proj.tagline && (
                              <p className="text-[0.82rem] text-accent-cyan/90 font-mono mb-2">
                                {proj.tagline}
                              </p>
                            )}

                            {/* Short Project Description */}
                            <p className="text-[0.86rem] md:text-[0.9rem] text-text-secondary leading-[1.55] line-clamp-3 md:line-clamp-4 mb-3">
                              {proj.description}
                            </p>
                          </div>
                          
                          <div>
                            {/* Technologies Tags */}
                            <div className="mb-4">
                              <div className="font-mono text-[0.68rem] tracking-widest text-text-muted uppercase mb-1.5">
                                TECHNOLOGIES & LOGIC
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {proj.tech.map((t, pIdx) => (
                                  <span
                                    key={pIdx}
                                    className="font-mono text-[0.7rem] font-semibold py-1 px-2.5 rounded-md bg-accent-cyan/[0.06] border border-accent-cyan/20 text-slate-300 transition-all hover:border-accent-cyan hover:text-accent-cyan"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons Row (Open in VS Code + View Project) */}
                            <div className="flex flex-wrap items-center gap-2.5">
                              <button
                                type="button"
                                onClick={() => onOpenProjectModal(proj.id)}
                                className="btn-primary py-2 px-5 rounded-xl text-[0.82rem] group"
                              >
                                <span>VIEW PROJECT</span>
                                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                              </button>

                              <a
                                href={proj.vscodeUrl || 'https://github.dev/mrdeb3006-netizen'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-[0.78rem] font-semibold tracking-wide hover:bg-blue-500/20 hover:border-blue-400 hover:text-white transition-all cursor-pointer shadow-sm"
                              >
                                <Code size={13} className="text-blue-400" />
                                <span>VS Code</span>
                                <ExternalLink size={11} className="opacity-70" />
                              </a>

                              <a
                                href={proj.githubUrl || 'https://github.com/mrdeb3006-netizen'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 py-2 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-text-muted font-mono text-[0.78rem] hover:text-white hover:border-white/25 transition-all cursor-pointer"
                                title="View on GitHub"
                              >
                                <Github size={14} />
                              </a>
                            </div>
                          </div>

                        </div>

                        {/* ========================================= */}
                        {/* RIGHT COLUMN: 62% Width - Large Visual    */}
                        {/* ========================================= */}
                        <div className="w-full h-full min-h-0 flex items-center justify-center">
                          <div className="w-full h-full max-h-[350px] md:max-h-[390px] lg:max-h-[430px] bg-[#090b16]/95 border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-[1.005] hover:border-accent-cyan/30">
                            
                            {/* Browser Mockup Window Header */}
                            <div className="h-[34px] bg-[#141628]/85 border-b border-white/[0.07] flex items-center px-4 gap-2 shrink-0">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                              <span className="ml-auto font-mono text-[0.7rem] text-text-muted truncate max-w-[280px]">
                                {proj.titleBar}
                              </span>
                            </div>

                            {/* Large Project Visual / Interactive Frame Area */}
                            <div className="flex-1 p-3 md:p-5 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent to-black/30">
                              {proj.id === '01' && <SnakeWaterGunVisualizer />}
                              {proj.id === '02' && <StonePaperScissorVisualizer />}
                              {proj.id === '03' && <YouTubeReelScrollerVisualizer />}
                            </div>

                          </div>
                        </div>

                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Minimal Bottom Progress Indicator */}
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between gap-4 shrink-0 pt-2 pb-1 border-t border-white/[0.06] relative z-20">
            {/* Minimal Dots: 01 ● ○ ○ */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.8rem] text-accent-cyan font-bold">
                0{activeSlide + 1}
              </span>
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToSlide(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === i
                        ? 'w-8 bg-gradient-to-r from-accent-cyan to-accent-purple shadow-[0_0_8px_rgba(249,115,22,0.5)]'
                        : 'w-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to project 0${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Scroll Direction Telemetry */}
            <div className="flex items-center gap-3 font-mono text-[0.75rem] text-text-muted">
              <span className="hidden sm:inline text-slate-400">
                {activeSlide === projects.length - 1
                  ? 'Project 03/03 • Scroll down to continue to Experience →'
                  : 'Scroll down to slide sideways →'}
              </span>
              <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
                  className="h-full bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-purple rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)] transition-all duration-75"
                />
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* MOBILE: VERTICAL CINEMATIC SEQUENCE                                       */
        /* ========================================================================= */
        <div className="max-w-[800px] mx-auto flex flex-col gap-14">
          {/* Mobile Header */}
          <div className="pt-10">
            <div className="font-mono text-[0.8rem] tracking-[0.2em] text-accent-cyan font-semibold mb-2 uppercase">
              // 02. /WORK
            </div>
            <h2 className="font-display text-3xl font-black text-white uppercase tracking-[0.02em]">
              SELECTED PROJECTS
            </h2>
          </div>

          {/* Vertical Stack of Projects */}
          <div className="flex flex-col gap-12">
            {projects.map((proj) => (
              <article
                key={proj.id}
                id={`project-${proj.id}`}
                className="specular-card backdrop-blur-[16px] border border-white/[0.09] rounded-2xl p-6 flex flex-col gap-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              >
                {/* Project Number & Language */}
                <div className="flex items-center justify-between">
                  <div className="font-display text-3xl font-black text-white/20 [-webkit-text-stroke:1px_rgba(249,115,22,0.4)]">
                    {proj.number}
                  </div>
                  <span className="font-mono text-[0.7rem] font-bold px-2 py-0.5 rounded bg-accent-purple/15 text-accent-purple border border-accent-purple/30">
                    PYTHON
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-display text-xl font-extrabold text-white leading-snug">
                  {proj.title}
                </h3>

                {/* Project Tagline & Description */}
                {proj.tagline && (
                  <p className="text-[0.84rem] text-accent-cyan font-mono">
                    {proj.tagline}
                  </p>
                )}
                <p className="text-[0.92rem] text-text-secondary leading-relaxed">
                  {proj.description}
                </p>

                {/* Large Visual Frame */}
                <div className="w-full h-[250px] bg-[#090b16] border border-white/10 rounded-xl overflow-hidden flex flex-col my-1 shadow-lg">
                  <div className="h-[30px] bg-[#141628]/85 border-b border-white/[0.07] flex items-center px-3 gap-1.5 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    <span className="ml-auto font-mono text-[0.65rem] text-text-muted truncate max-w-[180px]">
                      {proj.titleBar}
                    </span>
                  </div>
                  <div className="flex-1 p-3 flex items-center justify-center relative overflow-hidden">
                    {proj.id === '01' && <SnakeWaterGunVisualizer />}
                    {proj.id === '02' && <StonePaperScissorVisualizer />}
                    {proj.id === '03' && <YouTubeReelScrollerVisualizer />}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t, pIdx) => (
                    <span
                      key={pIdx}
                      className="font-mono text-[0.7rem] font-semibold py-1 px-2.5 rounded bg-accent-cyan/[0.06] border border-accent-cyan/20 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => onOpenProjectModal(proj.id)}
                    className="flex-1 btn-primary py-3 rounded-xl text-[0.85rem] justify-center"
                  >
                    <span>VIEW DETAILS</span>
                    <ArrowRight size={15} />
                  </button>

                  <a
                    href={proj.vscodeUrl || 'https://github.dev/mrdeb3006-netizen'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-[0.82rem] font-semibold flex items-center justify-center gap-2"
                  >
                    <Code size={14} />
                    <span>Open in VS Code</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
