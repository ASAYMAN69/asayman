import type { ElementType, ReactNode } from 'react';

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Page-width wrapper with consistent horizontal padding. */
export function Container({ as: Tag = 'div', className = '', children }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>{children}</Tag>;
}
