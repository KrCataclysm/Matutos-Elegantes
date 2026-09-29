import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ComingSoon } from '@/components/sections/ComingSoon';

export const metadata: Metadata = { title: 'Acervo' };

export default function Page(): ReactElement {
  return <ComingSoon title="Acervo" />;
}
