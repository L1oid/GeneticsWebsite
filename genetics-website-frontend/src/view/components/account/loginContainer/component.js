import React, {useState} from 'react';

import './style.css';
import BreadcrumpComponent from "../../common/breadcrump/component";
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../../../../state/slices/userSlice";

function LoginContainerComponent(props) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const {status, error} = useSelector(state => state.user);

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

    return (
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
                            className="login-window-button">Войти
                        </button>
                        {status === "loading" && <p>Загрузка</p>}
                        {error && <p>{error}</p>}
                    </div>
                    <div className="login-window-column-2">
                        <p className="login-window-info-heading">Добро пожаловать!</p>
                        <p className="login-window-info">
                            Для входа на сайт необходимо авторизоваться.
                            Пожалуйста, ведите логин и пароль пользователя.
                        </p>
                        <p className="login-window-info bold">
                            Для получения логина и пароля обратитесь,
                            пожалуйста, на кафедру генетики и
                            фундаментальной медицины!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginContainerComponent;
