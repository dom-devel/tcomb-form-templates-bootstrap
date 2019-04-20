import React from "react";

export default function getAlert(type, message) {
    return (
        <div className={`message is-${type}`}>
            <div className="message-body">{message}</div>
        </div>
    );
}
