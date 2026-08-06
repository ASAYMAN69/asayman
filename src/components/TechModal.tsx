import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import type { TechNode } from '../data/techOrbit';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface TechModalProps {
  node: TechNode | null;
  onClose: () => void;
}

export function TechModal({ node, onClose }: TechModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tech-detail-title"
        >
          <button
            type="button"
            aria-label="Close technology details"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ink-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-ink-900/95 p-6 shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-100"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              {node.icon ? (
                <img src={node.icon} alt="" className="h-10 w-10" draggable={false} />
              ) : node.glyph ? (
                <node.glyph className="h-8 w-8 text-accent-300" />
              ) : null}
              <h3 id="tech-detail-title" className="text-lg font-semibold tracking-tight text-zinc-50">
                {node.label}
              </h3>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-400">{node.description}</p>

            {node.worked && (
              <div className="mt-5">
                <h4 className="font-mono text-[11px] font-medium tracking-[0.2em] text-accent-400 uppercase">
                  How I&apos;ve used it
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{node.worked}</p>
              </div>
            )}

            {node.projects && node.projects.length > 0 && (
              <div className="mt-5">
                <h4 className="font-mono text-[11px] font-medium tracking-[0.2em] text-accent-400 uppercase">
                  Projects involved
                </h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {node.projects.map((project) => (
                    <li
                      key={project}
                      className="rounded-md border border-white/[0.08] bg-ink-950/60 px-2.5 py-1 text-xs text-zinc-300"
                    >
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}