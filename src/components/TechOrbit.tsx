/* eslint-disable react-hooks/exhaustive-deps */
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { TechNode } from '../data/techOrbit';
import { mainTechs } from '../data/techOrbit';
import { TechModal } from './TechModal';

const MAIN_RADIUS = 170;
const SUB_RADIUS = 140;
const SPEED = 0.00022; // rad/ms — one full revolution ≈ 28s
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Stage = 'idle' | 'orbit' | 'detail';

interface OrbitBadgeProps {
  node: TechNode;
  index: number;
  count: number;
  radius: number;
  speed: number;
  delay: number;
  converge: boolean;
  fade: boolean;
  paused: boolean;
  reduceMotion: boolean | null;
  onSelect: (node: TechNode) => void;
}

function OrbitBadge({ node, index, count, radius, speed, delay, converge, fade, paused, reduceMotion, onSelect }: OrbitBadgeProps) {
  const angleMV = useMotionValue((index / count) * Math.PI * 2);
  const radiusMV = useMotionValue(reduceMotion ? radius : 0);
  const scaleMV = useMotionValue(reduceMotion ? 1 : 0.5);
  const opacityMV = useMotionValue(reduceMotion ? 1 : 0);
  const x = useTransform(() => radiusMV.get() * Math.cos(angleMV.get()));
  const y = useTransform(() => radiusMV.get() * Math.sin(angleMV.get()));

  useAnimationFrame((_, delta) => {
    if (speed === 0 || paused) return;
    angleMV.set(angleMV.get() + speed * delta);
  });

  // Fly out from the middle on mount
  useEffect(() => {
    if (reduceMotion) return;
    const controls = [
      animate(radiusMV, radius, { duration: 0.75, ease: EASE_OUT, delay }),
      animate(scaleMV, 1, { duration: 0.55, ease: 'easeOut', delay: delay + 0.05 }),
      animate(opacityMV, 1, { duration: 0.4, delay }),
    ];
    return () => controls.forEach((c) => c.stop());
  }, [radius, delay]);

  // Selected badge flies to the middle; on back, every badge folds back in
  useEffect(() => {
    if (!converge) return;
    animate(radiusMV, 0, { duration: 0.38, ease: EASE_OUT });
    animate(scaleMV, 1.3, { duration: 0.38, ease: EASE_OUT });
  }, [converge]);

  // Non-selected badges dissolve while they keep orbiting
  useEffect(() => {
    if (fade) animate(opacityMV, 0, { duration: 0.7, ease: 'easeOut' });
  }, [fade]);

  const Glyph = node.glyph;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(node)}
      style={{ x, y, scale: scaleMV, opacity: opacityMV }}
      className="absolute left-1/2 top-1/2 -ml-8 -mt-9 flex w-16 flex-col items-center"
      aria-label={node.label}
    >
      <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/10 bg-ink-900/80 transition-transform duration-200 hover:scale-105">
        {node.icon ? (
          <img src={node.icon} alt="" className="h-7 w-7" draggable={false} decoding="async" />
        ) : Glyph ? (
          <Glyph className="h-6 w-6 text-accent-300" />
        ) : null}
      </span>
      <span className="mt-1.5 w-full text-center text-[11px] leading-tight text-zinc-400">{node.label}</span>
    </motion.button>
  );
}

interface CenterCoreProps {
  stage: Stage;
  node: TechNode | null;
  onStart: () => void;
  onBack: () => void;
}

