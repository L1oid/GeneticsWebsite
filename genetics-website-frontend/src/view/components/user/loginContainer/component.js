import React, {useEffect, useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import './style.css';
import BreadcrumpComponent from "../../common/breadcrump/component";
import {clearErrorStatusSuccess} from "../../../../state/slices/user/userSlice";
import {authUser} from "../../../../state/slices/user/asyncActions";
import ErrorAndSuccessWindowComponent from "../../common/errorAndSuccessWindow/component";

function LoginContainerComponent(props) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const {status, isAuth} = useSelector(state => state.user);
    const {error, success} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(clearErrorStatusSuccess());
    }, [dispatch, location]);

    function handleLoginButton() {
        const user ={
            login: login,
            password: password
        }
        dispatch(authUser(user));
    }

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: "/login",
            name: "Вход"
        }
    ]

    return !isAuth ? (
        <div className="page-container">
            <div className="login-container">
                <BreadcrumpComponent ways={ways}></BreadcrumpComponent>
                <div className="login-window">
                    <div className="login-window-column-1">
                        <p className="login-window-heading">Вход</p>
                        <input
                            type="login"
                            placeholder="Логин"
                            className="login-window-input"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            className="login-window-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={handleLoginButton}
                            className={`login-window-button ${status === "loading" ? "disabled" : ""}`}
                            disabled={status === "loading"}>
                            Войти
                        </button>
                    </div>
                    <div className="login-window-column-2">
                        <p className="login-window-info-heading">Добро пожаловать!</p>
                        <p className="login-window-info">
                            Для входа на сайт необходимо авторизоваться.
                            Пожалуйста, введите логин и пароль пользователя.
                        </p>
                        <p className="login-window-info bold">
                            Для получения логина и пароля обратитесь,
                            пожалуйста, на кафедру генетики и
                            фундаментальной медицины!
                        </p>
                    </div>
                </div>
                <div className="login-error-window">
                    <ErrorAndSuccessWindowComponent error={error} success={success} />
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/account" />
    )
}

export default LoginContainerComponent;
