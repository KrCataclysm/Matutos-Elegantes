import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ComingSoon } from '@/components/sections/ComingSoon';

export const metadata: Metadata = { title: 'Projetos' };

export default function Page(): ReactElement {
  return <ComingSoon title="Projetos" />;
}
