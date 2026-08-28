import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { profile } from '../../data/profile';
import asciiArt from '../../assets/ascii.txt?raw';
import DecryptedText from '../DecryptedText';
import { ButtonLink } from '../ui/ButtonLink';
import { Container } from '../ui/Container';
import { SocialLinks } from '../ui/SocialLinks';

// Drop `hero.jpg` / `asayman.jpg` etc. into src/assets/photos/ to replace the placeholder frame.
const heroPhoto = import.meta.glob<string>('../../assets/photos/{hero,asayman}.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});
const heroPhotoSrc = Object.values(heroPhoto)[0];
const PHOTO_FADE_MS = 800;

function useFadeUp(delay: number) {
  const reduceMotion = useReducedMotion();
  return {
    initial: reduceMotion ? false : ({ opacity: 0, y: 24 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] },
  };
}

export function Hero({ introDone = false }: { introDone?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [showPhoto, setShowPhoto] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const glowX = useMotionValue(-400);
  const glowY = useMotionValue(-400);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0.35]);

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    glowX.set(event.clientX - rect.left);
    glowY.set(event.clientY - rect.top);
  };

  useEffect(() => {
    if (!introDone) return;
    if (reduceMotion) {
      setShowPhoto(true);
      return;
    }
    const id = window.setTimeout(() => setShowPhoto(true), 800);
    return () => window.clearTimeout(id);
  }, [introDone, reduceMotion]);

  useEffect(() => {
    if (!showPhoto) return;
    const id = window.setTimeout(() => setBadgeVisible(true), PHOTO_FADE_MS);
    return () => window.clearTimeout(id);
  }, [showPhoto]);

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16"
    >
      {/* Ambient glow that follows the cursor — fixed-size layer translated via transform,
          so mousemove composites instead of repainting a 1240px background */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[620px] -left-[620px] h-[1240px] w-[1240px] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          background: 'radial-gradient(620px circle at center, rgba(52,211,153,0.10), transparent 70%)',
        }}
      />

      <motion.div style={{ y: reduceMotion ? 0 : contentY, opacity: reduceMotion ? 1 : contentOpacity }} className="relative w-full">
        <Container className="relative grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="order-2 lg:order-1">
          <motion.h1
            {...useFadeUp(0.08)}
            className="text-5xl font-semibold tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl"
          >
            I'm <span className="font-serif">{profile.name}</span>
          </motion.h1>

          <motion.p {...useFadeUp(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            {profile.tagline}
          </motion.p>

          <motion.div {...useFadeUp(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" size="lg">
              View projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" size="lg">
              Get in touch
            </ButtonLink>
          </motion.div>

          <motion.div {...useFadeUp(0.32)} className="mt-10 flex flex-col gap-5">
            <SocialLinks />
            <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-zinc-600" aria-hidden="true" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-zinc-600" aria-hidden="true" />
                {profile.email}
              </span>
            </p>
          </motion.div>
        </div>

        {/* Photo / ASCII decrypt frame */}
        <motion.div {...useFadeUp(0.2)} className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-none">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-accent-500/15 via-transparent to-transparent blur-2xl"
            />
            <div className="@container relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
              {/* ASCII art layer — shown while the intro curtain lifts */}
              {introDone && !reduceMotion && (
                <motion.div
                  aria-hidden={showPhoto}
                  className="absolute inset-0 flex items-center justify-center p-1"
                  initial={false}
                  animate={{ opacity: showPhoto ? 0 : 1 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                >
                  <pre
                    className="font-mono text-zinc-300"
                    style={{ fontSize: 'calc(100cqw / 92)', lineHeight: 1 }}
                  >
                    {asciiArt}
                  </pre>
                </motion.div>
              )}

              {/* Photo reveal layer */}
              <motion.div
                aria-hidden={!showPhoto}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: showPhoto ? 1 : 0 }}
                transition={{ duration: PHOTO_FADE_MS / 1000, ease: 'easeInOut' }}
              >
                {heroPhotoSrc ? (
                  <img
                    src={heroPhotoSrc}
                    alt={`Portrait of ${profile.name}`}
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-400/10 font-mono text-3xl font-semibold text-accent-300 ring-1 ring-accent-400/30">
                      {profile.firstName}
                    </span>
                    <p className="text-sm text-zinc-500">
                      Your photo goes here —
                      <br />
                      add <span className="font-mono text-xs text-zinc-400">src/assets/photos/asayman.jpg</span>
                    </p>
                  </div>
                )}

                {/* Top-left → bottom-right sheen on reveal */}
                {showPhoto && !reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1/2"
                    style={{
                      background:
                        'linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.35) 50%, transparent 58%)',
                    }}
                    initial={{ x: '-60%', y: '-60%', opacity: 0 }}
                    animate={{ x: '60%', y: '60%', opacity: [1, 1, 0] }}
                    transition={{
                      duration: 1.2,
                      ease: [0.22, 0.61, 0.36, 1],
                      opacity: { times: [0.15, 0.8, 1] },
                    }}
                  />
                )}
              </motion.div>
            </div>

            {/* Greeting badge — appears once the photo has fully faded in */}
            {badgeVisible && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-ink-800 px-4 py-1.5 text-xs text-zinc-200 shadow-lg shadow-black/40">
                  {reduceMotion ? (
                    <span>Hi there :D</span>
                  ) : (
                    <DecryptedText
                      text="Hi there :D"
                      animateOn="view"
                      sequential
                      revealDirection="center"
                      speed={40}
                      encryptedClassName="text-zinc-500"
                    />
                  )}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
      </motion.div>

      {/* Scroll cue */}
      {!reduceMotion && (
        <div
          aria-hidden="true"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">Scroll</span>
          <span className="relative h-9 w-[22px] rounded-full border border-white/15">
            <motion.span
              className="absolute left-1/2 top-1.5 h-1.5 w-1 rounded-full bg-accent-400"
              animate={reduceMotion ? {} : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ translateX: '-50%' }}
            />
          </span>
        </div>
      )}
    </section>
  );
}
