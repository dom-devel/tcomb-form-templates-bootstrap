"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _getAlert = _interopRequireDefault(require("./getAlert"));

var _renderFieldset = _interopRequireDefault(require("./renderFieldset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getBreakpoints(breakpoints) {
  var className = {};

  for (var size in breakpoints) {
    if (breakpoints.hasOwnProperty(size)) {
      className["col-" + size + "-" + breakpoints[size]] = true;
    }
  }

  return className;
}

function getCol(breakpoints, content) {
  var className = (0, _classnames["default"])(getBreakpoints(breakpoints));
  return _react["default"].createElement("div", {
    className: className
  }, content);
}

function getAddon(addon) {
  return _react["default"].createElement("span", {
    className: "input-group-addon"
  }, addon);
}

function create() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  function list(locals) {
    var children = [];

    if (locals.help) {
      children.push(list.renderHelp(locals));
    }

    if (locals.error && locals.hasError) {
      children.push(list.renderError(locals));
    }

    children = children.concat(locals.items.map(function (item) {
      return item.buttons.length === 0 ? list.renderRowWithoutButtons(item, locals) : list.renderRow(item, locals);
    }));

    if (locals.add) {
      children.push(list.renderAddButton(locals));
    }

    if (locals.config.addonBefore) {
      children.unshift(getAddon(locals.config.addonBefore));
      delete locals.config.addonBefore;
    }

    if (locals.config.addonAfter) {
      children.push(getAddon(locals.config.addonAfter));
      delete locals.config.addonAfter;
    }

    return list.renderFieldset(children, locals);
  }

  list.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return (0, _getAlert["default"])("info", locals.help);
  };

  list.renderError = overrides.renderError || function renderError(locals) {
    return (0, _getAlert["default"])("danger", locals.error);
  };

  list.renderRowWithoutButtons = overrides.renderRowWithoutButtons || function renderRowWithoutButtons(item
  /* , locals*/
  ) {
    return _react["default"].createElement("div", {
      className: "row",
      key: item.key
    }, getCol({
      xs: 12
    }, item.input));
  };

  list.renderRowButton = overrides.renderRowButton || function renderRowButton(button) {
    if (button.type === "remove") {
      return _react["default"].createElement("a", {
        key: button.type,
        type: "button",
        role: "button",
        onClick: button.click
      }, _react["default"].createElement("i", {
        className: "far fa-trash-alt"
      }));
    }

    return _react["default"].createElement("button", {
      key: button.type,
      type: "button",
      className: "btn btn-default btn-".concat(button.type),
      onClick: button.click
    }, button.label);
  };

  list.renderButtonGroup = overrides.renderButtonGroup || function renderButtonGroup(buttons
  /* , locals*/
  ) {
    return _react["default"].createElement("div", {
      className: "btn-group"
    }, buttons.map(list.renderRowButton));
  };

  list.renderRow = overrides.renderRow || function renderRow(row, locals) {
    return _react["default"].createElement("div", {
      className: "row"
    }, getCol({
      sm: 8,
      xs: 6
    }, row.input), getCol({
      sm: 4,
      xs: 6
    }, list.renderButtonGroup(row.buttons, locals)));
  };

  list.renderAddButton = overrides.renderAddButton || function renderAddButton(locals) {
    var button = locals.add;
    return _react["default"].createElement("div", {
      className: "row"
    }, _react["default"].createElement("div", {
      className: "col-lg-12"
    }, _react["default"].createElement("div", {
      style: {
        marginBottom: "15px"
      }
    }, _react["default"].createElement("button", {
      type: "button",
      className: "btn btn-default btn-".concat(button.type),
      onClick: button.click
    }, button.label))));
  };

  list.renderFieldset = overrides.renderFieldset || _renderFieldset["default"];

  list.clone = function clone() {
    var newOverrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return create(_objectSpread({}, overrides, {}, newOverrides));
  };

  return list;
}

var _default = create();

exports["default"] = _default;