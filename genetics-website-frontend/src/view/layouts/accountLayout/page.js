import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

import "./style.css"

import BreadcrumpComponent from "../../components/common/breadcrump/component";
import AccountMenuComponent from "../../components/common/accountMenu/component";

function AccountLayout() {

    const {isAuth} = useSelector(state => state.user);

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: "/account",
            name: "Личный кабинет"
        }
    ]

    return isAuth ? (
        <div className="page-container">
            <div className="account">
                <BreadcrumpComponent ways = {ways} />
                <div className="account-container">
                    <div className="account-container-row-1">
                        <p className="account-container-heading">Личный кабинет</p>
                    </div>
                    <div className="account-container-row-2">
                        <div className="account-container-column-1">
                            <AccountMenuComponent/>
                        </div>
                        <div className="account-container-column-2">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/login" />
    )
}

export default AccountLayout;