import { useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';
import FuzzyText from '../ui/FuzzyText';

export function NotFound() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink-950 px-6 py-24 text-center">
      {/* Ambient emerald glow behind the fuzz */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(620px circle at 50% 42%, rgba(52,211,153,0.08), transparent 70%)',
        }}
      />

      <p className="relative mb-6 font-mono text-xs font-medium tracking-[0.3em] text-accent-400 uppercase">
        Error 404
      </p>

      <div className="relative leading-none">
        {reduceMotion ? (
          <span
            className="bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 bg-clip-text font-serif font-black text-transparent"
            style={{ fontSize: 'clamp(6rem, 24vw, 16rem)' }}
          >
            404
          </span>
        ) : (
          <FuzzyText
            fontSize="clamp(6rem, 24vw, 16rem)"
            fontWeight={900}
            fontFamily="Fraunces, ui-serif, Georgia, serif"
            gradient={['#6ee7b7', '#34d399', '#10b981']}
            baseIntensity={0.22}
            hoverIntensity={0.6}
            fuzzRange={36}
            fps={45}
            direction="horizontal"
            transitionDuration={18}
            clickEffect
            glitchMode
            glitchInterval={2200}
            glitchDuration={160}
          >
            404
          </FuzzyText>
        )}
      </div>

      <p className="relative mt-8 max-w-md text-lg text-zinc-300">This page drifted off into the void.</p>
      <p className="relative mt-2 max-w-md text-sm text-zinc-500">
        The page you're looking for doesn't exist — or was fuzzed out of existence.
      </p>

      <div className="relative mt-10">
        <ButtonLink href="#top" size="lg">
          Take me home
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  );
}
