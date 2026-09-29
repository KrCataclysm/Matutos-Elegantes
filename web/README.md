# Galeria Matutos (Next.js)

Plataforma de galeria/cultura em Next.js 15 (App Router), TypeScript estrito, Tailwind 3.4 e Framer Motion.
Exportação estática (`output: 'export'`), compatível com GitHub Pages.

```bash
npm install
npm run dev        # desenvolvimento
npm run typecheck  # tsc --noEmit
npm run lint
npm run build      # gera ./out
```

Para publicar em subcaminho: `NEXT_PUBLIC_BASE_PATH=/Matutos-Elegantes npm run build`.

## Arquitetura
- `tailwind.config.ts` — tokens: marfim/tinta/ouro, espectro da marca (só nas obras), escala tipográfica fluida, easings `luxe`/`silk`, sombras.
- `lib/types.ts` — contratos de metadados de obra (`Artwork`, `ArtworkPalette`, `NavItem`…).
- `lib/artworks.ts` — acervo de demonstração (obras generativas; trocar por `image` real).
- `components/art/GenerativeCanvas.tsx` — obra abstrata determinística em SVG.
- `components/motion/*` — `SplitText`, `Reveal`, `KenBurns`, `Magnetic` (respeitam `prefers-reduced-motion`).
- `components/layout/FloatingNav.tsx` — navegação flutuante (esconde ao rolar, menu modal acessível com foco preso e Esc).
- `components/sections/Hero.tsx` — hero monumental.
- `app/template.tsx` — transição de entrada entre páginas.
