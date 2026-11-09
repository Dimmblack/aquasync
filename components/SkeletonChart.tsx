'use client';

import Skeleton from './Skeleton';

export default function SkeletonChart() {
  // Фиксированные высоты вместо Math.random() для совместимости с Next.js SSR
  const heights = ['40%', '60%', '35%', '70%', '50%', '65%', '45%', '55%'];

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Skeleton width="160px" height="20px" rounded="md" className="mb-2" />
          <Skeleton width="120px" height="12px" rounded="sm" />
        </div>
        <Skeleton width="100px" height="32px" rounded="md" />
      </div>
      <div className="h-64 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] p-6 flex items-end justify-between gap-2">
        {heights.map((height, i) => (
          <Skeleton
            key={i}
            width="100%"
            height={height}
            rounded="sm"
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} width="40px" height="12px" rounded="sm" />
        ))}
      </div>
    </div>
  );
}