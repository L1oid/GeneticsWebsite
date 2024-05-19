import React from 'react';

import "./style.css"

import AccountPageInputComponent from "../accountPageInput/component";

function RowInputTextComponent(props) {
    return (
        <div className="enabled-input-content">
            <div className="enabled-input-content-text">
                <span>
                    {props.title}
                </span>
            </div>
            <div className="enabled-input-content-input">
                <AccountPageInputComponent
                    type={props.type}
                    value={props.value}
                    handle={props.handle}
                    disabled={props.disabled}/>
            </div>
        </div>
    )
}

export default RowInputTextComponent;