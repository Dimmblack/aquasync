'use client';

import { useState, useEffect } from 'react';
import { User, Thermometer, TestTube, Wind, Droplets, FlaskConical, Leaf } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedCard from '@/components/AnimatedCard';
import SkeletonCard from '@/components/SkeletonCard';
import SkeletonChart from '@/components/SkeletonChart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ClimatePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const sensors = [
    { label: 'Температура', value: '24.8°C', status: 'Норма', color: 'var(--accent)', icon: Thermometer, detail: 'Целевой диапазон: 23-26°C' },
    { label: 'pH', value: '6.8', status: 'Идеально', color: 'var(--accent-blue)', icon: TestTube, detail: 'Для травника: 6.0-7.0' },
    { label: 'CO2', value: '30 ppm', status: 'Подача вкл.', color: 'var(--accent-green)', icon: Wind, detail: 'Пузырьков: 2 в сек' },
    { label: 'TDS', value: '142 ppm', status: 'Норма', color: 'var(--accent-warm)', icon: Droplets, detail: 'Общая минерализация' },
    { label: 'KH', value: '4°dH', status: 'Норма', color: 'var(--accent-purple)', icon: FlaskConical, detail: 'Карбонатная жёсткость' },
    { label: 'NO3', value: '5 ppm', status: 'Отлично', color: 'var(--accent)', icon: Leaf, detail: 'Нитраты в пределах нормы' },
  ];

  const chartData = [
    { time: '00:00', temp: 24.2 },
    { time: '04:00', temp: 24.1 },
    { time: '08:00', temp: 24.4 },
    { time: '12:00', temp: 24.9 },
    { time: '16:00', temp: 25.2 },
    { time: '20:00', temp: 24.7 },
    { time: '23:00', temp: 24.3 },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex overflow-hidden font-sans">
      <Sidebar />
      <MobileMenu />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 border-b border-[var(--border)] flex items-center justify-between px-8 bg-[var(--bg-primary)]/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">Климат и вода</h1>
            <p className="text-xs text-[var(--text-dim)] mt-0.5">Детальная аналитика по всем датчикам</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              sensors.map((sensor, index) => {
                const Icon = sensor.icon;
                return (
                  <AnimatedCard key={sensor.label} delay={0.1 + index * 0.1}>
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[var(--text-muted)] text-sm font-medium">{sensor.label}</span>
                        <Icon className="w-6 h-6 opacity-70 transition-opacity" style={{ color: sensor.color }} />
                      </div>
                      <h3 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">{sensor.value}</h3>
                      <p className="text-xs font-medium mb-1" style={{ color: sensor.color }}>{sensor.status}</p>
                      <p className="text-xs text-[var(--text-dim)]">{sensor.detail}</p>
                    </div>
                  </AnimatedCard>
                );
              })
            )}
          </div>

          {loading ? (
            <SkeletonChart />
          ) : (
            <AnimatedCard delay={0.7}>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-lg">История температуры</h3>
                    <p className="text-xs text-[var(--text-dim)]">Последние 24 часа</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs bg-[var(--bg-card)] px-3 py-1.5 rounded-lg text-[var(--accent)] border border-[var(--border-hover)]">24ч</button>
                    <button className="text-xs bg-[var(--bg-primary)] px-3 py-1.5 rounded-lg text-[var(--text-dim)] border border-[var(--border)] hover:text-[var(--accent)] transition-colors">7д</button>
                    <button className="text-xs bg-[var(--bg-primary)] px-3 py-1.5 rounded-lg text-[var(--text-dim)] border border-[var(--border)] hover:text-[var(--accent)] transition-colors">30д</button>
                  </div>
                </div>
                <div style={{ width: '100%', height: 320 }} className="mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7A9B76" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#7A9B76" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="time" stroke="var(--text-dim)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
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

          {!loading && (
            <>
              <AnimatedCard delay={0.8}>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-6">Уровень pH — шкала</h3>
                  <div className="relative h-12 bg-gradient-to-r from-[var(--accent-warm)] via-[var(--accent)] to-[var(--accent-blue)] rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 h-full w-1 bg-[var(--text-primary)] shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                      style={{ left: '40%' }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--bg-card)] border border-[var(--border-hover)] px-2 py-1 rounded text-xs font-bold text-[var(--text-primary)] whitespace-nowrap">
                        6.8
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-[var(--text-dim)]">
                    <span>0 (кислая)</span>
                    <span>7 (нейтральная)</span>
                    <span>14 (щелочная)</span>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.9}>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] text-lg">История подмен воды</h3>
                      <p className="text-xs text-[var(--text-dim)]">Последние 4 недели</p>
                    </div>
                    <button className="text-xs bg-[var(--bg-card)] hover:bg-[var(--border)] px-3 py-1.5 rounded-lg text-[var(--accent)] border border-[var(--border-hover)] transition-colors">
                      + Записать подмену
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { date: '05 ноября', volume: '25%', note: 'Плановая подмена' },
                      { date: '28 октября', volume: '30%', note: 'После скачка NO3' },
                      { date: '21 октября', volume: '25%', note: 'Плановая подмена' },
                      { date: '14 октября', volume: '20%', note: 'Плановая подмена' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[var(--bg-card)] rounded-lg flex items-center justify-center">
                            <Droplets className="w-5 h-5 text-[var(--accent-blue)]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">{item.date}</p>
                            <p className="text-xs text-[var(--text-dim)]">{item.note}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[var(--accent-blue)]">{item.volume}</p>
                          <p className="text-xs text-[var(--text-dim)]">объёма</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </>
          )}
        </div>
      </div>
    </main>
  );
}