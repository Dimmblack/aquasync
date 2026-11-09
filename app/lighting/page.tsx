'use client';

import { User, Sprout } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedCard from '@/components/AnimatedCard';

export default function LightingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex overflow-hidden font-sans">
      <Sidebar />
      <MobileMenu />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 border-b border-[var(--border)] flex items-center justify-between px-8 bg-[var(--bg-primary)]/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">Управление освещением</h1>
            <p className="text-xs text-[var(--text-dim)] mt-0.5">Настройка светового цикла</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-[var(--text-secondary)]">Природный травник</p>
              <p className="text-xs text-[var(--text-dim)]">Гостиная • 240 литров</p>
            </div>
            <ThemeToggle />
            <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-hover)] flex items-center justify-center cursor-pointer hover:border-[var(--accent)]/50 transition-colors">
              <User className="w-5 h-5 text-[var(--accent)]" />
            </div>
          </div>
        </header>

        <div className="p-8 flex-1">
          <AnimatedCard delay={0.1}>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Текущий режим</h2>
                  <p className="text-sm text-[var(--text-muted)]">Полдень • Интенсивность 75%</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[var(--accent-warm)] rounded-full animate-pulse"></div>
                  <span className="text-sm text-[var(--accent-warm)] font-medium">Активно</span>
                </div>
              </div>
              
              <div className="h-48 bg-gradient-to-b from-[var(--accent-warm)]/20 to-[var(--bg-primary)] rounded-xl border border-[var(--border)] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/10 to-transparent"></div>
                <div className="text-center z-10">
                  <Sprout className="w-16 h-16 text-[var(--accent)] mx-auto mb-2" />
                  <p className="text-sm text-[var(--text-muted)]">Превью: полный спектр, 6500K</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Световой цикл (24 часа)</h3>
              
              <div className="h-64 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] p-6 relative">
                <div className="absolute inset-0 flex items-end justify-between px-6 pb-8">
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i;
                    let height = 0;
                    if (hour >= 6 && hour <= 18) {
                      height = Math.sin(((hour - 6) / 12) * Math.PI) * 100;
                    }
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                        <div 
                          className="w-full bg-gradient-to-t from-[var(--accent-warm)]/60 to-[var(--accent-warm)]/20 rounded-t transition-all hover:from-[var(--accent-warm)]/80 hover:to-[var(--accent-warm)]/40 cursor-pointer"
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="absolute bottom-2 left-6 right-6 flex justify-between text-xs text-[var(--text-dim)]">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:00</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 mt-4 text-sm text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[var(--accent-warm)]/60 rounded"></div>
                  <span>Свет включён</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[var(--border)] rounded"></div>
                  <span>Ночь</span>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard delay={0.3}>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                <h4 className="text-sm font-medium text-[var(--text-muted)] mb-3">Рассвет</h4>
                <p className="text-2xl font-bold text-[var(--text-primary)] mb-2">06:00</p>
                <p className="text-xs text-[var(--text-dim)]">Плавное включение за 30 мин</p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                <h4 className="text-sm font-medium text-[var(--text-muted)] mb-3">Закат</h4>
                <p className="text-2xl font-bold text-[var(--text-primary)] mb-2">18:00</p>
                <p className="text-xs text-[var(--text-dim)]">Плавное выключение за 30 мин</p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.5}>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                <h4 className="text-sm font-medium text-[var(--text-muted)] mb-3">Ночной режим</h4>
                <p className="text-2xl font-bold text-[var(--text-primary)] mb-2">22:00 - 06:00</p>
                <p className="text-xs text-[var(--text-dim)]">Синий спектр 5%</p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </main>
  );
}