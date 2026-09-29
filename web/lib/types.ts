/** Metadados de obra, contrato único usado por páginas, grids e (futuro) CMS/JSON. */

export type SpectrumKey = 'ember' | 'amber' | 'moss' | 'lagoon' | 'cobalt' | 'violet' | 'rose' | 'forest';

export type ArtMedium = 'Pintura digital' | 'Colagem' | 'Gravura' | 'Fotografia' | 'Instalação' | 'Técnica mista';

export interface Dimensions {
  readonly width: number;
  readonly height: number;
  readonly unit: 'cm' | 'px';
}

export interface ArtworkPalette {
  readonly ground: string;
  readonly colors: readonly [string, string, string, ...string[]];
}

export interface Artwork {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly artist: string;
  readonly year: number;
  readonly medium: ArtMedium;
  readonly dimensions: Dimensions;
  readonly edition?: { readonly number: number; readonly of: number };
  readonly description: string;
  readonly palette: ArtworkPalette;
  /** Semente determinística da composição generativa. */
  readonly seed: number;
  /** Imagem real, quando existir; caso contrário a obra é gerada. */
  readonly image?: { readonly src: string; readonly alt: string; readonly width: number; readonly height: number };
}

export interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly index: string;
}
