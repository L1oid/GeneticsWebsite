import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

import './style.css';
import EnabledInputComponent from "../enabledInput/component";
import {clearErrorAndStatus} from "../../../../state/slices/user/userSlice";
import {changePassword} from "../../../../state/slices/user/asyncActions";


function ChangePasswordContainerComponent(props) {

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const location = useLocation();
    const dispatch = useDispatch();
    const {status, error, success} = useSelector(state => state.user);

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
                <p className="change-password-container-title">Смена пароля</p>
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
                    <button className={`change-password-button ${status === "loading" ? "disabled" : ""}`}
                            onClick={changePasswordHandle}
                            disabled={status === "loading"}>Сменить пароль
                    </button>
                    <div
                        className={`change-password-error-window ${error || success ? 'change-password-error-visible' : 'change-password-error-hidden'}`}>
                        {error && <p className="change-password-error-text">{error}</p>}
                        {success && <p className="change-password-error-text">{success}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordContainerComponent;
