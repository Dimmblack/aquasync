'use client';

import { useState } from 'react';
import { X, Scan, Check, ArrowRight, ArrowLeft, Wifi, ChevronRight } from 'lucide-react';

interface AddDeviceModalProps {
  onClose: () => void;
}

type Step = 'scan' | 'found' | 'configure';

interface DiscoveredDevice {
  id: string;
  name: string;
  type: string;
  rssi: number;
  serial: string;
}

const mockDevices: DiscoveredDevice[] = [
  { id: '1', name: 'AS-TS1 (DS18B20)', type: 'Термощуп', rssi: -45, serial: 'AST1-2411-0099' },
  { id: '2', name: 'AS-PH2', type: 'pH-зонд', rssi: -62, serial: 'ASPH-2411-0051' },
  { id: '3', name: 'AS-EC1', type: 'EC/TDS датчик', rssi: -71, serial: 'ASEC-2411-0018' },
  { id: '4', name: 'AS-WL1', type: 'Датчик протечки', rssi: -58, serial: 'ASWL-2411-0009' },
];

export default function AddDeviceModal({ onClose }: AddDeviceModalProps) {
  const [step, setStep] = useState<Step>('scan');
  const [scanning, setScanning] = useState(true);
  const [discovered, setDiscovered] = useState<DiscoveredDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DiscoveredDevice | null>(null);
  const [deviceName, setDeviceName] = useState('');
  const [room, setRoom] = useState('Гостиная');
  const [done, setDone] = useState(false);

  // Симуляция сканирования
  useState(() => {
    const timer = setTimeout(() => {
      setDiscovered(mockDevices);
      setScanning(false);
    }, 2500);
    return () => clearTimeout(timer);
  });

  const handleNext = () => {
    if (step === 'scan') setStep('found');
    else if (step === 'found' && selectedDevice) setStep('configure');
    else if (step === 'configure') {
      setDone(true);
      setTimeout(() => onClose(), 1500);
    }
  };

  const handleBack = () => {
    if (step === 'found') setStep('scan');
    else if (step === 'configure') setStep('found');
  };

  const getSignalStrength = (rssi: number) => {
    if (rssi >= -50) return { label: 'Отличный', color: 'var(--status-success)' };
    if (rssi >= -65) return { label: 'Хороший', color: 'var(--status-info)' };
    if (rssi >= -75) return { label: 'Средний', color: 'var(--status-warning)' };
    return { label: 'Слабый', color: 'var(--status-error)' };
  };

  return (
    <>
      {/* Затемнение */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Модалка */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
          {/* Шапка */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {done ? 'Устройство добавлено' : 'Добавить устройство'}
              </h2>
              {!done && (
                <p className="text-xs text-[var(--text-dim)] mt-0.5">
                  Шаг {step === 'scan' ? '1' : step === 'found' ? '2' : '3'} из 3
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Индикатор прогресса */}
          {!done && (
            <div className="px-6 pt-4">
              <div className="flex gap-2">
                {['scan', 'found', 'configure'].map((s, i) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      ['scan', 'found', 'configure'].indexOf(step) >= i
                        ? 'bg-[var(--accent)]'
                        : 'bg-[var(--border)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Контент */}
          <div className="p-6 min-h-[320px]">
            {done ? (
              <div className="flex flex-col items-center justify-center h-full py-8">
                <div className="w-16 h-16 rounded-full bg-[var(--status-success)]/20 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-[var(--status-success)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  {deviceName || selectedDevice?.name} добавлен
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Комната: {room}
                </p>
              </div>
            ) : step === 'scan' ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative mb-6">
                  <div className={`w-24 h-24 rounded-full border-4 border-[var(--accent)]/20 flex items-center justify-center ${scanning ? 'animate-pulse' : ''}`}>
                    <Scan className={`w-10 h-10 ${scanning ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />
                  </div>
                  {scanning && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)]/40 animate-ping" />
                      <div className="absolute -inset-4 rounded-full border border-[var(--accent)]/20 animate-ping" style={{ animationDelay: '0.5s' }} />
                    </>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {scanning ? 'Поиск устройств...' : 'Поиск завершён'}
                </h3>
                <p className="text-sm text-[var(--text-muted)] text-center">
                  {scanning
                    ? 'Убедитесь, что устройства включены и находятся рядом'
                    : `Найдено устройств: ${discovered.length}`}
                </p>
              </div>
            ) : step === 'found' ? (
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">Найденные устройства</h3>
                <p className="text-xs text-[var(--text-dim)] mb-4">Выберите устройство для подключения</p>
                <div className="space-y-2 max-h-[240px] overflow-y-auto">
                  {discovered.map(device => {
                    const signal = getSignalStrength(device.rssi);
                    const isSelected = selectedDevice?.id === device.id;
                    return (
                      <button
                        key={device.id}
                        onClick={() => setSelectedDevice(device)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors text-left ${
                          isSelected
                            ? 'bg-[var(--accent)]/10 border-[var(--accent)]'
                            : 'bg-[var(--bg-primary)] border-[var(--border)] hover:border-[var(--border-hover)]'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-[var(--accent)]/20' : 'bg-[var(--bg-card)]'
                        }`}>
                          <Wifi className={`w-5 h-5 ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--text-primary)] truncate">{device.name}</p>
                          <p className="text-xs text-[var(--text-dim)]">{device.type} · {device.serial}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium" style={{ color: signal.color }}>{signal.label}</p>
                          <p className="text-xs text-[var(--text-dim)]">{device.rssi} dBm</p>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-dim)]'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">Настройка устройства</h3>
                <p className="text-xs text-[var(--text-dim)] mb-4">
                  {selectedDevice?.name} · {selectedDevice?.serial}
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-2">Название устройства</label>
                    <input
                      type="text"
                      value={deviceName}
                      onChange={(e) => setDeviceName(e.target.value)}
                      placeholder={selectedDevice?.type || 'Например: Термощуп №2'}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-2">Комната</label>
                    <select
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    >
                      <option>Гостиная</option>
                      <option>Спальня</option>
                      <option>Кухня</option>
                      <option>Подвал</option>
                      <option>Другое</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Футер с кнопками */}
          {!done && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border)]">
              <button
                onClick={handleBack}
                disabled={step === 'scan'}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  step === 'scan'
                    ? 'text-[var(--text-dim)] cursor-not-allowed'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Назад
              </button>
              <button
                onClick={handleNext}
                disabled={step === 'found' && !selectedDevice}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  step === 'found' && !selectedDevice
                    ? 'bg-[var(--border)] text-[var(--text-dim)] cursor-not-allowed'
                    : 'bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90'
                }`}
              >
                {step === 'configure' ? 'Добавить' : 'Далее'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}