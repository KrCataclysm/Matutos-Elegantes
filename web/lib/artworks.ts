import type { Artwork, NavItem } from './types';

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/', label: 'Início', index: '01' },
  { href: '/acervo/', label: 'Acervo', index: '02' },
  { href: '/projetos/', label: 'Projetos', index: '03' },
  { href: '/instituicao/', label: 'Instituição', index: '04' },
  { href: '/contato/', label: 'Contato', index: '05' },
] as const;

/** Obras de demonstração geradas por código, trocar por acervo real (campo `image`). */
export const ARTWORKS: readonly Artwork[] = [
  {
    id: 'a-001',
    slug: 'travessia-i',
    title: 'Travessia I',
    artist: 'Acervo Matutos',
    year: 2026,
    medium: 'Pintura digital',
    dimensions: { width: 180, height: 240, unit: 'cm' },
    edition: { number: 1, of: 7 },
    description: 'Campos de cor sobrepostos em ritmo de festa e memória.',
    palette: { ground: '#F0E9D8', colors: ['#F0570F', '#0B4A1E', '#E0307F', '#F19200'] },
    seed: 7,
  },
  {
    id: 'a-002',
    slug: 'chapeu-de-palha',
    title: 'Chapéu de Palha',
    artist: 'Acervo Matutos',
    year: 2026,
    medium: 'Colagem',
    dimensions: { width: 120, height: 160, unit: 'cm' },
    description: 'Geometria solar inspirada no trançado e no horizonte.',
    palette: { ground: '#EFE7D3', colors: ['#F19200', '#1F4FA8', '#6AA823', '#0E0E0C'] },
    seed: 21,
  },
];
