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
                sans: ['Instrument Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'white': '#ffffff',
                'light-gray': '#FAFAFA',
                'borders' : '#D9D9D9',
                'medium-gray': '#737373',
                'dark-gray': '#333333',
                'medium-red': '#FF3939',
                'dark-red': '#C42D2D',
                'medium-purple': '#633CFF',
                'purple-hover': '#BEADFF',
                'light-purple': '#EFEBFF',
            },
            fontSize: {
                'large': '16px',
                'medium': '14px',
                'small': '12px',
                'label-large': '16px',
                'label-medium': '14px',
                'label-small': '12px'
            },
            screens: {
                'min-550': '550px',
            },
            
        },
    },
    plugins: [forms, require('@tailwindcss/typography')],
    safelist: [
        'bg-[#EAB560]',
        'bg-[#488587]',
        'bg-[#633CFF]',
    ],
};
