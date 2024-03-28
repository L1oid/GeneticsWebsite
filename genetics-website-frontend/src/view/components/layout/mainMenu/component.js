import React from 'react';

import './style.css';
import {Link} from "react-router-dom";

function MainMenuComponent() {
    return (
        <div className='main-menu-container'>
            <Link className='main-menu-button' to="/news">НОВОСТИ</Link>
            <Link to="/science" className='main-menu-button'>НАУКА</Link>
        </div>
    )
}

export default MainMenuComponent;