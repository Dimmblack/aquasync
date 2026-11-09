import TemperatureChart from '@/components/TemperatureChart';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D100D] text-[#E5E7E3] flex overflow-hidden font-sans">
      
      <aside className="w-64 border-r border-[#222922] p-6 flex-col justify-between hidden md:flex bg-[#111511]">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 bg-[#2C362C] rounded-xl flex items-center justify-center text-[#A3B8A0] font-bold text-xl border border-[#3A473A]">
              A
            </div>
            <span className="text-xl font-semibold tracking-wide text-[#E5E7E3]">AquaSync</span>
          </div>
          
          <nav className="space-y-1.5">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#1C241C] text-[#A3B8A0] rounded-xl border border-[#2C362C] transition-all font-medium">
              <span className="text-lg opacity-80">🌿</span> Дашборд
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-[#8F978B] hover:text-[#E5E7E3] hover:bg-[#161C16] rounded-xl transition-all font-medium">
              <span className="text-lg opacity-80">💡</span> Освещение
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-[#8F978B] hover:text-[#E5E7E3] hover:bg-[#161C16] rounded-xl transition-all font-medium">
              <span className="text-lg opacity-80">🌡️</span> Климат и вода
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-[#8F978B] hover:text-[#E5E7E3] hover:bg-[#161C16] rounded-xl transition-all font-medium">
              <span className="text-lg opacity-80">⚙️</span> Автоматизация
            </button>
          </nav>
        </div>

        <div className="bg-[#161C16] p-4 rounded-xl border border-[#222922]">
          <p className="text-sm font-medium text-[#A3B8A0] mb-2">Статус системы</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#7A9B76] rounded-full"></div>
            <span className="text-xs text-[#7A9B76] font-medium">Экосистема стабильна</span>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-y-auto">
        
        <header className="h-20 border-b border-[#222922] flex items-center justify-between px-8 bg-[#0D100D]/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-[#E5E7E3]">Обзор экосистемы</h1>
            <p className="text-xs text-[#6B7365] mt-0.5">Понедельник, 12:45</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 shadow-sm hover:border-[#7A9B76]/40 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#8F978B] text-sm font-medium">Температура</span>
                <span className="text-xl opacity-70">🌡️</span>
              </div>
              <h3 className="text-3xl font-bold mb-1 text-[#E5E7E3]">24.8°C</h3>
              <p className="text-xs text-[#7A9B76] flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 bg-[#7A9B76] rounded-full"></span> Комфортно для растений
              </p>
            </div>

            <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 shadow-sm hover:border-[#6B8C96]/40 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#8F978B] text-sm font-medium">Уровень pH</span>
                <span className="text-xl opacity-70">🧪</span>
              </div>
              <h3 className="text-3xl font-bold mb-1 text-[#E5E7E3]">6.8</h3>
              <p className="text-xs text-[#8F978B] mt-2">Идеально для травника</p>
            </div>

            <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 shadow-sm hover:border-[#8DA378]/40 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#8F978B] text-sm font-medium">Уровень CO2</span>
                <span className="text-xl opacity-70">🫧</span>
              </div>
              <h3 className="text-3xl font-bold mb-1 text-[#E5E7E3]">30 ppm</h3>
              <p className="text-xs text-[#8F978B] mt-2">Подача включена</p>
            </div>

            <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 shadow-sm hover:border-[#C2A878]/40 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#8F978B] text-sm font-medium">Освещение</span>
                <span className="text-xl opacity-70">☀️</span>
              </div>
              <h3 className="text-3xl font-bold mb-1 text-[#E5E7E3]">75%</h3>
              <p className="text-xs text-[#C2A878] mt-2">Режим: Полдень</p>
            </div>
          </div>

          <div className="bg-[#111511] border border-[#222922] rounded-2xl p-6 h-96 flex flex-col shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold text-[#E5E7E3] text-lg">История температуры</h3>
                <p className="text-xs text-[#6B7365]">Последние 24 часа</p>
              </div>
              <button className="text-xs bg-[#1C241C] hover:bg-[#222922] px-3 py-1.5 rounded-lg text-[#A3B8A0] border border-[#2C362C] transition-colors">
                Скачать отчет
              </button>
            </div>
            
            <div className="flex-1 w-full mt-4">
              <TemperatureChart />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}