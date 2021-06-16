import React from "react";
import getAlert from "./getAlert";
import renderFieldset from "./renderFieldset";

function getAddon(addon) {
  return <span className="input-group-addon">{addon}</span>;
}

function create(overrides = {}) {
  function struct(locals) {
    let children = [];

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

    children = children.concat(locals.order.map((name) => locals.inputs[name]));

    return struct.renderFieldset(children, locals);
  }

  struct.renderHelp =
    overrides.renderHelp ||
    function renderHelp(locals) {
      return getAlert("info", locals.help);
    };

  struct.renderError =
    overrides.renderError ||
    function renderError(locals) {
      return getAlert("danger", locals.error);
    };

  struct.renderFieldset = overrides.renderFieldset || renderFieldset;

  struct.clone = function clone(newOverrides = {}) {
    return create({ ...overrides, ...newOverrides });
  };

  return struct;
}

export default create();
