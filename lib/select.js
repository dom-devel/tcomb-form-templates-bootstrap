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

var SelectConfig = _tcomb["default"].struct({
  addonBefore: _tcomb["default"].Any,
  addonAfter: _tcomb["default"].Any,
  horizontal: _tcomb["default"].maybe(_Breakpoints["default"])
}, "SelectConfig");

function getAddon(addon) {
  return _react["default"].createElement("span", {
    className: "input-group-addon"
  }, addon);
}

function getOption(props) {
  return _react["default"].createElement("option", {
    disabled: props.disabled,
    value: props.value,
    key: props.value
  }, props.text);
}

function getOptGroup(props) {
  var options = props.options.map(getOption);
  return _react["default"].createElement("optgroup", {
    disabled: props.disabled,
    label: props.label,
    key: props.label
  }, options);
}

function create() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  function select(locals) {
    locals.config = select.getConfig(locals);
    locals.attrs = select.getAttrs(locals);
    var children = locals.config.horizontal ? select.renderHorizontal(locals) : select.renderVertical(locals);
    return select.renderFormGroup(children, locals);
  }

  select.getConfig = overrides.getConfig || function getConfig(locals) {
    return new SelectConfig(locals.config || {});
  };

  select.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    var attrs = _tcomb["default"].mixin({}, locals.attrs);

    attrs.className = (0, _classnames["default"])(attrs.className);
    attrs.className += (attrs.className ? " " : "") + "form-control";
    attrs.multiple = locals.isMultiple;
    attrs.disabled = locals.disabled;
    attrs.value = locals.value;

    attrs.onChange = function (evt) {
      var value = locals.isMultiple ? Array.prototype.slice.call(evt.target.options).filter(function (option) {
        return option.selected;
      }).map(function (option) {
        return option.value;
      }) : evt.target.value;
      locals.onChange(value);
    };

    if ("idAppend" in attrs) {
      attrs.id = "".concat(attrs.id, "_").concat(attrs.idAppend);
    }

    delete attrs.idAppend;

    if (locals.help) {
      attrs["aria-describedby"] = attrs["aria-describedby"] || attrs.id + "-tip";
    }

    return attrs;
  };

  select.renderOptions = overrides.renderOptions || function renderOptions(locals) {
    return locals.options.map(function (x) {
      return x.label ? getOptGroup(x) : getOption(x);
    });
  };

  select.renderSelect = overrides.renderSelect || function renderSelect(locals) {
    var hiddenClass = "";

    if ("hidden" in locals.attrs && locals.attrs.hidden) {
      hiddenClass = "hidden";
    }

    if (locals.config.addonBefore || locals.config.addonAfter || locals.config.buttonBefore || locals.config.buttonAfter) {
      return select.renderSelectExpanded(locals, hiddenClass);
    } // Set bulma multiple select classes


    var multipleSelectClass = "";
    console.log(locals.isMultiple);

    if (locals.isMultiple) {
      multipleSelectClass = "is-multiple";
    }

    return _react["default"].createElement("div", {
      className: "select ".concat(hiddenClass, " ").concat(multipleSelectClass)
    }, _react["default"].createElement("select", locals.attrs, select.renderOptions(locals)));
  };

  select.renderSelectExpanded = overrides.renderSelectExpanded || function renderSelectExpanded(locals, hiddenClass) {
    var addOnBefore = locals.config.addonBefore ? getAddon(locals.config.addonBefore) : null;
    var addOnAfter = locals.config.addonAfter ? getAddon(locals.config.addonAfter) : null;
    return _react["default"].createElement("div", null, addOnBefore, _react["default"].createElement("div", {
      className: "select ".concat(hiddenClass)
    }, _react["default"].createElement("select", locals.attrs, select.renderOptions(locals))), addOnAfter);
  };

  select.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return (0, _getLabel["default"])({
      label: locals.label,
      htmlFor: locals.attrs.id,
      breakpoints: locals.config.horizontal
    });
  };

  select.renderError = overrides.renderError || function renderError(locals) {
    return (0, _getError["default"])(locals);
  };

  select.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return (0, _getHelp["default"])(locals);
  };

  select.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    return [select.renderLabel(locals), select.renderSelect(locals), select.renderError(locals), select.renderHelp(locals)];
  };

  select.renderHorizontal = overrides.renderHorizontal || function renderHorizontal(locals) {
    var label = select.renderLabel(locals);
    var className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
    return [label, _react["default"].createElement("div", {
      className: "select ".concat((0, _classnames["default"])(className))
    }, select.renderSelect(locals), select.renderError(locals), select.renderHelp(locals))];
  };

  select.renderFormGroup = overrides.renderFormGroup || _renderFormGroup["default"];

  select.clone = function clone() {
    var newOverrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return create(_objectSpread({}, overrides, {}, newOverrides));
  };

  return select;
}

var _default = create();

exports["default"] = _default;