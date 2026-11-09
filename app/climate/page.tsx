'use client';

import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import AnimatedCard from '@/components/AnimatedCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ClimatePage() {
  const sensors = [
    { label: 'Температура', value: '24.8°C', status: 'Норма', color: '#7A9B76', icon: '🌡️', detail: 'Целевой диапазон: 23-26°C' },
    { label: 'pH', value: '6.8', status: 'Идеально', color: '#6B8C96', icon: '🧪', detail: 'Для травника: 6.0-7.0' },
    { label: 'CO2', value: '30 ppm', status: 'Подача вкл.', color: '#8DA378', icon: '🫧', detail: 'Пузырьков: 2 в сек' },
    { label: 'TDS', value: '142 ppm', status: 'Норма', color: '#C2A878', icon: '💧', detail: 'Общая минерализация' },
    { label: 'KH', value: '4°dH', status: 'Норма', color: '#9B7A9B', icon: '⚗️', detail: 'Карбонатная жёсткость' },
    { label: 'NO3', value: '5 ppm', status: 'Отлично', color: '#7A9B76', icon: '🌱', detail: 'Нитраты в пределах нормы' },
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
    <main className="min-h-screen bg-[#0D100D] text-[#E5E7E3] flex overflow-hidden font-sans">
      <Sidebar />
      <MobileMenu />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 border-b border-[#222922] flex items-center justify-between px-8 bg-[#0D100D]/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-[#E5E7E3]">Климат и вода</h1>
            <p className="text-xs text-[#6B7365] mt-0.5">Детальная аналитика по всем датчикам</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {sensors.map((sensor, index) => (
              <AnimatedCard key={sensor.label} delay={0.1 + index * 0.1}>
                <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 hover:border-[#2C362C] transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[#8F978B] text-sm font-medium">{sensor.label}</span>
                    <span className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity">{sensor.icon}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-[#E5E7E3]">{sensor.value}</h3>
                  <p className="text-xs font-medium mb-1" style={{ color: sensor.color }}>{sensor.status}</p>
                  <p className="text-xs text-[#6B7365]">{sensor.detail}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedCard delay={0.7}>
            <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 mb-8">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold text-[#E5E7E3] text-lg">История температуры</h3>
                  <p className="text-xs text-[#6B7365]">Последние 24 часа</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs bg-[#1C241C] px-3 py-1.5 rounded-lg text-[#A3B8A0] border border-[#2C362C]">24ч</button>
                  <button className="text-xs bg-[#0D100D] px-3 py-1.5 rounded-lg text-[#6B7365] border border-[#222922] hover:text-[#A3B8A0] transition-colors">7д</button>
                  <button className="text-xs bg-[#0D100D] px-3 py-1.5 rounded-lg text-[#6B7365] border border-[#222922] hover:text-[#A3B8A0] transition-colors">30д</button>
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

          <AnimatedCard delay={0.8}>
            <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-[#E5E7E3] text-lg mb-6">Уровень pH — шкала</h3>
              <div className="relative h-12 bg-gradient-to-r from-[#C2A878] via-[#7A9B76] to-[#6B8C96] rounded-full overflow-hidden">
                <div
                  className="absolute top-0 h-full w-1 bg-[#E5E7E3] shadow-[0_0_10px_rgba(229,231,227,0.8)]"
                  style={{ left: '40%' }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1C241C] border border-[#2C362C] px-2 py-1 rounded text-xs font-bold text-[#E5E7E3] whitespace-nowrap">
                    6.8
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-[#6B7365]">
                <span>0 (кислая)</span>
                <span>7 (нейтральная)</span>
                <span>14 (щелочная)</span>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.9}>
            <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-semibold text-[#E5E7E3] text-lg">История подмен воды</h3>
                  <p className="text-xs text-[#6B7365]">Последние 4 недели</p>
                </div>
                <button className="text-xs bg-[#1C241C] hover:bg-[#222922] px-3 py-1.5 rounded-lg text-[#A3B8A0] border border-[#2C362C] transition-colors">
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
                    className="flex items-center justify-between p-4 bg-[#0D100D] rounded-xl border border-[#222922] hover:border-[#2C362C] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#1C241C] rounded-lg flex items-center justify-center text-lg">
                        💧
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#E5E7E3]">{item.date}</p>
                        <p className="text-xs text-[#6B7365]">{item.note}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#6B8C96]">{item.volume}</p>
                      <p className="text-xs text-[#6B7365]">объёма</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </main>
  );
}