'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center cursor-pointer hover:border-[var(--accent)]/50 transition-colors"
      aria-label="Переключить тему"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-[var(--text-muted)]" />
      ) : (
        <Moon className="w-5 h-5 text-[var(--text-muted)]" />
      )}
    </button>
  );
}