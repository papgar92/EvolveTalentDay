/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#0a0e15',
        panel:    '#111824',
        'panel-2':'#0d141e',
        line:     '#1e2a3a',
        ink:      '#cdd9e8',
        'ink-dim':'#6c7d93',
        'ink-mute':'#445469',
        warn:     '#ffb454',
        crit:     '#ff5d6c',
        // Acentos como variables RGB -> permiten opacidad (/30) y "voltear" a rojo
        ok:       'rgb(var(--c-ok-rgb) / <alpha-value>)',
        info:     'rgb(var(--c-info-rgb) / <alpha-value>)',
        konoha:   'rgb(var(--c-konoha-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
