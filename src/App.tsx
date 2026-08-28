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

const SERVICE_ALIASES: Record<string, string> = {
  'ai-agents': 'projects',
  'whatsapp-automation': 'projects',
  'crm-automation': 'projects',
  'web-development': 'projects',
};

function resolveRoute(): { is404: boolean; targetId: string | null } {
  const rawPath = window.location.pathname.replace(/\/$/, '') || '/';
  const hash = window.location.hash.slice(1);

  if (rawPath === '/' || rawPath === '/index.html') {
    const unknown = !KNOWN_HASHES.has(hash);
    return { is404: unknown, targetId: hash || null };
  }

  const cleanPath = rawPath.slice(1);
  if ((SECTION_IDS as readonly string[]).includes(cleanPath)) {
    return { is404: false, targetId: cleanPath };
  }

  if (SERVICE_ALIASES[cleanPath]) {
    return { is404: false, targetId: SERVICE_ALIASES[cleanPath] };
  }

  return { is404: true, targetId: null };
}

const DEFAULT_TITLE = 'AS Ayman — AI Automation Entrepreneur & Full-Stack Engineer';

const SECTION_TITLES: Record<string, string> = {
  about: 'About | AS Ayman — AI Automation Developer',
  skills: 'Skills & Tech Stack | AS Ayman',
  projects: 'Projects & Work | AS Ayman',
  gallery: 'Gallery | AS Ayman',
  contact: 'Contact | AS Ayman — AI Automation Developer',
};

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [{ is404, targetId }, setRoute] = useState(() => resolveRoute());

  useEffect(() => {
    const onLocationChange = () => {
      const route = resolveRoute();
      setRoute(route);
      if (route.is404) window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', onLocationChange);
    window.addEventListener('popstate', onLocationChange);
    return () => {
      window.removeEventListener('hashchange', onLocationChange);
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  // Update document.title based on active route/section
  useEffect(() => {
    if (is404) {
      document.title = '404: Page Not Found | AS Ayman';
      return;
    }
    const target = targetId || window.location.hash.slice(1);
    if (target && SECTION_TITLES[target]) {
      document.title = SECTION_TITLES[target];
    } else {
      document.title = DEFAULT_TITLE;
    }
  }, [is404, targetId]);

  // Scroll to target section when route is valid
  useEffect(() => {
    if (is404) return;
    const target = targetId || window.location.hash.slice(1);
    if (!target) return;
    const el = document.getElementById(target);
    if (el) {
      setTimeout(() => el.scrollIntoView(), 50);
    }
  }, [is404, targetId]);

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
