import React from 'react';

import './style.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {saveBurgerMenuStatus} from "../../../../state/slices/layout/layoutSlice";

function HeaderComponent(props) {
    const dispatch = useDispatch();
    const burgerMenuStatus = useSelector(state => state.layout.burgerMenuStatus);
    const isAuth = useSelector(state => state.user.isAuth);
    const login = useSelector(state => state.user.login);

    return (
        <div className='header-container'>
            <Link
                className='heading'
                to="/">Кафедра генетики и<br/>фундаментальной медицины
            </Link>
            <div className='header-login-container'>
                {isAuth ? (
                    <Link className='header-login-button-text' to="/account">
                        <span className="material-symbols-outlined header-login-icon">account_circle</span>
                        {login}
                    </Link>
                ) : (
                    <Link className='header-login-button-text' to="/login">
                        <span className="material-symbols-outlined header-login-icon">account_circle</span>
                        Войти
                    </Link>
                )}
            </div>
            <div className="burger-button" onClick={() => dispatch(saveBurgerMenuStatus(!burgerMenuStatus))}>
                <span/>
            </div>
        </div>
    )
}

export default HeaderComponent;