import React from 'react';

import './component.css';

function ToolbarComponent() {
    return (
        <div className='Toolbar'>
            <button className='ToolbarButton'>НОВОСТИ</button>
            <button className='ToolbarButton'>НАУКА</button>
            <button className='ToolbarButton'>ОБРАЗОВАНИЕ</button>
            <button className='ToolbarButton'>О КАФЕДРЕ</button>
        </div>
    )
}

export default ToolbarComponent;