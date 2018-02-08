import Color from '../Color';

function getHexValue(color: Color) {
  return color.color.toHex();
}

describe('Color', () => {
  it('new Color(string)', () => {
    const color = new Color('#fff');
    expect(getHexValue(color)).toBe('ffffff');
  });

  it('new Color(obj)', () => {
    const color = new Color({
      h: 0,
      s: 1,
      v: 1,
    });
    expect(color.color.toHex()).toBe('ff0000');
  });

  it('new Color([illegal string])', () => {
    const color = new Color('illegal-string');
    expect(getHexValue(color)).toBe('000000');
  });

  it('new Color([illegal object])', () => {
    const color = new Color({
      h: -1,
      s: -1,
      v: -1,
    });
    expect(getHexValue(color)).toBe('000000');
  });

  it(`copy color isn't equal to original color`, () => {
    const color = new Color('#fff');
    const newColor = color.copy();

    expect(getHexValue(color)).toBe(getHexValue(newColor));
    expect(color).not.toBe(newColor);
  });

  it('set saturation correctly', () => {
    const color = new Color({
      h: 0,
      s: 1,
      v: 1,
    });
    color.saturation = 0.5;

    const newColor = new Color({
      h: 0,
      s: 0.5,
      v: 1,
    });

    expect(getHexValue(color)).toBe(getHexValue(newColor));
  });

  it('set brightness correctly', () => {
    const color = new Color({
      h: 0,
      s: 1,
      v: 1,
    });
    color.brightness = 0.5;

    const newColor = new Color({
      h: 0,
      s: 1,
      v: 0.5,
    });

    expect(getHexValue(color)).toBe(getHexValue(newColor));
  });

  it('set hue correctly', () => {
    const color = new Color({
      h: 0,
      s: 1,
      v: 1,
    });
    color.hue = 10;

    const newColor = new Color({
      h: 10,
      s: 1,
      v: 1,
    });

    expect(getHexValue(color)).toBe(getHexValue(newColor));
  });

  it('get hue correctly', () => {
    const color = new Color({
      h: 0,
      s: 1,
      v: 1,
    });
    expect(color.hue).toBe(0);
  });

  it('get hex correctly', () => {
    const color = new Color({
      h: 0,
      s: 1,
      v: 1,
    });
    expect(color.hex).toBe(getHexValue(color));
  });

  it('get hexString correctly', () => {
    const color = new Color({
      h: 0,
      s: 1,
      v: 1,
    });
    expect(color.hexString).toBe(`#${getHexValue(color)}`);
  });
});
