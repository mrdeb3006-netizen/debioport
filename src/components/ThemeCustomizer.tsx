import React, { useState, useRef, useEffect } from 'react';
import {
  Palette,
  X,
  RotateCcw,
  Sparkles,
  Sliders,
  Check,
} from 'lucide-react';
import {
  useTheme,
  ACCENT_PRESETS,
  BG_PRESETS,
  THEME_COMBOS,
} from '../context/ThemeContext';

export const ThemeCustomizer: React.FC = () => {
  const { theme, setAccent, setBgDark, setThemeCombo, resetToDefault, isDefault } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative z-30 inline-block font-main">
      {/* Home Page Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-accent-orange/50 transition-all duration-300 shadow-lg cursor-pointer backdrop-blur-md"
        title="Open Theme Studio • Customize Accent & Background Colors"
        aria-label="Customize Color Theme"
      >
        {/* Dual Swatch Indicator */}
        <div className="flex items-center -space-x-1.5">
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
            style={{ backgroundColor: theme.accent }}
          />
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-sm"
            style={{ backgroundColor: theme.bgDark }}
          />
        </div>

        <span className="font-mono text-[0.78rem] font-bold text-slate-200 group-hover:text-white tracking-wider uppercase">
          THEME STUDIO
        </span>

        <Sliders size={14} className="text-accent-orange group-hover:rotate-45 transition-transform duration-300" />
      </button>

      {/* Floating Theme Control Panel Drawer */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute left-0 top-full mt-3 w-[340px] sm:w-[380px] rounded-2xl p-5 border border-white/15 bg-[#0e0f18]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(0,0,0,0.5)] z-50 animate-fade-in text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent-orange/15 border border-accent-orange/30 flex items-center justify-center text-accent-orange">
                <Palette size={15} />
              </div>
              <div>
                <h4 className="font-display font-bold text-[0.95rem] leading-none text-white">
                  Color Studio
                </h4>
                <p className="font-mono text-[0.68rem] text-text-muted mt-0.5">
                  Real-time custom palette engine
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {!isDefault && (
                <button
                  type="button"
                  onClick={resetToDefault}
                  className="p-1.5 rounded-lg text-text-muted hover:text-accent-orange hover:bg-white/[0.06] transition-colors"
                  title="Reset to default Ember Orange & Obsidian"
                >
                  <RotateCcw size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Close Theme Studio"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
            {/* 1. Quick Curated Combos */}
            <div>
              <label className="block font-mono text-[0.72rem] font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles size={12} className="text-accent-orange" />
                <span>Curated Combos</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {THEME_COMBOS.map((combo) => {
                  const isSelected =
                    theme.accent.toLowerCase() === combo.accent.toLowerCase() &&
                    theme.bgDark.toLowerCase() === combo.bgDark.toLowerCase();

                  return (
                    <button
                      key={combo.name}
                      type="button"
                      onClick={() => setThemeCombo(combo.accent, combo.bgDark)}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-accent-orange bg-accent-orange/15 shadow-sm'
                          : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center -space-x-1 shrink-0">
                        <span
                          className="w-3 h-3 rounded-full border border-white/20 shadow-xs"
                          style={{ backgroundColor: combo.accent }}
                        />
                        <span
                          className="w-3 h-3 rounded-full border border-white/20 shadow-xs"
                          style={{ backgroundColor: combo.bgDark }}
                        />
                      </div>
                      <span className="text-[0.72rem] font-medium text-slate-200 truncate">
                        {combo.name.split(' (')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Custom Accent Color */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[0.72rem] font-bold text-text-secondary uppercase tracking-wider">
                  Accent Color (Highlights)
                </label>
                <span className="font-mono text-[0.72rem] text-accent-orange font-semibold">
                  {theme.accent.toUpperCase()}
                </span>
              </div>

              {/* Accent Preset Swatches */}
              <div className="grid grid-cols-8 gap-1.5 mb-2.5">
                {ACCENT_PRESETS.map((preset) => {
                  const isSelected = theme.accent.toLowerCase() === preset.color.toLowerCase();
                  return (
                    <button
                      key={preset.color}
                      type="button"
                      onClick={() => setAccent(preset.color)}
                      className={`h-7 rounded-lg relative transition-all duration-200 flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-white scale-110 shadow-md'
                          : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: preset.color }}
                      title={preset.name}
                    >
                      {isSelected && <Check size={12} className={preset.color === '#ffffff' ? 'text-black' : 'text-white'} />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Color Input for Accent */}
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl p-2">
                <input
                  type="color"
                  value={theme.accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                  aria-label="Custom Accent Color Picker"
                />
                <input
                  type="text"
                  value={theme.accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="flex-1 bg-transparent font-mono text-[0.8rem] text-white focus:outline-none uppercase"
                  placeholder="#Hex Code"
                />
                <span className="font-mono text-[0.68rem] text-text-muted">Custom Hex</span>
              </div>
            </div>

            {/* 3. Custom Background Tone */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[0.72rem] font-bold text-text-secondary uppercase tracking-wider">
                  Canvas Background Tone
                </label>
                <span className="font-mono text-[0.72rem] text-slate-300 font-semibold">
                  {theme.bgDark.toUpperCase()}
                </span>
              </div>

              {/* Background Preset Swatches */}
              <div className="grid grid-cols-6 gap-1.5 mb-2.5">
                {BG_PRESETS.map((preset) => {
                  const isSelected = theme.bgDark.toLowerCase() === preset.color.toLowerCase();
                  return (
                    <button
                      key={preset.color}
                      type="button"
                      onClick={() => setBgDark(preset.color)}
                      className={`h-7 rounded-lg border relative transition-all duration-200 flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-accent-orange ring-1 ring-accent-orange scale-105 shadow-md'
                          : 'border-white/15 hover:border-white/40'
                      }`}
                      style={{ backgroundColor: preset.color }}
                      title={preset.name}
                    >
                      {isSelected && <Check size={11} className="text-white" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Color Input for Background */}
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl p-2">
                <input
                  type="color"
                  value={theme.bgDark}
                  onChange={(e) => setBgDark(e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                  aria-label="Custom Background Color Picker"
                />
                <input
                  type="text"
                  value={theme.bgDark}
                  onChange={(e) => setBgDark(e.target.value)}
                  className="flex-1 bg-transparent font-mono text-[0.8rem] text-white focus:outline-none uppercase"
                  placeholder="#Hex Code"
                />
                <span className="font-mono text-[0.68rem] text-text-muted">Custom Hex</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-white/[0.08]">
              <span className="font-mono text-[0.68rem] text-text-muted">
                ⚡ Changes apply instantly across site
              </span>

              {!isDefault && (
                <button
                  type="button"
                  onClick={resetToDefault}
                  className="inline-flex items-center gap-1 text-[0.72rem] font-mono text-accent-orange hover:underline cursor-pointer"
                >
                  <RotateCcw size={11} />
                  <span>Reset Default</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
