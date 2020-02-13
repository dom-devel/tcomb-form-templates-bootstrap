"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _tcomb = _interopRequireDefault(require("tcomb"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Breakpoints = _interopRequireDefault(require("./Breakpoints"));

var _getError = _interopRequireDefault(require("./getError"));

var _getHelp = _interopRequireDefault(require("./getHelp"));

var _renderFormGroup = _interopRequireDefault(require("./renderFormGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckboxConfig = _tcomb["default"].struct({
  horizontal: _tcomb["default"].maybe(_Breakpoints["default"])
}, 'CheckboxConfig');

function create() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  function checkbox(locals) {
    locals.config = checkbox.getConfig(locals);
    var children = locals.config.horizontal ? checkbox.renderHorizontal(locals) : checkbox.renderVertical(locals);
    return checkbox.renderFormGroup(children, locals);
  }

  checkbox.getConfig = overrides.getConfig || function getConfig(locals) {
    return new CheckboxConfig(locals.config || {});
  };

  checkbox.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    var attrs = _tcomb["default"].mixin({}, locals.attrs);

    attrs.type = 'checkbox';
    attrs.disabled = locals.disabled;
    attrs.checked = locals.value;

    attrs.onChange = function (evt) {
      return locals.onChange(evt.target.checked);
    };

    if (locals.help) {
      attrs['aria-describedby'] = attrs['aria-describedby'] || attrs.id + '-tip';
    }

    return attrs;
  };

  checkbox.renderCheckbox = overrides.renderCheckbox || function renderCheckbox(locals) {
    var attrs = checkbox.getAttrs(locals);
    var className = {
      checkbox: true,
      disabled: attrs.disabled
    };
    return _react["default"].createElement("div", {
      className: (0, _classnames["default"])(className)
    }, _react["default"].createElement("label", {
      htmlFor: attrs.id
    }, _react["default"].createElement("input", attrs), " ", locals.label));
  };

  checkbox.renderError = overrides.renderError || function renderError(locals) {
    return (0, _getError["default"])(locals);
  };

  checkbox.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return (0, _getHelp["default"])(locals);
  };

  checkbox.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    return [checkbox.renderCheckbox(locals), checkbox.renderError(locals), checkbox.renderHelp(locals)];
  };

  checkbox.renderHorizontal = overrides.renderHorizontal || function renderHorizontal(locals) {
    var className = locals.config.horizontal.getOffsetClassName();
    return _react["default"].createElement("div", {
      className: (0, _classnames["default"])(className)
    }, checkbox.renderCheckbox(locals), checkbox.renderError(locals), checkbox.renderHelp(locals));
  };

  checkbox.renderFormGroup = overrides.renderFormGroup || _renderFormGroup["default"];

  checkbox.clone = function clone() {
    var newOverrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return create(_objectSpread({}, overrides, {}, newOverrides));
  };

  return checkbox;
}

var _default = create();

exports["default"] = _default;