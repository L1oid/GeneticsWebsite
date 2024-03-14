import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";

import './style.css';
import EnabledInputComponent from "../enabledInput/component";
import {clearErrorAndStatus} from "../../../../state/slices/user/userSlice";
import {changePassword} from "../../../../state/slices/user/asyncActions";
import ErrorAndSuccessWindowComponent from "../errorAndSuccessWindow/component";
import AccountCommonButtonComponent from "../accountCommonButton/component";
import AccountPageCommonTitleComponent from "../accountPagesCommonTitle/component";


function ChangePasswordContainerComponent(props) {

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearErrorAndStatus());
    }, [dispatch, location]);

    function clearInputs() {
        setPassword("");
        setOldPassword("");
        setRepeatPassword("");
    }

    function changePasswordHandle() {
        const changePasswordData = {
            oldPassword: oldPassword,
            password: password,
            repeatPassword: repeatPassword
        }
        dispatch(changePassword(changePasswordData))
        clearInputs();
    }

    return (
        <div className="change-password-container">
            <div className="change-password-container-row-1">
                <AccountPageCommonTitleComponent title={"Смена пароля"}/>
            </div>
            <div className="change-password-container-row-2">
                <div className="change-password-window">
                    <EnabledInputComponent
                        title={"Старый пароль"}
                        type={"password"}
                        value={oldPassword}
                        handle={(e) => setOldPassword(e.target.value)}/>
                    <EnabledInputComponent
                        title={"Новый пароль"}
                        type={"password"}
                        value={password}
                        handle={(e) => setPassword(e.target.value)}/>
                    <EnabledInputComponent
                        title={"Повторите пароль"}
                        type={"password"}
                        value={repeatPassword}
                        handle={(e) => setRepeatPassword(e.target.value)}/>
                    <AccountCommonButtonComponent
                        handle={changePasswordHandle}
                        title={"Сменить пароль"}/>
                    <ErrorAndSuccessWindowComponent />
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordContainerComponent;
