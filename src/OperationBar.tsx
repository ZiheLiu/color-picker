import * as React from 'react';
import * as addEventListener from 'add-dom-event-listener';

import Color from './utils/Color';

// const
const BAR_HEIGHT = 20;
const MOVER_WIDTH = 4;

// type
export interface OperationBarProps {
  color: Color;
  size: number;
  style: object;
  prefix: string;

  onChange: (leftPercent: number) => void;
  mapColorToPosPercent: (color: Color) => number;
}

// OperationBar
class OperationBar extends React.Component<OperationBarProps, {}> {
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
    e.preventDefault();
    e.stopPropagation();

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

    const { size, onChange } = this.props;
    const maxWidth = rect.width || size!;

    left = Math.min(maxWidth, Math.max(0, left));

    onChange(left / maxWidth);
  };

  saveDomNode = (node: HTMLDivElement) => {
    this.domNode = node;
  };

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { size, style, prefix, color, mapColorToPosPercent } = this.props;

    const barStyle = {
      width: size,
      height: BAR_HEIGHT,
      ...style,
    };
    const barClass = prefix;
    const moverStyle = {
      left: `calc(${mapColorToPosPercent(color)}% - ${MOVER_WIDTH / 2}px)`,
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

export default OperationBar;
