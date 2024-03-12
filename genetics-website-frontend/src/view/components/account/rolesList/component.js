import React from 'react';

import "./style.css"
import {ADMINISTRATION, MODERATOR} from "../../../../state/consts/roles";

function RolesListComponent(props) {

    const roles = props.value.map(role => {
        if (role === ADMINISTRATION) {
            return "Администратор";
        } else if (role === MODERATOR) {
            return "Модератор";
        } else {
            return role;
        }
    });

    return (
        <div className="roles-list-content">
            <div className="roles-list-content-text">
                <span>
                    {props.title}
                </span>
            </div>
            <div className="roles-list-container">
                {roles.map((role, roleIndex) => (
                    <div className="roles-list-item" key={roleIndex}>
                        {roles[roleIndex]}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RolesListComponent;