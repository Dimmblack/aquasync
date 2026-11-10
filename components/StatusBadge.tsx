'use client';

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'offline' | 'info';
  label: string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, label, size = 'sm' }: StatusBadgeProps) {
  const colors = {
    success: 'var(--status-success)',
    warning: 'var(--status-warning)',
    error: 'var(--status-error)',
    offline: 'var(--status-offline)',
    info: 'var(--status-info)',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses[size]}`}>
      <span 
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: colors[status] }}
      />
      <span style={{ color: colors[status] }}>{label}</span>
    </span>
  );
}