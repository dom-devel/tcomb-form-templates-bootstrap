import React from "react";
import t from "tcomb";
import classnames from "classnames";
import Breakpoints from "./Breakpoints";
import getLabel from "./getLabel";
import getError from "./getError";
import getHelp from "./getHelp";
import renderFormGroup from "./renderFormGroup";

const SelectConfig = t.struct(
    {
        addonBefore: t.Any,
        addonAfter: t.Any,
        horizontal: t.maybe(Breakpoints),
    },
    "SelectConfig"
);

function getAddon(addon) {
    return <span className="input-group-addon">{addon}</span>;
}

function getOption(props) {
    return (
        <option disabled={props.disabled} value={props.value} key={props.value}>
            {props.text}
        </option>
    );
}

function getOptGroup(props) {
    const options = props.options.map(getOption);
    return (
        <optgroup
            disabled={props.disabled}
            label={props.label}
            key={props.label}
        >
            {options}
        </optgroup>
    );
}

function create(overrides = {}) {
    function select(locals) {
        locals.config = select.getConfig(locals);
        locals.attrs = select.getAttrs(locals);

        const children = locals.config.horizontal
            ? select.renderHorizontal(locals)
            : select.renderVertical(locals);

        return select.renderFormGroup(children, locals);
    }

    select.getConfig =
        overrides.getConfig ||
        function getConfig(locals) {
            return new SelectConfig(locals.config || {});
        };

    select.getAttrs =
        overrides.getAttrs ||
        function getAttrs(locals) {
            const attrs = t.mixin({}, locals.attrs);
            attrs.className = classnames(attrs.className);
            attrs.className += (attrs.className ? " " : "") + "form-control";
            attrs.multiple = locals.isMultiple;
            attrs.disabled = locals.disabled;
            attrs.value = locals.value;
            attrs.onChange = (evt) => {
                const value = locals.isMultiple
                    ? Array.prototype.slice
                          .call(evt.target.options)
                          .filter((option) => option.selected)
                          .map((option) => option.value)
                    : evt.target.value;
                locals.onChange(value);
            };
            if ("idAppend" in attrs) {
                attrs.id = `${attrs.id}_${attrs.idAppend}`;
            }
            delete attrs.idAppend;

            if (locals.help) {
                attrs["aria-describedby"] =
                    attrs["aria-describedby"] || attrs.id + "-tip";
            }
            return attrs;
        };

    select.renderOptions =
        overrides.renderOptions ||
        function renderOptions(locals) {
            return locals.options.map((x) =>
                x.label ? getOptGroup(x) : getOption(x)
            );
        };

    select.renderSelect =
        overrides.renderSelect ||
        function renderSelect(locals) {
            let hiddenClass = "";
            if ("hidden" in locals.attrs && locals.attrs.hidden) {
                hiddenClass = "hidden";
            }

            if (
                locals.config.addonBefore ||
                locals.config.addonAfter ||
                locals.config.buttonBefore ||
                locals.config.buttonAfter
            ) {
                return select.renderSelectExpanded(locals, hiddenClass);
            }

            return (
                <div className={`select ${hiddenClass}`}>
                    <select {...locals.attrs}>
                        {select.renderOptions(locals)}
                    </select>
                </div>
            );
        };

    select.renderSelectExpanded =
        overrides.renderSelectExpanded ||
        function renderSelectExpanded(locals, hiddenClass) {
            const addOnBefore = locals.config.addonBefore
                ? getAddon(locals.config.addonBefore)
                : null;
            const addOnAfter = locals.config.addonAfter
                ? getAddon(locals.config.addonAfter)
                : null;

            return (
                <div>
                    {addOnBefore}
                    <div className={`select ${hiddenClass}`}>
                        <select {...locals.attrs}>
                            {select.renderOptions(locals)}
                        </select>
                    </div>
                    {addOnAfter}
                </div>
            );
        };

    select.renderLabel =
        overrides.renderLabel ||
        function renderLabel(locals) {
            return getLabel({
                label: locals.label,
                htmlFor: locals.attrs.id,
                breakpoints: locals.config.horizontal,
            });
        };

    select.renderError =
        overrides.renderError ||
        function renderError(locals) {
            return getError(locals);
        };

    select.renderHelp =
        overrides.renderHelp ||
        function renderHelp(locals) {
            return getHelp(locals);
        };

    select.renderVertical =
        overrides.renderVertical ||
        function renderVertical(locals) {
            return [
                select.renderLabel(locals),
                select.renderSelect(locals),
                select.renderError(locals),
                select.renderHelp(locals),
            ];
        };

    select.renderHorizontal =
        overrides.renderHorizontal ||
        function renderHorizontal(locals) {
            const label = select.renderLabel(locals);
            const className = label
                ? locals.config.horizontal.getInputClassName()
                : locals.config.horizontal.getOffsetClassName();
            return [
                label,
                <div className={`select ${classnames(className)}`}>
                    {select.renderSelect(locals)}
                    {select.renderError(locals)}
                    {select.renderHelp(locals)}
                </div>,
            ];
        };

    select.renderFormGroup = overrides.renderFormGroup || renderFormGroup;

    select.clone = function clone(newOverrides = {}) {
        return create({ ...overrides, ...newOverrides });
    };

    return select;
}

export default create();
