import getLinearGradient from '../getLinearGradient';
import Color from '../Color';

describe('getLinearGradient', () => {
  it('getLinearGradient should get correct color', () => {
    const rawColorString = getLinearGradient();

    // linear-gradient(to right<colorString>)
    const testFormat = /linear-gradient\(to right(.*)\)/.exec(rawColorString);
    expect(testFormat).not.toBeNull();

    const colorString = testFormat![1];
    // split colorString, and get the following value
    // #fff 8.8%
    // #fff 8%
    // ,#fff 8.8%
    // rgb(255, 0, 0) 8.8
    const regexp = /,?\s*(.*?) (\d+\.?\d*%)/g;
    let curColorExec: RegExpExecArray | null;

    let pos = 0;
    while ((curColorExec = regexp.exec(colorString))) {
      expect(curColorExec).not.toBeNull();

      const hue = new Color(curColorExec[1]).hue;
      const expectHue = pos === 36 ? 0 : pos * 10;
      expect(Math.abs(hue - expectHue)).toBeLessThan(1);

      const percentString = curColorExec[2];
      const percent: number = parseInt(
        percentString.substr(0, percentString.length - 1),
        10
      );
      expect(Math.abs(percent - pos / 36 * 100)).toBeLessThan(1);

      pos++;
    }
  });
});
