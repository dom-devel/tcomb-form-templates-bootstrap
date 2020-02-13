"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormGroup;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function FormGroup(props) {
  var className = {
    "form-group": true,
    "is-danger": props.hasError
  };

  if (props.className) {
    className[props.className] = true;
  }

  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(className)
  }, props.children);
}