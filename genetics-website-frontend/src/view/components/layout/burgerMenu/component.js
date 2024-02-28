import React from 'react';

import './style.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function BurgerMenuComponent(props) {
    const burgerMenuStatus = useSelector(state => state.layout.burgerMenuStatus);
    return (
        <div className={burgerMenuStatus ? 'burger-menu active' : "burger-menu"}>
            <ul className="burger-menu-list">
                <li className="burger-menu-element">
                    <Link to="/" className='burger-menu-button'>НОВОСТИ</Link>
                </li>
                <li className="burger-menu-element">
                    <Link to="/" className='burger-menu-button'>НАУКА</Link>
                </li>
                <li className="burger-menu-element">
                    <Link to="/" className='burger-menu-button'>ОБРАЗОВАНИЕ</Link>
                </li>
                <li className="burger-menu-element">
                    <Link to="/" className='burger-menu-button'>О КАФЕДРЕ</Link>
                </li>
                <li className="burger-menu-element">
                    <Link to="/" className='burger-menu-button'>ВОЙТИ</Link>
                </li>
            </ul>
        </div>
    )
}

export default BurgerMenuComponent;