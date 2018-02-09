import * as React from 'react';

import BoardForBrightnessAndSaturation from './BoardForBrightnessAndSaturation';
import HueBar from './HueBar';
import Preview from './Preview';

import Color from './utils/Color';
import { PanelSize, Prefix } from './utils/const';

// type
export interface PanelProps {
  size?: number;
  prefix?: string;
}

export interface PanelState {
  color: Color;
}

// Panel
class Panel extends React.Component<PanelProps, PanelState> {
  static defaultProps = {
    size: PanelSize,
    prefix: Prefix,
  };

  state = {
    color: new Color({ h: 10, s: 1, v: 1 }),
  };

  handleColorChange = (color: Color) => {
    this.setState({ color });
  };

  render() {
    const { color } = this.state;
    const { size, prefix } = this.props;

    const wrapperStyle = {
      width: size,
    };
    const hueBarStyle = {
      width: '100%',
    };
    const hueBar2Style = {
      width: '100%',
      marginTop: 6,
    };
    const barClass = `${prefix}-panel-bar`;
    const barEditorClass = `${barClass}-editor`;
    const barPreviewClass = `${barClass}-preview`;

    return (
      <div style={wrapperStyle}>
        <BoardForBrightnessAndSaturation
          color={color}
          onChange={this.handleColorChange}
          size={size}
        />

        <div className={barClass}>
          <div className={barEditorClass}>
            <HueBar
              color={color}
              onChange={this.handleColorChange}
              style={hueBarStyle}
            />
            <HueBar
              color={color}
              onChange={this.handleColorChange}
              style={hueBar2Style}
            />
          </div>
          <div className={barPreviewClass}>
            <Preview color={color} onChange={this.handleColorChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default Panel;
