import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Code, Github, FileCode2 } from 'lucide-react';

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
      tagline: 'Python Command-Line Decision & Game Engine',
      category: 'PYTHON • CLI GAME ENGINE',
      description: 'A modular, algorithmically structured command-line game implementing decision matrix logic, randomized computer moves, and round validation in pure Python.',
      fileName: 'main.py',
      tech: ['PYTHON 3', 'MAIN.PY', 'CLI', 'GAME LOOPS', 'DECISION MATRIX'],
      theme: 'cyan',
      titleBar: 'mrdeb / snake-water-gun (main.py)',
      githubUrl: 'https://github.com/mrdeb3006-netizen',
      vscodeUrl: 'https://github.dev/mrdeb3006-netizen',
      overview: 'A Python command-line decision engine built with clean input sanitation, mathematical win-loss evaluation, and modular game loops.',
      highlights: [
        'Command-line interactive gameplay against random computer choices in Python.',
        'Mathematical evaluation logic evaluating win/loss rules (Snake drinks Water, Water drowns Gun, Gun shoots Snake).',
        'Real-time score keeping, round statistics, and robust user input validation.'
      ],
      architecture: [
        'Input Validation & Mapping Layer (maps user strings to integer tokens)',
        'Pseudorandom Choice Engine (selects computer choice dynamically)',
        'Mathematical Evaluation Matrix (evaluates difference formula for win/loss)',
        'Result Terminal Formatter (prints styled visual telemetry)'
      ],
      sourceCode: `import random

'''
1 for snake
-1 for water
0 for gun
'''
computer = random.choice([-1, 0, 1])
youstr = input("Enter your choice (s for Snake, w for Water, g for Gun): ")
youDict = {"s": 1, "w": -1, "g": 0}
reverseDict = {1: "Snake", -1: "Water", 0: "Gun"}

you = youDict.get(youstr.lower())

if you is None:
    print("Invalid Choice! Please enter 's', 'w', or 'g'.")
else:
    print(f"\nYou chose: {reverseDict[you]}")
    print(f"Computer chose: {reverseDict[computer]}")

    if computer == you:
        print(">> Outcome: It's a Draw! <<")
    else:
        if (computer - you) == -1 or (computer - you) == 2:
            print(">> Outcome: You Lose! <<")
        else:
            print(">> Outcome: You Win! 🎉 <<")`
    },
    {
      id: '02',
      number: '02',
      title: 'STONE PAPER SCISSOR GAME',
      tagline: 'Classic Game Matrix with Win-Streak Logic',
      category: 'PYTHON • CONDITIONAL LOGIC',
      description: 'A structured Python terminal game implementing probabilistic decision-making, conditional evaluation cascades, and session telemetry.',
      fileName: 'sps.py',
      tech: ['PYTHON 3', 'SPS.PY', 'CLI', 'CONDITIONAL BRANCHING', 'RANDOM ENGINE'],
      theme: 'purple',
      titleBar: 'mrdeb / stone-paper-scissor (sps.py)',
      githubUrl: 'https://github.com/mrdeb3006-netizen',
      vscodeUrl: 'https://github.dev/mrdeb3006-netizen',
      overview: 'A classic Stone Paper Scissor game written in Python. Features player-versus-computer rounds, outcome comparisons, and win-streak tracking.',
      highlights: [
        'Engineered in sps.py with clean conditional branching logic and random module integration.',
        'Tracks player win streaks, round comparisons, and match telemetry.',
        'Lightweight, fast execution in any Python terminal environment.'
      ],
      architecture: [
        'Dictionary Lookup Table for Token-to-State resolution',
        'Randomized Computer Choice Generator using Python standard library',
        'State Comparison Cascade with comprehensive win/tie/loss branches',
        'Terminal UI Formatter with round statistics'
      ],
      sourceCode: `import random

# 1 for Stone, -1 for Paper, 0 for Scissor
choices = {"r": 1, "p": -1, "s": 0}
names = {1: "Stone", -1: "Paper", 0: "Scissor"}

computer = random.choice([1, -1, 0])
user_input = input("Enter your choice (r: Stone, p: Paper, s: Scissor): ")
user = choices.get(user_input.lower())

if user is None:
    print("Invalid input! Please select r, p, or s.")
else:
    print(f"\nPlayer Selection:   {names[user]}")
    print(f"Computer Selection: {names[computer]}")

    if computer == user:
        print(">> Round Result: Tie! <<")
    elif (user == 1 and computer == 0) or (user == -1 and computer == 1) or (user == 0 and computer == -1):
        print(">> Round Result: You Won! 🎉 <<")
    else:
        print(">> Round Result: Computer Won! <<")`
    },
    {
      id: '03',
      number: '03',
      title: 'YOUTUBE REEL AUTO-SCROLLER',
      tagline: 'Python Automation & Event Loop Script',
      category: 'PYTHON • OS AUTOMATION',
      description: 'An automated OS-level event script that streamlines video feed navigation through timed keypress simulation and configurable playback delays.',
      fileName: 'ytlimit.py',
      tech: ['PYTHON 3', 'YTLIMIT.PY', 'PYAUTOGUI', 'OS AUTOMATION', 'EVENT LOOPS'],
      theme: 'magenta',
      titleBar: 'mrdeb / youtube-auto-reel (ytlimit.py)',
      githubUrl: 'https://github.com/mrdeb3006-netizen',
      vscodeUrl: 'https://github.dev/mrdeb3006-netizen',
      overview: 'A Python automation script for scrolling through YouTube reels and Shorts feeds automatically with custom duration timeouts and keyboard interrupt handlers.',
      highlights: [
        'Automates desktop YouTube Shorts browsing via Python automation scripting.',
        'Timed interval controls for hands-free video reel transitions.',
        'Handles execution states, keyboard event triggers, and graceful termination loops.'
      ],
      architecture: [
        'OS Keypress Simulator utilizing PyAutoGUI virtual device drivers',
        'Time Delay & Buffer Controller ensuring page-ready transitions',
        'Graceful Signal Interrupt Handler (KeyboardInterrupt / SIGINT)',
        'Console Execution Logger tracking scroll counts'
      ],
      sourceCode: `import pyautogui
import time

print("=" * 45)
print("  YouTube Shorts Auto-Scroller Initiated")
print("  Switch to your browser within 3 seconds...")
print("=" * 45)

time.sleep(3)  # Grace period to focus active browser window
scroll_count = 0

try:
    while True:
        # Simulate down arrow keypress to trigger feed transition
        pyautogui.press('down')
        scroll_count += 1
        print(f"[{time.strftime('%H:%M:%S')}] Swiped to Video #{scroll_count}")
        
        # Interval delay per short (configurable in seconds)
        time.sleep(15)
except KeyboardInterrupt:
    print("\n[STOP] Auto-scroller terminated gracefully by user.")`
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

      const scrolledFromTop = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolledFromTop / totalDistance));

      setScrollProgress(progress);

      const maxTranslate = (projects.length - 1) * window.innerWidth;
      const currentTranslate = progress * maxTranslate;
      setTranslateX(-currentTranslate);

      const slideIndex = Math.min(
        projects.length - 1,
        Math.max(0, Math.round(progress * (projects.length - 1)))
      );
      setActiveSlide(slideIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, projects.length]);

  // Keyboard Arrow Navigation
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        scrollToSlide(Math.min(projects.length - 1, activeSlide + 1));
      } else if (e.key === 'ArrowLeft') {
        scrollToSlide(Math.max(0, activeSlide - 1));
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
      {!isMobile ? (
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-16 md:pt-14 pb-3 z-10">
          
          {/* Ambient Background Glows */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent-orange/[0.04] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-orange/[0.04] rounded-full blur-[140px] pointer-events-none" />

          {/* Section Header */}
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 flex items-end justify-between gap-4 shrink-0 pb-2.5 border-b border-white/[0.06] relative z-20">
            <div>
              <div className="font-mono text-[0.82rem] tracking-[0.2em] text-accent-orange font-semibold mb-1 uppercase flex items-center gap-2">
                <span>// 02. /PROJECTS</span>
                <span className="text-text-muted">•</span>
                <span className="text-text-secondary text-[0.74rem]">CODE REPOSITORY &amp; CASE STUDIES</span>
              </div>
              <h2 className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-black text-white uppercase tracking-[0.02em] leading-tight">
                FEATURED<br className="sm:hidden" /> PROJECTS
              </h2>
            </div>

            {/* Slide Navigation Telemetry */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 font-mono text-[0.9rem]">
                <span className="text-accent-orange font-bold text-lg">0{activeSlide + 1}</span>
                <span className="text-text-muted">/</span>
                <span className="text-text-muted">0{projects.length}</span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
                  disabled={activeSlide === 0}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-white hover:border-accent-orange hover:text-accent-orange disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white transition-all cursor-pointer shadow-md"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSlide(Math.min(projects.length - 1, activeSlide + 1))}
                  disabled={activeSlide === projects.length - 1}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-white hover:border-accent-orange hover:text-accent-orange disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white transition-all cursor-pointer shadow-md"
                  aria-label="Next project"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Sliding Track */}
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

                // Depth scaling relative to scroll position
                const distance = idx - (scrollProgress * (projects.length - 1));
                const slideScale = Math.max(0.95, 1 - Math.abs(distance) * 0.05);
                const slideOpacity = Math.max(0.4, 1 - Math.abs(distance) * 0.6);

                return (
                  <div
                    key={proj.id}
                    className="w-screen h-full shrink-0 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-12"
                  >
                                  <article
                      key={proj.id}
                      id={`project-${proj.id}`}
                      style={{
                        transform: `scale(${slideScale})`,
                        opacity: slideOpacity,
                      }}
                      className={`w-full max-w-[1360px] h-[calc(100vh-190px)] min-h-[440px] max-h-[580px] specular-card backdrop-blur-[24px] border-2 border-[#881337]/25 bg-[#ffffff] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${
                        isMatch
                          ? 'border-accent-orange shadow-[0_0_35px_rgba(249,115,22,0.4)]'
                          : 'hover:border-accent-orange hover:shadow-[0_25px_70px_rgba(0,0,0,0.4),0_0_25px_rgba(249,115,22,0.2)]'
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_55%] gap-6 md:gap-6 lg:gap-12 items-center h-full min-h-0">
                        
                        {/* LEFT COLUMN: Clean High-Contrast Project Intel (White, Orange & Burgundy) */}
                        <div className="flex flex-col justify-between h-full min-h-0 py-1">
                          
                          <div>
                            {/* Top Category Badge & Big Minimal Number */}
                            <div className="flex items-center justify-between mb-2.5">
                              <span className="font-mono text-[0.74rem] font-bold px-3.5 py-1 rounded-full bg-[#881337] text-white border border-[#701a28] tracking-wider inline-flex items-center gap-2 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-accent-orange shadow-sm" />
                                {proj.category || 'PYTHON ENGINEERING'}
                              </span>
                              <div className="font-display text-4xl lg:text-5xl font-black text-[#881337]/15 [-webkit-text-stroke:1.5px_#881337] leading-none">
                                {proj.number}
                              </div>
                            </div>

                            {/* Project Name */}
                            <h3 className="font-display text-[clamp(1.4rem,2.2vw,2.1rem)] font-black text-[#0891b2] hover:text-[#06b6d4] leading-tight mb-2 uppercase tracking-wide transition-colors drop-shadow-sm">
                              {proj.title}
                            </h3>

                            {/* Tagline */}
                            {proj.tagline && (
                              <p className="text-[0.92rem] text-[#ea580c] font-bold mb-3 tracking-wide">
                                {proj.tagline}
                              </p>
                            )}

                            {/* Minimal Clean Description */}
                            <p className="text-[0.94rem] md:text-[0.98rem] text-[#374151] font-medium leading-relaxed line-clamp-3 md:line-clamp-4 mb-4">
                              {proj.description}
                            </p>
                          </div>
                          
                          <div>
                            {/* Tech Badges */}
                            <div className="mb-6">
                              <div className="flex flex-wrap gap-2">
                                {proj.tech.map((t, pIdx) => (
                                  <span
                                    key={pIdx}
                                    className="font-mono text-[0.74rem] font-bold py-1 px-3 rounded-lg bg-[#f8fafc] border border-[#881337]/30 text-[#0f172a] shadow-xs transition-all hover:bg-[#881337] hover:text-white hover:border-[#881337]"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Primary Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3">
                              <button
                                type="button"
                                onClick={() => onOpenProjectModal(proj.id)}
                                className="btn-primary py-2.5 px-6 rounded-xl text-[0.85rem] font-bold group shadow-[0_4px_14px_rgba(249,115,22,0.4)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.6)] cursor-pointer text-white"
                              >
                                <span>VIEW CASE STUDY</span>
                                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                              </button>

                              <a
                                href={proj.githubUrl || 'https://github.com/mrdeb3006-netizen'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-white border-2 border-[#881337]/35 text-[#881337] font-mono text-[0.82rem] font-bold hover:bg-[#881337] hover:text-white hover:border-[#881337] transition-all cursor-pointer shadow-sm"
                              >
                                <Github size={15} />
                                <span>SOURCE CODE</span>
                                <ExternalLink size={12} className="opacity-75" />
                              </a>

                              <a
                                href={proj.vscodeUrl || 'https://github.dev/mrdeb3006-netizen'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-[#881337]/10 border border-[#881337]/30 text-[#881337] font-mono text-[0.8rem] font-bold hover:bg-[#881337] hover:text-white transition-all cursor-pointer shadow-xs"
                                title="Open in VS Code Web"
                              >
                                <Code size={14} className="text-accent-orange" />
                                <span>VS CODE</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT COLUMN: Crystal-Clear High-Contrast Python Code Terminal */}
                        <div
                          onClick={() => onOpenProjectModal(proj.id)}
                          className="w-full h-full min-h-0 flex items-center justify-center cursor-pointer group/card"
                          title="Click to view detailed case study"
                        >
                          <div className="w-full h-full max-h-[360px] md:max-h-[400px] lg:max-h-[440px] bg-[#ffffff] border-2 border-[#881337]/25 rounded-2xl overflow-hidden flex flex-col shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover/card:border-accent-orange group-hover/card:shadow-[0_20px_45px_rgba(249,115,22,0.2)]">
                            
                            {/* Terminal Window Header */}
                            <div className="h-[40px] bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center px-4 gap-2 shrink-0">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                              </div>
                              <div className="flex items-center gap-2 ml-3">
                                <FileCode2 size={15} className="text-accent-orange" />
                                <span className="font-mono text-[0.78rem] font-bold text-[#0f172a]">
                                  {proj.fileName || 'source.py'}
                                </span>
                              </div>
                              <span className="ml-auto font-mono text-[0.7rem] font-bold text-white bg-[#881337] px-2.5 py-0.5 rounded shadow-xs">
                                PYTHON LOGIC PREVIEW
                              </span>
                            </div>

                            {/* Crisp Clean High-Contrast Syntax Highlighted Code Window */}
                            <div className="flex-1 p-5 overflow-hidden relative bg-[#ffffff] font-mono text-[0.84rem] font-semibold leading-[1.7] text-[#0f172a]">
                              <pre className="overflow-hidden">
                                <code>
                                  {proj.sourceCode ? (
                                    proj.sourceCode.split('\n').slice(0, 14).map((line, lIdx) => (
                                      <div key={lIdx} className="flex gap-4">
                                        <span className="text-[#94a3b8] font-bold select-none w-5 text-right shrink-0">
                                          {lIdx + 1}
                                        </span>
                                        <span className={
                                          line.startsWith('#') || line.startsWith("'''") || line.startsWith('"""')
                                            ? 'text-[#64748b] italic font-normal'
                                            : line.includes('import ') || line.includes('def ') || line.includes('if ') || line.includes('elif ') || line.includes('else:')
                                            ? 'text-[#ea580c] font-black'
                                            : line.includes('print(') || line.includes('input(') || line.includes('random.')
                                            ? 'text-[#0284c7] font-black'
                                            : line.includes('"') || line.includes("'")
                                            ? 'text-[#881337] font-black'
                                            : 'text-[#0f172a] font-extrabold'
                                        }>
                                          {line}
                                        </span>
                                      </div>
                                    ))
                                  ) : (
                                    <span># Project source code ready</span>
                                  )}
                                </code>
                              </pre>

                              {/* Subtle Bottom Shade */}
                              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#ffffff] via-[#ffffff]/90 to-transparent flex items-end justify-center pb-3">
                                <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#881337] text-white text-[0.75rem] font-mono font-bold shadow-md transition-transform duration-300 group-hover/card:scale-105">
                                  <span>READ FULL CASE STUDY</span>
                                  <ArrowRight size={12} className="text-accent-orange" />
                                </div>
                              </div>
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
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.8rem] text-accent-orange font-bold">
                0{activeSlide + 1}
              </span>
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === i
                        ? 'w-7 bg-accent-orange shadow-[0_0_6px_rgba(249,115,22,0.4)]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to project 0${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-[0.75rem] text-text-muted">
              <span className="hidden sm:inline text-slate-400">
                {activeSlide === projects.length - 1
                  ? 'Project 03/03 • Scroll down to continue to Journey →'
                  : 'Scroll down to slide sideways →'}
              </span>
              <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
                  className="h-full bg-accent-orange rounded-full shadow-[0_0_6px_rgba(249,115,22,0.4)] transition-all duration-75"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MOBILE: VERTICAL MINIMAL SEQUENCE */
        <div className="max-w-[800px] mx-auto flex flex-col gap-12">
          <div className="pt-8">
            <div className="font-mono text-[0.8rem] tracking-[0.2em] text-accent-orange font-semibold mb-2 uppercase">
              // 02. /PROJECTS
            </div>
            <h2 className="font-display text-3xl font-black text-white uppercase tracking-[0.02em]">
              FEATURED PROJECTS
            </h2>
          </div>

          <div className="flex flex-col gap-10">
            {projects.map((proj) => (
              <article
                key={proj.id}
                id={`project-${proj.id}`}
                className="specular-card backdrop-blur-[16px] border-2 border-[#881337]/25 bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-4 shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.72rem] font-bold px-3 py-1 rounded-full bg-[#881337] text-white border border-[#701a28] inline-flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                    {proj.category || 'PYTHON'}
                  </span>
                  <div className="font-display text-3xl font-black text-[#881337]/15 [-webkit-text-stroke:1.5px_#881337]">
                    {proj.number}
                  </div>
                </div>

                <h3 className="font-display text-xl font-black text-[#0891b2] leading-snug">
                  {proj.title}
                </h3>

                {proj.tagline && (
                  <p className="text-[0.86rem] text-[#ea580c] font-bold font-mono">
                    {proj.tagline}
                  </p>
                )}
                <p className="text-[0.94rem] text-[#374151] font-medium leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 my-1">
                  {proj.tech.map((t, pIdx) => (
                    <span
                      key={pIdx}
                      className="font-mono text-[0.72rem] font-bold py-1 px-2.5 rounded bg-[#f8fafc] border border-[#881337]/30 text-[#0f172a]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  onClick={() => onOpenProjectModal(proj.id)}
                  className="w-full bg-[#ffffff] border-2 border-[#881337]/25 rounded-xl overflow-hidden flex flex-col my-1 shadow-md cursor-pointer"
                >
                  <div className="h-[34px] bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center px-3 gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 font-mono text-[0.72rem] text-[#0f172a] font-bold">
                      {proj.fileName}
                    </span>
                  </div>
                  <div className="p-3.5 font-mono text-[0.78rem] font-semibold text-[#0f172a] bg-[#ffffff] line-clamp-6">
                    <pre><code>{proj.sourceCode?.split('\n').slice(0, 7).join('\n')}</code></pre>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                  <button
                    type="button"
                    onClick={() => onOpenProjectModal(proj.id)}
                    className="flex-1 btn-primary py-3 rounded-xl text-[0.85rem] font-bold justify-center text-white"
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowRight size={15} />
                  </button>

                  <a
                    href={proj.githubUrl || 'https://github.com/mrdeb3006-netizen'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-white border-2 border-[#881337]/35 text-[#881337] font-mono text-[0.82rem] font-bold flex items-center justify-center gap-2 hover:bg-[#881337] hover:text-white"
                  >
                    <Github size={15} />
                    <span>Source Code</span>
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
