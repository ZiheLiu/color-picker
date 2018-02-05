"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var BoardForBrightnessAndSaturation_1 = require("../BoardForBrightnessAndSaturation");
var Color_1 = require("../utils/Color");
describe('BoardForBrightnessAndSaturation', function () {
    it('render correctly', function () {
        var color = new Color_1.default({
            h: 0,
            s: 1,
            v: 1
        });
        var onChange = function (c) {
            color = c;
        };
        var component = enzyme_1.render(<BoardForBrightnessAndSaturation_1.default color={color} onChange={onChange}/>);
        expect(component).toMatchSnapshot();
    });
});
