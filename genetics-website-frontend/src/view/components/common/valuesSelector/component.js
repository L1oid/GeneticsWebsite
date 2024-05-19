import React from 'react';

import "./style.css"

function ValuesSelectorComponent(props) {

    return (
        <select className="values-selector" name="values-selector" id="values-selector"
                onChange={props.handle}
                value={props.value}>
            <option value={props.optionValueOne}>{props.titleSelectOne}</option>
            <option value={props.optionValueTwo}>{props.titleSelectTwo}</option>
        </select>
    );
}

export default ValuesSelectorComponent;
