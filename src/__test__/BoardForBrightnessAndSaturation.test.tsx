import * as React from 'react';
import { render, mount } from 'enzyme';

import BoardForBrightnessAndSaturation from '../BoardForBrightnessAndSaturation';

import Color from '../utils/Color';

function getColorByPos(
  color: Color,
  pos: { clientX: number; clientY: number },
  size: number
) {
  const left = pos.clientX;
  const bottom = size - pos.clientY;
  const newColor = color.copy();
  newColor.saturation = left / size;
  newColor.brightness = bottom / size;

  return newColor;
}

describe('BoardForBrightnessAndSaturation', function() {
  it('render correctly', () => {
    let color = new Color({
      h: 0,
      s: 1,
      v: 1
    });
    const handleChange = jest.fn();
    const wrapper = render(
      <BoardForBrightnessAndSaturation color={color} onChange={handleChange} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('get color correctly when mouse is dragged', () => {
    let color = new Color({
      h: 0,
      s: 1,
      v: 1
    });
    const onChange = (c: Color) => {
      color = c;
    };
    const size = 300;

    const wrapper = mount(
      <BoardForBrightnessAndSaturation
        color={color}
        onChange={onChange}
        width={size}
      />
    );

    const rect = {
      width: size,
      height: size,
      top: 0,
      bottom: size,
      left: 0,
      right: size
    };
    const pos = {
      clientX: 10,
      clientY: 10
    };
    const newColor = getColorByPos(color, pos, size);

    wrapper.instance().domNode.getBoundingClientRect = jest.fn(() => rect);
    wrapper.simulate('mousedown');
    wrapper.instance().handleMouseMove(pos);

    expect(color.hex).toBe(newColor.hex);
  });

  it('get color correctly when mouse is dragged, and rect.width, react.height is 0', () => {
    let color = new Color({
      h: 0,
      s: 1,
      v: 1
    });
    const onChange = (c: Color) => {
      color = c;
    };
    const size = 300;

    const wrapper = mount(
      <BoardForBrightnessAndSaturation
        color={color}
        onChange={onChange}
        width={size}
      />
    );

    const rect = {
      width: 0,
      height: 0,
      top: 0,
      bottom: size,
      left: 0,
      right: size
    };
    const pos = {
      clientX: 10,
      clientY: 10
    };

    const newColor = getColorByPos(color, pos, size);

    wrapper.instance().domNode.getBoundingClientRect = jest.fn(() => rect);
    wrapper.simulate('mousedown');
    wrapper.instance().handleMouseMove(pos);

    expect(color.hex).toBe(newColor.hex);
  });

  it('listener should be null after mouseup', () => {
    let color = new Color({
      h: 0,
      s: 1,
      v: 1
    });
    const onChange = jest.fn();

    const wrapper = mount(
      <BoardForBrightnessAndSaturation color={color} onChange={onChange} />
    );

    wrapper.simulate('mousedown');
    expect(wrapper.instance().moveListener).not.toBeNull();
    expect(wrapper.instance().upListener).not.toBeNull();

    wrapper.instance().handleMouseUp();
    expect(wrapper.instance().moveListener).toBeNull();
    expect(wrapper.instance().upListener).toBeNull();
  });

  it('listener should be null after unmount', () => {
    let color = new Color({
      h: 0,
      s: 1,
      v: 1
    });
    const onChange = jest.fn();

    const wrapper = mount(
      <BoardForBrightnessAndSaturation color={color} onChange={onChange} />
    );

    wrapper.simulate('mousedown');
    expect(wrapper.instance().moveListener).not.toBeNull();
    expect(wrapper.instance().upListener).not.toBeNull();

    const instance = wrapper.instance();
    wrapper.unmount();
    expect(instance.moveListener).toBeNull();
    expect(instance.upListener).toBeNull();
  });

  it('call listener.move only when listener is not null', () => {
    let color = new Color({
      h: 0,
      s: 1,
      v: 1
    });
    const onChange = jest.fn();

    const wrapper = mount(
      <BoardForBrightnessAndSaturation color={color} onChange={onChange} />
    );
    const instance = wrapper.instance();
    instance.removeListener();
  });
});
