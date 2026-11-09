'use client';

import { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Thermometer, TestTube, Wind, Sun } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedCard from '@/components/AnimatedCard';
import AlertManager from '@/components/AlertManager';
import SkeletonCard from '@/components/SkeletonCard';
import SkeletonChart from '@/components/SkeletonChart';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState(24.8);
  const [ph, setPh] = useState(6.8);
  const [co2, setCo2] = useState(30);

  const [chartData, setChartData] = useState([
    { time: '00:00', temp: 24.2 },
    { time: '04:00', temp: 24.1 },
    { time: '08:00', temp: 24.4 },
    { time: '12:00', temp: 24.9 },
    { time: '16:00', temp: 25.2 },
    { time: '20:00', temp: 24.7 },
    { time: '23:00', temp: 24.3 },
  ]);

  const tempRef = useRef(temp);
  const phRef = useRef(ph);
  const co2Ref = useRef(co2);

  useEffect(() => {
    tempRef.current = temp;
    phRef.current = ph;
    co2Ref.current = co2;
  }, [temp, ph, co2]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTemp = tempRef.current;
      const currentPh = phRef.current;
      const currentCo2 = co2Ref.current;

      const newTemp = +(currentTemp + (Math.random() - 0.5) * 0.4).toFixed(1);
      const newPh = +(currentPh + (Math.random() - 0.5) * 0.2).toFixed(1);
      const newCo2 = Math.round(currentCo2 + (Math.random() - 0.5) * 3);

      setTemp(newTemp);
      setPh(newPh);
      setCo2(newCo2);

      localStorage.setItem('currentTemp', newTemp.toString());
      localStorage.setItem('currentPh', newPh.toString());

      setChartData(prev => {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const newPoint = { time: timeString, temp: newTemp };
        const newData = [...prev, newPoint];
        if (newData.length > 8) newData.shift();
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

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
                Понедельник, 12:45 • <span className="text-[var(--accent)]">● Live данные</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {loading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                <>
                  <AnimatedCard delay={0.1}>
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[var(--text-muted)] text-sm font-medium">Температура</span>
                        <Thermometer className="w-6 h-6 text-[var(--accent-warm)] opacity-80" />
                      </div>
                      <h3 className="text-3xl font-bold mb-1 text-[var(--text-primary)] transition-all">{temp}°C</h3>
                      <p className="text-xs text-[var(--accent)] flex items-center gap-1.5 mt-2">
                        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse"></span> Комфортно для растений
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
                </>
              )}
            </div>

            {loading ? (
              <SkeletonChart />
            ) : (
              <AnimatedCard delay={0.5}>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] text-lg">История температуры</h3>
                      <p className="text-xs text-[var(--text-dim)]">Обновляется в реальном времени</p>
                    </div>
                    <button className="text-xs bg-[var(--bg-card)] hover:bg-[var(--border)] px-3 py-1.5 rounded-lg text-[var(--accent)] border border-[var(--border-hover)] transition-colors">
                      Скачать отчет
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
          </div>
        </div>
      </main>
    </>
  );
}