import * as React from 'react';

import Color from './utils/Color';
import { PanelSize } from './utils/const';
import { Prefix } from './utils/const';
import getLinearGradient from './utils/getLinearGradient';

import OperationBar from './OperationBar';

// type
export interface HueBarProps {
  color: Color;
  size?: number;
  style?: object;
  prefix?: string;

  onChange: (color: Color) => void;
}

// HueBar
class HueBar extends React.Component<HueBarProps, {}> {
  static defaultProps = {
    size: PanelSize,
    prefix: `${Prefix}-panel-operation-bar`,
  };

  pointMoveTo = (leftPercent: number) => {
    const { color, onChange } = this.props;

    const newColor = color.copy();
    newColor.hue = leftPercent * 360;

    onChange(newColor);
  };

  mapColorToPosPercent = (color: Color) => {
    return color.hue / 360 * 100;
  };

  render() {
    const { color, style, size, prefix } = this.props;

    const newStyle = {
      ...style,
      background: getLinearGradient(),
    };

    return (
      <OperationBar
        color={color}
        size={size!}
        prefix={prefix!}
        style={newStyle}
        onChange={this.pointMoveTo}
        mapColorToPosPercent={this.mapColorToPosPercent}
      />
    );
  }
}

export default HueBar;
