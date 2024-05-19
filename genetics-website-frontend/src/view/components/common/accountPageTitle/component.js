import React from "react";

import "./style.css"

function AccountPageTitleComponent(props) {

    return (
        <p className="account-page-title">{props.title}</p>
    )
}

export default AccountPageTitleComponent;