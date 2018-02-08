import * as React from 'react';
import * as addEventListener from 'add-dom-event-listener';

import { Prefix } from './utils/const';
import Color from './utils/Color';

export interface PanelProps {
  size?: number;
  prefix?: string;
  color: Color;
  onChange: (color: Color) => void;
}

export interface Position {
  x: number;
  y: number;
}

class BoardForBrightnessAndSaturation extends React.Component<PanelProps, {}> {
  static defaultProps = {
    size: 300,
    prefix: `${Prefix}-panel`,
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
    const y = e.clientY;
    this.pointMoveTo({ x, y });
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

  pointMoveTo = (pos: Position) => {
    const rect = this.domNode.getBoundingClientRect();
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

  saveDomNode = (node: HTMLDivElement) => {
    this.domNode = node;
  };

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { size, prefix, color } = this.props;

    const hueColor = new Color({
      h: color.hue,
      s: 1,
      v: 1,
    });

    const panelStyle = {
      width: size,
      height: size,
      background: `#${hueColor.hex}`,
    };
    const panelClass = prefix;
    const saturationClass = `${prefix}-saturation-layer`;
    const brightnessClass = `${prefix}-brightness-layer`;

    return (
      <div
        style={panelStyle}
        className={panelClass}
        onMouseDown={this.handleMouseDown}
        ref={this.saveDomNode}
      >
        <div className={saturationClass} />
        <div className={brightnessClass} />
      </div>
    );
  }
}

export default BoardForBrightnessAndSaturation;
