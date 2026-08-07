import { useEffect, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { IntroOverlay } from './components/layout/IntroOverlay';
import { Nav } from './components/layout/Nav';
import { NotFound } from './components/pages/NotFound';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Gallery } from './components/sections/Gallery';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { SECTION_IDS } from './hooks/useActiveSection';

const KNOWN_HASHES = new Set<string>(['', 'top', 'main', ...SECTION_IDS]);

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [is404, setIs404] = useState(() => !KNOWN_HASHES.has(window.location.hash.slice(1)));

  useEffect(() => {
    const onHashChange = () => {
      const unknown = !KNOWN_HASHES.has(window.location.hash.slice(1));
      setIs404(unknown);
      if (unknown) window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // When the 404 clears, the sections mount after the hashchange event, so the
  // browser's native anchor jump misses — scroll the target in ourselves.
  useEffect(() => {
    if (is404) return;
    const hash = window.location.hash.slice(1);
    const el = hash ? document.getElementById(hash) : null;
    if (el) el.scrollIntoView();
  }, [is404]);

  if (is404) return <NotFound />;

  return (
    <>
      <IntroOverlay onReveal={() => setIntroDone(true)} />

      {/* Accessibility: skip straight to content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-accent-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero introDone={introDone} />
        <About />
        <Skills />
        <Projects />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
