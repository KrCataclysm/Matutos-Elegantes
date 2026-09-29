'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactElement } from 'react';

interface SplitTextProps {
  readonly text: string;
  readonly className?: string;
  readonly delay?: number;
  readonly stagger?: number;
  readonly italic?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Revela palavra a palavra, subindo de uma máscara. O rótulo acessível é o texto completo. */
export function SplitText({ text, className, delay = 0, stagger = 0.08, italic = false }: SplitTextProps): ReactElement {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  const container: Variants = { hidden: {}, show: { transition: { delayChildren: delay, staggerChildren: stagger } } };
  const word: Variants = {
    hidden: { y: '112%', rotate: 3 },
    show: { y: '0%', rotate: 0, transition: { duration: 1.15, ease: EASE } },
  };

  return (
    <motion.span
      className={`inline ${className ?? ''}`}
      aria-label={text}
      role="text"
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] pr-[0.06em]">
          <motion.span className={`inline-block will-change-transform ${italic ? 'italic' : ''}`} variants={word}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
