import Color from './Color';

export default function getLinearGradient() {
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

  return `linear-gradient(to right${colorString})`;
}
