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
                sans: ['InstrumentSans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'white': '#ffffff',
                'light-gray': '#FAFAFA',
                'borders' : '#D9D9D9',
                'medium-gray': '#737373',
                'dark-gray': '#333333',
                'medium-red': '#FF3939',
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
        },
    },
    plugins: [forms, require('daisyui'), require('@tailwindcss/typography')],
    daisyui: {
        themes: [
            {
            mytheme: {
                ...defaultTheme["[data-theme=dark]"],
                "primary": "#111113",
                "secondary": "#111113",
                "accent": "#205bdf",
                "base-100": "#393A40",
            },
            },
            "dark",
            "light",
        ],
        },
        safelist: [
            'border-b-primary',
            'max-h-[20rem]',
        ]
};
