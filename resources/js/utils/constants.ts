export const CUSTOM_PLATFORM_NAME = 'Other';

export const DEFAULT_THEME = 'Default';

export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

export const DEFAULT_STYLES = {
  button: {
    color: '#F5F6F8',
    ':hover': {
      backgroundColor: 'transparent'
    }
  },
  primary_text: {
    color: '#1E2330'
  },
  secondary_text: {
    color: '#5E5F60'
  },
  link_card: {
    backgroundColor: '#FFFFFF',
    color: '#1E2330',
    border: '1px solid transparent',
    borderRadius: '16px'
  },
  avatar: {
    backgroundColor: '#1E2330',
    color: '#FFFFFF'
  },
  icon: {
    filter:
      'brightness(0) saturate(100%) invert(12%) sepia(9%) saturate(1554%) hue-rotate(183deg) brightness(93%) contrast(93%)'
  }
};

export const BORDER_RADIUS_OPTIONS = ['0px', '8px', '18px'];

export const DEFAULT_COLOR = '#3D444B';

export const EMPTY_COLOR = 'rgba(0,0,0,0)';

export const BACKGROUND_OPTIONS = [
  {
    type: 'solid' as const,
    name: 'Solid',
    smallName: 'Solid',
    style: { backgroundColor: '#000000' }
  },
  {
    type: 'gradient' as const,
    direction: 'bg-gradient-to-b' as const,
    name: 'Gradient to Bottom',
    smallName: 'Grad. to Bottom',
    style: {
      backgroundImage:
        'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(75,76,76,1))'
    }
  },
  {
    type: 'gradient' as const,
    direction: 'bg-gradient-to-t' as const,
    name: 'Gradient to Top',
    smallName: 'Grad. to Top',
    style: {
      backgroundImage:
        'linear-gradient(to top, rgba(0,0,0,0.9), rgba(75,76,76,1))'
    }
  },
  {
    type: 'gradient' as const,
    direction: 'angular' as const,
    name: 'Gradient Diagonal',
    smallName: 'Grad. Diagonal',
    style: {
      backgroundImage:
        'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(75,76,76,1))'
    }
  }
];

export const DEFAULT_FONT = 'Instrument Sans';

export const FONTS = [
  {
    label: 'Instrument Sans',
    value: 'sans'
  },
  {
    label: 'Arvo',
    value: 'arvo'
  },
  {
    label: 'Bebas Neue',
    value: 'bebas'
  },
  {
    label: 'Libre Baskerville',
    value: 'libre'
  },
  {
    label: 'Montserrat',
    value: 'montserrat'
  },
  {
    label: 'Poppins',
    value: 'poppins'
  },
  {
    label: 'Roboto',
    value: 'roboto'
  },
  {
    label: 'Inter',
    value: 'inter'
  },
  {
    label: 'Playfair Display',
    value: 'playfair'
  },
  {
    label: 'Space Grotesk',
    value: 'space'
  },
  {
    label: 'Manrope',
    value: 'manrope'
  },
  {
    label: 'Inter',
    value: 'inter'
  },
  {
    label: 'Karla',
    value: 'karla'
  },
  {
    label: 'Lato',
    value: 'lato'
  },
  {
    label: 'Oswald',
    value: 'oswald'
  },
  {
    label: 'Rubik',
    value: 'rubik'
  }
];
