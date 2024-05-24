import React from 'react';

import './style.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function BurgerMenuComponent(props) {

    const burgerMenuStatus = useSelector(state => state.layout.burgerMenuStatus);
    const isAuth = useSelector(state => state.user.isAuth);

    return (
        <div className={burgerMenuStatus ? 'burger-menu active' : "burger-menu"}>
            <ul className="burger-menu-list">
                <li className="burger-menu-element">
                    <Link to="/news" className='burger-menu-button'>НОВОСТИ</Link>
                </li>
                <li className="burger-menu-element">
                    <Link to="/science" className='burger-menu-button'>НАУКА</Link>
                </li>
                <li className="burger-menu-element">
                    <Link to="/questionnaires" className='burger-menu-button'>АНКЕТИРОВАНИЕ</Link>
                </li>
                <li className="burger-menu-element">
                    <Link to="/about" className='burger-menu-button'>О КАФЕДРЕ</Link>
                </li>
                <li className="burger-menu-element">
                    {isAuth ? (
                        <Link to="/account" className='burger-menu-button'>ЛИЧНЫЙ КАБИНЕТ</Link>
                    ) : (
                        <Link to="/login" className='burger-menu-button'>ВОЙТИ</Link>
                    )}
                </li>
            </ul>
        </div>
    )
}

export default BurgerMenuComponent;