'use client';

import {
  Cpu, Thermometer, TestTube, Droplets, Wind, Lightbulb,
  Waves, FlaskConical, MoreHorizontal
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import StatusBadge from '@/components/StatusBadge';
import { User } from 'lucide-react';

type DeviceStatus = 'success' | 'warning' | 'error' | 'offline' | 'info';

interface ShowcaseRow {
  id: number;
  name: string;
  model: string;
  type: string;
  status: DeviceStatus;
  statusLabel: string;
  lastSeen: string;
  connection: string;
  power: string;
  icon: React.ComponentType<{ className?: string }>;
}

const showcaseRows: ShowcaseRow[] = [
  {
    id: 1,
    name: 'Контроллер AquaSync Hub',
    model: 'AS-H2',
    type: 'Хаб',
    status: 'success',
    statusLabel: 'Онлайн',
    lastSeen: '3 сек назад',
    connection: 'Wi-Fi −54 dBm',
    power: '⚡ сеть',
    icon: Cpu,
  },
  {
    id: 2,
    name: 'pH-зонд',
    model: 'AS-PH2',
    type: 'Датчик',
    status: 'warning',
    statusLabel: 'Калибровка',
    lastSeen: '~2 мин',
    connection: '1-Wire',
    power: '⚡ от хаба',
    icon: TestTube,
  },
  {
    id: 3,
    name: 'Фильтр-помпа',
    model: 'AS-FL600',
    type: 'Исполнитель',
    status: 'error',
    statusLabel: 'Неисправность E-14',
    lastSeen: '1 мин назад',
    connection: '1-Wire',
    power: '⚡ сеть',
    icon: Waves,
  },
  {
    id: 4,
    name: 'Дозатор',
    model: 'AS-DOS4',
    type: 'Исполнитель',
    status: 'offline',
    statusLabel: 'Нет связи',
    lastSeen: '12 мин назад',
    connection: 'BLE −71 dBm',
    power: '🔋 12%',
    icon: FlaskConical,
  },
  {
    id: 5,
    name: 'Соленоид CO₂',
    model: 'AS-CO2S',
    type: 'Исполнитель',
    status: 'info',
    statusLabel: 'Выход закрыт',
    lastSeen: '9 сек назад',
    connection: '1-Wire',
    power: '⚡ от хаба',
    icon: Wind,
  },
  {
    id: 6,
    name: 'Светильник',
    model: 'AS-LED240',
    type: 'Исполнитель',
    status: 'warning',
    statusLabel: 'Нестабильно',
    lastSeen: '2 потери/час',
    connection: 'Wi-Fi −78 dBm',
    power: '⚡ сеть',
    icon: Lightbulb,
  },
];

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex overflow-hidden font-sans">
      <Sidebar />
      <MobileMenu />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 border-b border-[var(--border)] flex items-center justify-between px-8 bg-[var(--bg-primary)]/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">Галерея состояний</h1>
            <p className="text-xs text-[var(--text-dim)] mt-0.5">
              Все варианты отображения строк устройств
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-hover)] flex items-center justify-center cursor-pointer hover:border-[var(--accent)]/50 transition-colors">
              <User className="w-5 h-5 text-[var(--accent)]" />
            </div>
          </div>
        </header>

        <div className="p-8 flex-1 max-w-5xl">
          {/* Легенда */}
          <div className="mb-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Статусы системы</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="flex items-center gap-2 p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                <span className="w-2 h-2 rounded-full bg-[var(--status-success)]"></span>
                <span className="text-sm text-[var(--text-muted)]">Онлайн</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                <span className="w-2 h-2 rounded-full bg-[var(--status-warning)]"></span>
                <span className="text-sm text-[var(--text-muted)]">Внимание</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                <span className="w-2 h-2 rounded-full bg-[var(--status-error)]"></span>
                <span className="text-sm text-[var(--text-muted)]">Авария</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                <span className="w-2 h-2 rounded-full bg-[var(--status-offline)]"></span>
                <span className="text-sm text-[var(--text-muted)]">Нет связи</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                <span className="w-2 h-2 rounded-full bg-[var(--status-info)]"></span>
                <span className="text-sm text-[var(--text-muted)]">Служебное</span>
              </div>
            </div>
          </div>

          {/* Все строки вместе */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Все статусы рядом</h2>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl overflow-hidden">
              {/* Заголовки */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[var(--border)] text-xs font-medium text-[var(--text-dim)] uppercase tracking-wide">
                <div className="col-span-4">Устройство</div>
                <div className="col-span-2">Тип</div>
                <div className="col-span-2">Статус</div>
                <div className="col-span-2">Отклик</div>
                <div className="col-span-1">Питание</div>
                <div className="col-span-1"></div>
              </div>

              {/* Строки */}
              <div className="divide-y divide-[var(--border)]">
                {showcaseRows.map((row) => {
                  const Icon = row.icon;
                  const isOffline = row.status === 'offline';
                  return (
                    <div
                      key={row.id}
                      className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 items-center group ${
                        isOffline ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="col-span-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          row.status === 'error' ? 'bg-[var(--status-error)]/10' :
                          row.status === 'warning' ? 'bg-[var(--status-warning)]/10' :
                          row.status === 'offline' ? 'bg-[var(--status-offline)]/10' :
                          row.status === 'info' ? 'bg-[var(--status-info)]/10' :
                          'bg-[var(--bg-card)]'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            row.status === 'error' ? 'text-[var(--status-error)]' :
                            row.status === 'warning' ? 'text-[var(--status-warning)]' :
                            row.status === 'offline' ? 'text-[var(--status-offline)]' :
                            row.status === 'info' ? 'text-[var(--status-info)]' :
                            'text-[var(--text-muted)]'
                          }`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[var(--text-primary)] truncate">{row.name}</p>
                          <p className="text-xs text-[var(--text-dim)] truncate">{row.model}</p>
                        </div>
                      </div>

                      <div className="col-span-2 text-sm text-[var(--text-muted)]">{row.type}</div>

                      <div className="col-span-2">
                        <StatusBadge status={row.status} label={row.statusLabel} size="sm" />
                      </div>

                      <div className="col-span-2">
                        <p className="text-sm text-[var(--text-muted)]">{row.lastSeen}</p>
                        <p className="text-xs text-[var(--text-dim)]">{row.connection}</p>
                      </div>

                      <div className="col-span-1 text-sm text-[var(--text-muted)]">{row.power}</div>

                      <div className="col-span-1 flex justify-end">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Карточки-превью для каждого статуса */}
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Карточки состояний</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {showcaseRows.map((row) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.id}
                    className={`bg-[var(--bg-secondary)] border rounded-2xl p-5 ${
                      row.status === 'error' ? 'border-[var(--status-error)]/30' :
                      row.status === 'warning' ? 'border-[var(--status-warning)]/30' :
                      row.status === 'offline' ? 'border-[var(--status-offline)]/30' :
                      row.status === 'info' ? 'border-[var(--status-info)]/30' :
                      'border-[var(--border)]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        row.status === 'error' ? 'bg-[var(--status-error)]/10' :
                        row.status === 'warning' ? 'bg-[var(--status-warning)]/10' :
                        row.status === 'offline' ? 'bg-[var(--status-offline)]/10' :
                        row.status === 'info' ? 'bg-[var(--status-info)]/10' :
                        'bg-[var(--bg-card)]'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          row.status === 'error' ? 'text-[var(--status-error)]' :
                          row.status === 'warning' ? 'text-[var(--status-warning)]' :
                          row.status === 'offline' ? 'text-[var(--status-offline)]' :
                          row.status === 'info' ? 'text-[var(--status-info)]' :
                          'text-[var(--text-muted)]'
                        }`} />
                      </div>
                      <StatusBadge status={row.status} label={row.statusLabel} size="sm" />
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{row.name}</h3>
                    <p className="text-xs text-[var(--text-dim)] mb-3">{row.model} · {row.type}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                      <div>
                        <p className="text-xs text-[var(--text-dim)]">Отклик</p>
                        <p className="text-sm text-[var(--text-muted)]">{row.lastSeen}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[var(--text-dim)]">Питание</p>
                        <p className="text-sm text-[var(--text-muted)]">{row.power}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}