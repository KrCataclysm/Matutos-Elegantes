'use client';

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactElement } from 'react';
import { NAV_ITEMS } from '@/lib/artworks';

const EASE = [0.22, 1, 0.36, 1] as const;

export function FloatingNav(): ReactElement {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 140);
    setElevated(latest > 24);
  });

  const close = useCallback((): void => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onDialogKey = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const focusables = dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const isActive = (href: string): boolean => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-gutter sm:top-6"
        initial={reduce ? false : { y: -80, opacity: 0 }}
        animate={{ y: hidden && !open ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: hidden ? 0 : 0.1 }}
      >
        <nav
          aria-label="Principal"
          className={`pointer-events-auto flex w-full max-w-[64rem] items-center justify-between gap-6 border border-line pl-6 pr-2 py-2 backdrop-blur-xl transition-[background-color,box-shadow] duration-900 ease-luxe ${
            elevated ? 'bg-ivory/85 shadow-float' : 'bg-ivory/55'
          }`}
        >
          <Link href="/" className="font-display text-[1.15rem] leading-none tracking-tight" aria-label="Matutos Elegantes — página inicial">
            Matutos <span className="italic text-gold-deep">Elegantes</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.filter((i) => i.href !== '/').map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="label relative block px-4 py-3 text-ink-700 transition-colors duration-600 ease-luxe hover:text-ink"
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span layoutId="nav-active" aria-hidden="true" className="absolute inset-x-4 bottom-1.5 h-px bg-ink" transition={{ duration: 0.7, ease: EASE }} />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
            className="label min-h-11 border border-ink/30 px-5 md:hidden"
          >
            Menu
          </button>
          <Link href="/contato/" className="label hidden min-h-11 items-center bg-ink px-6 text-ivory transition-colors duration-600 ease-luxe hover:bg-gold-deep md:inline-flex">
            Fale conosco
          </Link>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            onKeyDown={onDialogKey}
            className="fixed inset-0 z-[70] flex flex-col bg-ink px-gutter pb-10 pt-6 text-ivory md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl">
                Matutos <span className="italic text-gold-soft">Elegantes</span>
              </span>
              <button ref={closeRef} type="button" onClick={close} className="label min-h-11 border border-ivory/40 px-5">
                Fechar
              </button>
            </div>
            <ul className="mt-auto space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-b border-ivory/15"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.07 }}
                >
                  <Link href={item.href} onClick={() => setOpen(false)} aria-current={isActive(item.href) ? 'page' : undefined} className="flex items-baseline gap-5 py-4">
                    <span className="micro text-gold-soft">{item.index}</span>
                    <span className="font-display text-[2.6rem] leading-none">{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
