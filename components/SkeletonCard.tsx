'use client';

import Skeleton from './Skeleton';

export default function SkeletonCard() {
  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6">
      <div className="flex justify-between items-start mb-4">
        <Skeleton width="80px" height="14px" rounded="sm" />
        <Skeleton width="24px" height="24px" rounded="sm" />
      </div>
      <Skeleton width="100px" height="32px" rounded="md" className="mb-2" />
      <Skeleton width="140px" height="12px" rounded="sm" />
    </div>
  );
}