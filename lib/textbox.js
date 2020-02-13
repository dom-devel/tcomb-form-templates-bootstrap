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

var TextboxConfig = _tcomb["default"].struct({
  addonBefore: _tcomb["default"].Any,
  addonAfter: _tcomb["default"].Any,
  horizontal: _tcomb["default"].maybe(_Breakpoints["default"]),
  buttonBefore: _tcomb["default"].Any,
  buttonAfter: _tcomb["default"].Any
}, "TextboxConfig");

function getInputGroupButton(button) {
  return _react["default"].createElement("div", {
    className: "input-group-btn"
  }, button);
}

function getInputGroup(children) {
  return _react["default"].createElement.apply(null, ["div", {
    className: "input-group"
  }].concat(children));
}

function getAddon(addon) {
  return _react["default"].createElement("span", {
    className: "input-group-addon"
  }, addon);
}

function create() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  function textbox(locals) {
    locals.config = textbox.getConfig(locals);
    locals.attrs = textbox.getAttrs(locals);

    if (locals.type === "hidden") {
      return textbox.renderHiddenTextbox(locals);
    }

    var children = locals.config.horizontal ? textbox.renderHorizontal(locals) : textbox.renderVertical(locals);
    return textbox.renderFormGroup(children, locals);
  }

  textbox.getConfig = overrides.getConfig || function getConfig(locals) {
    return new TextboxConfig(locals.config || {});
  };

  textbox.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    var attrs = _tcomb["default"].mixin({}, locals.attrs);

    attrs.type = locals.type;
    attrs.className = (0, _classnames["default"])(attrs.className);
    attrs.className += (attrs.className ? " " : "") + "form-control";

    if (attrs.type !== "textarea") {
      attrs.className += " input";
    } else {
      attrs.className += " textarea";
    }

    attrs.disabled = locals.disabled;

    if (locals.type !== "file") {
      attrs.value = locals.value;
    }

    attrs.onChange = locals.type === "file" ? function (evt) {
      return locals.onChange(evt.target.files[0]);
    } : function (evt) {
      return locals.onChange(evt.target.value);
    };

    if (locals.help) {
      attrs["aria-describedby"] = attrs["aria-describedby"] || attrs.id + "-tip";
    }

    return attrs;
  };

  textbox.renderHiddenTextbox = overrides.renderHiddenTextbox || function renderHiddenTextbox(locals) {
    return _react["default"].createElement("input", {
      type: "hidden",
      value: locals.value,
      name: locals.attrs.name
    });
  };

  textbox.renderStatic = overrides.renderStatic || function renderStatic(locals) {
    return _react["default"].createElement("p", {
      className: "form-control-static"
    }, locals.value);
  };

  textbox.renderTextbox = overrides.renderTextbox || function renderTextbox(locals) {
    if (locals.type === "static") {
      return textbox.renderStatic(locals);
    }

    var ret = locals.type !== "textarea" ? textbox.renderInput(locals) : textbox.renderTextarea(locals);

    if (locals.config.addonBefore || locals.config.addonAfter || locals.config.buttonBefore || locals.config.buttonAfter) {
      ret = textbox.renderInputGroup(ret, locals);
    }

    return ret;
  };

  textbox.renderInputGroup = overrides.renderInputGroup || function renderInputGroup(input, locals) {
    return getInputGroup([locals.config.buttonBefore ? getInputGroupButton(locals.config.buttonBefore) : null, locals.config.addonBefore ? getAddon(locals.config.addonBefore) : null, input, locals.config.addonAfter ? getAddon(locals.config.addonAfter) : null, locals.config.buttonAfter ? getInputGroupButton(locals.config.buttonAfter) : null]);
  };

  textbox.renderInput = overrides.renderInput || function renderInput(locals) {
    return _react["default"].createElement("input", locals.attrs);
  };

  textbox.renderTextarea = overrides.renderTextarea || function renderTextarea(locals) {
    return _react["default"].createElement("textarea", locals.attrs);
  };

  textbox.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return (0, _getLabel["default"])({
      label: locals.label,
      htmlFor: locals.attrs.id,
      breakpoints: locals.config.horizontal
    });
  };

  textbox.renderError = overrides.renderError || function renderError(locals) {
    return (0, _getError["default"])(locals);
  };

  textbox.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return (0, _getHelp["default"])(locals);
  };

  textbox.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    return [textbox.renderLabel(locals), textbox.renderTextbox(locals), textbox.renderError(locals), textbox.renderHelp(locals)];
  };

  textbox.renderHorizontal = overrides.renderHorizontal || function renderHorizontal(locals) {
    var label = textbox.renderLabel(locals);
    var className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
    return [label, _react["default"].createElement("div", {
      className: (0, _classnames["default"])(className)
    }, textbox.renderTextbox(locals), textbox.renderError(locals), textbox.renderHelp(locals))];
  };

  textbox.renderFormGroup = overrides.renderFormGroup || _renderFormGroup["default"];

  textbox.clone = function clone() {
    var newOverrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return create(_objectSpread({}, overrides, {}, newOverrides));
  };

  return textbox;
}

var _default = create();

exports["default"] = _default;