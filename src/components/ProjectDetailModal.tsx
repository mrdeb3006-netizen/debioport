import React, { useState } from 'react';
import { Project } from '../types';
import { Code, Github, ExternalLink, Copy, Check, Terminal, FileCode2, Cpu, CheckCircle2 } from 'lucide-react';

interface ProjectDetailModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ projectId, onClose }) => {
  const [copied, setCopied] = useState(false);

  const projectDetails: Record<string, Project> = {
    '01': {
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
      overview: 'The Snake Water Gun game is an algorithmic Python-based command-line game designed to explore conditional branching, probabilistic computer logic, and user input normalization. The game tests the classic tripartite hierarchy where Snake drinks Water, Water douses Gun, and Gun shoots Snake.',
      highlights: [
        'Deterministic Token Mapping: Normalizes player string inputs (s, w, g) into integer states (1, -1, 0) for O(1) decision arithmetic.',
        'Pseudorandom Generation: Uses Python\'s standard random module to generate unbiased, uniform computer moves.',
        'Modular Logic Cascade: Evaluates outcome states using difference calculations (computer - you) to minimize duplicate conditional statements.',
        'Fault Tolerance: Sanitizes and traps erroneous user keystrokes with clear recovery prompts.'
      ],
      architecture: [
        'Input Validation & Tokenizer Layer (maps raw strings to state representations)',
        'Pseudorandom Move Generator (computes opponent move with uniform probability)',
        'Evaluation Arithmetic Engine (calculates state differences for win/tie/loss outcomes)',
        'Console Output Formatter (renders clean terminal scoreboards)'
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
    print(f"\\nYou chose: {reverseDict[you]}")
    print(f"Computer chose: {reverseDict[computer]}")

    if computer == you:
        print(">> Outcome: It's a Draw! <<")
    else:
        if (computer - you) == -1 or (computer - you) == 2:
            print(">> Outcome: You Lose! <<")
        else:
            print(">> Outcome: You Win! 🎉 <<")`
    },
    '02': {
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
      overview: 'An engineered Python implementation of the universal Stone-Paper-Scissor game. The project focuses on clean code structure, dictionary key-value lookups, and explicit win-condition predicates to guarantee predictable execution.',
      highlights: [
        'Dictionary-Driven Lookups: Replaces verbose nested switch cases with clean dictionary lookup tables for rapid state retrieval.',
        'Conditional Rule Verification: Implements concise compound boolean expressions ((user == 1 and computer == 0)...) for intuitive win detection.',
        'Zero External Dependencies: Runs natively in any standard Python 3.x environment with instant startup and minimal footprint.',
        'Session Telemetry: Formats clean round feedback with distinct indicators for player and AI moves.'
      ],
      architecture: [
        'Dictionary State Lookup Engine (maps shorthand codes to game entities)',
        'Python Random Integer Selector (generates non-deterministic bot choices)',
        'State Comparison Cascade (processes ties, user victories, and bot victories)',
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
    print(f"\\nPlayer Selection:   {names[user]}")
    print(f"Computer Selection: {names[computer]}")

    if computer == user:
        print(">> Round Result: Tie! <<")
    elif (user == 1 and computer == 0) or (user == -1 and computer == 1) or (user == 0 and computer == -1):
        print(">> Round Result: You Won! 🎉 <<")
    else:
        print(">> Round Result: Computer Won! <<")`
    },
    '03': {
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
      overview: 'A desktop automation script built in Python leveraging PyAutoGUI to provide a hands-free YouTube Shorts and Reels viewing experience. The utility executes timed OS-level keypresses and implements keyboard interrupt listeners for seamless start/stop control.',
      highlights: [
        'Hardware Keypress Emulation: Dispatches virtual DOWN arrow keyevents to advance YouTube shorts without manual interaction.',
        'Configurable Dwell Intervals: Features adjustable time.sleep intervals to match user consumption pace per video.',
        'Graceful SIGINT Trapping: Intercepts KeyboardInterrupt (Ctrl+C) to exit cleanly without leaving dangling background threads.',
        'Startup Grace Period: Gives the user a 3-second buffer to focus their active browser before starting the event loop.'
      ],
      architecture: [
        'OS Keypress Simulator utilizing PyAutoGUI virtual device drivers',
        'Time Delay & Buffer Controller ensuring page-ready transitions',
        'Graceful Signal Interrupt Handler (KeyboardInterrupt / SIGINT)',
        'Console Execution Logger tracking scroll counts and timestamps'
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
    print("\\n[STOP] Auto-scroller terminated gracefully by user.")`
    },
  };

  const project = projectId ? projectDetails[projectId] : null;

  const handleCopyCode = () => {
    if (project?.sourceCode) {
      navigator.clipboard.writeText(project.sourceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`drawer-modal ${project ? 'open' : ''}`}
      aria-hidden={!project}
      role="dialog"
      aria-labelledby="project-detail-title"
    >
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer-panel project-detail-panel max-w-[850px]">
        
        {/* Drawer Header */}
        <div className="drawer-header border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[0.74rem] font-bold text-accent-orange bg-accent-orange/15 px-2.5 py-0.5 rounded-full border border-accent-orange/30 uppercase">
              {project?.category || 'CASE STUDY'}
            </span>
            <span className="font-mono text-[0.72rem] text-text-muted">
              // PROJECT 0{project?.number}
            </span>
          </div>
          <h2 id="project-detail-title" className="drawer-heading font-display text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
            {project?.title}
          </h2>
          <p className="text-[0.88rem] text-accent-orange font-mono mt-1">
            {project?.tagline}
          </p>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close Project Modal">
            &times;
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body p-6 md:p-8 flex flex-col gap-7">
          
          {/* 1. Overview & Objective */}
          <div>
            <h4 className="font-mono text-[0.78rem] text-accent-orange tracking-[0.14em] mb-2 uppercase flex items-center gap-2">
              <Terminal size={14} />
              <span>PROJECT OVERVIEW &amp; OBJECTIVE</span>
            </h4>
            <p className="text-[0.98rem] leading-relaxed text-slate-300">
              {project?.overview}
            </p>
          </div>

          {/* 2. Architecture & Logic Flow */}
          {project?.architecture && (
            <div>
              <h4 className="font-mono text-[0.78rem] text-accent-orange tracking-[0.14em] mb-2.5 uppercase flex items-center gap-2">
                <Cpu size={14} />
                <span>SYSTEM ARCHITECTURE &amp; LOGIC FLOW</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.architecture.map((arch, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-2.5 text-[0.88rem] text-slate-300"
                  >
                    <span className="font-mono text-accent-orange font-bold text-[0.78rem] shrink-0 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Technical Implementation Highlights */}
          <div>
            <h4 className="font-mono text-[0.78rem] text-accent-orange tracking-[0.14em] mb-2.5 uppercase flex items-center gap-2">
              <CheckCircle2 size={14} />
              <span>TECHNICAL HIGHLIGHTS &amp; ALGORITHMIC DECISIONS</span>
            </h4>
            <ul className="list-none flex flex-col gap-2.5 p-0 m-0">
              {project?.highlights.map((h, idx) => (
                <li
                  key={idx}
                  className="relative pl-5 text-[0.92rem] text-slate-300 leading-relaxed before:content-['▹'] before:absolute before:left-0 before:text-accent-orange before:font-bold"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Complete Source Code Viewer */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-[0.78rem] text-accent-orange tracking-[0.14em] uppercase flex items-center gap-2">
                <FileCode2 size={14} />
                <span>SOURCE CODE ({project?.fileName})</span>
              </h4>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.06] border border-white/15 text-slate-200 font-mono text-[0.74rem] hover:border-accent-orange hover:text-accent-orange transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>COPY CODE</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Terminal Box */}
            <div className="w-full bg-[#080911] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="h-[34px] bg-[#121422] border-b border-white/[0.08] flex items-center px-3.5 gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-[0.72rem] text-slate-300 font-bold">
                  {project?.fileName}
                </span>
                <span className="ml-auto font-mono text-[0.68rem] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  READY TO RUN
                </span>
              </div>
              <div className="p-4 overflow-x-auto font-mono text-[0.82rem] leading-[1.65] text-slate-300 max-h-[320px] overflow-y-auto">
                <pre>
                  <code>
                    {project?.sourceCode?.split('\n').map((line, lIdx) => (
                      <div key={lIdx} className="flex gap-4">
                        <span className="text-white/20 select-none w-6 text-right shrink-0">
                          {lIdx + 1}
                        </span>
                        <span className={
                          line.startsWith('#') || line.startsWith("'''") || line.startsWith('"""')
                            ? 'text-emerald-400/80 italic'
                            : line.includes('import ') || line.includes('def ') || line.includes('if ') || line.includes('elif ') || line.includes('else:') || line.includes('try:') || line.includes('except ')
                            ? 'text-accent-orange font-bold'
                            : line.includes('print(') || line.includes('input(') || line.includes('time.') || line.includes('pyautogui.')
                            ? 'text-sky-300'
                            : 'text-slate-200'
                        }>
                          {line}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* 5. Technologies & Files */}
          <div>
            <h4 className="font-mono text-[0.78rem] text-accent-orange tracking-[0.14em] mb-2 uppercase">
              STACK &amp; ENVIRONMENT
            </h4>
            <div className="flex flex-wrap gap-2">
              {project?.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[0.74rem] font-semibold py-1 px-3 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 6. Direct Action Links (GitHub + VS Code) */}
          <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-white/10">
            <a
              href={project?.githubUrl || 'https://github.com/mrdeb3006-netizen'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2.5 px-5 rounded-xl text-[0.84rem] font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
            >
              <Github size={16} />
              <span>SOURCE CODE ON GITHUB</span>
              <ExternalLink size={13} className="opacity-70" />
            </a>

            <a
              href={project?.vscodeUrl || 'https://github.dev/mrdeb3006-netizen'}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-[0.82rem] font-bold flex items-center gap-2 hover:bg-blue-500/20 hover:border-blue-400 hover:text-white transition-all shadow-sm"
            >
              <Code size={15} className="text-blue-400" />
              <span>LAUNCH IN VS CODE WEB</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>

            <button
              type="button"
              className="btn-secondary ml-auto py-2.5 px-4 rounded-xl text-[0.84rem]"
              onClick={onClose}
            >
              Close Case Study
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
