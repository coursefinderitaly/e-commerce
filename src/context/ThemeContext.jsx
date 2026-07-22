import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian',
    color: '#B2502B',
    bg1: '#1C1712', // ink base
    bg2: '#0f0c09',
    blob1: '#B2502B', // rust
    blob2: '#3E4C6D', // indigo
    blob3: '#8A3F56', // berry
    inkRGB: '28, 23, 18',
    paperRGB: '243, 241, 236',
  },
  amethyst: {
    id: 'amethyst',
    name: 'Amethyst',
    color: '#8A3F56',
    bg1: '#1f1035',
    bg2: '#0f0518',
    blob1: '#8A3F56',
    blob2: '#5b2c6f',
    blob3: '#3E4C6D',
    inkRGB: '31, 16, 53',
    paperRGB: '253, 251, 251',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald',
    color: '#79876B',
    bg1: '#0b2b1d',
    bg2: '#051810',
    blob1: '#79876B',
    blob2: '#2c5e3b',
    blob3: '#b29a2b',
    inkRGB: '11, 43, 29',
    paperRGB: '244, 251, 247',
  },
  sapphire: {
    id: 'sapphire',
    name: 'Sapphire',
    color: '#3E4C6D',
    bg1: '#0c1a35',
    bg2: '#050b18',
    blob1: '#3E4C6D',
    blob2: '#1e3a8a',
    blob3: '#4f46e5',
    inkRGB: '12, 26, 53',
    paperRGB: '244, 247, 251',
  }
};

export function ThemeProvider({ children }) {
  const [currentThemeId, setCurrentThemeId] = useState('obsidian');
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-cycle themes
  useEffect(() => {
    if (!isAutoPlay) return;
    const themeKeys = Object.keys(themes);
    const interval = setInterval(() => {
      setCurrentThemeId(prev => {
        const nextIndex = (themeKeys.indexOf(prev) + 1) % themeKeys.length;
        return themeKeys[nextIndex];
      });
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Apply theme variables with transition
  useEffect(() => {
    const theme = themes[currentThemeId];
    const root = document.documentElement;

    root.classList.add('theme-transitioning');

    root.style.setProperty('--color-ink-rgb', theme.inkRGB);
    root.style.setProperty('--color-paper-rgb', theme.paperRGB);
    root.style.setProperty('--theme-bg1', theme.bg1);
    root.style.setProperty('--theme-bg2', theme.bg2);
    root.style.setProperty('--theme-blob1', theme.blob1);
    root.style.setProperty('--theme-blob2', theme.blob2);
    root.style.setProperty('--theme-blob3', theme.blob3);

    const timer = setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentThemeId]);

  // Pause auto-play when user manually selects a theme
  const handleSetTheme = (themeId) => {
    setCurrentThemeId(themeId);
    setIsAutoPlay(false);
  };

  return (
    <ThemeContext.Provider value={{ currentThemeId, setCurrentThemeId: handleSetTheme, themes, isAutoPlay, setIsAutoPlay }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
