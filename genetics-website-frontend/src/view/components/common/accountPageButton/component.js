import React from "react";

import "./style.css"

function AccountPageButtonComponent(props) {
    return (
        <button className={`account-page-button ${props.status === "loading" ? "disabled" : ""}`}
                onClick={props.handle}
                disabled={props.status === "loading"}>{props.title}
        </button>
    )
}

export default AccountPageButtonComponent;