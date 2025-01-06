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
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'background-primary': '#111113',
                'background-secondary': '#19191B',
                'background-tertiary': '#222325',
                'content': '#FFFFFF',
                'accent-blue': '#F0F5FF',
                'accent-blue-mid': '#205bdf',
                'accent-blue-mid-hover': '#407afd',
                'accent-blue-dark': '#012580',
                'accent-green': '#F5FEF1',
                'accent-green-dark': '#044F30',
                'accent-purple': '#F9F1FE',
                'accent-purple-dark': '#5A0B8E',
                'accent-pink': '#FFF0F9',
                'accent-pink-dark': '#99005E',
                'b-primary': '#292A2E',
                'b-secondary': '#393A40',
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
        safelist: [
            'text-accent-blue-mid',
        ]
    },

    plugins: [forms],
};
