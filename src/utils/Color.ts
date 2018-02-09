import * as TinyColor from 'tinycolor2';

export interface Hsv {
  h: number;
  s: number;
  v: number;
  a?: number;
}

class Color {
  color = TinyColor('blue');

  // color will be #000 if input is illegal
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
      s: value,
    });
  }

  get saturation() {
    const hsb = this.color.toHsv();
    return hsb.s;
  }

  set brightness(value: number) {
    const hsb = this.color.toHsv();
    this.color = TinyColor({
      ...hsb,
      v: value,
    });
  }

  get brightness() {
    const hsb = this.color.toHsv();
    return hsb.v;
  }

  set hue(value: number) {
    const hsb = this.color.toHsv();
    this.color = TinyColor({
      ...hsb,
      h: value,
    });
  }

  get hue() {
    const hsb = this.color.toHsv();
    return hsb.h;
  }

  set alpha(value: number) {
    const hsb = this.color.toHsv();
    this.color = TinyColor({
      ...hsb,
      a: value,
    });
  }

  get alpha() {
    const hsb = this.color.toHsv();
    return hsb.a;
  }

  get hex() {
    return this.color.toHex();
  }

  get hexString() {
    return `#${this.hex}`;
  }
}

export default Color;
