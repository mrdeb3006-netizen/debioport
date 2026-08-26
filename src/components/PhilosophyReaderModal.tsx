import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  BookOpen,
  List,
  Layers
} from 'lucide-react';

interface PhilosophyReaderModalProps {
  isOpen: boolean;
  initialPage?: number;
  onClose: () => void;
}

const TOTAL_PAGES = 10;
const PDF_URL = '/philosophy/the-game-of-dopamine.pdf';
const DOWNLOAD_FILENAME = 'The-Game-of-Dopamine-Debendranath-Bera.pdf';

const PAGE_TITLES = [
  'Cover • The Game of Dopamine',
  'Abstract & 1. Introduction: Modern Inner Conflict',
  '2. Personal Story: When Pattern Became Visible',
  '3. Novelty to Dopamine Loop & 4. Passion',
  '5. Passion Formula, 6. Slow Learning, 7. Simple Living',
  '8. The Bhagavad Gita and Inner Action',
  '9. Mental Strength Definition & 10. Liberation',
  '11. Practical Framework & 12. Discussion',
  '13. Limitations & 14. Conclusion: Final Principle',
  'References & Source Notes'
];

export const PhilosophyReaderModal: React.FC<PhilosophyReaderModalProps> = ({
  isOpen,
  initialPage = 1,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [viewMode, setViewMode] = useState<'single' | 'scroll'>('single');

  // Sync initial page when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(initialPage);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialPage]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-2.5 sm:p-4 md:p-6 animate-fade-in select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Research Paper Interactive Reader"
    >
      {/* Modal Container */}
      <div
        className="w-full max-w-[1280px] h-full max-h-[96vh] max-h-[96dvh] flex flex-col bg-[#0f172a] text-slate-100 rounded-2xl md:rounded-3xl border border-slate-700/60 shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-4 px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-[#1e293b] border-b border-slate-700/80 z-20 shrink-0">
          
          {/* Left: Paper Title & Meta */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <BookOpen size={17} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-serifDisplay text-[0.88rem] sm:text-base md:text-lg font-bold text-white tracking-tight truncate">
                  The Game of Dopamine
                </h3>
                <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-[0.66rem] uppercase font-semibold">
                  Illustrated Edition
                </span>
              </div>
              <p className="text-[0.68rem] sm:text-[0.76rem] text-slate-400 truncate max-w-[180px] sm:max-w-[320px] md:max-w-[400px]">
                {PAGE_TITLES[currentPage - 1]}
              </p>
            </div>
          </div>

          {/* Center: View Mode Switcher & Page Pill (Visible on sm+) */}
          <div className="hidden sm:flex items-center gap-2 md:gap-3 shrink-0">
            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('single')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'single'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers size={13} />
                <span>Single</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('scroll')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'scroll'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List size={13} />
                <span>All</span>
              </button>
            </div>

            {/* Current Page Indicator */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200 font-mono text-[0.74rem]">
              <span className="text-amber-400 font-bold">{String(currentPage).padStart(2, '0')}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">{String(TOTAL_PAGES).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Right: Actions (Open PDF, Download, Close) - ALWAYS VISIBLE & SHRINK-0 */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-mono text-[0.72rem] sm:text-[0.75rem] font-semibold transition-all cursor-pointer active:scale-95"
              title="Open Original PDF in New Tab"
            >
              <ExternalLink size={13} className="text-amber-400" />
              <span>Open PDF</span>
            </a>

            <a
              href={PDF_URL}
              download={DOWNLOAD_FILENAME}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-[0.72rem] sm:text-[0.75rem] font-bold transition-all shadow-sm cursor-pointer active:scale-95 shrink-0"
              title="Download Full PDF File (340 KB)"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-slate-800 hover:bg-rose-500/25 hover:text-rose-400 text-slate-200 flex items-center justify-center border border-slate-700 transition-all cursor-pointer ml-1 active:scale-95 shrink-0"
              aria-label="Close Reader"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>

        </div>

        {/* Reader Stage Area */}
        <div className="flex-1 relative bg-[#090d16] overflow-y-auto flex items-center justify-center p-3 sm:p-6 custom-scrollbar">
          
          {viewMode === 'single' ? (
            /* Single Page View */
            <div className="relative max-h-full max-w-full flex items-center justify-center">
              
              {/* Previous Page Floating Button */}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="absolute left-2 sm:-left-12 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-white disabled:opacity-20 disabled:pointer-events-none border border-slate-700 flex items-center justify-center shadow-xl transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Previous Page"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Page Display with High-Res Image & Realistic Paper Shadow */}
              <div className="relative group max-h-[70vh] sm:max-h-[74vh] md:max-h-[78vh] flex items-center justify-center">
                <img
                  src={`/philosophy/page_${currentPage}.jpg`}
                  alt={`The Game of Dopamine - Page ${currentPage}`}
                  className="max-h-[70vh] sm:max-h-[74vh] md:max-h-[78vh] w-auto object-contain rounded-lg sm:rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-slate-700/60 transition-transform duration-300"
                  loading="eager"
                />

                {/* Corner Page Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white font-mono text-[0.7rem] font-bold pointer-events-none shadow-md">
                  Page {currentPage} of {TOTAL_PAGES}
                </div>
              </div>

              {/* Next Page Floating Button */}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES))}
                disabled={currentPage === TOTAL_PAGES}
                className="absolute right-2 sm:-right-12 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-white disabled:opacity-20 disabled:pointer-events-none border border-slate-700 flex items-center justify-center shadow-xl transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Next Page"
              >
                <ChevronRight size={22} />
              </button>

            </div>
          ) : (
            /* Continuous All Pages Scroll View */
            <div className="w-full max-w-[820px] mx-auto flex flex-col gap-6 py-4">
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((pageNum) => (
                <div
                  key={pageNum}
                  id={`pdf-page-${pageNum}`}
                  className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700/80 bg-white"
                >
                  <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span className="text-amber-400 font-bold">PAGE {pageNum}</span>
                    <span>{PAGE_TITLES[pageNum - 1]}</span>
                  </div>
                  <img
                    src={`/philosophy/page_${pageNum}.jpg`}
                    alt={`The Game of Dopamine - Page ${pageNum}`}
                    className="w-full h-auto object-contain"
                    loading={pageNum <= 3 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Bottom Thumbnail Strip Navigator */}
        <div className="px-4 py-3 bg-[#1e293b] border-t border-slate-700/80 flex items-center justify-between gap-4 shrink-0 overflow-hidden">
          
          <span className="hidden lg:inline-block font-mono text-[0.72rem] text-slate-400 font-semibold uppercase tracking-wider shrink-0">
            Page Navigator
          </span>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 custom-scrollbar w-full justify-start md:justify-center">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((pageNum) => {
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => {
                    setCurrentPage(pageNum);
                    if (viewMode === 'scroll') {
                      const el = document.getElementById(`pdf-page-${pageNum}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`group relative rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer flex flex-col items-center ${
                    isActive
                      ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20'
                      : 'border-slate-700/80 opacity-60 hover:opacity-100 hover:border-slate-500'
                  }`}
                  aria-label={`Jump to page ${pageNum}`}
                >
                  <img
                    src={`/philosophy/page_${pageNum}.jpg`}
                    alt={`Thumb ${pageNum}`}
                    className="w-10 h-14 sm:w-12 sm:h-16 object-cover bg-slate-900"
                    loading="lazy"
                  />
                  <div
                    className={`w-full py-0.5 text-center font-mono text-[0.62rem] font-bold ${
                      isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {pageNum}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 shrink-0 font-mono text-[0.7rem] text-slate-400">
            <span>Use <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">→</kbd> to turn pages</span>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
};
