import React from 'react';

import './style.css';
import {Link} from "react-router-dom";

function BurgerMenuComponent(props) {
    return (
        <div className={props.active ? 'burger-menu active' : "burger-menu"}>
            <ul className="burger-menu-list">
                <li>
                    <Link to="/" className='burger-menu-button'>НОВОСТИ</Link>
                </li>
                <li>
                    <Link to="/" className='burger-menu-button'>НАУКА</Link>
                </li>
                <li>
                    <Link to="/" className='burger-menu-button'>ОБРАЗОВАНИЕ</Link>
                </li>
                <li>
                    <Link to="/" className='burger-menu-button'>О КАФЕДРЕ</Link>
                </li>
                <li>
                    <Link to="/" className='burger-menu-button'>ВОЙТИ</Link>
                </li>
            </ul>
        </div>
    )
}

export default BurgerMenuComponent;