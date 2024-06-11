import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

import './style.css';
import RowInputTextComponent from "../../common/rowInputText/component";
import {clearErrorStatusSuccess} from "../../../../state/slices/user/userSlice";
import {changePassword} from "../../../../state/slices/user/asyncActions";
import ErrorAndSuccessWindowComponent from "../../common/errorAndSuccessWindow/component";
import AccountPageButtonComponent from "../../common/accountPageButton/component";
import AccountPageTitleComponent from "../../common/accountPageTitle/component";


function ChangePasswordContainerComponent(props) {

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const {error, success, status} = useSelector(state => state.user);

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearErrorStatusSuccess());
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
            repeatPassword: repeatPassword,
            changePasswordType: "myself"
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
                    <div className="change-password-button-wrapper">
                        <AccountPageButtonComponent
                            status={status}
                            handle={changePasswordHandle}
                            title={"Сменить пароль"}/>
                    </div>
                    <ErrorAndSuccessWindowComponent error={error} success={success} />
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordContainerComponent;
