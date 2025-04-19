import tinycolor from 'tinycolor2';

export const generateIconFilter = (targetColor: string): string => {
  const color = tinycolor(targetColor);
  const hsl = color.toHsl();

  // Cálculos ajustados para manter melhor contraste
  const baseInvert = -125; // Ajuste base para invert
  const saturationMultiplier = 8; // Reduzido para cores menos saturadas
  const brightnessAdd = 30; // Reduzido o brilho adicional
  const contrastBase = 90; // Base de contraste aumentada

  return `
  brightness(0) saturate(100%)
  invert(45%)
  hue-rotate(${hsl.h}deg)
  saturate(${Math.min(hsl.s * saturationMultiplier * 100, 300)}%)
  brightness(${60 + hsl.l * brightnessAdd}%)
  contrast(${contrastBase + hsl.l * 15}%)
`
    .replace(/\s+/g, ' ')
    .trim();
};
