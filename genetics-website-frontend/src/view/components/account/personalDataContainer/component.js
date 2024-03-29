import React from 'react';

import './style.css';
import {useSelector} from "react-redux";
import RolesListComponent from "../rolesList/component";
import AccountPageTitleComponent from "../accountPageTitle/component";
import RowInputTextComponent from "../rowInputText/component";
function PersonalDataContainerComponent(props) {

    const roles = useSelector(state => state.user.roles);
    const login = useSelector(state => state.user.login)
    const firstName = useSelector(state => state.user.firstName)
    const lastName = useSelector(state => state.user.lastName)


    return (
        <div className="personal-data-container">
            <div className="personal-data-container-row-1">
                <AccountPageTitleComponent title={"Личные данные пользователя"} />
            </div>
            <div className="personal-data-container-row-2">
                <RowInputTextComponent
                    title="Логин"
                    type="text"
                    value={login}
                    handle={null}
                    disabled={true}
                />
                <RowInputTextComponent
                    title="Имя"
                    type="text"
                    value={firstName}
                    handle={null}
                    disabled={true}
                />
                <RowInputTextComponent
                    title="Фамилия"
                    type="text"
                    value={lastName}
                    handle={null}
                    disabled={true}
                />
                <RolesListComponent title="Роли" value={roles}></RolesListComponent>
            </div>
        </div>
    )
}

export default PersonalDataContainerComponent;
