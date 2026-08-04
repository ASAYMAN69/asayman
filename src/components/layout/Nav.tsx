import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useActiveSection, SECTION_IDS } from '../../hooks/useActiveSection';
import type { SectionId } from '../../hooks/useActiveSection';

const navLinks: { id: SectionId; label: string }[] = SECTION_IDS.map((id) => ({
  id,
  label: id.charAt(0).toUpperCase() + id.slice(1),
}));

export function Nav() {
  const activeSection = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu when resizing up to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 sm:top-6 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={`pointer-events-auto relative w-full max-w-4xl transition-all duration-300 overflow-hidden ${
          menuOpen
            ? 'rounded-3xl border border-white/10 bg-ink-950/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : scrolled
            ? 'rounded-full border border-white/10 bg-ink-950/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'rounded-full border border-white/5 bg-ink-950/30 backdrop-blur-xl'
        }`}
      >
        {!reduceMotion && (
          <div className="absolute inset-x-0 top-0 h-[2px]">
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 origin-left bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        )}
        <nav className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
          {/* Wordmark */}
        <a href="#top" className="flex items-center gap-2.5 text-zinc-100" aria-label="AS Ayman — back to top">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-400/10 font-mono text-sm font-semibold text-accent-300 ring-1 ring-accent-400/30">
            A
          </span>
          <span className="text-sm font-semibold tracking-tight">AS Ayman</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={activeSection === link.id ? 'true' : undefined}
                className={`rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                  activeSection === link.id
                    ? 'text-accent-300'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-lg border border-white/12 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-200 hover:border-accent-400/50 hover:text-accent-300"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-300 hover:bg-white/5 md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 pb-4 sm:px-6">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-md px-3 py-2.5 text-sm transition-colors ${
                      activeSection === link.id ? 'bg-white/[0.04] text-accent-300' : 'text-zinc-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 rounded-md bg-accent-400 px-3 py-2.5 text-center text-sm font-semibold text-ink-950"
                >
                  Get in touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
