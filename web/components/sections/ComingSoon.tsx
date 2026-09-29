import type { ReactElement } from 'react';
import { Button } from '@/components/ui/Button';

export function ComingSoon({ title }: { readonly title: string }): ReactElement {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-frame flex-col justify-end px-gutter pb-24 pt-40">
      <p className="micro text-gold-deep">Em construção</p>
      <h1 className="mt-6 font-display text-display-lg">{title}</h1>
      <p className="mt-6 max-w-md text-lead text-ink-700">Esta seção será publicada em breve.</p>
      <div className="mt-10">
        <Button href="/">Voltar ao início</Button>
      </div>
    </section>
  );
}
