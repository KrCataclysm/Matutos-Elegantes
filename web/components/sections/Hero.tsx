'use client';

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, type PointerEvent, type ReactElement } from 'react';
import { GenerativeCanvas } from '@/components/art/GenerativeCanvas';
import { KenBurns } from '@/components/motion/KenBurns';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Button } from '@/components/ui/Button';
import { ARTWORKS } from '@/lib/artworks';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero(): ReactElement {
  const featured = ARTWORKS[0];
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Parallax por rolagem: a tela desce mais devagar que o texto.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const canvasY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  // Parallax sutil por cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 60, damping: 20 });
  const py = useSpring(useTransform(my, [-1, 1], [-10, 10]), { stiffness: 60, damping: 20 });
  const onMove = (e: PointerEvent<HTMLElement>): void => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  if (!featured) return <section aria-hidden="true" />;

  return (
    <section
      ref={sectionRef}
      onPointerMove={onMove}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ivory px-gutter pb-16 pt-32 sm:pt-40 lg:min-h-[100svh] lg:pb-20"
    >
      <div className="mx-auto grid max-w-frame grid-cols-12 gap-x-6">
        {/* Legenda superior, fios de 1px */}
        <Reveal className="col-span-12 mb-10 flex items-center justify-between border-b border-line pb-4 lg:mb-14">
          <p className="micro text-ink-500">Ponto de Cultura · Associação Cultural</p>
          <p className="micro hidden text-ink-500 sm:block">Coleção MMXXVI</p>
        </Reveal>

        {/* Tela monumental, assimétrica, sangrando à direita */}
        <motion.div
          style={reduce ? undefined : { y: canvasY }}
          className="relative col-span-12 row-start-3 mt-10 lg:mt-0 lg:col-span-7 lg:col-start-6 lg:[grid-row:2/span_3] lg:-mr-gutter"
        >
          <motion.div style={reduce ? undefined : { x: px, y: py }}>
            <motion.figure
              initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)', scale: 1.08 }}
              animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
              transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
              className="relative bg-ivory-50 p-3 shadow-frame sm:p-4 lg:p-5"
            >
              <div className="absolute inset-2 border border-line sm:inset-2.5" aria-hidden="true" />
              <KenBurns className="aspect-[4/5] w-full lg:aspect-auto lg:h-[min(82svh,56rem)] lg:min-h-[34rem]">
                <GenerativeCanvas palette={featured.palette} seed={featured.seed} title={`${featured.title}, ${featured.year}`} />
              </KenBurns>
            </motion.figure>
          </motion.div>

          {/* Cartela flutuante da obra */}
          <motion.aside
            aria-label="Ficha da obra em destaque"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.5 }}
            className="relative z-20 -mt-8 ml-4 w-[calc(100%-2rem)] max-w-xs border border-line bg-ivory/90 p-5 shadow-float backdrop-blur-md sm:ml-8 lg:absolute lg:-bottom-6 lg:left-[-3.5rem] lg:mt-0 lg:ml-0 lg:w-72"
          >
            <p className="micro text-gold-deep">Em exibição</p>
            <p className="mt-3 font-display text-2xl leading-tight">
              <span className="italic">{featured.title}</span>
              <span className="text-ink-500">, {featured.year}</span>
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-y-2 border-t border-line pt-4 text-[0.78rem] text-ink-700">
              <dt className="text-ink-500">Técnica</dt>
              <dd>{featured.medium}</dd>
              <dt className="text-ink-500">Dimensões</dt>
              <dd>
                {featured.dimensions.width} × {featured.dimensions.height} {featured.dimensions.unit}
              </dd>
              {featured.edition && (
                <>
                  <dt className="text-ink-500">Edição</dt>
                  <dd>
                    {featured.edition.number}/{featured.edition.of}
                  </dd>
                </>
              )}
            </dl>
          </motion.aside>
        </motion.div>

        {/* Título gigante que atravessa a tela (mistura em diferença) */}
        <motion.h1
          id="hero-title"
          style={reduce ? undefined : { y: titleY }}
          className="pointer-events-none relative z-10 col-span-12 row-start-2 font-display text-display-xl text-ivory mix-blend-difference lg:col-span-9 lg:col-start-1 lg:row-start-2 lg:self-start"
        >
          <span className="block">
            <SplitText text="Matutos" delay={0.5} />
          </span>
          <span className="block pl-[8%] lg:pl-[14%]">
            <SplitText text="Elegantes" italic delay={0.75} />
          </span>
        </motion.h1>

        {/* Texto e chamadas */}
        <div className="col-span-12 row-start-4 mt-10 lg:col-span-4 lg:col-start-1 lg:row-start-4 lg:mt-0 lg:self-end">
          <Reveal delay={1.1}>
            <p className="max-w-md text-lead text-ink-700">
              Arte, tradição e identidade popular reunidas em um acervo vivo, uma plataforma cultural onde cada obra é um território.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="/acervo/">Explorar o acervo</Button>
              <Button href="/instituicao/" variant="outline">
                A instituição
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Indicador de rolagem */}
      <div className="pointer-events-none absolute bottom-6 left-gutter hidden items-center gap-4 lg:flex" aria-hidden="true">
        <span className="relative block h-16 w-px overflow-hidden bg-hairline">
          <motion.span className="absolute inset-x-0 top-0 h-6 bg-ink" animate={reduce ? undefined : { y: ['-100%', '280%'] }} transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }} />
        </span>
        <span className="micro text-ink-500 [writing-mode:vertical-rl]">Role</span>
      </div>
    </section>
  );
}
