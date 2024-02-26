import React from 'react';

import './style.css';

function HeaderComponent() {
    return (
        <div className='header-container'>
            <div className="heading">
                Кафедра генетики и<br/>
                фундаментальной медицины
            </div>
            <div className='login-container'>
                <button className='login-button'>Вход</button>
            </div>
        </div>
    )
}

export default HeaderComponent;