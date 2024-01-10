import React from 'react';

import './style.css';

function HeaderComponent() {
    return (
        <div>
            <div className='Header'>
                <div className="Heading">
                    Кафедра генетики и<br/>
                    фундаментальной медицины
                </div>
                <button className='LoginButton'>Вход</button>
            </div>
            <div className='MainMenu'>
                <button className='MainMenuButton'>НОВОСТИ</button>
                <button className='MainMenuButton'>НАУКА</button>
                <button className='MainMenuButton'>ОБРАЗОВАНИЕ</button>
                <button className='MainMenuButton'>О КАФЕДРЕ</button>
            </div>
        </div>
    )
}

export default HeaderComponent;