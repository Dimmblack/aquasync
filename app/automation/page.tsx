'use client';

import { useState, useEffect } from 'react';
import { User, Thermometer, Moon, Wind, AlertTriangle, CheckCircle, Info, Siren, Save, RefreshCw, ClipboardList, Settings } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedCard from '@/components/AnimatedCard';
import { AnimatePresence } from 'framer-motion';
import Toast from '@/components/Toast';
import SkeletonList from '@/components/SkeletonList';

export default function AutomationPage() {
  const [loading, setLoading] = useState(true);
  const [testAlerts, setTestAlerts] = useState<Array<{id: string; message: string; type: 'warning' | 'success' | 'error' | 'info'}>>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const rules = [
    {
      id: 1,
      name: 'Аварийное охлаждение',
      trigger: 'Температура > 28°C',
      action: 'Включить помпы на 100%',
      status: 'active',
      lastTriggered: '12 августа',
      icon: Thermometer,
      color: 'var(--accent-warm)',
    },
    {
      id: 2,
      name: 'Ночной режим света',
      trigger: 'Время = 22:00',
      action: 'Выключить основной свет, включить синий 5%',
      status: 'active',
      lastTriggered: 'Сегодня, 22:00',
      icon: Moon,
      color: 'var(--accent-blue)',
    },
    {
      id: 3,
      name: 'Подача CO2',
      trigger: 'Время = 08:00',
      action: 'Включить подачу CO2 (2 пузырька/сек)',
      status: 'active',
      lastTriggered: 'Сегодня, 08:00',
      icon: Wind,
      color: 'var(--accent-green)',
    },
    {
      id: 4,
      name: 'Предупреждение о низком pH',
      trigger: 'pH < 6.0',
      action: 'Отправить уведомление',
      status: 'inactive',
      lastTriggered: 'Никогда',
      icon: AlertTriangle,
      color: 'var(--accent-purple)',
    },
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Температура повышена',
      message: 'Температура достигла 26.5°C. Рекомендуется проверить охлаждение.',
      time: '2 часа назад',
      resolved: false,
    },
    {
      id: 2,
      type: 'success',
      title: 'Подмена воды завершена',
      message: 'Записано: подмена 25% (60 литров)',
      time: '5 часов назад',
      resolved: true,
    },
    {
      id: 3,
      type: 'info',
      title: 'Автоматическая калибровка pH',
      message: 'Датчик pH успешно откалиброван',
      time: 'Вчера, 14:30',
      resolved: true,
    },
  ];

  const getAlertIcon = (type: string) => {
    if (type === 'warning') return AlertTriangle;
    if (type === 'success') return CheckCircle;
    return Info;
  };

  const getAlertColor = (type: string) => {
    if (type === 'warning') return 'var(--accent-warm)';
    if (type === 'success') return 'var(--accent)';
    return 'var(--accent-blue)';
  };

  const runAlertTest = () => {
    const testMessages = [
      { message: 'Температура повышена! 26.5°C', type: 'warning' as const },
      { message: 'pH ниже нормы! 6.3', type: 'warning' as const },
      { message: 'Подмена воды завершена', type: 'success' as const },
      { message: 'Система перезагружена', type: 'info' as const },
    ];

    testMessages.forEach((alert, index) => {
      setTimeout(() => {
        setTestAlerts(prev => [...prev, { id: Date.now().toString() + index, ...alert }]);
      }, index * 1500);
    });
  };

  const removeTestAlert = (id: string) => {
    setTestAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex overflow-hidden font-sans">
      <Sidebar />
      <MobileMenu />

      <div className="fixed top-24 right-4 z-50 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {testAlerts.map((alert) => (
            <div key={alert.id} className="pointer-events-auto">
              <Toast
                message={alert.message}
                type={alert.type}
                onClose={() => removeTestAlert(alert.id)}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 border-b border-[var(--border)] flex items-center justify-between px-8 bg-[var(--bg-primary)]/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">Автоматизация</h1>
            <p className="text-xs text-[var(--text-dim)] mt-0.5">Правила и сценарии для экосистемы</p>
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

        <div className="p-8 flex-1">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Правила автоматизации</h2>
              <button className="text-sm bg-[var(--bg-card)] hover:bg-[var(--border)] px-4 py-2 rounded-lg text-[var(--accent)] border border-[var(--border-hover)] transition-colors">
                + Создать правило
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SkeletonList count={2} />
                <SkeletonList count={2} />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {rules.map((rule, index) => {
                  const Icon = rule.icon;
                  return (
                    <AnimatedCard key={rule.id} delay={0.1 + index * 0.1} interactive>
                      <div className={`bg-[var(--bg-secondary)] border rounded-2xl p-6 transition-all ${
                        rule.status === 'active'
                          ? 'border-[var(--border-hover)] hover:border-[var(--accent)]/40'
                          : 'border-[var(--border)] opacity-60'
                      }`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${rule.color}20` }}
                            >
                              <Icon className="w-6 h-6" style={{ color: rule.color }} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-[var(--text-primary)]">{rule.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div className={`w-2 h-2 rounded-full ${
                                  rule.status === 'active' ? 'bg-[var(--accent)]' : 'bg-[var(--text-dim)]'
                                }`}></div>
                                <span className="text-xs" style={{ color: rule.status === 'active' ? 'var(--accent)' : 'var(--text-dim)' }}>
                                  {rule.status === 'active' ? 'Активно' : 'Неактивно'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors">
                            <Settings className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-[var(--text-muted)] w-20">Если:</span>
                            <span className="text-[var(--text-primary)] font-medium">{rule.trigger}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-[var(--text-muted)] w-20">То:</span>
                            <span className="text-[var(--text-primary)] font-medium">{rule.action}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[var(--border)]">
                          <p className="text-xs text-[var(--text-dim)]">
                            Последнее срабатывание: <span className="text-[var(--text-muted)]">{rule.lastTriggered}</span>
                          </p>
                        </div>
                      </div>
                    </AnimatedCard>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Алерты и уведомления</h2>
              <button className="text-xs text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors">
                Очистить историю
              </button>
            </div>

            <div className="space-y-3">
              {alerts.map((alert, index) => {
                const AlertIcon = getAlertIcon(alert.type);
                const alertColor = getAlertColor(alert.type);
                return (
                  <AnimatedCard key={alert.id} delay={0.5 + index * 0.1}>
                    <div className={`p-5 rounded-xl border transition-all ${
                      alert.type === 'warning'
                        ? 'bg-[var(--accent-warm)]/10 border-[var(--accent-warm)]/30'
                        : alert.type === 'success'
                        ? 'bg-[var(--accent)]/10 border-[var(--accent)]/30'
                        : 'bg-[var(--accent-blue)]/10 border-[var(--accent-blue)]/30'
                    } ${alert.resolved ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <AlertIcon className="w-6 h-6 shrink-0" style={{ color: alertColor }} />
                          <div className="flex-1">
                            <h4 className="font-medium text-[var(--text-primary)] mb-1">{alert.title}</h4>
                            <p className="text-sm text-[var(--text-muted)]">{alert.message}</p>
                            <p className="text-xs text-[var(--text-dim)] mt-2">{alert.time}</p>
                          </div>
                        </div>
                        {!alert.resolved && (
                          <button className="text-xs bg-[var(--bg-card)] px-3 py-1.5 rounded-lg text-[var(--accent)] border border-[var(--border-hover)] hover:bg-[var(--border)] transition-colors">
                            Отметить решённым
                          </button>
                        )}
                      </div>
                    </div>
                  </AnimatedCard>
                );
              })}
            </div>
          </div>

          <AnimatedCard delay={0.9}>
            <div className="mt-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Быстрые действия</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={runAlertTest}
                  className="p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] hover:border-[var(--accent-warm)]/40 transition-all group cursor-pointer"
                >
                  <Siren className="w-6 h-6 text-[var(--accent-warm)] mb-2 mx-auto" />
                  <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-warm)] transition-colors">
                    Тест алертов
                  </div>
                </button>
                <button className="p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all group cursor-pointer">
                  <Save className="w-6 h-6 text-[var(--accent)] mb-2 mx-auto" />
                  <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    Экспорт настроек
                  </div>
                </button>
                <button className="p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] hover:border-[var(--accent-blue)]/40 transition-all group cursor-pointer">
                  <RefreshCw className="w-6 h-6 text-[var(--accent-blue)] mb-2 mx-auto" />
                  <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
                    Калибровка
                  </div>
                </button>
                <button className="p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] hover:border-[var(--accent-purple)]/40 transition-all group cursor-pointer">
                  <ClipboardList className="w-6 h-6 text-[var(--accent-purple)] mb-2 mx-auto" />
                  <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">
                    Логи системы
                  </div>
                </button>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </main>
  );
}