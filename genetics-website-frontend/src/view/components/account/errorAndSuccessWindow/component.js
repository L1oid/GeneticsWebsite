import {useSelector} from "react-redux";
import React from "react";

import "./style.css"

function ErrorAndSuccessWindowComponent(props) {

    const {error, success} = useSelector(state => state.user);


    return (
        <div
            className={`error-and-success-window ${error || success ? 'error-and-success-window-visible' : 'error-and-success-window-hidden'}`}>
            {error && <p className="error-and-success-window-text">{error}</p>}
            {success && <p className="error-and-success-window-text">{success}</p>}
        </div>
    )
}

export default ErrorAndSuccessWindowComponent;