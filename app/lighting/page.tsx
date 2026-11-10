'use client';

import { useState } from 'react';
import { User, Sun, Moon, Lightbulb } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedCard from '@/components/AnimatedCard';

export default function LightingPage() {
  const [intensity, setIntensity] = useState(75);
  const [scheduleStart] = useState(6);
  const [scheduleEnd] = useState(18);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getBarHeight = (hour: number) => {
    if (hour < scheduleStart || hour >= scheduleEnd) return 0;
    const progress = (hour - scheduleStart) / (scheduleEnd - scheduleStart);
    return Math.sin(progress * Math.PI) * intensity;
  };

  const getCurrentPhase = () => {
    const now = new Date().getHours();
    if (now < scheduleStart || now >= scheduleEnd) return { label: 'Ночь', icon: Moon, color: 'var(--accent-blue)' };
    const progress = (now - scheduleStart) / (scheduleEnd - scheduleStart);
    const phase = Math.sin(progress * Math.PI);
    if (phase < 0.3) return { label: 'Рассвет/Закат', icon: Sun, color: 'var(--accent-warm)' };
    return { label: 'Полдень', icon: Sun, color: 'var(--accent)' };
  };

  const currentPhase = getCurrentPhase();
  const PhaseIcon = currentPhase.icon;

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
          {/* Текущий режим */}
          <AnimatedCard delay={0.1}>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Текущий режим</h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    {currentPhase.label} • Интенсивность {intensity}%
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: currentPhase.color }}></div>
                  <span className="text-sm font-medium" style={{ color: currentPhase.color }}>Активно</span>
                </div>
              </div>

              {/* Превью — шкала спектра */}
              <div className="h-32 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] p-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <PhaseIcon className="w-12 h-12 mx-auto mb-2" style={{ color: currentPhase.color }} />
                    <p className="text-sm text-[var(--text-muted)]">
                      {currentPhase.label} • {intensity}% • 6500K
                    </p>
                  </div>
                </div>
                {/* Шкала спектра */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF6B35] via-[#FFD700] to-[#87CEEB]"></div>
              </div>
            </div>
          </AnimatedCard>

          {/* Световой цикл */}
          <AnimatedCard delay={0.2}>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Световой цикл (24 часа)</h3>

              <div className="h-64 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] p-6 relative">
                <div className="absolute inset-0 flex items-end justify-between px-6 pb-8">
                  {hours.map((hour) => {
                    const height = getBarHeight(hour);
                    const isNight = hour < scheduleStart || hour >= scheduleEnd;
                    return (
                      <div key={hour} className="flex-1 flex flex-col items-center justify-end h-full">
                        <div
                          className={`w-full rounded-t transition-all ${
                            isNight
                              ? 'bg-[var(--accent-blue)]/20 border border-[var(--accent-blue)]/30'
                              : 'bg-gradient-to-t from-[var(--accent-warm)]/60 to-[var(--accent-warm)]/20 hover:from-[var(--accent-warm)]/80 hover:to-[var(--accent-warm)]/40'
                          }`}
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
                  <div className="w-3 h-3 bg-[var(--accent-blue)]/20 border border-[var(--accent-blue)]/30 rounded"></div>
                  <span>Ночь</span>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Управление */}
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

          {/* Ползунок интенсивности */}
          <AnimatedCard delay={0.6}>
            <div className="mt-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">Интенсивность света</h3>
                  <p className="text-xs text-[var(--text-dim)]">Текущее значение: {intensity}%</p>
                </div>
                <Lightbulb className="w-8 h-8 text-[var(--accent-warm)]" />
              </div>

              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--bg-primary)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-warm)]"
                  style={{
                    background: `linear-gradient(to right, var(--accent-warm) ${intensity}%, var(--bg-primary) ${intensity}%)`,
                  }}
                />
                <div className="flex justify-between mt-2 text-xs text-[var(--text-dim)]">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </main>
  );
}