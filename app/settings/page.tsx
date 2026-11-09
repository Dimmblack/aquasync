'use client';

import { useState } from 'react';
import { User, Bell, Ruler, Info, Save, Moon, Sun, Globe, Shield } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedCard from '@/components/AnimatedCard';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  const [profile, setProfile] = useState({
    name: 'Дмитрий',
    email: 'dmitry@aquasync.io',
    role: 'Администратор',
  });

  const [units, setUnits] = useState({
    temp: 'celsius',
    volume: 'liters',
    co2: 'ppm',
  });

  const [notifications, setNotifications] = useState({
    tempAlerts: true,
    phAlerts: true,
    co2Alerts: true,
    weeklyReport: false,
    maintenance: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex overflow-hidden font-sans">
      <Sidebar />
      <MobileMenu />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 border-b border-[var(--border)] flex items-center justify-between px-8 bg-[var(--bg-primary)]/90 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">Настройки</h1>
            <p className="text-xs text-[var(--text-dim)] mt-0.5">Профиль, единицы измерения и уведомления</p>
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

        <div className="p-8 flex-1 max-w-4xl">
          {/* Профиль */}
          <AnimatedCard delay={0.1}>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Профиль</h2>
                  <p className="text-xs text-[var(--text-dim)]">Личная информация</p>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-3xl font-bold text-white">
                  Д
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Аватар</p>
                  <button className="text-xs bg-[var(--bg-card)] hover:bg-[var(--border)] px-3 py-1.5 rounded-lg text-[var(--accent)] border border-[var(--border-hover)] transition-colors">
                    Загрузить фото
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-2">Имя</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-2">Роль</label>
                  <input
                    type="text"
                    value={profile.role}
                    disabled
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-dim)] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Единицы измерения */}
          <AnimatedCard delay={0.2}>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-warm)]/10 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-[var(--accent-warm)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Единицы измерения</h2>
                  <p className="text-xs text-[var(--text-dim)]">Формат отображения данных</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Температура</p>
                    <p className="text-xs text-[var(--text-dim)]">Выберите шкалу</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUnits({ ...units, temp: 'celsius' })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        units.temp === 'celsius'
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]/40'
                      }`}
                    >
                      °C
                    </button>
                    <button
                      onClick={() => setUnits({ ...units, temp: 'fahrenheit' })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        units.temp === 'fahrenheit'
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]/40'
                      }`}
                    >
                      °F
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Объём воды</p>
                    <p className="text-xs text-[var(--text-dim)]">Для подмен и дозировок</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUnits({ ...units, volume: 'liters' })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        units.volume === 'liters'
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]/40'
                      }`}
                    >
                      Литры
                    </button>
                    <button
                      onClick={() => setUnits({ ...units, volume: 'gallons' })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        units.volume === 'gallons'
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]/40'
                      }`}
                    >
                      Галлоны
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">CO2</p>
                    <p className="text-xs text-[var(--text-dim)]">Единица измерения концентрации</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUnits({ ...units, co2: 'ppm' })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        units.co2 === 'ppm'
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]/40'
                      }`}
                    >
                      ppm
                    </button>
                    <button
                      onClick={() => setUnits({ ...units, co2: 'mgl' })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        units.co2 === 'mgl'
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]/40'
                      }`}
                    >
                      мг/л
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Уведомления */}
          <AnimatedCard delay={0.3}>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-blue)]/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[var(--accent-blue)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Уведомления</h2>
                  <p className="text-xs text-[var(--text-dim)]">Какие события отслеживать</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'tempAlerts' as const, label: 'Температура', desc: 'Предупреждения при отклонении от нормы' },
                  { key: 'phAlerts' as const, label: 'Уровень pH', desc: 'Критические изменения кислотности' },
                  { key: 'co2Alerts' as const, label: 'CO2', desc: 'Проблемы с подачей углекислого газа' },
                  { key: 'weeklyReport' as const, label: 'Еженедельный отчёт', desc: 'Сводка по экосистеме каждый понедельник' },
                  { key: 'maintenance' as const, label: 'Напоминания об обслуживании', desc: 'Подмена воды, чистка фильтров' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)]">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                      <p className="text-xs text-[var(--text-dim)]">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key] ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* Внешний вид */}
          <AnimatedCard delay={0.4}>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-purple)]/10 flex items-center justify-center">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-[var(--accent-purple)]" />
                  ) : (
                    <Sun className="w-5 h-5 text-[var(--accent-purple)]" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">Внешний вид</h2>
                  <p className="text-xs text-[var(--text-dim)]">Тема оформления</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => theme !== 'dark' && toggleTheme()}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === 'dark'
                      ? 'border-[var(--accent)] bg-[var(--bg-primary)]'
                      : 'border-[var(--border)] bg-[var(--bg-primary)] hover:border-[var(--accent)]/40'
                  }`}
                >
                  <div className="w-full h-20 bg-[#0D100D] rounded-lg mb-3 border border-[#222922]"></div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Тёмная</p>
                </button>
                <button
                  onClick={() => theme !== 'light' && toggleTheme()}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === 'light'
                      ? 'border-[var(--accent)] bg-[var(--bg-primary)]'
                      : 'border-[var(--border)] bg-[var(--bg-primary)] hover:border-[var(--accent)]/40'
                  }`}
                >
                  <div className="w-full h-20 bg-[#F5F7F5] rounded-lg mb-3 border border-[#D1D8D1]"></div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Светлая</p>
                </button>
              </div>
            </div>
          </AnimatedCard>

          {/* О проекте */}
          <AnimatedCard delay={0.5}>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-green)]/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-[var(--accent-green)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">О проекте</h2>
                  <p className="text-xs text-[var(--text-dim)]">Версия и информация</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                  <span className="text-sm text-[var(--text-muted)]">Версия</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">1.0.0</span>
                </div>
                <div className="flex justify-between p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                  <span className="text-sm text-[var(--text-muted)]">Сборка</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">2026.11.10</span>
                </div>
                <div className="flex justify-between p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                  <span className="text-sm text-[var(--text-muted)]">Лицензия</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">MIT</span>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Кнопка сохранения */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                saved
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white shadow-lg shadow-[var(--accent)]/20'
              }`}
            >
              <Save className="w-4 h-4" />
              {saved ? 'Сохранено!' : 'Сохранить настройки'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}