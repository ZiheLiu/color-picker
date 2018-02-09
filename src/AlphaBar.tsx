import * as React from 'react';

import Color from './utils/Color';
import { PanelSize } from './utils/const';
import { Prefix } from './utils/const';

import OperationBar from './OperationBar';

// type
export interface AlphaBarProps {
  size?: number;
  prefix?: string;
  color: Color;
  onChange: (color: Color) => void;
  style?: object;
}

// AlphaBar
class AlphaBar extends React.Component<AlphaBarProps, {}> {
  static defaultProps = {
    size: PanelSize,
    prefix: `${Prefix}-panel-operation-bar`,
  };

  pointMoveTo = (leftPercent: number) => {
    const { color, onChange } = this.props;

    const newColor = color.copy();
    newColor.alpha = leftPercent;

    onChange(newColor);
  };

  mapColorToPosPercent = (color: Color) => {
    return color.alpha * 100;
  };

  render() {
    const { color, style, size, prefix } = this.props;

    const newStyle = {
      ...style,
      background: `linear-gradient(to right, transparent, ${color.hexString})`,
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

export default AlphaBar;
