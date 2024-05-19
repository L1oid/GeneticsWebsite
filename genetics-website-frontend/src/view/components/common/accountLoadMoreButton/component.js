import React from 'react';

import './style.css';

function AccountLoadMoreButtonComponent(props) {
    const { handle, isDisabled } = props;

    return (
        <button
            className={`account-load-more-button ${isDisabled ? 'disabled' : ''}`}
            onClick={!isDisabled ? handle : undefined}
            disabled={isDisabled}
        >
            Показать ещё
        </button>
    );
}

export default AccountLoadMoreButtonComponent;