/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { ComponentProps, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, useFBO, useGLTF } from '@react-three/drei';
import { easing } from 'maath';
import { useReducedMotion } from 'framer-motion';

type GlassMode = 'lens' | 'bar' | 'cube';
type GlassOverrides = Partial<ComponentProps<typeof MeshTransmissionMaterial>> & { scale?: number };

interface NavGlassProps {
  mode?: GlassMode;
  lensProps?: GlassOverrides;
  barProps?: GlassOverrides;
  cubeProps?: GlassOverrides;
}

const MODE_CONFIG = {
  lens: { glb: '/assets/3d/lens.glb', geometryKey: 'Cylinder', followPointer: true, lockToBottom: false },
  cube: { glb: '/assets/3d/cube.glb', geometryKey: 'Cube', followPointer: true, lockToBottom: false },
  bar: { glb: '/assets/3d/bar.glb', geometryKey: 'Cube', followPointer: false, lockToBottom: true },
} as const;

const DEFAULT_MATERIAL = {
  ior: 1.15,
  thickness: 5,
  anisotropy: 0.01,
  chromaticAberration: 0.1,
};

const BAR_DEFAULT_MATERIAL = {
  transmission: 1,
  roughness: 0,
  thickness: 10,
  ior: 1.15,
  color: '#ffffff',
  attenuationColor: '#ffffff',
  attenuationDistance: 0.25,
};

function AuroraBackdrop() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.5)');
    gradient.addColorStop(0.45, 'rgba(59, 130, 246, 0.32)');
    gradient.addColorStop(0.8, 'rgba(20, 184, 166, 0.14)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(canvas);
    t.needsUpdate = true;
    return t;
  }, []);

  return (
    <group>
      <mesh position={[-2.3, 0.2, -1]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} />
      </mesh>
      <mesh position={[2.5, -0.25, -2]}>
        <planeGeometry args={[3.8, 3.8]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} opacity={0.7} />
      </mesh>
      <mesh position={[0, -0.7, -3]}>
        <planeGeometry args={[4.6, 4.6]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} opacity={0.45} />
      </mesh>
    </group>
  );
}

interface GlassObjectProps {
  pointerTarget: RefObject<HTMLDivElement | null>;
  reduceMotion: boolean | null;
  config: (typeof MODE_CONFIG)[GlassMode];
  overrides: GlassOverrides;
}

function GlassObject({ pointerTarget, reduceMotion, config, overrides }: GlassObjectProps) {
  const ref = useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF(config.glb);
  const buffer = useFBO();
  const { viewport } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);
  const pointerRef = useRef({ x: 0, y: 0 });

  const material = useMemo(
    () => ({ ...DEFAULT_MATERIAL, ...(config.lockToBottom ? BAR_DEFAULT_MATERIAL : {}), ...overrides }),
    [config, overrides],
  );

  useEffect(() => {
    const mesh = nodes[config.geometryKey] as THREE.Mesh | undefined;
    const geo = mesh?.geometry;
    if (!geo) return;
    geo.computeBoundingBox();
    const box = geo.boundingBox;
    if (box) geoWidthRef.current = box.max.x - box.min.x || 1;
  }, [nodes, config.geometryKey]);

  useEffect(() => {
    const el = pointerTarget.current;
    if (!el || !config.followPointer) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointerRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [pointerTarget, config.followPointer]);

  useFrame((state, delta) => {
    const { gl, camera } = state;
    if (!ref.current) return;
    const vp = state.viewport.getCurrentViewport(camera, [0, 0, 15]);

    let destX = 0;
    let destY = 0;
    if (config.followPointer && !reduceMotion) {
      destX = ((pointerRef.current.x * vp.width) / 2) * 0.14;
      destY = ((pointerRef.current.y * vp.height) / 2) * 0.35;
    }
    if (config.lockToBottom) destY = -vp.height / 2 + 0.15;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if (material.scale == null) {
      const targetWorld = config.lockToBottom ? vp.width * 0.9 : vp.height * 1.5;
      ref.current.scale.setScalar(Math.min(targetWorld / geoWidthRef.current, 0.6));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  const { scale, ...materialProps } = material;

  return (
    <>
      {createPortal(<AuroraBackdrop />, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent depthWrite={false} />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={(nodes[config.geometryKey] as THREE.Mesh | undefined)?.geometry}
      >
        <MeshTransmissionMaterial buffer={buffer.texture} {...materialProps} />
      </mesh>
    </>
  );
}

export default function NavGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }: NavGlassProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const config = MODE_CONFIG[mode];
  const overrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  return (
    <div ref={wrapperRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} dpr={[1, 2]}>
        <GlassObject pointerTarget={wrapperRef} reduceMotion={reduceMotion} config={config} overrides={overrides} />
      </Canvas>
    </div>
  );
}
