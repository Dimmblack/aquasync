'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Cpu, Thermometer, TestTube, Droplets, Wind, Lightbulb,
  Waves, FlaskConical
} from 'lucide-react';
import { history, simulateAt, type Sample } from '@/lib/telemetry';

export type DeviceStatus = 'success' | 'warning' | 'error' | 'offline' | 'info';

export interface Device {
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
  currentValue: string;
  valueUnit: string;
}

interface DeviceContextType {
  devices: Device[];
  getDevice: (id: number) => Device | undefined;
  getSensorValue: (type: string) => { value: string; status: DeviceStatus; statusLabel: string } | null;
  isHubOnline: boolean;
  lastUpdate: string;
  samples: Sample[];
  ready: boolean;
}

const baseDevices: Device[] = [
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
    currentValue: '42',
    valueUnit: '%',
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
    currentValue: '24.8',
    valueUnit: '°C',
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
    currentValue: '—',
    valueUnit: 'pH',
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
    currentValue: '142',
    valueUnit: 'ppm',
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
    currentValue: '19',
    valueUnit: 'ppm',
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
    currentValue: '75',
    valueUnit: '%',
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
    currentValue: '0',
    valueUnit: '%',
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
    currentValue: '—',
    valueUnit: '%',
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
    currentValue: 'Сухо',
    valueUnit: '',
  },
];

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [ready, setReady] = useState(false);
  const [devices, setDevices] = useState<Device[]>(baseDevices);

  useEffect(() => {
    const initial = history(24, 5);
    setSamples(initial);
    setReady(true);

    const id = setInterval(() => {
      const now = Date.now();
      const newSample = simulateAt(now);
      
      setSamples(prev => {
        const next = [...prev, newSample];
        return next.length > 288 ? next.slice(-288) : next;
      });

      // Обновляем показания устройств из единого источника
      setDevices(prev => prev.map(d => {
        if (d.id === 2) return { ...d, currentValue: newSample.temp.toString(), lastSeen: 'только что' };
        if (d.id === 3) return { ...d, currentValue: '—', lastSeen: '~2 мин' }; // калибровка
        if (d.id === 4) return { ...d, currentValue: '142', lastSeen: 'только что' };
        if (d.id === 5) return { ...d, currentValue: newSample.co2.toString(), lastSeen: 'только что' };
        return d;
      }));
    }, 5000);

    return () => clearInterval(id);
  }, []);

  const isHubOnline = devices[0].status === 'success';
  const lastUpdate = samples.length > 0 
    ? new Date(samples[samples.length - 1].t).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    : '—';

  const getDevice = (id: number) => devices.find(d => d.id === id);

  const getSensorValue = (type: string) => {
    const sensorMap: Record<string, number> = {
      'temperature': 2,
      'ph': 3,
      'ec': 4,
      'co2': 5,
    };
    const id = sensorMap[type];
    if (!id) return null;
    const device = getDevice(id);
    if (!device) return null;
    return {
      value: device.currentValue,
      status: device.status,
      statusLabel: device.statusLabel,
    };
  };

  return (
    <DeviceContext.Provider value={{ devices, getDevice, getSensorValue, isHubOnline, lastUpdate, samples, ready }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevices() {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevices must be used within DeviceProvider');
  }
  return context;
}