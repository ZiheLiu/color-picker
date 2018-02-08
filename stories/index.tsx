/// <reference path='./index.d.ts' />
import * as React from 'react';

import { storiesOf } from '@storybook/react';

import Color from '../src/utils/Color';

import Board from '../src';

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
        <Board color={color} onChange={this.handleColorChange} />
      </div>
    );
  }
}

storiesOf('Welcome', module).add('First', () => <TestBoard />);
