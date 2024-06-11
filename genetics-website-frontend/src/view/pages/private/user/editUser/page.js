import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {ADMINISTRATOR} from "../../../../../state/consts/roles";
import ChangeUserContainerComponent from "../../../../components/user/changeUserContainer/component";

function EditUserPage(props) {
    const {roles} = useSelector(state => state.user)
    const isAdministrator = roles.includes(ADMINISTRATOR);

    return isAdministrator ? (
        <ChangeUserContainerComponent />
    ) : (
        <Navigate to="/account" />
    )
}

export default EditUserPage;