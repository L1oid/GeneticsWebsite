import React from 'react';

import './style.css';
import {Link} from "react-router-dom";

function MainMenuComponent() {
    return (
        <div className='main-menu-container'>
            <Link className='main-menu-button' to="/">НОВОСТИ</Link>
            <Link to="/" className='main-menu-button'>НАУКА</Link>
            <Link to="/" className='main-menu-button'>ОБРАЗОВАНИЕ</Link>
            <Link to="/" className='main-menu-button'>О КАФЕДРЕ</Link>
        </div>
    )
}

export default MainMenuComponent;