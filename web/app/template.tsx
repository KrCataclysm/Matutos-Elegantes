'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactElement, ReactNode } from 'react';

/** Reexecuta a cada navegação: entrada de página suave, sem cortes bruscos. */
export default function Template({ children }: { readonly children: ReactNode }): ReactElement {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={reduce ? false : { opacity: 0, y: 22, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
