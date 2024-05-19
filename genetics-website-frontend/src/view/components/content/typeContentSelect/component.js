import React from 'react';
import 'react-quill/dist/quill.snow.css';

import "./style.css"
import {ARTICLE, NEWS} from "../../../../state/consts/contentTypes";

function TypeContentSelectComponent(props) {

    return (
        <select className="type-content-select" name="type-content" id="type-content"
                onChange={props.setContentType}
                value={props.contentType}>
            <option value={NEWS}>Новость</option>
            <option value={ARTICLE}>Статья</option>
        </select>
    );
}

export default TypeContentSelectComponent;
