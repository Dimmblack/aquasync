'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import AnimatedCard from '@/components/AnimatedCard';
import { AnimatePresence } from 'framer-motion';
import Toast from '@/components/Toast';

export default function AutomationPage() {
  const [testAlerts, setTestAlerts] = useState<Array<{id: string; message: string; type: 'warning' | 'success' | 'error' | 'info'}>>([]);

  const rules = [
    {
      id: 1,
      name: 'Аварийное охлаждение',
      trigger: 'Температура > 28°C',
      action: 'Включить помпы на 100%',
      status: 'active',
      lastTriggered: '12 августа',
      icon: '🌡️',
      color: '#C2A878',
    },
    {
      id: 2,
      name: 'Ночной режим света',
      trigger: 'Время = 22:00',
      action: 'Выключить основной свет, включить синий 5%',
      status: 'active',
      lastTriggered: 'Сегодня, 22:00',
      icon: '🌙',
      color: '#6B8C96',
    },
    {
      id: 3,
      name: 'Подача CO2',
      trigger: 'Время = 08:00',
      action: 'Включить подачу CO2 (2 пузырька/сек)',
      status: 'active',
      lastTriggered: 'Сегодня, 08:00',
      icon: '🫧',
      color: '#8DA378',
    },
    {
      id: 4,
      name: 'Предупреждение о низком pH',
      trigger: 'pH < 6.0',
      action: 'Отправить уведомление',
      status: 'inactive',
      lastTriggered: 'Никогда',
      icon: '⚠️',
      color: '#9B7A9B',
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
    <main className="min-h-screen bg-[#0D100D] text-[#E5E7E3] flex overflow-hidden font-sans">
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
        <header className="h-20 border-b border-[#222922] flex items-center justify-between px-8 bg-[#0D100D]/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-[#E5E7E3]">Автоматизация</h1>
            <p className="text-xs text-[#6B7365] mt-0.5">Правила и сценарии для экосистемы</p>
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
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#E5E7E3]">Правила автоматизации</h2>
              <button className="text-sm bg-[#1C241C] hover:bg-[#222922] px-4 py-2 rounded-lg text-[#A3B8A0] border border-[#2C362C] transition-colors">
                + Создать правило
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {rules.map((rule, index) => (
                <AnimatedCard key={rule.id} delay={0.1 + index * 0.1}>
                  <div className={`bg-[#111511] border rounded-2xl p-6 transition-all ${
                    rule.status === 'active'
                      ? 'border-[#2C362C] hover:border-[#7A9B76]/40'
                      : 'border-[#222922] opacity-60'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                          style={{ backgroundColor: `${rule.color}20` }}
                        >
                          {rule.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#E5E7E3]">{rule.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${
                              rule.status === 'active' ? 'bg-[#7A9B76]' : 'bg-[#6B7365]'
                            }`}></div>
                            <span className="text-xs" style={{ color: rule.status === 'active' ? '#7A9B76' : '#6B7365' }}>
                              {rule.status === 'active' ? 'Активно' : 'Неактивно'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="text-[#6B7365] hover:text-[#E5E7E3] transition-colors">
                        ⚙️
                      </button>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-[#8F978B] w-20">Если:</span>
                        <span className="text-[#E5E7E3] font-medium">{rule.trigger}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-[#8F978B] w-20">То:</span>
                        <span className="text-[#E5E7E3] font-medium">{rule.action}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#222922]">
                      <p className="text-xs text-[#6B7365]">
                        Последнее срабатывание: <span className="text-[#8F978B]">{rule.lastTriggered}</span>
                      </p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#E5E7E3]">Алерты и уведомления</h2>
              <button className="text-xs text-[#6B7365] hover:text-[#A3B8A0] transition-colors">
                Очистить историю
              </button>
            </div>

            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <AnimatedCard key={alert.id} delay={0.5 + index * 0.1}>
                  <div className={`p-5 rounded-xl border transition-all ${
                    alert.type === 'warning'
                      ? 'bg-[#C2A878]/10 border-[#C2A878]/30'
                      : alert.type === 'success'
                      ? 'bg-[#7A9B76]/10 border-[#7A9B76]/30'
                      : 'bg-[#6B8C96]/10 border-[#6B8C96]/30'
                  } ${alert.resolved ? 'opacity-60' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="text-2xl">
                          {alert.type === 'warning' ? '⚠️' : alert.type === 'success' ? '✅' : 'ℹ️'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#E5E7E3] mb-1">{alert.title}</h4>
                          <p className="text-sm text-[#8F978B]">{alert.message}</p>
                          <p className="text-xs text-[#6B7365] mt-2">{alert.time}</p>
                        </div>
                      </div>
                      {!alert.resolved && (
                        <button className="text-xs bg-[#1C241C] px-3 py-1.5 rounded-lg text-[#A3B8A0] border border-[#2C362C] hover:bg-[#222922] transition-colors">
                          Отметить решённым
                        </button>
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          <AnimatedCard delay={0.9}>
            <div className="mt-8 bg-[#111511] border border-[#222922] rounded-2xl p-6">
              <h3 className="font-semibold text-[#E5E7E3] mb-4">Быстрые действия</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={runAlertTest}
                  className="p-4 bg-[#0D100D] rounded-xl border border-[#222922] hover:border-[#C2A878]/40 transition-all group cursor-pointer"
                >
                  <div className="text-2xl mb-2">🚨</div>
                  <div className="text-sm font-medium text-[#E5E7E3] group-hover:text-[#C2A878] transition-colors">
                    Тест алертов
                  </div>
                </button>
                <button className="p-4 bg-[#0D100D] rounded-xl border border-[#222922] hover:border-[#7A9B76]/40 transition-all group cursor-pointer">
                  <div className="text-2xl mb-2">💾</div>
                  <div className="text-sm font-medium text-[#E5E7E3] group-hover:text-[#7A9B76] transition-colors">
                    Экспорт настроек
                  </div>
                </button>
                <button className="p-4 bg-[#0D100D] rounded-xl border border-[#222922] hover:border-[#6B8C96]/40 transition-all group cursor-pointer">
                  <div className="text-2xl mb-2">🔄</div>
                  <div className="text-sm font-medium text-[#E5E7E3] group-hover:text-[#6B8C96] transition-colors">
                    Калибровка
                  </div>
                </button>
                <button className="p-4 bg-[#0D100D] rounded-xl border border-[#222922] hover:border-[#9B7A9B]/40 transition-all group cursor-pointer">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="text-sm font-medium text-[#E5E7E3] group-hover:text-[#9B7A9B] transition-colors">
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