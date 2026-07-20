import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeSwitcher({ variant = 'floating', className = '' }) {
  const { currentThemeId, setCurrentThemeId, themes } = useTheme();

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-1.5 bg-ink/40 backdrop-blur-md p-1.5 rounded-full border border-paper/10 ${className}`}>
        {Object.values(themes).map((theme) => (
          <button
            key={theme.id}
            onClick={() => setCurrentThemeId(theme.id)}
            className="relative w-4 h-4 rounded-full group outline-none focus:outline-none flex items-center justify-center transition-transform hover:scale-110"
            style={{ backgroundColor: theme.color }}
            title={`Switch to ${theme.name} theme`}
          >
            {currentThemeId === theme.id && (
              <motion.div
                layoutId="activeThemeDotInline"
                className="absolute inset-0 rounded-full border-[2px] border-paper"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-2.5 bg-ink/30 backdrop-blur-xl p-2 rounded-full border border-paper/10 shadow-2xl ${className}`}>
      {Object.values(themes).map((theme) => (
        <button
          key={theme.id}
          onClick={() => setCurrentThemeId(theme.id)}
          className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full group outline-none focus:outline-none flex items-center justify-center transition-transform hover:scale-110"
          style={{ backgroundColor: theme.color }}
          title={`Switch to ${theme.name} theme`}
        >
          {currentThemeId === theme.id && (
            <motion.div
              layoutId="activeThemeDotFloating"
              className="absolute inset-0 rounded-full border-[2px] border-paper"
              initial={false}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          )}
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 px-2 py-1 bg-ink/80 text-paper text-[10px] uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-md border border-paper/10">
            {theme.name}
          </div>
        </button>
      ))}
    </div>
  );
}
