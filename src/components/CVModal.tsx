import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const cvText = `=====================================================
DEBENDRA (MR DEB) - RESUME / CURRICULUM VITAE
Computer Science Student • Developer • Problem Solver
Age: 19 | Location: Kolkata, India
Contact: mrdeb3006@gmail.com
Portfolio: https://mrdeb.dev
=====================================================

ABOUT
I'm a 19-year-old first-year Computer Science and Engineering student
from Kolkata, passionate about programming, problem-solving, and software development.

Currently learning Data Structures and Algorithms using Java while
strengthening programming fundamentals. Basic understanding of Python
and hands-on learning across emerging development fields and AI.

Focused on building a strong foundation in Computer Science, improving
problem-solving, and developing practical software development skills.
Always looking to learn, build and grow as a developer.
Apart from that, a coffee lover with an interest in philosophy.

EDUCATION & FOUNDATIONS
- Computer Science / Engineering (2026 — Present)
- Focus: Object-Oriented Programming, Data Structures,
  Algorithms, Computer Systems Architecture.

TECHNICAL COMPETENCIES
- Programming: Java, Python, C
- Computer Science: Data Structures, Algorithms, OOP, Problem Solving
- Web: HTML5, CSS3, JavaScript (ESNext), Canvas 2D, Responsive UI
- Tools: Git, GitHub, VS Code, Figma, AI Tools, Bash

SELECTED PROJECT CASE STUDIES
1. Snake Water Gun Game (Python, main.py, CLI Game Logic)
2. Stone Paper Sciccor Game (Python, sps.py, CLI & Logic)
3. YouTube Automatic Reel Scrolling (Python, ytlimit.py, Automation)

=====================================================`;
    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Debendra_MrDeb_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return createPortal(
    <div
      className={`drawer-modal ${isOpen ? 'open' : ''}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-labelledby="cv-title"
    >
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer-panel">
        <div className="drawer-header">
          <div className="drawer-badge">CURRICULUM VITAE</div>
          <h2 id="cv-title" className="drawer-heading">Debendra's Resume</h2>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close CV Modal">
            &times;
          </button>
        </div>
        <div className="drawer-body">
          <div className="cv-preview-card">
            <div className="cv-card-header">
              <h3>DEBENDRA (MR DEB)</h3>
              <p className="cv-subtitle">Developer • Problem Solver • Dreamer</p>
            </div>
            <div className="cv-summary-section">
              <h4>Profile Summary</h4>
              <p>
                Computer Science student focused on software engineering, data structures, algorithms, and high-performance interactive web systems.
              </p>
            </div>
            <div className="cv-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={handleDownload}
              >
                <span>{downloaded ? 'Downloaded! ✓' : 'Download Resume'}</span>
                <span className="text-lg ml-2">↓</span>
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
