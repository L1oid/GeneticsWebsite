import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {MODERATOR} from "../../../../../state/consts/roles";
import AccountListContentContainerComponent from "../../../../components/content/accountListContentContainer/component";

function ListContentPage(props) {
    const {roles} = useSelector(state => state.user)
    const isModerator = roles.includes(MODERATOR);

    return isModerator ? (
        <AccountListContentContainerComponent />
    ) : (
        <Navigate to="/account" />
    )
}

export default ListContentPage;