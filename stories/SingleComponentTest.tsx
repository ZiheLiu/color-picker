import * as React from 'react';

import { storiesOf } from '@storybook/react';

import Color from '../src/utils/Color';

import BoardForBS from '../src/BoardForBrightnessAndSaturation';
import HueBar from '../src/HueBar';
import Preview from '../src/Preview';
import AlphaBar from '../src/AlphaBar';
import Params from '../src/Params';

import '../src/style/index.less';

// WithColor
interface WithColorComponentProps {
  color: Color;
  onChange: (color: Color) => void;
  [keyName: string]: any;
}

interface WithColorState {
  color: Color;
}

function withColor(
  component:
    | React.ComponentClass<WithColorComponentProps>
    | React.SFC<WithColorComponentProps>
) {
  return class WithColor extends React.Component<{}, WithColorState> {
    state = {
      color: new Color({ h: 10, s: 1, v: 1 }),
    };

    handleColorChange = (color: Color) => {
      this.setState({
        color,
      });
    };

    render() {
      const { color } = this.state;
      const C = component;

      return (
        <div>
          <div>
            color: {color.hex}
            <span
              style={{
                display: 'inline-block',
                background: color.hexString,
                width: 50,
                height: 10,
              }}
            />
          </div>
          <C color={color} onChange={this.handleColorChange} />
        </div>
      );
    }
  };
}

// BoardForBS
const TestBoard = withColor(BoardForBS);
// HueBar
const TestHueBar = withColor(HueBar);
// AlphaBar
const TestAlpha = withColor(({ color, onChange }: WithColorComponentProps) => (
  <div>
    <div>
      <label>alpha: </label>
      <span>{color.alpha}</span>
    </div>
    <AlphaBar color={color} onChange={onChange} />
  </div>
));
// Preview
const TestPreview = withColor(
  ({ color, onChange }: WithColorComponentProps) => (
    <div style={{ width: 20, height: 20 }}>
      <Preview color={color} onChange={onChange} />
    </div>
  )
);
// Params
const TestParams = withColor(({ color, onChange }: WithColorComponentProps) => (
  <div style={{ width: 200 }}>
    <Params color={color} onChange={onChange} />
  </div>
));

storiesOf('SingleComponent', module)
  .add('BoardForBrightnessAndSaturation', () => <TestBoard />)
  .add('HueBar', () => <TestHueBar />)
  .add('Alpha', () => <TestAlpha />)
  .add('Preview', () => <TestPreview />)
  .add('Params', () => <TestParams />);
