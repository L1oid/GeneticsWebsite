import React from 'react';

import "./style.css"

function EnabledInputComponent(props) {
    return (
        <div className="enabled-input-content">
            <div className="enabled-input-content-text">
                <span>
                    {props.title}
                </span>
            </div>
            <input
                className="enabled-input-content-input"
                type={props.type}
                value={props.value}
                onChange={props.handle}
            />
        </div>
    )
}

export default EnabledInputComponent;