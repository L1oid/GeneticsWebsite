import React from 'react';

import './style.css';

function SingleContentHeadingComponent(props) {
    return (
        <h1 className="single-content-heading">
            {props.title}
        </h1>
    )
}

export default SingleContentHeadingComponent;