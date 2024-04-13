import React, {useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";

import HeaderComponent from "../../components/layout/header/component";
import MainMenuComponent from "../../components/layout/mainMenu/component";
import FooterComponent from "../../components/layout/footer/component";
import BurgerMenuComponent from "../../components/layout/burgerMenu/component";
import {saveBurgerMenuStatus} from "../../../state/slices/layout/layoutSlice";

function MainLayout() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(saveBurgerMenuStatus(false));
    }, [dispatch, location]);

    return (
        <div className="main-layout-container">
            <HeaderComponent />
            <MainMenuComponent />
            <BurgerMenuComponent />
            <Outlet/>
            <FooterComponent/>
        </div>
    )
}

export default MainLayout;