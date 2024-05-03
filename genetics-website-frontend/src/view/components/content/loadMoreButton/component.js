import React from 'react';

import './style.css';

function LoadMoreButtonComponent(props) {
    const { handle, isDisabled } = props;

    return (
        <button
            className={`load-more-button ${isDisabled ? 'disabled' : ''}`}
            onClick={!isDisabled ? handle : undefined}
            disabled={isDisabled}
        >
            Показать ещё
        </button>
    );
}

export default LoadMoreButtonComponent;