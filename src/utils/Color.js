"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TinyColor = require("tinycolor2");
var Color = /** @class */ (function () {
    // color will be #000 if input is illegal
    function Color(input) {
        this.color = TinyColor('blue');
        this.color = TinyColor(input);
    }
    Color.prototype.copy = function () {
        return new Color(this.color);
    };
    Object.defineProperty(Color.prototype, "saturation", {
        set: function (value) {
            var hsb = this.color.toHsv();
            this.color = TinyColor(__assign({}, hsb, { s: value }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "brightness", {
        set: function (value) {
            var hsb = this.color.toHsv();
            this.color = TinyColor(__assign({}, hsb, { v: value }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "hue", {
        get: function () {
            var hsb = this.color.toHsv();
            return hsb.h;
        },
        set: function (value) {
            var hsb = this.color.toHsv();
            this.color = TinyColor(__assign({}, hsb, { h: value }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "hex", {
        get: function () {
            return this.color.toHex();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "hexString", {
        get: function () {
            return "#" + this.hex;
        },
        enumerable: true,
        configurable: true
    });
    return Color;
}());
exports.default = Color;
