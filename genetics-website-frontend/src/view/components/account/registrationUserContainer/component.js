import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";

import './style.css';

import EnabledInputComponent from "../enabledInput/component";
import AccountPageCommonTitleComponent from "../accountPagesCommonTitle/component";
import AccountCommonButtonComponent from "../accountCommonButton/component";
import ErrorAndSuccessWindowComponent from "../errorAndSuccessWindow/component";
import SelectRolesComponent from "../selectRoles/component";

import {clearErrorAndStatus} from "../../../../state/slices/user/userSlice";

function RegistrationUserContainerComponent(props) {

    const location = useLocation();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roleNames, setRoleNames] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        dispatch(clearErrorAndStatus());
    }, [dispatch, location]);

    function registrationUserHandle() {
        return roleNames
    }

    return (
        <div className="registration-user-container">
            <div className="registration-user-container-row-1">
                <AccountPageCommonTitleComponent title={"Регистрация пользователя"} />
            </div>
            <div className="registration-user-container-row-2">
                <div className="registration-user-window">
                    <EnabledInputComponent
                        title={"Логин"}
                        type={"text"}
                        value={username}
                        handle={(e) => setUsername(e.target.value)}/>
                    <EnabledInputComponent
                        title={"Пароль"}
                        type={"password"}
                        value={password}
                        handle={(e) => setPassword(e.target.value)}/>
                    <EnabledInputComponent
                        title={"Почта"}
                        type={"email"}
                        value={email}
                        handle={(e) => setEmail(e.target.value)}/>
                    <EnabledInputComponent
                        title={"Имя"}
                        type={"text"}
                        value={firstName}
                        handle={(e) => setFirstName(e.target.value)}/>
                    <EnabledInputComponent
                        title={"Фамилия"}
                        type={"text"}
                        value={lastName}
                        handle={(e) => setLastName(e.target.value)}/>
                    <SelectRolesComponent
                        handle={setRoleNames} />
                    <AccountCommonButtonComponent
                        title={"Зарегистрировать"}
                        handle={registrationUserHandle}/>
                    <ErrorAndSuccessWindowComponent/>
                </div>
            </div>
        </div>
    )
}

export default RegistrationUserContainerComponent;
