import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ThemeConfig {
  accent: string;
  bgDark: string;
}

export const DEFAULT_THEME: ThemeConfig = {
  accent: '#f97316', // Default Amber Orange
  bgDark: '#09090b', // Default Deep Obsidian Black
};

export const ACCENT_PRESETS = [
  { name: 'Ember Orange (Default)', color: '#f97316' },
  { name: 'Deep Blue', color: '#1d4ed8' },
  { name: 'Electric Blue', color: '#2563eb' },
  { name: 'Cyan Wave', color: '#06b6d4' },
  { name: 'Burgundy Wine', color: '#881337' },
  { name: 'Matrix Emerald', color: '#10b981' },
  { name: 'Royal Violet', color: '#a855f7' },
  { name: 'Rose Crimson', color: '#f43f5e' },
  { name: 'Solar Gold', color: '#eab308' },
  { name: 'Pure White', color: '#ffffff' },
];

export const BG_PRESETS = [
  { name: 'Deep Obsidian (Default)', color: '#09090b' },
  { name: 'Pure AMOLED Black', color: '#000000' },
  { name: 'Dark Navy Blue', color: '#050c1e' },
  { name: 'Deep Burgundy', color: '#1a050b' },
  { name: 'Dark Charcoal', color: '#121216' },
  { name: 'Crisp White', color: '#f8fafc' },
  { name: 'Pure White', color: '#ffffff' },
  { name: 'Warm Alabaster', color: '#faf8f6' },
];

export const THEME_COMBOS = [
  { name: 'Ember & Obsidian (Default)', accent: '#f97316', bgDark: '#09090b' },
  { name: 'White & Deep Blue', accent: '#1d4ed8', bgDark: '#f8fafc' },
  { name: 'White & Cyan', accent: '#0891b2', bgDark: '#f8fafc' },
  { name: 'White & Burgundy', accent: '#881337', bgDark: '#faf8f7' },
  { name: 'White & Electric Blue', accent: '#2563eb', bgDark: '#ffffff' },
  { name: 'Dark Navy Blue', accent: '#38bdf8', bgDark: '#050c1e' },
  { name: 'Cyber Cyan & AMOLED', accent: '#06b6d4', bgDark: '#000000' },
  { name: 'Matrix Emerald & Forest', accent: '#10b981', bgDark: '#05110a' },
  { name: 'Royal Violet & Navy', accent: '#a855f7', bgDark: '#070b19' },
  { name: 'Deep Burgundy & White', accent: '#ffffff', bgDark: '#1a050b' },
];

interface ThemeContextType {
  theme: ThemeConfig;
  setAccent: (color: string) => void;
  setBgDark: (color: string) => void;
  setThemeCombo: (accent: string, bgDark: string) => void;
  resetToDefault: () => void;
  isDefault: boolean;
  isLightMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) {
    return { r: 9, g: 9, b: 11 };
  }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Calculate luminance to auto-detect light vs dark mode
function getLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

// Adjust brightness
function adjustBrightness(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const adjust = (val: number) => Math.min(255, Math.max(0, Math.round(val + (255 * percent) / 100)));
  const nr = adjust(r).toString(16).padStart(2, '0');
  const ng = adjust(g).toString(16).padStart(2, '0');
  const nb = adjust(b).toString(16).padStart(2, '0');
  return `#${nr}${ng}${nb}`;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    try {
      const savedAccent = localStorage.getItem('portfolio_accent_color');
      const savedBg = localStorage.getItem('portfolio_bg_color');
      return {
        accent: savedAccent || DEFAULT_THEME.accent,
        bgDark: savedBg || DEFAULT_THEME.bgDark,
      };
    } catch {
      return DEFAULT_THEME;
    }
  });

  const isLightMode = getLuminance(theme.bgDark) > 0.6;

  // Apply theme variables dynamically to the document
  useEffect(() => {
    const root = document.documentElement;
    const { accent, bgDark } = theme;
    const isLight = getLuminance(bgDark) > 0.6;

    if (isLight) {
      // Light Mode dynamic tokens
      root.style.setProperty('--bg-dark', bgDark);
      root.style.setProperty('--bg-surface', '#ffffff');
      root.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.94)');
      root.style.setProperty('--bg-glass', 'rgba(244, 244, 248, 0.85)');
      root.style.setProperty('--text-primary', '#09090b');
      root.style.setProperty('--text-secondary', '#3f3f46');
      root.style.setProperty('--text-muted', '#71717a');
    } else {
      // Dark Mode dynamic tokens
      const bgSurface = adjustBrightness(bgDark, 4);
      const { r: br, g: bg, b: bb } = hexToRgb(bgDark);
      const bgCard = `rgba(${Math.min(255, br + 7)}, ${Math.min(255, bg + 7)}, ${Math.min(255, bb + 11)}, 0.88)`;
      const bgGlass = `rgba(${Math.min(255, br + 9)}, ${Math.min(255, bg + 9)}, ${Math.min(255, bb + 15)}, 0.7)`;

      root.style.setProperty('--bg-dark', bgDark);
      root.style.setProperty('--bg-surface', bgSurface);
      root.style.setProperty('--bg-card', bgCard);
      root.style.setProperty('--bg-glass', bgGlass);
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#a1a1aa');
      root.style.setProperty('--text-muted', '#71717a');
    }

    // Set accent colors
    root.style.setProperty('--accent-orange', accent);
    root.style.setProperty('--accent-cyan', accent);
    root.style.setProperty('--accent-blue', accent);
    root.style.setProperty('--accent-purple', accent);
    root.style.setProperty('--accent-violet', accent);
    root.style.setProperty('--accent-magenta', accent);
    root.style.setProperty('--grad-btn-primary', accent);
    root.style.setProperty('--grad-nav-active', accent);

    document.body.style.backgroundColor = bgDark;

    // Save to localStorage
    try {
      localStorage.setItem('portfolio_accent_color', accent);
      localStorage.setItem('portfolio_bg_color', bgDark);
    } catch (e) {
      console.warn('Could not save theme to localStorage:', e);
    }
  }, [theme]);

  const setAccent = (accent: string) => {
    setThemeState(prev => ({ ...prev, accent }));
  };

  const setBgDark = (bgDark: string) => {
    setThemeState(prev => ({ ...prev, bgDark }));
  };

  const setThemeCombo = (accent: string, bgDark: string) => {
    setThemeState({ accent, bgDark });
  };

  const resetToDefault = () => {
    setThemeState(DEFAULT_THEME);
  };

  const isDefault =
    theme.accent.toLowerCase() === DEFAULT_THEME.accent.toLowerCase() &&
    theme.bgDark.toLowerCase() === DEFAULT_THEME.bgDark.toLowerCase();

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setAccent,
        setBgDark,
        setThemeCombo,
        resetToDefault,
        isDefault,
        isLightMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
