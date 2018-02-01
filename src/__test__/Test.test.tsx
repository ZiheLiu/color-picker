import * as React from 'react';
import * as renderer from 'react-test-renderer';

import GridForBrightnessAndSaturation from '../GridForBrightnessAndSaturation';

test('Text of Test should be correct', () => {
  const component = renderer.create(<GridForBrightnessAndSaturation />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
