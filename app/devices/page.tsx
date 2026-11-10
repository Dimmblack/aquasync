'use client';

import { useState } from 'react';
import {
  Cpu, Thermometer, TestTube, Droplets, Wind, Lightbulb,
  Waves, FlaskConical, Plus, Search, MoreHorizontal, Inbox
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedCard from '@/components/AnimatedCard';
import StatusBadge from '@/components/StatusBadge';
import DeviceDrawer from '@/components/DeviceDrawer';
import AddDeviceModal from '@/components/AddDeviceModal';
import { User } from 'lucide-react';

export type DeviceStatus = 'success' | 'warning' | 'error' | 'offline' | 'info';

interface DeviceEvent {
  time: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

interface Device {
  id: number;
  name: string;
  model: string;
  serial: string;
  firmware: string;
  type: string;
  connection: string;
  power: string;
  status: DeviceStatus;
  statusLabel: string;
  lastSeen: string;
  icon: React.ComponentType<{ className?: string }>;
  rssi?: string;
  uptime?: string;
  nextCalibration?: string;
  events: DeviceEvent[];
  chartData: { time: string; value: number }[];
  valueLabel: string;
  valueUnit: string;
  currentValue: string;
}

const devices: Device[] = [
  {
    id: 1,
    name: 'Контроллер AquaSync Hub',
    model: 'AS-H2',
    serial: 'ASH2-2407-0138',
    firmware: '2.4.1',
    type: 'Хаб',
    connection: 'Wi-Fi −54 dBm',
    power: '⚡ сеть',
    status: 'success',
    statusLabel: 'Онлайн',
    lastSeen: '3 сек назад',
    icon: Cpu,
    rssi: '−54 dBm',
    uptime: '14 дней 6 часов',
    events: [
      { time: '14:32', type: 'success', message: 'Подключение восстановлено' },
      { time: '14:20', type: 'error', message: 'Потеря связи с сервером' },
      { time: '08:00', type: 'info', message: 'Ежесуточный отчёт отправлен' },
      { time: 'Вчера, 22:15', type: 'warning', message: 'Высокая нагрузка CPU (78%)' },
    ],
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      value: 20 + Math.sin(i / 3) * 5 + Math.random() * 2,
    })),
    valueLabel: 'Нагрузка системы',
    valueUnit: '%',
    currentValue: '42',
  },
  {
    id: 2,
    name: 'Термощуп',
    model: 'AS-TS1 (DS18B20)',
    serial: 'AST1-2409-0071',
    firmware: '—',
    type: 'Датчик',
    connection: '1-Wire',
    power: '⚡ от хаба',
    status: 'success',
    statusLabel: 'Онлайн',
    lastSeen: '12 сек назад',
    icon: Thermometer,
    events: [
      { time: '14:45', type: 'info', message: 'Показание: 24.8°C' },
      { time: '12:30', type: 'warning', message: 'Скачок температуры +1.2°C за 10 мин' },
      { time: '08:00', type: 'info', message: 'Утренний замер: 24.1°C' },
    ],
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      value: 24 + Math.sin(i / 4) * 1.2 + Math.random() * 0.3,
    })),
    valueLabel: 'Температура воды',
    valueUnit: '°C',
    currentValue: '24.8',
  },
  {
    id: 3,
    name: 'pH-зонд',
    model: 'AS-PH2',
    serial: 'ASPH-2402-0049',
    firmware: '1.3.2',
    type: 'Датчик',
    connection: '1-Wire',
    power: '⚡ от хаба',
    status: 'warning',
    statusLabel: 'Калибровка',
    lastSeen: '~2 мин',
    icon: TestTube,
    nextCalibration: 'через 12 дней',
    events: [
      { time: '14:40', type: 'warning', message: 'Начата автоматическая калибровка' },
      { time: '14:38', type: 'info', message: 'Запрос калибровки от системы' },
      { time: '12:00', type: 'success', message: 'Предыдущая калибровка завершена' },
      { time: '11:55', type: 'info', message: 'Показание: pH 6.8' },
    ],
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      value: 6.8 + Math.sin(i / 6) * 0.3 + Math.random() * 0.1,
    })),
    valueLabel: 'Уровень pH',
    valueUnit: 'pH',
    currentValue: '6.8',
  },
  {
    id: 4,
    name: 'Электропроводность',
    model: 'AS-EC1',
    serial: 'ASEC-2405-0014',
    firmware: '1.1.6',
    type: 'Датчик',
    connection: 'BLE −67 dBm',
    power: '🔋 91%',
    status: 'success',
    statusLabel: 'Онлайн',
    lastSeen: '18 сек назад',
    icon: Droplets,
    rssi: '−67 dBm',
    events: [
      { time: '14:44', type: 'info', message: 'Показание: 142 ppm' },
      { time: '10:20', type: 'info', message: 'Утренний замер: 138 ppm' },
      { time: 'Вчера, 22:00', type: 'success', message: 'Нормальный диапазон подтверждён' },
    ],
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      value: 140 + Math.sin(i / 5) * 8 + Math.random() * 3,
    })),
    valueLabel: 'Электропроводность',
    valueUnit: 'ppm',
    currentValue: '142',
  },
  {
    id: 5,
    name: 'Соленоид CO₂',
    model: 'AS-CO2S',
    serial: 'ASCO-2406-0022',
    firmware: '1.2.0',
    type: 'Исполнитель',
    connection: '1-Wire',
    power: '⚡ от хаба',
    status: 'info',
    statusLabel: 'Выход закрыт',
    lastSeen: '9 сек назад',
    icon: Wind,
    events: [
      { time: '17:00', type: 'info', message: 'Подача CO₂ остановлена (конец цикла)' },
      { time: '09:00', type: 'success', message: 'Подача CO₂ запущена' },
      { time: '08:55', type: 'info', message: 'Ожидание начала светового цикла' },
    ],
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      value: i >= 9 && i < 17 ? 30 + Math.random() * 3 : 12 + Math.random() * 2,
    })),
    valueLabel: 'Концентрация CO₂',
    valueUnit: 'ppm',
    currentValue: '12',
  },
  {
    id: 6,
    name: 'Светильник',
    model: 'AS-LED240',
    serial: 'ASLD-2311-0007',
    firmware: '3.0.4',
    type: 'Исполнитель',
    connection: 'Wi-Fi −78 dBm',
    power: '⚡ сеть',
    status: 'warning',
    statusLabel: 'Нестабильно',
    lastSeen: '2 потери/час',
    icon: Lightbulb,
    rssi: '−78 dBm',
    uptime: '3 дня 14 часов',
    events: [
      { time: '14:30', type: 'warning', message: 'Потеря связи (3-я за час)' },
      { time: '14:28', type: 'success', message: 'Связь восстановлена' },
      { time: '14:15', type: 'warning', message: 'Потеря связи (2-я за час)' },
      { time: '14:00', type: 'info', message: 'Интенсивность 75% (режим "Полдень")' },
    ],
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      value: i >= 6 && i <= 18 ? Math.sin(((i - 6) / 12) * Math.PI) * 100 : 0,
    })),
    valueLabel: 'Интенсивность света',
    valueUnit: '%',
    currentValue: '75',
  },
  {
    id: 7,
    name: 'Фильтр-помпа',
    model: 'AS-FL600',
    serial: 'ASFL-2401-0003',
    firmware: '2.0.1',
    type: 'Исполнитель',
    connection: '1-Wire',
    power: '⚡ сеть',
    status: 'error',
    statusLabel: 'Неисправность E-14',
    lastSeen: '1 мин назад',
    icon: Waves,
    uptime: '47 дней',
    events: [
      { time: '14:50', type: 'error', message: 'Ошибка E-14: перегрев двигателя' },
      { time: '14:48', type: 'warning', message: 'Температура двигателя 82°C (норма: до 65°C)' },
      { time: '14:30', type: 'warning', message: 'Повышенная вибрация' },
      { time: '12:00', type: 'success', message: 'Нормальная работа' },
    ],
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      value: i < 14 ? 100 : i === 14 ? 45 : 0,
    })),
    valueLabel: 'Производительность',
    valueUnit: '%',
    currentValue: '0',
  },
  {
    id: 8,
    name: 'Дозатор',
    model: 'AS-DOS4',
    serial: 'ASDO-2408-0011',
    firmware: '1.4.0',
    type: 'Исполнитель',
    connection: 'BLE −71 dBm',
    power: '🔋 12%',
    status: 'offline',
    statusLabel: 'Нет связи',
    lastSeen: '12 мин назад',
    icon: FlaskConical,
    rssi: '−71 dBm',
    events: [
      { time: '14:33', type: 'error', message: 'Потеря связи' },
      { time: '14:30', type: 'warning', message: 'Низкий заряд батареи (12%)' },
      { time: '12:00', type: 'info', message: 'Плановая доза микроудобрений' },
      { time: 'Вчера, 22:00', type: 'success', message: 'Суточная доза внесена' },
    ],
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      value: i < 14 ? 12 - (14 - i) * 0.3 : 0,
    })),
    valueLabel: 'Заряд батареи',
    valueUnit: '%',
    currentValue: '—',
  },
  {
    id: 9,
    name: 'Датчик протечки',
    model: 'AS-WL1',
    serial: 'ASWL-2410-0006',
    firmware: '1.0.3',
    type: 'Датчик',
    connection: 'Zigbee −62 dBm',
    power: '🔋 96%',
    status: 'success',
    statusLabel: 'Онлайн',
    lastSeen: '21 сек назад',
    icon: Droplets,
    rssi: '−62 dBm',
    events: [
      { time: '14:44', type: 'success', message: 'Протечек не обнаружено' },
      { time: '08:00', type: 'info', message: 'Утренний тест: всё в норме' },
      { time: 'Вчера, 20:00', type: 'warning', message: 'Кратковременное увлажнение (конденсат)' },
    ],
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, '0')}:00`,
      value: 0,
    })),
    valueLabel: 'Статус',
    valueUnit: '',
    currentValue: 'Сухо',
  },
];

export default function DevicesPage() {
  const [filter, setFilter] = useState<'all' | DeviceStatus>('all');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = filter === 'all'
    ? devices
    : devices.filter(d => d.status === filter);

  const online = devices.filter(d => d.status === 'success' || d.status === 'info').length;
  const offline = devices.filter(d => d.status === 'offline').length;

  const filters = [
    { key: 'all' as const, label: 'Все', count: devices.length },
    { key: 'success' as const, label: 'Онлайн', count: devices.filter(d => d.status === 'success').length },
    { key: 'warning' as const, label: 'Внимание', count: devices.filter(d => d.status === 'warning').length },
    { key: 'error' as const, label: 'Авария', count: devices.filter(d => d.status === 'error').length },
    { key: 'offline' as const, label: 'Нет связи', count: devices.filter(d => d.status === 'offline').length },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex overflow-hidden font-sans">
      <Sidebar />
      <MobileMenu />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 border-b border-[var(--border)] flex items-center justify-between px-8 bg-[var(--bg-primary)]/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">Оборудование</h1>
            <p className="text-xs text-[var(--text-dim)] mt-0.5">
              {devices.length} устройств · {online} онлайн · {offline} нет связи
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

        <div className="p-4 sm:p-8 flex-1">
          {/* Фильтры */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${
                  filter === f.key
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                }`}
              >
                {f.label}
                <span className="ml-1.5 text-xs opacity-70">{f.count}</span>
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Поиск</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Добавить</span>
              </button>
            </div>
          </div>

          {/* Таблица устройств или пустое состояние */}
          <AnimatedCard delay={0.1}>
            {filtered.length === 0 ? (
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-8 sm:p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-card)] flex items-center justify-center mx-auto mb-4">
                  <Inbox className="w-8 h-8 text-[var(--text-dim)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  Нет устройств с таким статусом
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-6">
                  Попробуйте изменить фильтр или добавьте новое устройство
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Добавить устройство
                </button>
              </div>
            ) : (
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl overflow-hidden">
                {/* Заголовки колонок (только десктоп) */}
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
                  {filtered.map((device) => {
                    const Icon = device.icon;
                    const isOffline = device.status === 'offline';
                    return (
                      <div
                        key={device.id}
                        onClick={() => setSelectedDevice(device)}
                        className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 sm:px-6 py-4 items-center transition-colors hover:bg-[var(--bg-tertiary)]/50 cursor-pointer group ${
                          isOffline ? 'opacity-60' : ''
                        }`}
                      >
                        {/* Устройство */}
                        <div className="col-span-4 flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            device.status === 'error' ? 'bg-[var(--status-error)]/10' :
                            device.status === 'warning' ? 'bg-[var(--status-warning)]/10' :
                            device.status === 'offline' ? 'bg-[var(--status-offline)]/10' :
                            'bg-[var(--bg-card)]'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              device.status === 'error' ? 'text-[var(--status-error)]' :
                              device.status === 'warning' ? 'text-[var(--status-warning)]' :
                              device.status === 'offline' ? 'text-[var(--status-offline)]' :
                              'text-[var(--text-muted)]'
                            }`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-[var(--text-primary)] truncate">{device.name}</p>
                            <p className="text-xs text-[var(--text-dim)] truncate">{device.model} · {device.serial}</p>
                            {/* Мобильная мета-информация */}
                            <div className="flex items-center gap-3 mt-1 md:hidden">
                              <StatusBadge status={device.status} label={device.statusLabel} size="sm" />
                              <span className="text-xs text-[var(--text-dim)]">{device.lastSeen}</span>
                            </div>
                          </div>
                        </div>

                        {/* Десктоп-колонки */}
                        <div className="hidden md:block col-span-2 text-sm text-[var(--text-muted)]">{device.type}</div>
                        <div className="hidden md:block col-span-2">
                          <StatusBadge status={device.status} label={device.statusLabel} size="sm" />
                        </div>
                        <div className="hidden md:block col-span-2">
                          <p className="text-sm text-[var(--text-muted)]">{device.lastSeen}</p>
                          <p className="text-xs text-[var(--text-dim)]">{device.connection}</p>
                        </div>
                        <div className="hidden md:block col-span-1 text-sm text-[var(--text-muted)]">{device.power}</div>

                        <div className="hidden md:block col-span-1 flex justify-end">
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </AnimatedCard>
        </div>
      </div>

      {/* Боковая панель устройства */}
      {selectedDevice && (
        <DeviceDrawer
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
        />
      )}

      {/* Модалка добавления устройства */}
      {showAddModal && (
        <AddDeviceModal onClose={() => setShowAddModal(false)} />
      )}
    </main>
  );
}