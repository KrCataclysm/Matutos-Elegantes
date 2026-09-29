'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactElement, ReactNode } from 'react';

interface RevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly y?: number;
  readonly className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 28, className }: RevealProps): ReactElement {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
