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
