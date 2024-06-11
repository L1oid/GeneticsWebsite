import React from 'react';

import "./style.css"

function ValuesSelectorComponent(props) {

    return (
        <select className="values-selector" name="values-selector" id="values-selector"
                onChange={props.handle}
                value={props.value}>
            <option value={props.optionValueOne}>{props.titleSelectOne}</option>
            <option value={props.optionValueTwo}>{props.titleSelectTwo}</option>
            {props.optionValueThree !== undefined && (
                <option value={props.optionValueThree}>{props.titleSelectThree}</option>
            )}
            {props.optionValueFour !== undefined && (
                <option value={props.optionValueFour}>{props.titleSelectFour}</option>
            )}
            {props.optionValueFive !== undefined && (
                <option value={props.optionValueFive}>{props.titleSelectFive}</option>
            )}
        </select>
    );
}

export default ValuesSelectorComponent;
