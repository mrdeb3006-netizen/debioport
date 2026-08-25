import React from 'react';
import { Project } from '../types';
import { Code, Github, ExternalLink } from 'lucide-react';

interface ProjectDetailModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ projectId, onClose }) => {
  const projectDetails: Record<string, Project> = {
    '01': {
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
      overview: 'A simple interactive Snake Water Gun game built with Python, using user input, randomized computer choices, and score-based win logic against the computer.',
      highlights: [
        'Command-line interactive gameplay against random computer choices in Python.',
        'Modular game logic in main.py evaluating win/loss conditions (Snake drinks Water, Water drowns Gun, Gun shoots Snake).',
        'Real-time score keeping, round stats, and robust user input validation.'
      ],
    },
    '02': {
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
      overview: 'A classic Stone Paper Sciccor game written in Python. A command-line implementation of the classic hand game, with Python input handling and outcome comparison for player-versus-computer rounds.',
      highlights: [
        'Engineered in sps.py with clean conditional branching logic and random module integration.',
        'Tracks player win streaks, round comparisons, and match telemetry.',
        'Lightweight, fast execution in any Python terminal environment.'
      ],
    },
    '03': {
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
      overview: 'A Python automation experiment that helps move through YouTube reel content automatically with the ytlimit.py script using automated keyboard/mouse event triggers and timed scrolling intervals.',
      highlights: [
        'Automates desktop YouTube Shorts browsing via Python automation scripting.',
        'Timed interval controls for hands-free video reel transitions.',
        'Handles execution states, keyboard event triggers, and loop limits with ytlimit.py.'
      ],
    },
  };

  const project = projectId ? projectDetails[projectId] : null;

  return (
    <div
      className={`drawer-modal ${project ? 'open' : ''}`}
      aria-hidden={!project}
      role="dialog"
      aria-labelledby="project-detail-title"
    >
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer-panel project-detail-panel">
        <div className="drawer-header">
          <div className="drawer-badge">// PROJECT CASE STUDY {project?.number}</div>
          <h2 id="project-detail-title" className="drawer-heading">{project?.title}</h2>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close Project Modal">
            &times;
          </button>
        </div>
        <div className="drawer-body">
          <div className="flex flex-col gap-6">
            
            {/* Overview */}
            <div>
              <h4 className="font-mono text-[0.78rem] text-accent-cyan tracking-[0.14em] mb-2 uppercase">
                OVERVIEW &amp; OBJECTIVE
              </h4>
              <p className="text-[0.98rem] leading-relaxed text-slate-300">
                {project?.overview}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="font-mono text-[0.78rem] text-accent-cyan tracking-[0.14em] mb-2 uppercase">
                TECHNICAL HIGHLIGHTS &amp; LOGIC ({project?.fileName})
              </h4>
              <ul className="list-none flex flex-col gap-2 p-0 m-0">
                {project?.highlights.map((h, idx) => (
                  <li key={idx} className="relative pl-5 text-[0.95rem] text-slate-300 leading-relaxed before:content-['▹'] before:absolute before:left-0 before:text-accent-cyan">
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="font-mono text-[0.78rem] text-accent-cyan tracking-[0.14em] mb-2 uppercase">
                TECHNOLOGIES &amp; FILES
              </h4>
              <div className="flex flex-wrap gap-2">
                {project?.tech.map((t, idx) => (
                  <span key={idx} className="case-tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions with Open in VS Code & GitHub */}
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10">
              <a
                href={project?.vscodeUrl || 'https://github.dev/mrdeb3006-netizen'}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-5 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-mono text-[0.85rem] font-bold flex items-center gap-2 hover:bg-blue-500/30 hover:text-white transition-all shadow-sm"
              >
                <Code size={15} />
                <span>Open in VS Code</span>
                <ExternalLink size={13} className="opacity-70" />
              </a>

              <a
                href={project?.githubUrl || 'https://github.com/mrdeb3006-netizen'}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-white/[0.06] border border-white/15 text-slate-300 font-mono text-[0.85rem] flex items-center gap-2 hover:text-white hover:border-white/30 transition-all"
              >
                <Github size={15} />
                <span>View on GitHub</span>
              </a>

              <button
                type="button"
                className="btn-secondary ml-auto"
                onClick={onClose}
              >
                Close Case Study
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
