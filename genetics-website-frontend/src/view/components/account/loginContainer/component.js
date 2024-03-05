import React from 'react';

import './style.css';
import BreadcrumpComponent from "../../common/breadcrump/component";

function LoginContainerComponent(props) {

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
                        <input type="login" placeholder="Логин" className="login-window-input"/>
                        <input type="password" placeholder="Пароль" className="login-window-input"/>
                        <button className="login-window-button">Войти</button>
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
