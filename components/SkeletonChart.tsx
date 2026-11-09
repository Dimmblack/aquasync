'use client';

import Skeleton from './Skeleton';

export default function SkeletonChart() {
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
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            width="100%"
            height={`${30 + Math.random() * 50}%`}
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