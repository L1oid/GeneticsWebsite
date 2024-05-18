import React from 'react';

import './style.css';
import {Link} from "react-router-dom";
import {removeUser} from "../../../../state/slices/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {ADMINISTRATOR, MODERATOR} from "../../../../state/consts/roles";
import {clearPreviewContent} from "../../../../state/slices/content/contentSlice";

function AccountMenuComponent(props) {
    const dispatch = useDispatch();
    const {roles} = useSelector(state => state.user)
    const isAdmin = roles.includes(ADMINISTRATOR);
    const isModerator = roles.includes(MODERATOR);

    function exit() {
        dispatch(removeUser());
        dispatch(clearPreviewContent());
    }

    return (
        <div className="account-menu">
            <div className="account-menu-title">
                <span className="material-symbols-outlined account-icon">bottom_navigation</span>
                Навигация
            </div>
            <Link className={"account-menu-button"}
                  to={"/account"}>
                <span className="material-symbols-outlined account-icon">person</span>
                Личные данные
            </Link>
            <Link className={"account-menu-button"}
                  to={"/account/change-password"}>
                <span className="material-symbols-outlined account-icon">password</span>
                Смена пароля
            </Link>
            {isAdmin && (
                <div className="account-menu-admin-buttons">
                    <Link className={"account-menu-button"}
                          to={"/account/registration-user"}>
                        <span className="material-symbols-outlined account-icon">person_add</span>
                        Регистрация пользователя
                    </Link>
                </div>
            )}
            {isModerator && (
                <div className="account-menu-admin-buttons">
                    <Link className={"account-menu-button"}
                          to={"/account/create-content"}>
                        <span className="material-symbols-outlined account-icon">news</span>
                        Создание контента
                    </Link>
                    <Link className={"account-menu-button"}
                          to={"/account/content-list"}>
                        <span className="material-symbols-outlined account-icon">view_list</span>
                        Список контента
                    </Link>
                    <Link className={"account-menu-button"}
                          to={"/account/create-event"}>
                        <span className="material-symbols-outlined account-icon">event</span>
                        Создание событий
                    </Link>
                    <Link className={"account-menu-button"}
                          to={"/account/create-questionnaire"}>
                        <span className="material-symbols-outlined account-icon">quiz</span>
                        Создание анкет
                    </Link>
                </div>

            )}
            <button className={"account-menu-button exit"}
                    onClick={exit}>
                <span className="material-symbols-outlined account-icon exit">logout</span>
                Выйти
            </button>
        </div>
    )
}

export default AccountMenuComponent;