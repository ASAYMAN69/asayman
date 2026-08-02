import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';
import { useRef } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card that lifts on hover and follows the cursor with a soft emerald
 * radial glow. The glow tracks a GPUs motion template so mousemove is cheap.
 */
export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const glow = useMotionTemplate`radial-gradient(460px circle at ${mx}px ${my}px, rgba(52,211,153,0.07), transparent 72%)`;

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(event.clientX - rect.left);
    my.set(event.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`relative overflow-hidden ${className}`}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: glow }}
        />
      )}
      <div className="relative flex h-full w-full flex-col">{children}</div>
    </motion.div>
  );
}