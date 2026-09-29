import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Enquanto não há domínio .com.br: publica em github.io/Matutos-Elegantes.
// Com domínio próprio (public/CNAME), trocar para site: 'https://SEUDOMINIO.com.br' e remover `base`.
export default defineConfig({
  site: 'https://krcataclysm.github.io',
  base: '/Matutos-Elegantes',
  output: 'static',
  integrations: [sitemap()],
});
