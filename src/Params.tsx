import * as React from 'react';

import Color from './utils/Color';
import { Prefix } from './utils/const';
import percentage from './utils/percentage';

// type
export interface ParamsProps {
  color: Color;
  onChange: (color: Color) => void;
  prefix?: string;
}

class Params extends React.Component<ParamsProps, {}> {
  static defaultProps = {
    prefix: `${Prefix}-panel-params`,
  };

  handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { color, onChange } = this.props;
    const newColor = color.copy();
    newColor.hue = parseInt(e.target.value, 10) || 0;
    onChange(newColor);
  };

  handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { color, onChange } = this.props;
    const newColor = color.copy();
    newColor.brightness = (parseInt(e.target.value, 10) || 0) / 100;
    onChange(newColor);
  };

  handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { color, onChange } = this.props;
    const newColor = color.copy();
    newColor.saturation = (parseInt(e.target.value, 10) || 0) / 100;
    onChange(newColor);
  };

  handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { color, onChange } = this.props;
    const newColor = color.copy();
    newColor.alpha = (parseInt(e.target.value, 10) || 0) / 100;
    onChange(newColor);
  };

  render() {
    const { color, prefix } = this.props;
    const { hex, hue, saturation, brightness, alpha } = color;
    const inputClass = `${prefix}-input`;

    return (
      <div className={prefix}>
        <div className={inputClass}>
          <input value={hex} maxLength={6} className="input-text" />
          <input
            value={hue.toFixed(0)}
            onChange={this.handleHueChange}
            className="input-number"
          />
          <input
            value={percentage(saturation)}
            onChange={this.handleSaturationChange}
            className="input-number"
          />
          <input
            value={percentage(brightness)}
            onChange={this.handleBrightnessChange}
            className="input-number"
          />
          <input
            value={percentage(alpha)}
            onChange={this.handleAlphaChange}
            className="input-number"
          />
        </div>
      </div>
    );
  }
}

export default Params;
