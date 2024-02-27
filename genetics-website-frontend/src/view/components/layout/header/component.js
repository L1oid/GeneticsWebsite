import React from 'react';

import './style.css';
import {Link} from "react-router-dom";

function HeaderComponent(props) {
    return (
        <div className='header-container'>
            <Link
                className='heading'
                to="/">Кафедра генетики и<br/>фундаментальной медицины
            </Link>
            <div className='login-container'>
                <Link className='login-button' to="/">Вход</Link>
            </div>
            <div className="burger-button" onClick={() => props.setActive(!props.active)}>
                <span/>
            </div>
        </div>
    )
}

export default HeaderComponent;