"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _checkbox = _interopRequireDefault(require("./checkbox"));

var _date = _interopRequireDefault(require("./date"));

var _list = _interopRequireDefault(require("./list"));

var _radio = _interopRequireDefault(require("./radio"));

var _select = _interopRequireDefault(require("./select"));

var _struct = _interopRequireDefault(require("./struct"));

var _textbox = _interopRequireDefault(require("./textbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  checkbox: _checkbox["default"],
  date: _date["default"],
  list: _list["default"],
  radio: _radio["default"],
  select: _select["default"],
  struct: _struct["default"],
  textbox: _textbox["default"]
};
exports["default"] = _default;