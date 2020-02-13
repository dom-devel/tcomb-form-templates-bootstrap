"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _tcomb = _interopRequireDefault(require("tcomb"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Breakpoints = _interopRequireDefault(require("./Breakpoints"));

var _getLabel = _interopRequireDefault(require("./getLabel"));

var _getError = _interopRequireDefault(require("./getError"));

var _getHelp = _interopRequireDefault(require("./getHelp"));

var _renderFormGroup = _interopRequireDefault(require("./renderFormGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RadioConfig = _tcomb["default"].struct({
  horizontal: _tcomb["default"].maybe(_Breakpoints["default"])
}, "RadioConfig");

function getRadio(attrs, text, key) {
  var className = (0, _classnames["default"])({
    radio: true,
    disabled: attrs.disabled,
    control: control
  });
  return _react["default"].createElement("div", {
    key: key,
    className: className
  }, _react["default"].createElement("label", {
    htmlFor: attrs.id
  }, _react["default"].createElement("input", attrs), " ", text));
}

function create() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  function radio(locals) {
    locals.config = radio.getConfig(locals);
    var children = locals.config.horizontal ? radio.renderHorizontal(locals) : radio.renderVertical(locals);
    return radio.renderFormGroup(children, locals);
  }

  radio.getConfig = overrides.getConfig || function getConfig(locals) {
    return new RadioConfig(locals.config || {});
  };

  radio.renderRadios = overrides.renderRadios || function renderRadios(locals) {
    var id = locals.attrs.id;

    var onChange = function onChange(evt) {
      return locals.onChange(evt.target.value);
    };

    return locals.options.map(function (option, i) {
      var attrs = _tcomb["default"].mixin({}, locals.attrs);

      attrs.type = "radio";
      attrs.checked = option.value === locals.value;
      attrs.disabled = locals.disabled;
      attrs.value = option.value;
      attrs.autoFocus = attrs.autoFocus && i === 0;
      attrs.id = "".concat(id, "_").concat(i);
      attrs["aria-describedby"] = attrs["aria-describedby"] || (locals.label ? id : null);
      attrs.onChange = onChange;
      return getRadio(attrs, option.text, option.value);
    });
  };

  radio.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return (0, _getLabel["default"])({
      label: locals.label,
      htmlFor: locals.attrs.id,
      breakpoints: locals.config.horizontal
    });
  };

  radio.renderError = overrides.renderError || function renderError(locals) {
    return (0, _getError["default"])(locals);
  };

  radio.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return (0, _getHelp["default"])(locals);
  };

  radio.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    return [radio.renderLabel(locals), radio.renderRadios(locals), radio.renderError(locals), radio.renderHelp(locals)];
  };

  radio.renderHorizontal = overrides.renderHorizontal || function renderHorizontal(locals) {
    var label = radio.renderLabel(locals);
    var className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
    return [label, _react["default"].createElement("div", {
      className: (0, _classnames["default"])(className)
    }, radio.renderRadios(locals), radio.renderError(locals), radio.renderHelp(locals))];
  };

  radio.renderFormGroup = overrides.renderFormGroup || _renderFormGroup["default"];

  radio.clone = function clone() {
    var newOverrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return create(_objectSpread({}, overrides, {}, newOverrides));
  };

  return radio;
}

var _default = create();

exports["default"] = _default;