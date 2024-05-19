import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {MODERATOR} from "../../../../../state/consts/roles";
import ListEventsContainerComponent from "../../../../components/content/listEventsContainer/component";

function EditEventsPage(props) {
    const {roles} = useSelector(state => state.user)
    const isModerator = roles.includes(MODERATOR);

    return isModerator ? (
        <ListEventsContainerComponent />
    ) : (
        <Navigate to="/account" />
    )
}

export default EditEventsPage;