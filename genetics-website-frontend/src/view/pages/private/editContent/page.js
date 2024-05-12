import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {MODERATOR} from "../../../../state/consts/roles";
import ChangeContentContainerComponent from "../../../components/account/changeContentContainer/component";

function EditContentPage(props) {
    const {roles} = useSelector(state => state.user)
    const isModerator = roles.includes(MODERATOR);

    return isModerator ? (
        <ChangeContentContainerComponent />
    ) : (
        <Navigate to="/account" />
    )
}

export default EditContentPage;