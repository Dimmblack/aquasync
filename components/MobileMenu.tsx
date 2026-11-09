'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Дашборд', icon: '🌿' },
    { href: '/lighting', label: 'Освещение', icon: '💡' },
    { href: '/climate', label: 'Климат и вода', icon: '🌡️' },
    { href: '/automation', label: 'Автоматизация', icon: '⚙️' },
  ];

  return (
    <>
      {/* Кнопка гамбургер */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#111511] border border-[#222922] rounded-lg flex items-center justify-center text-[#E5E7E3] hover:border-[#7A9B76]/50 transition-colors"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Затемнение фона */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Мобильное меню */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-[#111511] border-r border-[#222922] z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-3 mb-10 group" onClick={() => setIsOpen(false)}>
            <div className="w-9 h-9 bg-[#2C362C] rounded-xl flex items-center justify-center text-[#A3B8A0] font-bold text-xl border border-[#3A473A] group-hover:border-[#7A9B76] transition-colors">
              A
            </div>
            <span className="text-xl font-semibold tracking-wide text-[#E5E7E3]">AquaSync</span>
          </Link>

          {/* Навигация */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    isActive
                      ? 'bg-[#1C241C] text-[#A3B8A0] border border-[#2C362C]'
                      : 'text-[#8F978B] hover:text-[#E5E7E3] hover:bg-[#161C16] border border-transparent'
                  }`}
                >
                  <span className="text-lg opacity-80">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Статус системы */}
          <div className="mt-8 bg-[#161C16] p-4 rounded-xl border border-[#222922]">
            <p className="text-sm font-medium text-[#A3B8A0] mb-2">Статус системы</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#7A9B76] rounded-full"></div>
              <span className="text-xs text-[#7A9B76] font-medium">Экосистема стабильна</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}