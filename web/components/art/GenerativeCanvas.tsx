import { useId, type ReactElement } from 'react';
import { createPrng, round } from '@/lib/prng';
import type { ArtworkPalette } from '@/lib/types';

interface GenerativeCanvasProps {
  readonly palette: ArtworkPalette;
  readonly seed: number;
  readonly title: string;
  readonly className?: string;
}

const W = 1000;
const H = 1250;

interface Shape {
  readonly key: string;
  readonly d: string;
  readonly fill: string;
  readonly opacity: number;
}

function buildShapes(palette: ArtworkPalette, seed: number): { shapes: Shape[]; lines: string[] } {
  const rnd = createPrng(seed);
  const colors = palette.colors;
  const pick = (): string => colors[Math.floor(rnd() * colors.length)] ?? '#0E0E0C';
  const shapes: Shape[] = [];
  const cols = 4;
  const rows = 5;
  const cw = W / cols;
  const ch = H / rows;

  for (let i = 0; i < 9; i += 1) {
    const cx = Math.floor(rnd() * cols);
    const cy = Math.floor(rnd() * rows);
    const span = 1 + Math.floor(rnd() * 2);
    const x = cx * cw;
    const y = cy * ch;
    const w = Math.min(cw * span, W - x);
    const h = Math.min(ch * span, H - y);
    const kind = Math.floor(rnd() * 4);
    const fill = pick();
    const opacity = round(0.82 + rnd() * 0.18);
    let d: string;
    if (kind === 0) {
      const r = Math.min(w, h) / 2;
      const ccx = x + w / 2;
      const ccy = y + h / 2;
      d = `M${round(ccx - r)} ${round(ccy)}a${round(r)} ${round(r)} 0 1 0 ${round(r * 2)} 0a${round(r)} ${round(r)} 0 1 0 ${round(-r * 2)} 0z`;
    } else if (kind === 1) {
      const r = w / 2;
      d = `M${round(x)} ${round(y + h)}V${round(y + r)}a${round(r)} ${round(r)} 0 0 1 ${round(w)} 0V${round(y + h)}z`;
    } else if (kind === 2) {
      d = `M${round(x)} ${round(y)}H${round(x + w)}A${round(w)} ${round(h)} 0 0 1 ${round(x)} ${round(y + h)}z`;
    } else {
      d = `M${round(x)} ${round(y)}h${round(w)}v${round(h)}h${round(-w)}z`;
    }
    shapes.push({ key: `s${i}`, d, fill, opacity });
  }

  const lines: string[] = [];
  for (let i = 0; i < 3; i += 1) {
    const yy = round(rnd() * H);
    lines.push(`M0 ${yy}H${W}`);
  }
  const xx = round(rnd() * W);
  lines.push(`M${xx} 0V${H}`);
  return { shapes, lines };
}

/** Obra abstrata generativa (determinística). Substituível por imagem real via `Artwork.image`. */
export function GenerativeCanvas({ palette, seed, title, className }: GenerativeCanvasProps): ReactElement {
  const uid = useId().replace(/:/g, '');
  const { shapes, lines } = buildShapes(palette, seed);
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${className ?? ''}`}
    >
      <defs>
        <filter id={`grain-${uid}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" />
        </filter>
      </defs>
      <rect width={W} height={H} fill={palette.ground} />
      <g style={{ mixBlendMode: 'multiply' }}>
        {shapes.map((s) => (
          <path key={s.key} d={s.d} fill={s.fill} opacity={s.opacity} />
        ))}
      </g>
      <g stroke="#0E0E0C" strokeOpacity="0.55" strokeWidth="1.5" fill="none">
        {lines.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <rect width={W} height={H} filter={`url(#grain-${uid})`} opacity="0.35" style={{ mixBlendMode: 'multiply' }} />
    </svg>
  );
}
