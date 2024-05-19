import React from 'react';

import "./style.css"
import {ADMINISTRATOR, MODERATOR, STUDENT, TEACHER} from "../../../../state/consts/roles";

function RolesListComponent(props) {

    const roles = props.value.map(role => {
        if (role === ADMINISTRATOR) {
            return "Администратор";
        } else if (role === MODERATOR) {
            return "Модератор";
        } else if (role === TEACHER) {
            return "Преподаватель";
        } else if (role === STUDENT) {
            return "Студент";
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
                <div className="roles-list-items">
                    {roles.map((role, roleIndex) => (
                        <div className="roles-list-item" key={roleIndex}>
                            {roles[roleIndex]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RolesListComponent;