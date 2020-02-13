"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tcomb = _interopRequireDefault(require("tcomb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Positive = _tcomb["default"].refinement(_tcomb["default"].Number, function (n) {
  return n % 1 === 0 && n >= 0;
}, 'Positive');

var Cols = _tcomb["default"].tuple([Positive, Positive], 'Cols');

var Breakpoints = _tcomb["default"].struct({
  xs: _tcomb["default"].maybe(Cols),
  sm: _tcomb["default"].maybe(Cols),
  md: _tcomb["default"].maybe(Cols),
  lg: _tcomb["default"].maybe(Cols)
}, 'Breakpoints');

function getBreakpointsClassName(breakpoints) {
  var className = {};

  for (var size in breakpoints) {
    if (breakpoints.hasOwnProperty(size)) {
      className['col-' + size + '-' + breakpoints[size]] = true;
    }
  }

  return className;
}

function getOffsetsClassName(breakpoints) {
  var className = {};

  for (var size in breakpoints) {
    if (breakpoints.hasOwnProperty(size)) {
      className['col-' + size + '-offset-' + (12 - breakpoints[size])] = true;
    }
  }

  return className;
}

Breakpoints.prototype.getBreakpoints = function getBreakpoints(colIndex) {
  var breakpoints = {};

  for (var size in this) {
    if (this.hasOwnProperty(size) && !_tcomb["default"].Nil.is(this[size])) {
      breakpoints[size] = this[size][colIndex];
    }
  }

  return breakpoints;
};

Breakpoints.prototype.getLabelClassName = function getLabelClassName() {
  return getBreakpointsClassName(this.getBreakpoints(0));
};

Breakpoints.prototype.getInputClassName = function getInputClassName() {
  return getBreakpointsClassName(this.getBreakpoints(1));
};

Breakpoints.prototype.getOffsetClassName = function getOffsetClassName() {
  return _tcomb["default"].mixin(getOffsetsClassName(this.getBreakpoints(1)), getBreakpointsClassName(this.getBreakpoints(1)));
};

var _default = Breakpoints;
exports["default"] = _default;