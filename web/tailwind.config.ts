import type { Config } from 'tailwindcss';

/**
 * Sistema de design — "Galeria Matutos".
 * Princípios: papel marfim, tinta quase preta, fio de 1px, ouro como único acento neutro;
 * a cor vive nas obras (spectrum), nunca na interface.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: '#F6F3EC', 50: '#FBFAF6', 100: '#F6F3EC', 200: '#EDE8DC', 300: '#DDD6C5' },
        ink: { DEFAULT: '#0E0E0C', 900: '#0E0E0C', 700: '#2A2926', 500: '#6B6860', 300: '#A8A497' },
        gold: { DEFAULT: '#A9884F', soft: '#C9AE7C', deep: '#7C6234' },
        // Espectro da marca: usado apenas dentro das obras e em micro-acentos.
        spectrum: {
          ember: '#F0570F',
          amber: '#F19200',
          moss: '#6AA823',
          lagoon: '#0E93A6',
          cobalt: '#1F4FA8',
          violet: '#6B3FA0',
          rose: '#E0307F',
          forest: '#0B4A1E',
        },
        line: 'rgba(14,14,12,0.16)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'micro': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.22em' }],
        'label': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.18em' }],
        'body': ['1rem', { lineHeight: '1.75' }],
        'lead': ['clamp(1.1rem,1.4vw,1.35rem)', { lineHeight: '1.65' }],
        'display-md': ['clamp(2rem,4vw,3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(3rem,7vw,6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(3.4rem,10.5vw,10.5rem)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
      },
      spacing: { gutter: 'clamp(1.25rem,4vw,3.5rem)', section: 'clamp(6rem,14vw,14rem)' },
      maxWidth: { frame: '96rem' },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
        silk: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: { 600: '600ms', 900: '900ms', 1400: '1400ms' },
      boxShadow: {
        float: '0 40px 80px -40px rgba(14,14,12,0.35), 0 12px 24px -16px rgba(14,14,12,0.18)',
        frame: '0 60px 120px -50px rgba(14,14,12,0.45)',
      },
      keyframes: {
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '25%': { transform: 'translate(-2%,1%)' },
          '50%': { transform: 'translate(1%,-2%)' },
          '75%': { transform: 'translate(2%,2%)' },
        },
      },
      animation: { grain: 'grain 8s steps(6) infinite' },
    },
  },
  plugins: [],
};

export default config;
