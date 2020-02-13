"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getAlert;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getAlert(type, message) {
  return _react["default"].createElement("div", {
    className: "message is-".concat(type)
  }, _react["default"].createElement("div", {
    className: "message-body"
  }, message));
}