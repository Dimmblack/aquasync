'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Thermometer, TestTube, Wind, Sun, Download } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedCard from '@/components/AnimatedCard';
import AlertManager from '@/components/AlertManager';
import SkeletonCard from '@/components/SkeletonCard';
import SkeletonChart from '@/components/SkeletonChart';
import { useTelemetry } from '@/lib/useTelemetry';
import type { Sample } from '@/lib/telemetry';

function downloadCsv(samples: Sample[]) {
  const rows = [
    'timestamp,temp_c,ph,co2_ppm',
    ...samples.map((s) => `${new Date(s.t).toISOString()},${s.temp},${s.ph},${s.co2}`),
  ];
  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `aquasync-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Home() {
  const { samples, last, ready } = useTelemetry();

  const chartData = samples.map((s) => ({
    label: new Date(s.t).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    temp: s.temp,
  }));

  const temp = last?.temp ?? 24.8;
  const ph = last?.ph ?? 6.8;
  const co2 = last?.co2 ?? 30;

  return (
    <>
      <AlertManager />
      <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex overflow-hidden font-sans">
        <Sidebar />
        <MobileMenu />

        <div className="flex-1 flex flex-col overflow-y-auto">
          <header className="h-20 border-b border-[var(--border)] flex items-center justify-between px-8 bg-[var(--bg-primary)]/90 backdrop-blur-md sticky top-0 z-10">
            <div>
              <h1 className="text-xl font-semibold text-[var(--text-primary)]">Обзор экосистемы</h1>
              <p className="text-xs text-[var(--text-dim)] mt-0.5">
                Данные обновляются каждые 5 сек • <span className="text-[var(--accent)]">● Live</span>
              </p>
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
            {!ready ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <AnimatedCard delay={0.1}>
                  <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[var(--text-muted)] text-sm font-medium">Температура</span>
                      <Thermometer className="w-6 h-6 text-[var(--accent-warm)] opacity-80" />
                    </div>
                    <h3 className="text-3xl font-bold mb-1 text-[var(--text-primary)] transition-all">{temp}°C</h3>
                    <p className="text-xs text-[var(--accent)] flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse"></span> Комфортно
                    </p>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.2}>
                  <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[var(--text-muted)] text-sm font-medium">Уровень pH</span>
                      <TestTube className="w-6 h-6 text-[var(--accent-blue)] opacity-80" />
                    </div>
                    <h3 className="text-3xl font-bold mb-1 text-[var(--text-primary)] transition-all">{ph}</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-2">Идеально для травника</p>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.3}>
                  <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[var(--text-muted)] text-sm font-medium">Уровень CO2</span>
                      <Wind className="w-6 h-6 text-[var(--accent-green)] opacity-80" />
                    </div>
                    <h3 className="text-3xl font-bold mb-1 text-[var(--text-primary)] transition-all">{co2} ppm</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-2">Подача включена</p>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.4}>
                  <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[var(--text-muted)] text-sm font-medium">Освещение</span>
                      <Sun className="w-6 h-6 text-[var(--accent-warm)] opacity-80" />
                    </div>
                    <h3 className="text-3xl font-bold mb-1 text-[var(--text-primary)]">75%</h3>
                    <p className="text-xs text-[var(--accent-warm)] mt-2">Режим: Полдень</p>
                  </div>
                </AnimatedCard>
              </div>
            )}

            {!ready ? (
              <SkeletonChart />
            ) : (
              <AnimatedCard delay={0.5}>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] text-lg">История температуры (24ч)</h3>
                      <p className="text-xs text-[var(--text-dim)]">Шаг дискретизации: 5 минут</p>
                    </div>
                    <button 
                      onClick={() => downloadCsv(samples)}
                      className="flex items-center gap-2 text-xs bg-[var(--bg-card)] hover:bg-[var(--border)] px-3 py-1.5 rounded-lg text-[var(--accent)] border border-[var(--border-hover)] transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      Скачать отчёт
                    </button>
                  </div>
                  <div style={{ width: '100%', height: 320 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7A9B76" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#7A9B76" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        {/* interval={47} прореживает подписи, чтобы 288 точек не наложились */}
                        <XAxis dataKey="label" interval={47} stroke="var(--text-dim)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="var(--text-dim)" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                          labelStyle={{ color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '4px' }}
                          itemStyle={{ color: '#7A9B76' }}
                          cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area type="monotone" dataKey="temp" stroke="#7A9B76" strokeWidth={2.5} fill="url(#colorTemp)" activeDot={{ r: 5, fill: 'var(--text-primary)', stroke: '#7A9B76', strokeWidth: 2 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </AnimatedCard>
            )}
          </div>
        </div>
      </main>
    </>
  );
}