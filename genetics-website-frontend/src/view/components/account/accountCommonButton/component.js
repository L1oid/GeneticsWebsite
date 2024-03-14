import {useSelector} from "react-redux";
import React from "react";

import "./style.css"

function AccountCommonButtonComponent(props) {

    const {status} = useSelector(state => state.user);

    return (
        <button className={`account-common-button ${status === "loading" ? "disabled" : ""}`}
                onClick={props.handle}
                disabled={status === "loading"}>{props.title}
        </button>
    )
}

export default AccountCommonButtonComponent;