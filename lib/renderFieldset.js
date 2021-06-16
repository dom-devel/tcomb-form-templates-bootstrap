"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderFieldset;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getClassName(locals) {
  var len = locals.path.length;
  var className = "fieldset fieldset-depth-".concat(len);

  if (len > 0) {
    className += " fieldset-".concat(locals.path.join("-"));
  }

  if (locals.className) {
    className += " ".concat((0, _classnames["default"])(locals.className));
  }

  return className;
}

function renderFieldset(children, locals) {
  var legend = locals.label ? _react["default"].createElement("legend", null, locals.label) : null;
  var props = {
    className: getClassName(locals),
    disabled: locals.disabled
  };
  return _react["default"].createElement.apply(null, ["fieldset", props, legend].concat(children));
}