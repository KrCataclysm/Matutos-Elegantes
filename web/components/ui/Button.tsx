import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';
import { Magnetic } from '../motion/Magnetic';

interface ButtonProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: 'solid' | 'outline';
  readonly className?: string;
}

/** Botão magnético com varredura de cor no hover. */
export function Button({ href, children, variant = 'solid', className }: ButtonProps): ReactElement {
  const base = 'group relative inline-flex min-h-[3.25rem] items-center gap-4 overflow-hidden px-7 label transition-colors duration-600 ease-luxe';
  const tone = variant === 'solid' ? 'bg-ink text-ivory hover:text-ink' : 'border border-ink/40 text-ink hover:text-ivory hover:border-ink';
  const sweep = variant === 'solid' ? 'bg-gold-soft' : 'bg-ink';
  return (
    <Magnetic className={className}>
      <Link href={href} className={`${base} ${tone}`}>
        <span aria-hidden="true" className={`absolute inset-0 translate-y-full ${sweep} transition-transform duration-900 ease-luxe group-hover:translate-y-0`} />
        <span className="relative">{children}</span>
        <svg aria-hidden="true" viewBox="0 0 24 8" className="relative h-2 w-6 transition-transform duration-600 ease-luxe group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 4h22M18 1l4 3-4 3" />
        </svg>
      </Link>
    </Magnetic>
  );
}
