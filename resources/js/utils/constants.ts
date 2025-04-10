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
  Coffee: {
    color: '#eee9de',
    header: 'bg-[#221003] md:bg-[#eee9de] text-white',
    wrapper: 'bg-[#eee9de] text-white',
    detail: 'bg-[#221003]',
    card: 'bg-[#f7f3ec]',
    avatarBorder: 'border-[#221003]',
    primaryButton:
      'hover:bg-opacity-70 border border-[#f7f3ec] bg-[#221003] md:border-[#221003] text-[#f7f3ec]',
    secondaryButton:
      'border hover:bg-[#221003] hover:text-[#f7f3ec] bg-[#f7f3ec] md:bg-transparent border-[#221003] text-[#221003]',
    primaryText: 'text-[#221003]',
    secondaryText: 'text-[#221003]'
  },
  Midnight: {
    color: '#634777',
    header: 'bg-[#634777]',
    wrapper: 'bg-gradient-to-t from-[#462e5b] to-[#251b2d] text-white',
    detail: 'hidden',
    card: 'bg-[#634777]',
    avatarBorder: 'border-white',
    primaryButton:
      'hover:bg-opacity-70 bg-[#3d2b49] border-[#55356d] text-white',
    secondaryButton:
      'border hover:bg-[#55356d] hover:text-white bg-transparent border-white text-white',
    primaryText: 'text-white',
    secondaryText: 'text-white'
  },
  Dark: {
    color: '#292728',
    header: 'bg-transparent',
    wrapper: 'bg-[#191919]',
    detail: 'bg-[#141414]',
    card: 'bg-[#292728]',
    avatarBorder: 'border-[#e8e8e8]',
    primaryButton:
      'hover:bg-opacity-70 bg-[#292728] border-[#292728] text-[#e8e8e8]',
    secondaryButton:
      'border border-opacity-60 hover:bg-transparent hover:text-white bg-transparent border-[#e8e8e8] text-[#e8e8e8]',
    primaryText: 'text-[#e8e8e8]',
    secondaryText: 'text-[#e8e8e8]'
  },
  Ocean: {
    color: '#4CA1AF',
    header: 'bg-[#46939B] text-white',
    wrapper: 'bg-[#D9F2F2] text-[#2E5166]',
    detail: 'bg-[#4CA1AF]',
    card: 'bg-white',
    avatarBorder: 'border-[#2E5166]',
    primaryButton:
      'border hover:bg-[#3B8B9A] border-[#D9F2F2] bg-[#4CA1AF] text-white',
    secondaryButton:
      'border border-[#4CA1AF] bg-white text-[#4CA1AF] hover:bg-[#D9F2F2]',
    primaryText: 'text-[#2E5166]',
    secondaryText: 'text-[#4CA1AF]'
  }
};
