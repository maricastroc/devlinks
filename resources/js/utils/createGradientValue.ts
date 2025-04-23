import { GradientDirection } from '@/types/gradient-direction';
import tinycolor from 'tinycolor2';

const generateGradientColors = (
  baseColor: string
): [string, string, string] => {
  const color1 = tinycolor(baseColor);

  const color2 = color1.clone().lighten(15).desaturate(10);

  const color3 = color2.clone().lighten(15).desaturate(5);

  return [color1.toHexString(), color2.toHexString(), color3.toHexString()];
};

export const createGradientValue = (
  color: string,
  direction: GradientDirection
): string => {
  const [base, , light] = generateGradientColors(color);

  switch (direction) {
    case 'bg-gradient-to-t':
      return `linear-gradient(to top, ${base}, ${light})`;
    case 'bg-gradient-to-b':
      return `linear-gradient(to bottom, ${base}, ${light})`;
    case 'angular':
      return `linear-gradient(135deg, ${base}, ${light})`;
    default:
      return `linear-gradient(to bottom, ${base}, ${light})`;
  }
};
