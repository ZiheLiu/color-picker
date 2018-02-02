import * as React from 'react';
import * as renderer from 'react-test-renderer';

import BoardForBrightnessAndSaturation from '../BoardForBrightnessAndSaturation';

import Color from '../utils/Color';

test('Text of Test should be correct', () => {
  const color = new Color({
    h: 0,
    s: 1,
    v: 1
  });
  const onChange = (c: Color) => {
    color = c;
  };
  const component = renderer.create(
    <BoardForBrightnessAndSaturation color={color} onChange={onChange} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
