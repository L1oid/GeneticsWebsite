import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {MODERATOR} from "../../../../../state/consts/roles";
import CreateContentContainerComponent from "../../../../components/content/createContentContainer/component";

function CreateNewsPage(props) {
    const {roles} = useSelector(state => state.user)
    const isModerator = roles.includes(MODERATOR);

    return isModerator ? (
        <CreateContentContainerComponent />
    ) : (
        <Navigate to="/account" />
    )
}

export default CreateNewsPage;