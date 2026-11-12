/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iqBlue: '#005EB8',
        iqGreen: '#87C232',
        iqBlueDark: '#004a94',
        iqBlueLight: '#E6F0F9',
        iqGreenDark: '#6da322',
        iqSlate: '#1e293b',

        // Landing page tokens (sampled from cloudconnekt.com).
        // Colour roles follow the site: indigo for buttons, electric blue for
        // icons and highlights, orange only on small tags, gold for names and stars.
        primary: { DEFAULT: '#060925', card: '#070B1D' },
        navy: { DEFAULT: '#0A173A', tint: '#05143B' },
        brand: { blue: '#135A96' },
        electric: { DEFAULT: '#3B66FE', light: '#7793F8' },
        indigo: { DEFAULT: '#5755D9', hover: '#4644C2', deep: '#283593' },
        accent: { DEFAULT: '#FF8F00', hover: '#E67E00', soft: '#FFF1DE' },
        gold: '#F9A825',
        panel: '#DDE4F6',
        bg: { DEFAULT: '#F7F7F7', grey: '#EEEFF0' },
        body: { DEFAULT: '#5B6275', dark: '#C9CDE0' },
        border: '#E3E7F2',
        success: '#52C95A',
      },
      fontFamily: {
        // --font-poppins is only set to Poppins inside `.landing` (see index.css),
        // so `font-sans` on the dashboards and login screens is unchanged.
        sans: ['var(--font-poppins)', 'sans-serif'],
        ui: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'electric-grad': 'linear-gradient(135deg,#3B66FE 0%,#7793F8 100%)',
        'hero-glow':
          'radial-gradient(circle, rgba(59,102,254,.55) 0%, rgba(87,85,217,.35) 45%, rgba(87,85,217,.12) 75%, transparent 80%)',
      },
      boxShadow: {
        card: '0 10px 30px rgba(10, 23, 58, 0.08)',
        'card-hover': '0 18px 40px rgba(10, 23, 58, 0.16)',
        'card-dark': '0 12px 24px rgba(6, 9, 37, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 7s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(8px, -8px)' },
        },
      }
    },
  },
  plugins: [],
}
