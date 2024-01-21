import React from 'react';

import './style.css';

function MainMenuComponent() {
    return (
        <div className='main-menu-container'>
            <button className='main-menu-button'>НОВОСТИ</button>
            <button className='main-menu-button'>НАУКА</button>
            <button className='main-menu-button'>ОБРАЗОВАНИЕ</button>
            <button className='main-menu-button'>О КАФЕДРЕ</button>
        </div>
    )
}

export default MainMenuComponent;