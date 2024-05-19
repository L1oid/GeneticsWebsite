import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import './style.css';

import RowInputTextComponent from "../../common/rowInputText/component";
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import AccountPageButtonComponent from "../../common/accountPageButton/component";
import ErrorAndSuccessWindowComponent from "../../common/errorAndSuccessWindow/component";
import SelectRolesComponent from "../selectRoles/component";

import {clearErrorStatusSuccess} from "../../../../state/slices/user/userSlice";
import {registrationUser} from "../../../../state/slices/user/asyncActions";

function RegistrationUserContainerComponent(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roleNames, setRoleNames] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const {error, success, status} = useSelector(state => state.user);

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearErrorStatusSuccess());
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
                <AccountPageTitleComponent title={"Регистрация пользователя"} />
            </div>
            <div className="registration-user-container-row-2">
                <div className="registration-user-window">
                    <RowInputTextComponent
                        title={"Логин"}
                        type={"text"}
                        value={username}
                        disabled={false}
                        handle={(e) => setUsername(e.target.value)}/>
                    <RowInputTextComponent
                        title={"Пароль"}
                        type={"password"}
                        value={password}
                        disabled={false}
                        handle={(e) => setPassword(e.target.value)}/>
                    <RowInputTextComponent
                        title={"Почта"}
                        type={"email"}
                        value={email}
                        disabled={false}
                        handle={(e) => setEmail(e.target.value)}/>
                    <RowInputTextComponent
                        title={"Имя"}
                        type={"text"}
                        value={firstName}
                        disabled={false}
                        handle={(e) => setFirstName(e.target.value)}/>
                    <RowInputTextComponent
                        title={"Фамилия"}
                        type={"text"}
                        value={lastName}
                        disabled={false}
                        handle={(e) => setLastName(e.target.value)}/>
                    <SelectRolesComponent
                        roles={roleNames}
                        handle={setRoleNames} />
                    <div className="registration-user-button-wrapper">
                        <AccountPageButtonComponent
                            status={status}
                            title={"Зарегистрировать"}
                            handle={registrationUserHandle}/>
                    </div>
                    <ErrorAndSuccessWindowComponent error={error} success={success} />
                </div>
            </div>
        </div>
    )
}

export default RegistrationUserContainerComponent;
