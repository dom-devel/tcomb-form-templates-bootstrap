"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderFormGroup;

var _react = _interopRequireDefault(require("react"));

var _FormGroup = _interopRequireDefault(require("./FormGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function renderFormGroup(children, _ref) {
  var path = _ref.path,
      hasError = _ref.hasError;
  var className = "form-group-depth-".concat(path.length);

  if (path.length > 0) {
    className += " field form-group-".concat(path.join("-"));
  }

  return _react["default"].createElement.apply(null, [_FormGroup["default"], {
    className: className,
    hasError: hasError
  }].concat(children));
}