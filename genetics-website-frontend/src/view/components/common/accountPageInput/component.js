import React from 'react';

import "./style.css"

function AccountPageInputComponent(props) {
    return (
        <input
            className="account-page-input"
            type={props.type}
            value={props.value}
            onChange={props.disabled ? null : props.handle}
            disabled={props.disabled}
            min={props.min}
            max={props.max}
        />
    )
}

export default AccountPageInputComponent;