import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        // Scrapbook palette — names must exactly match usage in components
        scrapbook: {
          cream: '#FAF6F1',
          blush: '#F5D6D6',
          rose: '#E8B4B8',
          sage: '#D8E2D0',
          lavender: '#E6E1F5',
          beige: '#E9DFD2',
          peach: '#F8DCC8',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        caveat: ['Caveat', 'cursive'],
        sacramento: ['Sacramento', 'cursive'],
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        glow: 'glow 2s ease-in-out infinite',
        rotate: 'rotate 20s linear infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
  // Force-include all scrapbook color utilities so they aren't purged
  safelist: [
    'bg-scrapbook-cream',
    'bg-scrapbook-blush',
    'bg-scrapbook-rose',
    'bg-scrapbook-sage',
    'bg-scrapbook-lavender',
    'bg-scrapbook-beige',
    'bg-scrapbook-peach',
    'text-scrapbook-cream',
    'text-scrapbook-blush',
    'text-scrapbook-rose',
    'text-scrapbook-sage',
    'text-scrapbook-lavender',
    'text-scrapbook-beige',
    'text-scrapbook-peach',
    'border-scrapbook-rose',
    'border-scrapbook-sage',
    'border-scrapbook-blush',
    'fill-scrapbook-rose',
    { pattern: /bg-scrapbook-(cream|blush|rose|sage|lavender|beige|peach)\/(10|20|30|40|50|60|70|80)/ },
    { pattern: /text-scrapbook-(cream|blush|rose|sage|lavender|beige|peach)\/(10|20|30|40|50|60|70|80)/ },
  ],
};
