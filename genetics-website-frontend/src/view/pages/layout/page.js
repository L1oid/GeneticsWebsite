import React from 'react';
import {Outlet} from "react-router-dom";

import HeaderComponent from "../../components/layout/header/component";
import MainMenuComponent from "../../components/layout/mainMenu/component";
import FooterComponent from "../../components/layout/footer/component";

function Layout() {
    return (
        <div>
            <HeaderComponent />
            <MainMenuComponent />
            <Outlet />
            <FooterComponent />
        </div>
    )
}

export default Layout;