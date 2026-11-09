'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast from './Toast';

interface Alert {
  id: string;
  message: string;
  type: 'warning' | 'success' | 'error' | 'info';
}

export default function AlertManager() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      const temp = parseFloat(localStorage.getItem('currentTemp') || '24.8');
      const ph = parseFloat(localStorage.getItem('currentPh') || '6.8');
      const lastAlert = localStorage.getItem('lastAlert');

      if (temp > 26.0 && lastAlert !== 'temp-high') {
        const newAlert = { id: Date.now().toString(), message: `Температура повышена! ${temp}°C`, type: 'warning' as const };
        setAlerts(prev => [...prev, newAlert]);
        localStorage.setItem('lastAlert', 'temp-high');
      }

      if (ph < 6.5 && lastAlert !== 'ph-low') {
        const newAlert = { id: Date.now().toString(), message: `pH ниже нормы! ${ph}`, type: 'warning' as const };
        setAlerts(prev => [...prev, newAlert]);
        localStorage.setItem('lastAlert', 'ph-low');
      }

      if (temp <= 26.0 && ph >= 6.5 && lastAlert !== null && lastAlert !== '') {
        localStorage.setItem('lastAlert', '');
      }
    }, 3000);

    return () => clearInterval(checkInterval);
  }, []);

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {alerts.map((alert) => (
          <div key={alert.id} className="pointer-events-auto">
            <Toast
              message={alert.message}
              type={alert.type}
              onClose={() => removeAlert(alert.id)}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}