import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";

import './style.css';
import RowInputTextComponent from "../rowInputText/component";
import {clearErrorAndStatus} from "../../../../state/slices/user/userSlice";
import {changePassword} from "../../../../state/slices/user/asyncActions";
import ErrorAndSuccessWindowComponent from "../errorAndSuccessWindow/component";
import AccountPageButtonComponent from "../accountPageButton/component";
import AccountPageTitleComponent from "../accountPageTitle/component";


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
                <AccountPageTitleComponent title={"Смена пароля"}/>
            </div>
            <div className="change-password-container-row-2">
                <div className="change-password-window">
                    <RowInputTextComponent
                        title={"Старый пароль"}
                        type={"password"}
                        value={oldPassword}
                        disabled={false}
                        handle={(e) => setOldPassword(e.target.value)}/>
                    <RowInputTextComponent
                        title={"Новый пароль"}
                        type={"password"}
                        value={password}
                        disabled={false}
                        handle={(e) => setPassword(e.target.value)}/>
                    <RowInputTextComponent
                        title={"Повторите пароль"}
                        type={"password"}
                        value={repeatPassword}
                        disabled={false}
                        handle={(e) => setRepeatPassword(e.target.value)}/>
                    <AccountPageButtonComponent
                        handle={changePasswordHandle}
                        title={"Сменить пароль"}/>
                    <ErrorAndSuccessWindowComponent />
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordContainerComponent;
