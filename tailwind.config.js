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
                'medium-purple': '#633CFF',
                'purple-hover': '#BEADFF',
                'light-purple': '#EFEBFF',

                'youtube-color': '#FF3939',
                'facebook-color': '#2746AA',
                'devto-color': '#333333',
                'github-color': '#000000',
                'frontend-mentor-color': '#ffffff',
                'gitlab-color': '#E94A30',
                'codewars-color': '#891D50',
                'hashnode-color': '#0B39CE',
                'stack-overflow-color': '#EA711F',
                'x-color': '#000000',
                'linkedin-color': '#326DFB',
                'freecodecamp-color': '#302566',
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
    safelist: [
        'facebook-color'
    ]
};
