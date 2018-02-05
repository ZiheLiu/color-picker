import * as React from 'react';
import { render } from 'enzyme';

import BoardForBrightnessAndSaturation from '../BoardForBrightnessAndSaturation';

import Color from '../utils/Color';

describe('BoardForBrightnessAndSaturation', function() {
  it('render correctly', () => {
    let color = new Color({
      h: 0,
      s: 1,
      v: 1
    });
    const onChange = (c: Color) => {
      color = c;
    };
    const component = render(
      <BoardForBrightnessAndSaturation color={color} onChange={onChange} />
    );
    expect(component).toMatchSnapshot();
  });
});
