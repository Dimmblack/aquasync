'use client';

import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import AnimatedCard from '@/components/AnimatedCard';

export default function LightingPage() {
  return (
    <main className="min-h-screen bg-[#0D100D] text-[#E5E7E3] flex overflow-hidden font-sans">
      <Sidebar />
      <MobileMenu />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 border-b border-[#222922] flex items-center justify-between px-8 bg-[#0D100D]/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-[#E5E7E3]">Управление освещением</h1>
            <p className="text-xs text-[#6B7365] mt-0.5">Настройка светового цикла</p>
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
          <AnimatedCard delay={0.1}>
            <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#E5E7E3] mb-1">Текущий режим</h2>
                  <p className="text-sm text-[#8F978B]">Полдень • Интенсивность 75%</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#C2A878] rounded-full animate-pulse"></div>
                  <span className="text-sm text-[#C2A878] font-medium">Активно</span>
                </div>
              </div>
              
              <div className="h-48 bg-gradient-to-b from-[#C2A878]/20 to-[#0D100D] rounded-xl border border-[#222922] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#7A9B76]/10 to-transparent"></div>
                <div className="text-center z-10">
                  <div className="text-6xl mb-2">🌱</div>
                  <p className="text-sm text-[#8F978B]">Превью: полный спектр, 6500K</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-[#E5E7E3] mb-6">Световой цикл (24 часа)</h3>
              
              <div className="h-64 bg-[#0D100D] rounded-xl border border-[#222922] p-6 relative">
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
                          className="w-full bg-gradient-to-t from-[#C2A878]/60 to-[#C2A878]/20 rounded-t transition-all hover:from-[#C2A878]/80 hover:to-[#C2A878]/40 cursor-pointer"
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="absolute bottom-2 left-6 right-6 flex justify-between text-xs text-[#6B7365]">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:00</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 mt-4 text-sm text-[#8F978B]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#C2A878]/60 rounded"></div>
                  <span>Свет включён</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#222922] rounded"></div>
                  <span>Ночь</span>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard delay={0.3}>
              <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6">
                <h4 className="text-sm font-medium text-[#8F978B] mb-3">Рассвет</h4>
                <p className="text-2xl font-bold text-[#E5E7E3] mb-2">06:00</p>
                <p className="text-xs text-[#6B7365]">Плавное включение за 30 мин</p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6">
                <h4 className="text-sm font-medium text-[#8F978B] mb-3">Закат</h4>
                <p className="text-2xl font-bold text-[#E5E7E3] mb-2">18:00</p>
                <p className="text-xs text-[#6B7365]">Плавное выключение за 30 мин</p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.5}>
              <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6">
                <h4 className="text-sm font-medium text-[#8F978B] mb-3">Ночной режим</h4>
                <p className="text-2xl font-bold text-[#E5E7E3] mb-2">22:00 - 06:00</p>
                <p className="text-xs text-[#6B7365]">Синий спектр 5%</p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </main>
  );
}