import React from 'react';

import "./style.css"

function DisabledInputComponent(props) {
    return (
        <div className="disabled-input-content">
            <div className="disabled-input-content-text">
                <span>
                    {props.title}
                </span>
            </div>
            <input
                className="disabled-input-content-input"
                value={props.value || ''}
                disabled
            />
        </div>
    )
}

export default DisabledInputComponent;