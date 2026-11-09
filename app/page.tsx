'use client';

import { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import AnimatedCard from '@/components/AnimatedCard';
import AlertManager from '@/components/AlertManager';

export default function Home() {
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

  return (
    <>
      <AlertManager />
      <main className="min-h-screen bg-[#0D100D] text-[#E5E7E3] flex overflow-hidden font-sans">
        <Sidebar />
        <MobileMenu />

        <div className="flex-1 flex flex-col overflow-y-auto">
          <header className="h-20 border-b border-[#222922] flex items-center justify-between px-8 bg-[#0D100D]/90 backdrop-blur-md sticky top-0 z-10">
            <div>
              <h1 className="text-xl font-semibold text-[#E5E7E3]">Обзор экосистемы</h1>
              <p className="text-xs text-[#6B7365] mt-0.5">
                Понедельник, 12:45 • <span className="text-[#7A9B76]">● Live данные</span>
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-[#C2CCC0]">Природный травник</p>
                <p className="text-xs text-[#6B7365]">Гостиная • 240 литров</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1C241C] border border-[#2C362C] flex items-center justify-center text-lg cursor-pointer hover:border-[#7A9B76]/50 transition-colors">
                👤
              </div>
            </div>
          </header>

          <div className="p-8 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <AnimatedCard delay={0.1}>
                <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 shadow-sm hover:border-[#7A9B76]/40 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[#8F978B] text-sm font-medium">Температура</span>
                    <span className="text-xl opacity-70">🌡️</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1 text-[#E5E7E3] transition-all">{temp}°C</h3>
                  <p className="text-xs text-[#7A9B76] flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 bg-[#7A9B76] rounded-full animate-pulse"></span> Комфортно для растений
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 shadow-sm hover:border-[#6B8C96]/40 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[#8F978B] text-sm font-medium">Уровень pH</span>
                    <span className="text-xl opacity-70">🧪</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1 text-[#E5E7E3] transition-all">{ph}</h3>
                  <p className="text-xs text-[#8F978B] mt-2">Идеально для травника</p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 shadow-sm hover:border-[#8DA378]/40 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[#8F978B] text-sm font-medium">Уровень CO2</span>
                    <span className="text-xl opacity-70">🫧</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1 text-[#E5E7E3] transition-all">{co2} ppm</h3>
                  <p className="text-xs text-[#8F978B] mt-2">Подача включена</p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 shadow-sm hover:border-[#C2A878]/40 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[#8F978B] text-sm font-medium">Освещение</span>
                    <span className="text-xl opacity-70">☀️</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1 text-[#E5E7E3]">75%</h3>
                  <p className="text-xs text-[#C2A878] mt-2">Режим: Полдень</p>
                </div>
              </AnimatedCard>
            </div>

            <AnimatedCard delay={0.5}>
              <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-[#E5E7E3] text-lg">История температуры</h3>
                    <p className="text-xs text-[#6B7365]">Обновляется в реальном времени</p>
                  </div>
                  <button className="text-xs bg-[#1C241C] hover:bg-[#222922] px-3 py-1.5 rounded-lg text-[#A3B8A0] border border-[#2C362C] transition-colors">
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
                      <CartesianGrid strokeDasharray="3 3" stroke="#222922" vertical={false} />
                      <XAxis dataKey="time" stroke="#6B7365" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#6B7365" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111511', border: '1px solid #222922', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                        labelStyle={{ color: '#E5E7E3', fontWeight: 'bold', marginBottom: '4px' }}
                        itemStyle={{ color: '#7A9B76' }}
                        cursor={{ stroke: '#222922', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Area type="monotone" dataKey="temp" stroke="#7A9B76" strokeWidth={2.5} fill="url(#colorTemp)" activeDot={{ r: 5, fill: '#E5E7E3', stroke: '#7A9B76', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </main>
    </>
  );
}