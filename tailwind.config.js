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
            
        },
    },
    plugins: [forms, require('@tailwindcss/typography')],
    safelist: [
        'bg-[#C55A48]',
        'bg-[#72659B]',
        'bg-[#478EA9]',
        'bg-[#EAB560]',
        'bg-[#633CFF]',
        'bg-[#C54D48]',
        'md:text-md',
        'md:text-[#633CFF]',
        'text-[#FFFFFF]',
        'text-[#1C2431]',
        'text-[#2B3D40]',
        'text-[#737373]',
        'text-[#333333]',
        'no-underline',
        'h-[6.02rem]',
        'w-[6.02rem]',
        'bg-gradient-to-b from-[#C57248] via-[#4E4848] to-[#2D2D37] text-[#1C2431]',
        'bg-gradient-to-b from-[#C15757] via-[#FFBE57] to-[#3E8E9C] text-[#2B3D40]',
        'bg-gradient-to-b from-[#478EA9] via-[#C99F9A] to-[#E29042] text-[#1C2431]',
        'bg-gradient-to-b from-[#C54D48] via-[#383952] to-[#21303D] text-[#1C2431]',
        'bg-gradient-to-b from-[#72659B] to-[#EBA3AC] text-[#342B51]',
    ],
};
