import * as TinyColor from 'tinycolor2';

export interface Hsv {
  h: number;
  s: number;
  v: number;
  a?: number;
}

class Color {
  color: any;

  hueValue: number;
  saturationValue: number;
  brightnessValue: number;

  // color will be #000 if input is illegal
  constructor(input: string | Hsv) {
    this.color = TinyColor(input);
    this.initHSB();
  }

  initHSB() {
    const { h, s, v } = this.color.toHsv();
    this.hueValue = h;
    this.saturationValue = s;
    this.brightnessValue = v;
  }

  copy() {
    const newColor = new Color(this.color);
    newColor.hueValue = this.hueValue;
    newColor.saturationValue = this.saturationValue;
    newColor.brightnessValue = this.brightnessValue;
    return newColor;
  }

  set hue(value: number) {
    const hsb = this.color.toHsv();
    this.color = TinyColor({
      ...hsb,
      h: value,
    });

    this.hueValue = value;
  }

  get hue() {
    return this.hueValue;
  }

  set saturation(value: number) {
    const hsb = this.color.toHsv();
    this.color = TinyColor({
      ...hsb,
      s: value,
    });

    this.saturationValue = value;
  }

  get saturation() {
    return this.saturationValue;
  }

  set brightness(value: number) {
    const hsb = this.color.toHsv();
    this.color = TinyColor({
      ...hsb,
      v: value,
    });

    this.brightnessValue = value;
  }

  get brightness() {
    return this.brightnessValue;
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
