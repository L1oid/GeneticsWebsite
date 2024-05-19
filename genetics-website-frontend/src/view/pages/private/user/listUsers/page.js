import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {ADMINISTRATOR} from "../../../../../state/consts/roles";
import ListUsersContainerComponent from "../../../../components/user/listUsersContainer/component";

function ListUsersPage(props) {
    const {roles} = useSelector(state => state.user)
    const isAdmin = roles.includes(ADMINISTRATOR);

    return isAdmin ? (
        <ListUsersContainerComponent />
    ) : (
        <Navigate to="/account" />
    )
}

export default ListUsersPage;