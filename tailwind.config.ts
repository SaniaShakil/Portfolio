import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0F172A',
          surface: '#1A2E1A',
          card: '#1F3A1F',
          'card-hover': '#2A4D2A',
        },
        accent: {
          DEFAULT: '#10B981',
          hover: '#34D399',
          glow: 'rgba(16, 185, 129, 0.08)',
          dim: 'rgba(16, 185, 129, 0.25)',
        },
        text: {
          primary: '#F0EFEB',
          secondary: '#9A9A9F',
          muted: '#5A5A60',
        },
        border: {
          DEFAULT: '#2D2D33',
          hover: '#3D3D43',
        },
        terminal: '#4ADE80',
      },
      fontFamily: {
        display: ['var(--font-clash)', 'system-ui', 'sans-serif'],
        body: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
