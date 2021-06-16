"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _getAlert = _interopRequireDefault(require("./getAlert"));

var _renderFieldset = _interopRequireDefault(require("./renderFieldset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getAddon(addon) {
  return _react["default"].createElement("span", {
    className: "input-group-addon"
  }, addon);
}

function create() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  function struct(locals) {
    var children = [];

    if (locals.help) {
      children.push(struct.renderHelp(locals));
    }

    if (locals.error && locals.hasError) {
      children.push(struct.renderError(locals));
    }

    if (locals.config.addonBefore) {
      children.push(getAddon(locals.config.addonBefore));
    }

    if (locals.config.addonAfter) {
      children.push(getAddon(locals.config.addonAfter));
    }

    children = children.concat(locals.order.map(function (name) {
      return locals.inputs[name];
    }));
    return struct.renderFieldset(children, locals);
  }

  struct.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return (0, _getAlert["default"])("info", locals.help);
  };

  struct.renderError = overrides.renderError || function renderError(locals) {
    return (0, _getAlert["default"])("danger", locals.error);
  };

  struct.renderFieldset = overrides.renderFieldset || _renderFieldset["default"];

  struct.clone = function clone() {
    var newOverrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return create(_objectSpread({}, overrides, {}, newOverrides));
  };

  return struct;
}

var _default = create();

exports["default"] = _default;