'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Lightbulb, Thermometer, Settings, Sliders } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Дашборд', icon: Leaf },
    { href: '/lighting', label: 'Освещение', icon: Lightbulb },
    { href: '/climate', label: 'Климат и вода', icon: Thermometer },
    { href: '/automation', label: 'Автоматизация', icon: Settings },
    { href: '/settings', label: 'Настройки', icon: Sliders },
  ];

  return (
    <aside className="w-64 border-r border-[var(--border)] p-6 flex-col justify-between hidden md:flex bg-[var(--bg-secondary)]">
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-3 mb-10 group">
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
      </div>

      <div className="bg-[var(--bg-tertiary)] p-4 rounded-xl border border-[var(--border)]">
        <p className="text-sm font-medium text-[var(--accent)] mb-2">Статус системы</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
          <span className="text-xs text-[var(--accent)] font-medium">Экосистема стабильна</span>
        </div>
      </div>
    </aside>
  );
}