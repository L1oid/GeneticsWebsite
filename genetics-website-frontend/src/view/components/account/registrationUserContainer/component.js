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
import {registrationUser} from "../../../../state/slices/user/asyncActions";

function RegistrationUserContainerComponent(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roleNames, setRoleNames] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearErrorAndStatus());
    }, [dispatch, location]);

    function clearInputs() {
        setUsername("");
        setPassword("");
        setRoleNames([]);
        setFirstName("");
        setLastName("");
        setEmail("");
    }

    function registrationUserHandle() {
        dispatch(registrationUser({
            username: username,
            password: password,
            roleNames: roleNames,
            firstName: firstName,
            lastName: lastName,
            email: email
        }));
        clearInputs()
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
                        roles={roleNames}
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
