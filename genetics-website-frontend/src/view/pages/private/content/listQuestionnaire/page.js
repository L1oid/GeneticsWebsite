import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {MODERATOR} from "../../../../../state/consts/roles";

function ListQuestionnairePage(props) {
    const {roles} = useSelector(state => state.user)
    const isModerator = roles.includes(MODERATOR);

    return isModerator ? (
        <div>Анкеты</div>
    ) : (
        <Navigate to="/account" />
    )
}

export default ListQuestionnairePage;