import * as React from 'react';

import Color from './utils/Color';
import { PanelSize } from './utils/const';
import getLinearGradient from './utils/getLinearGradient';

// const
const BAR_HEIGHT = 20;

// type
export interface HueBarProps {
  size?: number;
  color: Color;
  onChange: (color: Color) => void;
  style?: object;
}

// HueBar
class HueBar extends React.Component<HueBarProps, {}> {
  static defaultProps = {
    size: PanelSize,
  };

  render() {
    const { size, style } = this.props;

    const barStyle = {
      width: size,
      height: BAR_HEIGHT,
      background: getLinearGradient(),
      ...style,
    };

    return <div style={barStyle} />;
  }
}

export default HueBar;
