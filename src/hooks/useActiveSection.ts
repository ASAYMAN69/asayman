import { useEffect, useState } from 'react';

export const SECTION_IDS = ['about', 'skills', 'projects', 'gallery', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Tracks which section currently crosses the middle band of the viewport,
 * used to highlight the active link in the navigation.
 */
export function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return active;
}
