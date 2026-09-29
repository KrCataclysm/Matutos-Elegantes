import type { Metadata, Viewport } from 'next';
import { Jost, Playfair_Display } from 'next/font/google';
import type { ReactElement, ReactNode } from 'react';
import { FloatingNav } from '@/components/layout/FloatingNav';
import './globals.css';

const display = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' });
const sans = Jost({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Matutos Elegantes, Ponto de Cultura', template: '%s · Matutos Elegantes' },
  description: 'Galeria e plataforma cultural da Associação Cultural Matutos Elegantes, Ponto de Cultura.',
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Matutos Elegantes' },
};

export const viewport: Viewport = { themeColor: '#F6F3EC', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { readonly children: ReactNode }): ReactElement {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="label fixed left-4 top-4 z-[80] -translate-y-24 bg-ink px-5 py-3 text-ivory transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <FloatingNav />
        <main id="conteudo">{children}</main>
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
