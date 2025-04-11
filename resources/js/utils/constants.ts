import { TemplateStyles } from '@/types/template-styles';

type TemplateTypes = {
  [key: string]: TemplateStyles;
};

export const TEMPLATE_STYLES: TemplateTypes = {
  Default: {
    color: '#633CFF',
    header: 'bg-[#0000] md:bg-light-gray text-white',
    wrapper: 'bg-[#0000] text-dark-gray',
    detail: 'bg-medium-purple',
    card: 'bg-white',
    avatarBorder: 'border-medium-purple',
    primaryButton:
      'hover:bg-purple-hover border border-[#FAFAFA] md:border-[#633CFF] md:text-[#FAFAFA] md:bg-[#633CFF]',
    secondaryButton:
      'border text-[#633CFF] border-[#633CFF] bg-[#FAFAFA] hover:bg-purple-hover hover:bg-opacity-30',
    primaryText: 'text-dark-gray',
    secondaryText: 'text-medium-gray'
  },
  Lavender: {
    color: '#7E6CAB',
    header: 'bg-transparent text-[#50427C]',
    wrapper: 'bg-gradient-to-b from-[#7E6CAB] to-[#EBA3AC] text-[#342B51]',
    detail: 'hidden',
    card: 'bg-[#FFFFFF]',
    avatarBorder: 'border-[#342B51]',
    primaryButton:
      'bg-[#342B51] border-[#342B51] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:border-[#ffffff] hover:text-[#342B51]',
    secondaryButton:
      'border border-[#342B51] bg-transparent text-[#342B51] hover:bg-[#342B51] hover:border-[#342B51] hover:text-[#ffffff]',
    primaryText: 'text-[#5342B51]',
    secondaryText: 'text-[#342B51]'
  },
  Midnight: {
    color: '#C54D48',
    header: 'bg-transparent text-[#FFFFFF]',
    wrapper: 'bg-gradient-to-b from-[#21303D] to-[#C54D48] text-[#1C2431]',
    detail: 'hidden',
    card: 'bg-[#FFFfff]',
    avatarBorder: 'border-[#1C2431]',
    primaryButton:
      'border hover:bg-opacity-80 border-[#FFFFFF] bg-transparent text-[#FFFFFF] hover:text-[#D65454] hover:border-[#D65454]',
    secondaryButton:
      'border border-[#FFFFFF] bg-transparent text-[#FFFFFF] hover:text-[#D65454] hover:border-[#D65454]',
    primaryText: 'text-[#1C2431]',
    secondaryText: 'text-[#1C2431]'
  },
  Serenity: {
    color: '#C57248',
    header: 'bg-transparent text-[#1C2431]',
    wrapper: 'bg-gradient-to-b from-[#C57248] to-[#2D2D37] text-[#1C2431]',
    detail: 'hidden',
    card: 'bg-[#FFFfff]',
    avatarBorder: 'border-[#1C2431]',
    primaryButton:
      'bg-[#1C2431] border-[#1C2431] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:border-[#ffffff] hover:text-[#1C2431]',
    secondaryButton:
      'border border-[#1C2431] bg-transparent text-[#1C2431] hover:bg-[#1C2431] hover:border-[#1C2431] hover:text-[#ffffff]',
    primaryText: 'text-[#1C2431]',
    secondaryText: 'text-[#1C2431]'
  },
  Ocean: {
    color: '#478EA9',
    header: 'bg-transparent text-[#1C2431]',
    wrapper: 'bg-gradient-to-b from-[#478EA9] to-[#E29042] text-[#1C2431]',
    detail: 'hidden',
    card: 'bg-[#FFFAF3]',
    avatarBorder: 'border-[#1C2431]',
    primaryButton:
      'bg-[#1C2431] border-[#1C2431] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:border-[#ffffff] hover:text-[#1C2431]',
    secondaryButton:
      'border border-[#1C2431] bg-transparent text-[#1C2431] hover:bg-[#1C2431] hover:border-[#1C2431] hover:text-[#ffffff]',
    primaryText: 'text-[#1C2431]',
    secondaryText: 'text-[#1C2431]'
  },
  Gradient: {
    color: '#EAB560',
    header: 'bg-transparent',
    wrapper:
      'bg-gradient-to-l from-[#C15757] via-[#FFBE57] to-[#3E8E9C] text-[#2B3D40]',
    detail: 'hidden',
    card: 'bg-[#FFFFFF]',
    avatarBorder: 'border-[#2B3D40]',
    primaryButton:
      'border hover:bg-opacity-80 bg-[#2B3D40] border-[#2B3D40] text-[#FFFFFF] hover:bg-transparent hover:border-[#2B3D40] hover:text-[#2B3D40]',
    secondaryButton:
      'border border-[#2B3D40] bg-transparent text-[#2B3D40] hover:bg-[#2B3D40] hover:border-[#2B3D40] hover:text-[#ffffff]',
    primaryText: 'text-[#2B3D40]',
    secondaryText: 'text-[#2B3D40]'
  },
  Mist: {
    color: '#6B8F8E',
    header: 'bg-transparent text-[#1C2431]',
    wrapper: 'bg-gradient-to-b from-[#6B8F8E] to-[#D4DCCD] text-[#1C2431]', // Fundo: azul petróleo → bege-claro
    detail: 'hidden',
    card: 'bg-[#FFFFFF]',
    avatarBorder: 'border-[#1C2431]',
    primaryButton:
      'border bg-[#1C2431] border-[#1C2431] text-[#FFFFFF] hover:bg-transparent hover:text-[#1C2431] hover:border-[#1C2431]', // Hover azul
    secondaryButton:
      'border border-[#1C2431] bg-transparent text-[#1C2431] hover:bg-[#1C2431] hover:text-[#FFFFFF]',
    primaryText: 'text-[#1C2431]',
    secondaryText: 'text-[#1C2431]'
  }
};
