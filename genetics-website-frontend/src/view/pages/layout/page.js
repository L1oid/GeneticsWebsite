import React from 'react';
import {Outlet} from "react-router-dom";

import HeaderComponent from "../../components/header/component";
import MainMenuComponent from "../../components/main_menu/component";
import FooterComponent from "../../components/footer/component";

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