'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Lightbulb, Thermometer, Settings, Sliders, Monitor, Menu, X } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Дашборд', icon: Leaf },
    { href: '/lighting', label: 'Освещение', icon: Lightbulb },
    { href: '/climate', label: 'Климат и вода', icon: Thermometer },
    { href: '/devices', label: 'Оборудование', icon: Monitor },
    { href: '/automation', label: 'Автоматизация', icon: Settings },
    { href: '/settings', label: 'Настройки', icon: Sliders },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)]/50 transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-[var(--bg-secondary)] border-r border-[var(--border)] z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 mb-10 group" onClick={() => setIsOpen(false)}>
            <div className="w-9 h-9 bg-[var(--bg-card)] rounded-xl flex items-center justify-center text-[var(--accent)] font-bold text-xl border border-[var(--border-hover)] group-hover:border-[var(--accent)] transition-colors">
              A
            </div>
            <span className="text-xl font-semibold tracking-wide text-[var(--text-primary)]">AquaSync</span>
          </Link>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    isActive
                      ? 'bg-[var(--bg-card)] text-[var(--accent)] border border-[var(--border-hover)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5 opacity-80" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 bg-[var(--bg-tertiary)] p-4 rounded-xl border border-[var(--border)]">
            <p className="text-sm font-medium text-[var(--accent)] mb-2">Статус системы</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
              <span className="text-xs text-[var(--accent)] font-medium">Экосистема стабильна</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}