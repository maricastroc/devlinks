import tinycolor from 'tinycolor2';

export const generateIconFilter = (targetColor: string): string => {
  const color = tinycolor(targetColor);
  const hsl = color.toHsl();

  // Cálculos ajustados para manter melhor contraste
  const baseInvert = 65; // Ajuste base para invert
  const brightnessFactor = 0.4; // Reduzido para escurecer
  const saturationMultiplier = 8; // Reduzido para cores menos saturadas
  const brightnessAdd = 30; // Reduzido o brilho adicional
  const contrastBase = 90; // Base de contraste aumentada

  return `
    brightness(0) saturate(100%)
    invert(${baseInvert - hsl.l * 50}%)
    sepia(100%)
    hue-rotate(${hsl.h}deg)
    saturate(${hsl.s * saturationMultiplier * 100}%)
    brightness(${60 + hsl.l * brightnessAdd}%)
    contrast(${contrastBase + hsl.l * 15}%)
  `
    .replace(/\s+/g, ' ')
    .trim();
};
