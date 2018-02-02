import * as TinyColor from 'tinycolor2';

interface Hsv {
  h: number;
  s: number;
  v: number;
}

class Color {
  color = TinyColor('blue');

  constructor(input: string | Hsv) {
    this.color = TinyColor(input);
  }

  copy() {
    return new Color(this.color);
  }

  set saturation(value: number) {
    const hsb = this.color.toHsv();
    this.color = TinyColor({
      ...hsb,
      s: value
    });
  }

  set brightness(value: number) {
    const hsb = this.color.toHsv();
    this.color = TinyColor({
      ...hsb,
      v: value
    });
  }

  set hue(value: number) {
    const hsb = this.color.toHsv();
    this.color = TinyColor({
      ...hsb,
      h: value
    });
  }

  get hue() {
    const hsb = this.color.toHsv();
    return hsb.h;
  }

  get hex() {
    return this.color.toHex();
  }

  get hexString() {
    return `#${this.hex}`;
  }
}

export default Color;
