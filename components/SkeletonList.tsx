'use client';

import Skeleton from './Skeleton';

export default function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Skeleton width="48px" height="48px" rounded="lg" />
              <div>
                <Skeleton width="160px" height="18px" rounded="md" className="mb-2" />
                <Skeleton width="80px" height="12px" rounded="sm" />
              </div>
            </div>
            <Skeleton width="20px" height="20px" rounded="sm" />
          </div>
          <div className="space-y-2 mb-4">
            <Skeleton width="200px" height="14px" rounded="sm" />
            <Skeleton width="180px" height="14px" rounded="sm" />
          </div>
          <Skeleton width="140px" height="12px" rounded="sm" />
        </div>
      ))}
    </div>
  );
}