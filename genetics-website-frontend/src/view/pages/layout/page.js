import React, {useEffect, useState} from 'react';
import {Outlet, useLocation} from "react-router-dom";

import HeaderComponent from "../../components/layout/header/component";
import MainMenuComponent from "../../components/layout/mainMenu/component";
import FooterComponent from "../../components/layout/footer/component";
import BurgerMenuComponent from "../../components/layout/burgerMenu/component";

function Layout() {
    const [burgerMenuActive, setBurgerMenuActive] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setBurgerMenuActive(false);
    }, [location]);


    return (
        <div>
            <HeaderComponent active={burgerMenuActive} setActive={setBurgerMenuActive} />
            <MainMenuComponent />
            <BurgerMenuComponent active={burgerMenuActive} setActive={setBurgerMenuActive}/>
            <Outlet />
            <FooterComponent />
        </div>
    )
}

export default Layout;