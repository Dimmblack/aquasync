'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ToastProps {
  message: string;
  type: 'warning' | 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    warning: 'bg-[#C2A878]/20 border-[#C2A878]/50 text-[#C2A878]',
    success: 'bg-[#7A9B76]/20 border-[#7A9B76]/50 text-[#7A9B76]',
    error: 'bg-red-500/20 border-red-500/50 text-red-400',
    info: 'bg-[#6B8C96]/20 border-[#6B8C96]/50 text-[#6B8C96]',
  };

  const icons = {
    warning: '⚠️',
    success: '✅',
    error: '🚨',
    info: 'ℹ️',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 100, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`w-80 px-5 py-4 rounded-xl border backdrop-blur-md shadow-2xl ${colors[type]}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icons[type]}</span>
        <span className="font-medium text-sm">{message}</span>
        <button onClick={onClose} className="ml-auto text-sm opacity-60 hover:opacity-100 shrink-0">
          ✕
        </button>
      </div>
    </motion.div>
  );
}