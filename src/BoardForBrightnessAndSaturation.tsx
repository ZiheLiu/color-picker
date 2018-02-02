import * as React from 'react';
import * as ReactDOM from 'react-dom';
import addEventListener from 'add-dom-event-listener';

import { Prefix } from './utils/const';
import Color from './utils/Color';

interface PanelProps {
  size?: number;
  prefix?: string;
  color: Color;
  onChange: (color: Color) => void;
}

interface Position {
  x: number;
  y: number;
}

class BoardForBrightnessAndSaturation extends React.Component<PanelProps, {}> {
  static defaultProps = {
    size: 300,
    prefix: `${Prefix}-panel`
  };

  moveListener: any = null;
  upListener: any = null;

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
    const y = e.clientY;
    this.pointMoveTo({ x, y });
  };

  handleMouseUp = () => {
    this.removeListener();
  };

  removeListener = () => {
    if (this.moveListener) {
      this.moveListener.remove();
    }
    if (this.upListener) {
      this.upListener.remove();
    }
  };

  pointMoveTo = (pos: Position) => {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    let left = pos.x - rect.left;
    let bottom = rect.bottom - pos.y;

    const { size, color, onChange } = this.props;
    const maxWidth = rect.width || size!;
    const maxHeight = rect.height || size!;

    left = Math.min(maxWidth, Math.max(0, left));
    bottom = Math.min(maxHeight, Math.max(0, bottom));

    const newColor = color.copy();
    newColor.saturation = left / maxWidth;
    newColor.brightness = bottom / maxHeight;

    onChange(newColor);
  };

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { size, prefix, color } = this.props;

    const hueColor = new Color({
      h: color.hue,
      s: 1,
      v: 1
    });

    const panelStyle = {
      width: size,
      height: size,
      background: `#${hueColor.hex}`
    };
    const panelClass = prefix;
    const saturationClass = `${prefix}-saturation-layer`;
    const brightnessClass = `${prefix}-brightness-layer`;

    return (
      <div
        style={panelStyle}
        className={panelClass}
        onMouseDown={this.handleMouseDown}
      >
        <div className={saturationClass} />
        <div className={brightnessClass} />
      </div>
    );
  }
}

export default BoardForBrightnessAndSaturation;
