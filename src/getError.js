import React from "react";

export default function getError({ hasError, error }) {
	if (hasError && error) {
		return <span className="help-block is-invalid">{error}</span>;
	}
}
