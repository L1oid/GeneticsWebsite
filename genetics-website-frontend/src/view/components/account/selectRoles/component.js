import React from "react";

import "./style.css"
import {MODERATOR, STUDENT, TEACHER} from "../../../../state/consts/roles";

function SelectRolesComponent(props) {

    function handleRoleChange(role, isChecked) {
        if (isChecked) {
            props.handle(prevRoles => [...prevRoles, role]);
        } else {
            props.handle(prevRoles => prevRoles.filter(r => r !== role));
        }
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
                        <input className="select-roles-content-item-checkbox" type="checkbox"
                               onChange={e => handleRoleChange(MODERATOR, e.target.checked)}/>
                        Модератор
                    </p>
                    <p className="select-roles-content-item">
                        <input className="select-roles-content-item-checkbox" type="checkbox"
                               onChange={e => handleRoleChange(TEACHER, e.target.checked)}/>
                        Учитель
                    </p>
                    <p className="select-roles-content-item">
                        <input className="select-roles-content-item-checkbox" type="checkbox"
                               onChange={e => handleRoleChange(STUDENT, e.target.checked)}/>
                        Студент
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SelectRolesComponent;