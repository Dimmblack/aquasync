'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export default function Skeleton({ width = '100%', height = '16px', className = '', rounded = 'md' }: SkeletonProps) {
  const radiusMap = {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  };

  return (
    <motion.div
      className={`bg-[var(--border)] ${className}`}
      style={{
        width,
        height,
        borderRadius: radiusMap[rounded],
        background: 'linear-gradient(90deg, var(--border) 25%, var(--border-hover) 50%, var(--border) 75%)',
        backgroundSize: '200% 100%',
      }}
      animate={{
        backgroundPosition: ['200% 0', '-200% 0'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}