function CenterCore({ stage, node, onStart, onBack }: CenterCoreProps) {
  const ActiveGlyph = node?.glyph;
  return (
    <AnimatePresence mode="wait" initial={false}>
      {stage === 'detail' && node ? (
        <motion.div
          key={node.id}
          initial={{ x: '-50%', y: -40, scale: 0.3, opacity: 0 }}
          animate={{ x: '-50%', y: -40, scale: 1, opacity: 1 }}
          exit={{ x: '-50%', y: -40, scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="absolute left-1/2 top-1/2 flex w-64 flex-col items-center px-4 text-center"
          aria-live="polite"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-accent-400/30 bg-ink-900/90 shadow-[0_0_50px_rgba(16,185,129,0.15)]">
            {node.icon ? (
              <img src={node.icon} alt="" className="h-10 w-10" draggable={false} decoding="async" />
            ) : ActiveGlyph ? (
              <ActiveGlyph className="h-9 w-9 text-accent-300" />
            ) : null}
          </span>
          <span className="mt-2 text-base font-medium text-zinc-100">{node.label}</span>
          <button
            type="button"
            onClick={onBack}
            className="mt-5 font-mono text-[11px] tracking-wider text-zinc-500 transition-colors duration-200 hover:text-accent-300"
          >
            ← Back
          </button>
        </motion.div>
      ) : (
        <motion.button
          key="primary"
          type="button"
          onClick={stage === 'orbit' ? onBack : onStart}
          className="group absolute left-1/2 top-1/2 -ml-10 -mt-10 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-white/15 bg-ink-900/90 transition-colors duration-200 hover:border-accent-400/50"
          aria-label={stage === 'idle' ? 'Reveal technology expertise' : 'Collapse technology orbit'}
        >
          <span className="font-mono text-[11px] font-medium tracking-[0.15em] text-accent-300 uppercase">Click</span>
          <span aria-hidden="true" className="absolute -inset-2.5 rounded-full border border-white/5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

interface OrbitRingProps {
  stage: Stage;
  mainRadius: number;
  subRadius: number;
  reduceMotion: boolean | null;
}

function OrbitRing({ stage, mainRadius, subRadius, reduceMotion }: OrbitRingProps) {
  const size = (stage === 'detail' ? subRadius : mainRadius) * 2;
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-white/[0.07]"
        initial={false}
        animate={{ width: size, height: size, x: '-50%', y: '-50%' }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      />
      {stage === 'idle' && !reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{ width: mainRadius * 2, height: mainRadius * 2, x: '-50%', y: '-50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400/70" />
        </motion.div>
      )}
    </>
  );
}

export function TechOrbit() {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>('idle');
  const [active, setActive] = useState<TechNode | null>(null);
  const [modalNode, setModalNode] = useState<TechNode | null>(null);
  const [convergeId, setConvergeId] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  const [backing, setBacking] = useState(false);
  const orbitRef = useRef<HTMLDivElement>(null);
  const inView = useInView(orbitRef, { margin: '200px' });
  const [orbitWidth, setOrbitWidth] = useState(0);
  const timerRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const node = orbitRef.current;
    if (!node) return;
    const update = () => setOrbitWidth(node.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const handleSelect = useCallback(
    (node: TechNode) => {
      if (backing) return;
      if (stage === 'orbit') {
        setActive(node);
        setConvergeId(node.id);
        setFading(true);
        timerRef.current = window.setTimeout(() => {
          setConvergeId(null);
          setFading(false);
          setStage('detail');
        }, 380);
      } else if (stage === 'detail') {
        setModalNode(node);
      }
    },
    [stage, backing],
  );

  const handleBack = useCallback(() => {
    if (backing) return;
    setBacking(true);
    timerRef.current = window.setTimeout(() => {
      setBacking(false);
      if (stage === 'detail') {
        setActive(null);
        setStage('orbit');
      } else {
        setStage('idle');
      }
    }, 320);
  }, [stage, backing]);

  const speed = reduceMotion ? 0 : SPEED;
  const items = stage === 'detail' && active ? (active.sub ?? []) : stage === 'orbit' ? mainTechs : [];
  const fitRadius = orbitWidth > 0 ? Math.max(0, orbitWidth / 2 - 44) : MAIN_RADIUS;
  const mainRadius = Math.min(MAIN_RADIUS, fitRadius);
  const subRadius = Math.min(SUB_RADIUS, fitRadius);
  const radius = stage === 'detail' ? subRadius : mainRadius;

  return (
    <div ref={orbitRef} className="relative mx-auto flex h-[420px] w-full max-w-xl items-center justify-center">
      <OrbitRing stage={stage} mainRadius={mainRadius} subRadius={subRadius} reduceMotion={reduceMotion} />
      <CenterCore stage={stage} node={active} onStart={() => setStage('orbit')} onBack={handleBack} />

      {items.map((node, i) => (
        <OrbitBadge
          key={node.id}
          node={node}
          index={i}
          count={items.length}
          radius={radius}
          speed={speed}
          delay={reduceMotion ? 0 : i * 0.05}
          converge={convergeId === node.id || backing}
          fade={fading && convergeId !== node.id}
          paused={!inView}
          reduceMotion={reduceMotion}
          onSelect={handleSelect}
        />
      ))}

      <TechModal node={modalNode} onClose={() => setModalNode(null)} />
    </div>
  );
}
