import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/[locale]/*.{ts,tsx,js,jsx,mdx}",
    "./pages//.{ts,tsx,js,jsx,mdx}",
    "./components/**/.{ts,tsx,js,jsx,mdx}",
    "./src//*.{ts,tsx,js,jsx,mdx}",
    "./lib//*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#E4B441',
          dark: '#C39321',
          light: '#F5D576',
        },
        gray: {
          darkest: '#121212',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};

export default config;