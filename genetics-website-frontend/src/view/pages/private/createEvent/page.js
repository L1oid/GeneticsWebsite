import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {MODERATOR} from "../../../../state/consts/roles";
import CreateEventContainerComponent from "../../../components/account/createEventContainer/component";

function CreateEventPage(props) {
    const {roles} = useSelector(state => state.user)
    const isModerator = roles.includes(MODERATOR);

    return isModerator ? (
        <CreateEventContainerComponent />
    ) : (
        <Navigate to="/account" />
    )
}

export default CreateEventPage;