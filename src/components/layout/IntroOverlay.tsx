import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BlurText from '../ui/BlurText';
import TrueFocus from '../ui/TrueFocus';

const BUSINESS_DELAY_MS = 1000; // wait after the frame locks on "business"
const EFFECT_MS = 500; // letter-split effect for profile and AI
const CYCLE_STAY_MS = 1000; // hold on the swapped-in word before the next effect
const FINAL_HOLD_MS = 1200; // delay after AI before the modal closes
const SWAPS = 2; // business? -> profile -> AI
const FOCUS_TO_REVEAL_MS =
  BUSINESS_DELAY_MS + SWAPS * EFFECT_MS + (SWAPS - 1) * CYCLE_STAY_MS + FINAL_HOLD_MS; // 4200

type IntroStage = 'blur' | 'focus';

/**
 * Full-screen intro: blur text fades in, then the TrueFocus frame auto-locks
 * on "business?". After BUSINESS_DELAY_MS the focused word letter-splits to
 * "profile", waits, then repeats into "AI", then the curtain lifts.
 */
export function IntroOverlay() {
  const [stage, setStage] = useState<IntroStage>('blur');
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  // Lock scroll while the intro is on screen; release the moment it hides so
  // the site scrolls during the curtain exit instead of after the unmount.
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  // Reduced-motion fallback: drive the sequence with timers instead of callbacks.
  useEffect(() => {
    if (!reduceMotion) return;
    const toFocus = window.setTimeout(() => setStage('focus'), 600);
    const reveal = window.setTimeout(() => setVisible(false), 600 + FOCUS_TO_REVEAL_MS);
    return () => {
      window.clearTimeout(toFocus);
      window.clearTimeout(reveal);
    };
  }, [reduceMotion]);

  // Hold after the focus sequence finishes, then reveal.
  useEffect(() => {
    if (stage !== 'focus' || reduceMotion) return;
    const reveal = window.setTimeout(() => setVisible(false), FOCUS_TO_REVEAL_MS);
    return () => window.clearTimeout(reveal);
  }, [stage, reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={false}
          exit={reduceMotion ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: reduceMotion ? 0.25 : 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative w-full min-h-[45vh]">
            <AnimatePresence>
              {stage === 'blur' ? (
                <motion.div
                  key="blur"
                  exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <BlurText
                    text="Building your next business?"
                    delay={250}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={() => setStage('focus')}
                    className="w-full justify-center px-6 text-center text-[clamp(2rem,6vw,4rem)] font-semibold tracking-tight text-zinc-50"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="focus"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <TrueFocus
                    sentences={[
                      'Building your next business?',
                      'Building your next profile?',
                      'Building your next AI?',
                    ]}
                    wordPause={BUSINESS_DELAY_MS / 1000}
                    stayDuration={CYCLE_STAY_MS / 1000}
                    blurAmount={5}
                    borderColor="#34d399"
                    glowColor="rgba(52, 211, 153, 0.5)"
                    animationDuration={EFFECT_MS / 1000}
                    pauseBetweenAnimations={0}
                    className="intro-focus"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
