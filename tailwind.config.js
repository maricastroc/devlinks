import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
    './resources/ts/**/*.tsx',
    './resources/js/**/*.{jsx,tsx}',
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './public/**/*.html'
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Instrument Sans', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        'heading-m': ['32px', { lineHeight: '150%', fontWeight: '700' }],
        'heading-s': ['16px', { lineHeight: '150%', fontWeight: '700' }],
        'body-m': ['16px', { lineHeight: '150%', fontWeight: '400' }],
        'body-s': ['12px', { lineHeight: '150%', fontWeight: '400' }]
      },
      colors: {
        white: '#ffffff',
        'light-gray': '#FAFAFA',
        borders: '#D9D9D9',
        'medium-gray': '#737373',
        'dark-gray': '#333333',
        'medium-red': '#FF3939',
        'dark-red': '#C42D2D',
        'medium-purple': '#633CFF',
        'purple-hover': '#BEADFF',
        'light-purple': '#EFEBFF'
      }
    }
  },
  plugins: [
    forms,
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      addUtilities({
        '.bg-stripes': {
          backgroundImage: `repeating-linear-gradient(
                45deg,
                #3D444B,
                #3D444B 10px,
                #50575E 10px,
                #50575E 20px
            )`
        }
      });
    }
  ]
};
