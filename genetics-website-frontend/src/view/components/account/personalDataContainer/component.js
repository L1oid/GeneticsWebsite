import React from 'react';

import './style.css';
import DisabledInputComponent from "../disabledInput/component";
import {useSelector} from "react-redux";
import RolesListComponent from "../rolesList/component";
import AccountPageCommonTitleComponent from "../accountPagesCommonTitle/component";
function PersonalDataContainerComponent(props) {

    const roles = useSelector(state => state.user.roles);
    const login = useSelector(state => state.user.login)
    const firstName = useSelector(state => state.user.firstName)
    const lastName = useSelector(state => state.user.lastName)


    return (
        <div className="personal-data-container">
            <div className="personal-data-container-row-1">
                <AccountPageCommonTitleComponent title={"Личные данные пользователя"} />
            </div>
            <div className="personal-data-container-row-2">
                <DisabledInputComponent title="Логин" value={login}></DisabledInputComponent>
                <DisabledInputComponent title="Имя" value={firstName}></DisabledInputComponent>
                <DisabledInputComponent title="Фамилия" value={lastName}></DisabledInputComponent>
                <RolesListComponent title="Роли" value={roles}></RolesListComponent>
            </div>
        </div>
    )
}

export default PersonalDataContainerComponent;
