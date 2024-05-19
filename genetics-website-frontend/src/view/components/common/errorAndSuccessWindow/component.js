import React from "react";

import "./style.css"

function ErrorAndSuccessWindowComponent(props) {

    return (
        <div
            className={`error-and-success-window ${props.error || props.success ? 'error-and-success-window-visible' : 'error-and-success-window-hidden'}`}>
            {props.error && <p className="error-and-success-window-text">{props.error}</p>}
            {props.success && <p className="error-and-success-window-text">{props.success}</p>}
        </div>
    )
}

export default ErrorAndSuccessWindowComponent;