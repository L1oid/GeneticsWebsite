import React from "react";

import "./style.css"
import { MODERATOR, STUDENT, TEACHER } from "../../../../state/consts/roles";

function SelectRolesComponent(props) {

    function handleRoleChange(role) {
        const newRoles = props.roles.includes(role)
            ? props.roles.filter(r => r !== role)
            : [...props.roles, role];
        props.handle(newRoles);
    }

    return (
        <div className="select-roles-content">
            <div className="select-roles-content-text">
                <span>
                    Роли
                </span>
            </div>
            <div className="select-roles-content-checkboxes">
                <div className="select-roles-content-items">
                    <p className="select-roles-content-item">
                        <input className="select-roles-content-item-checkbox"
                               type="checkbox"
                               id="moderator"
                               checked={props.roles.includes(MODERATOR)}
                               onChange={() => handleRoleChange(MODERATOR)} />
                        <label className="select-roles-content-item-label"
                               htmlFor="moderator">Модератор</label>
                    </p>
                    <p className="select-roles-content-item">
                        <input className="select-roles-content-item-checkbox"
                               type="checkbox"
                               id="teacher"
                               checked={props.roles.includes(TEACHER)}
                               onChange={() => handleRoleChange(TEACHER)} />
                        <label className="select-roles-content-item-label"
                               htmlFor="teacher">Учитель</label>
                    </p>
                    <p className="select-roles-content-item">
                        <input className="select-roles-content-item-checkbox"
                               type="checkbox"
                               id="student"
                               checked={props.roles.includes(STUDENT)}
                               onChange={() => handleRoleChange(STUDENT)} />
                        <label className="select-roles-content-item-label"
                               htmlFor="student">Студент</label>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SelectRolesComponent;
