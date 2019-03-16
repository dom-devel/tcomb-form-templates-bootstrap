import React from "react";

export default function getAlert(type, message) {
	return <div className={`invalid-feedback alert-${type}`}>{message}</div>;
}
