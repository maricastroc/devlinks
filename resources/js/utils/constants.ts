import { TemplateStyles } from '@/types/template-styles';

export const CUSTOM_PLATFORM_NAME = 'Other';

export const DEFAULT_THEME = 'Default';

type TemplateTypes = {
  [key: string]: TemplateStyles;
};

export const TEMPLATE_STYLES: TemplateTypes = {
  Default: {
    color: '#633CFF',
    background: 'bg-[#0000] text-dark-gray',
    button: 'text-white md:text-[#633CFF] md:hover:bg-[#633CFF]',
    primaryText: 'text-dark-gray',
    secondaryText: 'text-medium-gray'
  },
  Lavender: {
    color: '#72659B',
    background: 'bg-gradient-to-b from-[#72659B] to-[#EBA3AC] text-[#342B51]',
    button: 'text-[#ffffff] hover:bg-[#5E4E8B]',
    primaryText: 'text-[#FFFFFF]',
    secondaryText: 'text-[#FFFFFF]',
    linkCard: '#5E4E8B'
  },
  Midnight: {
    color: '#C54D48',
    background:
      'bg-gradient-to-b from-[#C54D48] via-[#383952] to-[#21303D] text-[#1C2431]',
    button: 'text-[#ffffff] hover:bg-[#C74C48]',
    primaryText: 'text-[#FFFFFF]',
    secondaryText: 'text-[#FFFFFF]',
    linkCard: '#C74C48'
  },
  Serenity: {
    color: '#C55A48',
    background:
      'bg-gradient-to-b from-[#C57248] via-[#4E4848] to-[#2D2D37] text-[#1C2431]',
    button: 'text-[#ffffff] md:text-[#C55A48] hover:bg-[#C55A48]',
    primaryText: 'text-[#FFFFFF]',
    secondaryText: 'text-[#FFFFFF]',
    linkCard: '#C55A48'
  },
  Ocean: {
    color: '#478EA9',
    background:
      'bg-gradient-to-b from-[#478EA9] via-[#C99F9A] to-[#E29042] text-[#1C2431]',
    button: 'text-[#ffffff] hover:bg-[#2A5F7A]',
    primaryText: 'text-[#1C2431]',
    secondaryText: 'text-[#1C2431]',
    linkCard: '#2A5F7A'
  },
  Gradient: {
    color: '#EAB560',
    background:
      'bg-gradient-to-b from-[#C15757] via-[#FFBE57] to-[#3E8E9C] text-[#2B3D40]',
    button: 'text-[#ffffff] hover:bg-[#2A5F7A]',
    primaryText: 'text-[#2B3D40]',
    secondaryText: 'text-[#2B3D40]',
    linkCard: 'rgba(42, 95, 122, 0.85)'
  }
};
