import { useState } from 'react';
import { Footer } from './components/layout/Footer';
import { IntroOverlay } from './components/layout/IntroOverlay';
import { Nav } from './components/layout/Nav';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Gallery } from './components/sections/Gallery';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

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
