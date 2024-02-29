import React from 'react';

import "./style.css"

function NotFoundComponent(props) {
    return (
        <div className="page-container">
            <div className="not-found-container">
                <div className="not-found-text">404</div>
                <div className="not-found-text">Страница не найдена</div>
            </div>
        </div>
    )
}

export default NotFoundComponent;