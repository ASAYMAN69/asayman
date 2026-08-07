import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  id?: string;
  className?: string;
}

/** Section header with a staggered eyebrow/title and an accent rule that draws in. */
export function SectionHeading({ eyebrow, title, description, id, className = 'mb-12' }: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`max-w-2xl ${className}`}>
      <Reveal delay={0}>
        <p className="mb-3 font-mono text-xs font-medium tracking-[0.25em] text-accent-400 uppercase">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 id={id} className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">{title}</h2>
        <motion.span
          aria-hidden="true"
          className="mt-3 block h-px origin-left bg-gradient-to-r from-accent-400 to-transparent"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">{description}</p>
        </Reveal>
      )}
    </div>
  );
}