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

var DateConfig = _tcomb["default"].struct({
  horizontal: _tcomb["default"].maybe(_Breakpoints["default"])
}, 'DateConfig');

function range(n) {
  var result = [];

  for (var i = 1; i <= n; i++) {
    result.push(i);
  }

  return result;
}

function padLeft(x, len) {
  var str = String(x);
  var times = len - str.length;

  for (var i = 0; i < times; i++) {
    str = '0' + str;
  }

  return str;
}

function toOption(value, text) {
  return _react["default"].createElement("option", {
    key: value,
    value: value + ''
  }, text);
}

var nullOption = [toOption('', '-')];
var days = nullOption.concat(range(31).map(function (i) {
  return toOption(i, padLeft(i, 2));
}));
var months = nullOption.concat(range(12).map(function (i) {
  return toOption(i - 1, padLeft(i, 2));
}));

function create() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  function date(locals) {
    locals.config = date.getConfig(locals);
    locals.attrs = date.getAttrs(locals);
    var children = locals.config.horizontal ? date.renderHorizontal(locals) : date.renderVertical(locals);
    return date.renderFormGroup(children, locals);
  }

  date.getConfig = overrides.getConfig || function getConfig(locals) {
    return new DateConfig(locals.config || {});
  };

  date.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    return _tcomb["default"].mixin({}, locals.attrs);
  };

  date.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return (0, _getLabel["default"])({
      label: locals.label,
      breakpoints: locals.config.horizontal
    });
  };

  date.renderError = overrides.renderError || function renderError(locals) {
    return (0, _getError["default"])(locals);
  };

  date.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return (0, _getHelp["default"])(locals);
  };

  date.renderDate = overrides.renderDate || function renderDate(locals) {
    var value = locals.value.map(function (x) {
      return x || '';
    });

    function onDayChange(evt) {
      value[2] = evt.target.value === '-' ? null : evt.target.value;
      locals.onChange(value);
    }

    function onMonthChange(evt) {
      value[1] = evt.target.value === '-' ? null : evt.target.value;
      locals.onChange(value);
    }

    function onYearChange(evt) {
      value[0] = evt.target.value.trim() === '' ? null : evt.target.value.trim();
      locals.onChange(value);
    }

    var parts = {
      D: _react["default"].createElement("li", {
        key: "D"
      }, _react["default"].createElement("select", {
        disabled: locals.disabled,
        className: "form-control",
        value: value[2],
        onChange: onDayChange
      }, days)),
      M: _react["default"].createElement("li", {
        key: "M"
      }, _react["default"].createElement("select", {
        disabled: locals.disabled,
        className: "form-control",
        value: value[1],
        onChange: onMonthChange
      }, months)),
      YY: _react["default"].createElement("li", {
        key: "YY"
      }, _react["default"].createElement("input", {
        type: "text",
        size: "5",
        disabled: locals.disabled,
        className: "form-control",
        value: value[0],
        onChange: onYearChange
      }))
    };
    return _react["default"].createElement("ul", {
      className: "nav nav-pills"
    }, locals.order.map(function (id) {
      return parts[id];
    }));
  };

  date.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    return [date.renderLabel(locals), date.renderDate(locals), date.renderError(locals), date.renderHelp(locals)];
  };

  date.renderHorizontal = overrides.renderHorizontal || function renderHorizontal(locals) {
    var label = date.renderLabel(locals);
    var className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
    return [label, _react["default"].createElement("div", {
      className: (0, _classnames["default"])(className)
    }, date.renderDate(locals), date.renderError(locals), date.renderHelp(locals))];
  };

  date.renderFormGroup = overrides.renderFormGroup || _renderFormGroup["default"];

  date.clone = function clone() {
    var newOverrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return create(_objectSpread({}, overrides, {}, newOverrides));
  };

  return date;
}

var _default = create();

exports["default"] = _default;