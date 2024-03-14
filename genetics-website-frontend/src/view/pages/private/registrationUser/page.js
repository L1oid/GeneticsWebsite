import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import RegistrationUserContainerComponent from "../../../components/account/registrationUserContainer/component";
import {ADMINISTRATOR} from "../../../../state/consts/roles";

function RegistrationUserPage(props) {
    const {roles} = useSelector(state => state.user)
    const isAdmin = roles.includes(ADMINISTRATOR);

    return isAdmin ? (
        <RegistrationUserContainerComponent />
    ) : (
        <Navigate to="/account" />
    )
}

export default RegistrationUserPage;