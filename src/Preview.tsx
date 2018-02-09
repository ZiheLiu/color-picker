import * as React from 'react';

import Color from './utils/Color';
import { Prefix } from './utils/const';

// type
export interface PreviewProps {
  color: Color;
  onChange: (color: Color) => void;
  prefix?: string;
}

// Preview
class Preview extends React.Component<PreviewProps, {}> {
  static defaultProps = {
    prefix: Prefix,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorString = e.target.value;
    this.props.onChange(new Color(colorString));
  };

  render() {
    const { color, prefix } = this.props;

    const colorHexString = color.hexString;
    const alpha = color.alpha;
    const divStyle = {
      background: colorHexString,
      opacity: alpha,
    };
    const wrapperClass = `${prefix}-panel-preview`;

    return (
      <div className={wrapperClass}>
        <input
          type="color"
          value={colorHexString}
          onChange={this.handleChange}
        />
        <div style={divStyle} />
      </div>
    );
  }
}

export default Preview;
