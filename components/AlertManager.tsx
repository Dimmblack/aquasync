'use client';

import { useEffect, useState } from 'react';
import { X, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useDevices } from '@/context/DeviceContext';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  time: string;
}

export default function AlertManager() {
  const { alerts } = useDevices();
  const [visible, setVisible] = useState<Alert[]>([]);

  useEffect(() => {
    setVisible(alerts.slice(0, 3));
  }, [alerts]);

  const dismiss = (id: string) => {
    setVisible(prev => prev.filter(a => a.id !== id));
  };

  if (visible.length === 0) return null;

  const icons = {
    warning: AlertTriangle,
    error: AlertCircle,
    info: Info,
  };

  const colors = {
    warning: 'border-[var(--status-warning)]/40 bg-[var(--status-warning)]/10',
    error: 'border-[var(--status-error)]/40 bg-[var(--status-error)]/10',
    info: 'border-[var(--status-info)]/40 bg-[var(--status-info)]/10',
  };

  const iconColors = {
    warning: 'text-[var(--status-warning)]',
    error: 'text-[var(--status-error)]',
    info: 'text-[var(--status-info)]',
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {visible.map(alert => {
        const Icon = icons[alert.type];
        return (
          <div
            key={alert.id}
            className={`border rounded-xl p-4 shadow-lg backdrop-blur-md animate-in slide-in-from-right ${colors[alert.type]}`}
          >
            <div className="flex items-start gap-3">
              <Icon className={`w-5 h-5 shrink-0 ${iconColors[alert.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)]">{alert.title}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{alert.message}</p>
                <p className="text-xs text-[var(--text-dim)] mt-1">{alert.time}</p>
              </div>
              <button
                onClick={() => dismiss(alert.id)}
                className="text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}