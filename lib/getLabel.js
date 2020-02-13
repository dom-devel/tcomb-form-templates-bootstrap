"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getLabel;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getLabel(_ref) {
  var label = _ref.label,
      breakpoints = _ref.breakpoints,
      htmlFor = _ref.htmlFor,
      id = _ref.id;

  if (label) {
    var className = breakpoints ? breakpoints.getLabelClassName() : {};
    className['control-label'] = true;
    return _react["default"].createElement("label", {
      htmlFor: htmlFor,
      id: id,
      className: (0, _classnames["default"])(className)
    }, label);
  }
}