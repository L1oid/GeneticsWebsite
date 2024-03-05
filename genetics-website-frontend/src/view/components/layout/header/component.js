import React from 'react';

import './style.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {saveBurgerMenuStatus} from "../../../../state/slices/layoutSlice";

function HeaderComponent(props) {
    const dispatch = useDispatch();
    const burgerMenuStatus = useSelector(state => state.layout.burgerMenuStatus);

    return (
        <div className='header-container'>
            <Link
                className='heading'
                to="/">Кафедра генетики и<br/>фундаментальной медицины
            </Link>
            <div className='header-login-container'>
                <Link className='header-login-button-text' to="/login">Вход</Link>
            </div>
            <div className="burger-button" onClick={() => dispatch(saveBurgerMenuStatus(!burgerMenuStatus))}>
                <span/>
            </div>
        </div>
    )
}

export default HeaderComponent;