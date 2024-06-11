import React, {useEffect} from 'react';

import './style.css';
import {useDispatch, useSelector} from "react-redux";
import RolesListComponent from "../rolesList/component";
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import RowInputTextComponent from "../../common/rowInputText/component";
import {getUserSelfInfo} from "../../../../state/slices/user/asyncActions";
function PersonalDataContainerComponent(props) {

    const roles = useSelector(state => state.user.roles);
    const login = useSelector(state => state.user.login);
    const firstName = useSelector(state => state.user.firstName);
    const lastName = useSelector(state => state.user.lastName);
    const email = useSelector(state => state.user.email);
    const id = useSelector(state => state.user.id);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getUserSelfInfo({id: id}))
    }, [dispatch, id]);


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
                    title="Почта"
                    type="text"
                    value={email}
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
