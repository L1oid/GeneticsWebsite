import React, {useEffect, useState} from 'react';
import './style.css';
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearErrorStatusSuccess, clearUserInfo} from "../../../../state/slices/user/userSlice";
import {changePassword, editUserInfo, getUserInfo} from "../../../../state/slices/user/asyncActions";
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import RowInputTextComponent from "../../common/rowInputText/component";
import RolesListComponent from "../rolesList/component";
import AccountPageButtonComponent from "../../common/accountPageButton/component";
import ErrorAndSuccessWindowComponent from "../../common/errorAndSuccessWindow/component";
import {articleEdition} from "../../../../state/slices/content/asyncActions";
import SelectRolesComponent from "../selectRoles/component";

function ChangeUserContainerComponent(props) {
    const {id} = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const {status, success, error} = useSelector(state => state.user);
    const userInfo = useSelector(state => state.user.userInfo);
    const myselfId = useSelector(state => state.user.id);

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        dispatch(clearErrorStatusSuccess());
    }, [dispatch, location]);

    useEffect(() => {
        dispatch(clearUserInfo())
        dispatch(getUserInfo({ id: id }));
    }, [dispatch, id]);

    useEffect(() => {
        setEmail(userInfo.email)
        setFirstName(userInfo.firstName)
        setLastName(userInfo.lastName)
        setRoles(userInfo.roleNames)
        
    }, [userInfo.email, userInfo.firstName, userInfo.lastName, userInfo.roleNames])

    function clearInputs() {
        setPassword("");
        setRepeatPassword("");
        setOldPassword("");
    }

    function changePasswordHandle() {
        const changePasswordData = {
            password: password,
            repeatPassword: repeatPassword,
            id: id
        };

        if (parseInt(id) === myselfId) {
            changePasswordData.oldPassword = oldPassword;
            changePasswordData.changePasswordType = "myself";
        } else {
            changePasswordData.changePasswordType = "another";
        }

        dispatch(changePassword(changePasswordData));
        clearInputs();
    }

    const changeUserInfoHandle = () => {
        const user = {
            id: userInfo.id,
            roles: roles,
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        dispatch(editUserInfo(user));
    }

    return (
        <div className="change-user-container">
            <AccountPageTitleComponent title={"Изменение данных пользователя"}/>
            <div className="change-user-container-row-2">
                <RowInputTextComponent
                    title="Логин"
                    type="text"
                    value={userInfo.username}
                    handle={null}
                    disabled={true}
                />
                <RowInputTextComponent
                    title="Почта"
                    type="text"
                    value={email}
                    handle={(e) => setEmail(e.target.value)}
                    disabled={false}
                />
                <RowInputTextComponent
                    title="Имя"
                    type="text"
                    value={firstName}
                    handle={(e) => setFirstName(e.target.value)}
                    disabled={false}
                />
                <RowInputTextComponent
                    title="Фамилия"
                    type="text"
                    value={lastName}
                    handle={(e) => setLastName(e.target.value)}
                    disabled={false}
                />
                <SelectRolesComponent
                    roles={roles}
                    handle={setRoles} />
                <div className="change-password-button-wrapper">
                    <AccountPageButtonComponent
                        status={status}
                        handle={changeUserInfoHandle}
                        title={"Сменить данные"}/>
                </div>
            </div>
            <AccountPageTitleComponent title={"Изменение пароля пользователя"}/>
            <div className="change-user-container-row-3">
                {parseInt(id) === myselfId && (
                    <RowInputTextComponent
                        title={"Старый пароль"}
                        type={"password"}
                        value={oldPassword}
                        disabled={false}
                        handle={(e) => setOldPassword(e.target.value)}
                    />
                )}
                <RowInputTextComponent
                    title={"Новый пароль"}
                    type={"password"}
                    value={password}
                    disabled={false}
                    handle={(e) => setPassword(e.target.value)}
                />
                <RowInputTextComponent
                    title={"Повторите пароль"}
                    type={"password"}
                    value={repeatPassword}
                    disabled={false}
                    handle={(e) => setRepeatPassword(e.target.value)}
                />
                <div className="change-password-button-wrapper">
                    <AccountPageButtonComponent
                        status={status}
                        handle={changePasswordHandle}
                        title={"Сменить пароль"}
                    />
                </div>
                <ErrorAndSuccessWindowComponent error={error} success={success}/>
            </div>
        </div>
    )
}

export default ChangeUserContainerComponent;
