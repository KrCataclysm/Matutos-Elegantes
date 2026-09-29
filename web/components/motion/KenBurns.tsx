'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactElement, ReactNode } from 'react';

interface KenBurnsProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly intensity?: number;
}

/** Zoom + pan lento ao passar o cursor/foco. Envolve qualquer imagem ou obra. */
export function KenBurns({ children, className, intensity = 1 }: KenBurnsProps): ReactElement {
  const reduce = useReducedMotion();
  const variants: Variants = {
    rest: { scale: 1, x: '0%', y: '0%' },
    hover: {
      scale: 1 + 0.07 * intensity,
      x: `${-1.4 * intensity}%`,
      y: `${-1 * intensity}%`,
      transition: { duration: 2.2, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div className={`overflow-hidden ${className ?? ''}`} initial="rest" whileHover={reduce ? undefined : 'hover'} whileFocus={reduce ? undefined : 'hover'}>
      <motion.div className="h-full w-full will-change-transform" variants={variants}>
        {children}
      </motion.div>
    </motion.div>
  );
}
