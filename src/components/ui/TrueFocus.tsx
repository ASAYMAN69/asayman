import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import './TrueFocus.css';

interface TrueFocusProps {
  sentence?: string;
  /** When provided, auto-cycles through these phrases, keeping the frame on the last word of each. */
  sentences?: string[];
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  initialIndex?: number;
  /** Seconds before the first sentence-change effect fires. */
  wordPause?: number;
  /** Seconds a swapped-in sentence stays after its letter effect completes. */
  stayDuration?: number;
  className?: string;
}

/**
 * Focus-frame text effect (adapted from @react-bits/TrueFocus-JS-CSS).
 * A corner frame travels to the active word while the rest stay blurred.
 * In `sentences` mode the phrase itself swaps on a timer and the frame
 * re-targets the last word, staying mounted for the whole sequence.
 */
export default function TrueFocus({
  sentence = 'True Focus',
  sentences,
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  initialIndex = 0,
  wordPause = 0.3,
  stayDuration = 0.5,
  className = '',
}: TrueFocusProps) {
  const activeSentences = sentences && sentences.length > 0 ? sentences : null;
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const words = (activeSentences ? activeSentences[sequenceIndex] : sentence).split(separator);
  const [currentIndex, setCurrentIndex] = useState<number | null>(initialIndex);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const activeIndex = activeSentences ? words.length - 1 : currentIndex;
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [measured, setMeasured] = useState(false);
  const [reservedWordWidth, setReservedWordWidth] = useState<number | null>(null);

  useEffect(() => {
    if (manualMode || activeSentences) return;
    const interval = window.setInterval(
      () => setCurrentIndex((prev) => (prev === null ? 0 : (prev + 1) % words.length)),
      (animationDuration + pauseBetweenAnimations) * 1000,
    );
    return () => window.clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length, activeSentences]);

  useEffect(() => {
    if (!activeSentences || activeSentences.length < 2) return;
    // Intro cadence: sentence s is shown at wordPause + (s-1)*(effect + stay).
    const timers = activeSentences
      .slice(1)
      .map((_, s) => {
        const target = s + 1;
        const delay = wordPause + (target - 1) * (animationDuration + stayDuration);
        return window.setTimeout(() => setSequenceIndex(target), delay * 1000);
      });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [sentences, wordPause, animationDuration, stayDuration]);

  useEffect(() => {
    if (activeIndex === null || activeIndex === -1) return;
    const container = containerRef.current;
    const activeWord = wordRefs.current[activeIndex];
    if (!container || !activeWord) return;

    const parentRect = container.getBoundingClientRect();
    const activeRect = activeWord.getBoundingClientRect();
    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
    setMeasured(true);
    // Reserve the widest focused word so the line layout never reflows when
    // the focused word swaps to a shorter one (prevents mobile line jumps).
    if (activeSentences) {
      setReservedWordWidth((prev) => (prev === null || activeRect.width > prev ? activeRect.width : prev));
    }
  }, [activeIndex, words.join(separator)]);

  const handleMouseEnter = (index: number) => {
    if (!manualMode) return;
    setLastActiveIndex(index);
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    if (manualMode) setCurrentIndex(lastActiveIndex);
  };

  return (
    <div ref={containerRef} className={`focus-container ${className}`}>
      {words.map((word, index) => {
        const isActive = index === activeIndex;
        const isSplitWord = isActive && activeSentences && sequenceIndex > 0;
        const wordStyle = {
          filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
          '--border-color': borderColor,
          '--glow-color': glowColor,
          transition: `filter ${animationDuration}s ease`,
          ...(isActive && activeSentences && reservedWordWidth != null
            ? {
                minWidth: `${reservedWordWidth}px`,
                display: 'inline-flex',
                justifyContent: 'center',
              }
            : {}),
        } as CSSProperties;

        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word ${isActive ? 'active' : ''}`}
            style={wordStyle}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {isSplitWord ? (
              <span className="word-letters" key={`letters-${sequenceIndex}`}>
                {word.split('').map((ch, li) => (
                  <motion.span
                    key={`${ch}-${li}`}
                    className="word-letter"
                    initial={{ opacity: 0, y: '0.5em' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: animationDuration,
                      delay: li * 0.02,
                      ease: 'easeOut',
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ) : (
              word
            )}
          </span>
        );
      })}

      {measured && (
        <motion.div
          className="focus-frame"
          initial={{
            opacity: 0,
            scale: 0.9,
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
          }}
          transition={{ duration: animationDuration, ease: 'easeOut' }}
          style={
            {
              '--border-color': borderColor,
              '--glow-color': glowColor,
            } as CSSProperties
          }
        >
          <span className="corner top-left" />
          <span className="corner top-right" />
          <span className="corner bottom-left" />
          <span className="corner bottom-right" />
        </motion.div>
      )}
    </div>
  );
}
