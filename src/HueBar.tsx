import * as React from 'react';
import * as addEventListener from 'add-dom-event-listener';

import Color from './utils/Color';
import { PanelSize } from './utils/const';
import { Prefix } from './utils/const';
import getLinearGradient from './utils/getLinearGradient';

// const
const BAR_HEIGHT = 20;
const MOVER_WIDTH = 4;

// type
export interface HueBarProps {
  size?: number;
  prefix?: string;
  color: Color;
  onChange: (color: Color) => void;
  style?: object;
}

// HueBar
class HueBar extends React.Component<HueBarProps, {}> {
  static defaultProps = {
    size: PanelSize,
    prefix: `${Prefix}-panel-hue-bar`,
  };
  moveListener: any = null;
  upListener: any = null;
  domNode: HTMLDivElement;

  handleMouseDown = () => {
    this.moveListener = addEventListener(
      window,
      'mousemove',
      this.handleMouseMove
    );

    this.upListener = addEventListener(window, 'mouseup', this.handleMouseUp);
  };

  handleMouseMove = (e: any) => {
    const x = e.clientX;
    this.pointMoveTo(x);
  };

  handleMouseUp = () => {
    this.removeListener();
  };

  removeListener = () => {
    if (this.moveListener) {
      this.moveListener.remove();
      this.moveListener = null;
    }
    if (this.upListener) {
      this.upListener.remove();
      this.upListener = null;
    }
  };

  pointMoveTo = (x: number) => {
    const rect = this.domNode.getBoundingClientRect();
    let left = x - rect.left;

    const { size, color, onChange } = this.props;
    const maxWidth = rect.width || size!;

    left = Math.min(maxWidth, Math.max(0, left));

    const newColor = color.copy();
    newColor.hue = left / maxWidth * 360;

    onChange(newColor);
  };

  saveDomNode = (node: HTMLDivElement) => {
    this.domNode = node;
  };

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { size, style, prefix, color } = this.props;

    const barStyle = {
      width: size,
      height: BAR_HEIGHT,
      background: getLinearGradient(),
      ...style,
    };
    const barClass = prefix;
    const moverStyle = {
      left: `calc(${color.hue / 360 * 100}% - ${MOVER_WIDTH / 2}px)`,
      width: MOVER_WIDTH,
    };
    const moverClass = `${prefix}-mover`;

    return (
      <div style={barStyle} className={barClass} ref={this.saveDomNode}>
        <div
          style={moverStyle}
          className={moverClass}
          onMouseDown={this.handleMouseDown}
        />
      </div>
    );
  }
}

export default HueBar;
