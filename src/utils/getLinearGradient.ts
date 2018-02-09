import Color from './Color';

let linearGradientCache: string;

export default function getLinearGradient() {
  if (linearGradientCache) {
    return linearGradientCache;
  }

  const colors = [];
  for (let i = 0; i <= 360; i += 10) {
    const color = new Color({
      h: i,
      s: 1,
      v: 1,
    });
    colors.push(color.hexString);
  }

  const colorString = colors.reduce(
    (acc: string, color: string, index: number) =>
      `${acc}, ${color} ${index / 36 * 100}%`,
    ''
  );

  linearGradientCache = `linear-gradient(to right${colorString})`;

  return linearGradientCache;
}
