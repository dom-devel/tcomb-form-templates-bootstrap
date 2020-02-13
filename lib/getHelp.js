"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getHelp;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getHelp(_ref) {
  var help = _ref.help,
      attrs = _ref.attrs;

  if (help) {
    return _react["default"].createElement("span", {
      className: "help help-block",
      id: "".concat(attrs.id, "-tip")
    }, help);
  }
}