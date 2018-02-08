import * as React from 'react';

import { storiesOf } from '@storybook/react';

import Color from '../src/utils/Color';

import BoardForBS from '../src/BoardForBrightnessAndSaturation';
import HueBar from '../src/HueBar';

import '../src/style/index.less';

interface TestBoardState {
  color: Color;
}

class TestBoard extends React.Component<{}, TestBoardState> {
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
        <BoardForBS color={color} onChange={this.handleColorChange} />
      </div>
    );
  }
}

interface TestHueBarState {
  color: Color;
}

class TestHueBar extends React.Component<{}, TestHueBarState> {
  state = {
    color: new Color({ h: 10, s: 1, v: 1 }),
  };

  handleChange = (color: Color) => {
    this.setState({ color });
  };

  render() {
    const { color } = this.state;
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
        <HueBar color={color} onChange={this.handleChange} />
      </div>
    );
  }
}

storiesOf('SingleComponent', module)
  .add('BoardForBrightnessAndSaturation', () => <TestBoard />)
  .add('HueBar', () => <TestHueBar />);
