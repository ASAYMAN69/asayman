import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImagePlus, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { galleryPhotos, gallerySlots } from '../../data/gallery';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const hasPhotos = galleryPhotos.length > 0;

  const close = useCallback(() => setSelected(null), []);
  const step = useCallback(
    (direction: 1 | -1) => {
      setSelected((current) => {
        if (current === null) return current;
        return (current + direction + galleryPhotos.length) % galleryPhotos.length;
      });
    },
    [],
  );

  // Keyboard navigation + scroll lock while the lightbox is open
  useEffect(() => {
    if (selected === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selected, close, step]);

  return (
    <section id="gallery" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="Beyond the code."
          description="A few frames from competitions, events, and the work in between."
        />

        {hasPhotos ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {galleryPhotos.map((src, index) => (
              <Reveal key={src} delay={(index % 3) * 0.06}>
                <li>
<button
                      type="button"
                      onClick={() => setSelected(index)}
                      aria-label={`Open photo ${index + 1} of ${galleryPhotos.length}`}
                      className="group relative block w-full overflow-hidden rounded-xl border border-white/[0.08] bg-ink-900"
                    >
                      <img
                        src={src}
                        alt={`Gallery photo ${index + 1}`}
                        loading="lazy"
                        className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      />
                      <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="px-4 pb-3 font-mono text-[11px] tracking-[0.2em] text-zinc-100 uppercase">
                          Photo {index + 1}
                        </span>
                      </span>
                    </button>
                </li>
              </Reveal>
            ))}
          </ul>
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {gallerySlots.map((slot, index) => (
                <Reveal key={slot.title} delay={(index % 3) * 0.06}>
                  <li className="flex aspect-square flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 bg-ink-900/30 p-6 text-center">
                    <ImagePlus className="h-6 w-6 text-zinc-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-zinc-300">{slot.title}</p>
                      <p className="mt-1 text-xs text-zinc-600">{slot.caption}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <p className="mt-8 text-center text-xs text-zinc-600">
              Drop photos into{' '}
              <code className="font-mono text-zinc-500">src/assets/photos/</code> and they'll appear here automatically.
            </p>
          </>
        )}
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && hasPhotos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-zinc-300 transition-colors hover:bg-white/[0.12] hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-zinc-300 transition-colors hover:bg-white/[0.12] hover:text-white sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <motion.img
              key={selected}
              src={galleryPhotos[selected]}
              alt={`Gallery photo ${selected + 1}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-full max-w-full rounded-lg object-contain"
            />

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
              className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-zinc-300 transition-colors hover:bg-white/[0.12] hover:text-white sm:right-6"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
