'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useRef, type PointerEvent, type ReactElement, type ReactNode } from 'react';

interface MagneticProps {
  readonly children: ReactNode;
  readonly strength?: number;
  readonly className?: string;
}

/** O elemento é atraído suavemente pelo cursor (somente mouse; ignorado em toque e movimento reduzido). */
export function Magnetic({ children, strength = 0.32, className }: MagneticProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.45 });

  const onMove = (e: PointerEvent<HTMLDivElement>): void => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = (): void => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={onLeave} className={`inline-block ${className ?? ''}`}>
      {children}
    </motion.div>
  );
}
