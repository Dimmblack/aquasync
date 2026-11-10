'use client';

import { X, RefreshCw, Edit3, Unlink, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatusBadge from './StatusBadge';
import type { DeviceStatus } from '@/app/devices/page';

interface DeviceEvent {
  time: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

interface DeviceDrawerProps {
  device: {
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
  };
  onClose: () => void;
}

export default function DeviceDrawer({ device, onClose }: DeviceDrawerProps) {
  const Icon = device.icon;

  return (
    <>
      {/* Затемнение фона */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Боковая панель — на мобильном на весь экран */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-[var(--bg-primary)] border-l border-[var(--border)] z-50 overflow-y-auto shadow-2xl">
        {/* Шапка панели */}
        <div className="sticky top-0 bg-[var(--bg-primary)] border-b border-[var(--border)] px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3 min-w-0">
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
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] truncate">{device.name}</h2>
              <p className="text-xs text-[var(--text-dim)] truncate">{device.model}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Текущий статус и значение */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[var(--text-muted)]">Текущее значение</span>
              <StatusBadge status={device.status} label={device.statusLabel} size="md" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-[var(--text-primary)]">{device.currentValue}</span>
              <span className="text-lg text-[var(--text-muted)]">{device.valueUnit}</span>
            </div>
            <p className="text-xs text-[var(--text-dim)] mt-2">
              Последнее обновление: {device.lastSeen}
            </p>
          </div>

          {/* График за 24ч */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">История за 24 часа</h3>
              <span className="text-xs text-[var(--text-dim)]">{device.valueLabel}</span>
            </div>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={device.chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`gradient-${device.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    ticks={['00:00', '06:00', '12:00', '18:00']}
                    stroke="var(--text-dim)" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis stroke="var(--text-dim)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      border: '1px solid var(--border)', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    labelStyle={{ color: 'var(--text-primary)', marginBottom: '4px' }}
                    itemStyle={{ color: 'var(--accent)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--accent)" 
                    strokeWidth={2} 
                    fill={`url(#gradient-${device.id})`} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Журнал событий */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-[var(--text-muted)]" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Журнал событий</h3>
            </div>
            <div className="space-y-3">
              {device.events.map((event, i) => {
                const colors = {
                  info: 'var(--status-info)',
                  warning: 'var(--status-warning)',
                  error: 'var(--status-error)',
                  success: 'var(--status-success)',
                };
                const icons = {
                  info: '●',
                  warning: '▲',
                  error: '✕',
                  success: '✓',
                };
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold" style={{ color: colors[event.type] }}>
                        {icons[event.type]}
                      </span>
                      {i < device.events.length - 1 && (
                        <div className="w-px flex-1 bg-[var(--border)] mt-1"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <p className="text-xs text-[var(--text-dim)] mb-0.5">{event.time}</p>
                      <p className="text-sm text-[var(--text-primary)]">{event.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Служебная информация */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Информация об устройстве</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs text-[var(--text-muted)]">Модель</span>
                <span className="text-xs font-medium text-[var(--text-primary)]">{device.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-[var(--text-muted)]">Серийный номер</span>
                <span className="text-xs font-medium text-[var(--text-primary)]">{device.serial}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-[var(--text-muted)]">Прошивка</span>
                <span className="text-xs font-medium text-[var(--text-primary)]">{device.firmware}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-[var(--text-muted)]">Связь</span>
                <span className="text-xs font-medium text-[var(--text-primary)]">{device.connection}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-[var(--text-muted)]">Питание</span>
                <span className="text-xs font-medium text-[var(--text-primary)]">{device.power}</span>
              </div>
              {device.rssi && (
                <div className="flex justify-between">
                  <span className="text-xs text-[var(--text-muted)]">RSSI</span>
                  <span className="text-xs font-medium text-[var(--text-primary)]">{device.rssi}</span>
                </div>
              )}
              {device.uptime && (
                <div className="flex justify-between">
                  <span className="text-xs text-[var(--text-muted)]">Аптайм</span>
                  <span className="text-xs font-medium text-[var(--text-primary)]">{device.uptime}</span>
                </div>
              )}
              {device.nextCalibration && (
                <div className="flex justify-between">
                  <span className="text-xs text-[var(--text-muted)]">След. калибровка</span>
                  <span className="text-xs font-medium text-[var(--text-primary)]">{device.nextCalibration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Действия */}
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors text-sm">
              <Edit3 className="w-4 h-4 text-[var(--text-muted)]" />
              Переименовать
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors text-sm">
              <RefreshCw className="w-4 h-4 text-[var(--text-muted)]" />
              Калибровать
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--status-error)] hover:bg-[var(--status-error)]/10 transition-colors text-sm">
              <Unlink className="w-4 h-4" />
              Отвязать устройство
            </button>
          </div>
        </div>
      </div>
    </>
  );
}