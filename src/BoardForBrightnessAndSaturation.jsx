"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var add_dom_event_listener_1 = require("add-dom-event-listener");
var const_1 = require("./utils/const");
var Color_1 = require("./utils/Color");
var BoardForBrightnessAndSaturation = /** @class */ (function (_super) {
    __extends(BoardForBrightnessAndSaturation, _super);
    function BoardForBrightnessAndSaturation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moveListener = null;
        _this.upListener = null;
        _this.handleMouseDown = function () {
            _this.moveListener = add_dom_event_listener_1.default(window, 'mousemove', _this.handleMouseMove);
            _this.upListener = add_dom_event_listener_1.default(window, 'mouseup', _this.handleMouseUp);
        };
        _this.handleMouseMove = function (e) {
            var x = e.clientX;
            var y = e.clientY;
            _this.pointMoveTo({ x: x, y: y });
        };
        _this.handleMouseUp = function () {
            _this.removeListener();
        };
        _this.removeListener = function () {
            if (_this.moveListener) {
                _this.moveListener.remove();
            }
            if (_this.upListener) {
                _this.upListener.remove();
            }
        };
        _this.pointMoveTo = function (pos) {
            var rect = ReactDOM.findDOMNode(_this).getBoundingClientRect();
            var left = pos.x - rect.left;
            var bottom = rect.bottom - pos.y;
            var _a = _this.props, size = _a.size, color = _a.color, onChange = _a.onChange;
            var maxWidth = rect.width || size;
            var maxHeight = rect.height || size;
            left = Math.min(maxWidth, Math.max(0, left));
            bottom = Math.min(maxHeight, Math.max(0, bottom));
            var newColor = color.copy();
            newColor.saturation = left / maxWidth;
            newColor.brightness = bottom / maxHeight;
            onChange(newColor);
        };
        return _this;
    }
    BoardForBrightnessAndSaturation.prototype.componentWillUnmount = function () {
        this.removeListener();
    };
    BoardForBrightnessAndSaturation.prototype.render = function () {
        var _a = this.props, size = _a.size, prefix = _a.prefix, color = _a.color;
        var hueColor = new Color_1.default({
            h: color.hue,
            s: 1,
            v: 1
        });
        var panelStyle = {
            width: size,
            height: size,
            background: "#" + hueColor.hex
        };
        var panelClass = prefix;
        var saturationClass = prefix + "-saturation-layer";
        var brightnessClass = prefix + "-brightness-layer";
        return (<div style={panelStyle} className={panelClass} onMouseDown={this.handleMouseDown}>
        <div className={saturationClass}/>
        <div className={brightnessClass}/>
      </div>);
    };
    BoardForBrightnessAndSaturation.defaultProps = {
        size: 300,
        prefix: const_1.Prefix + "-panel"
    };
    return BoardForBrightnessAndSaturation;
}(React.Component));
exports.default = BoardForBrightnessAndSaturation;
