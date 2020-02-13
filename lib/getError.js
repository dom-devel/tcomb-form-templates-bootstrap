"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getError;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getError(_ref) {
  var hasError = _ref.hasError,
      error = _ref.error;

  if (hasError && error) {
    return _react["default"].createElement("span", {
      className: "help is-danger"
    }, error);
  }
}