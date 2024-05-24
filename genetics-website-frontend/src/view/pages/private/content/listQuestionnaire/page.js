import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {MODERATOR} from "../../../../../state/consts/roles";
import ListQuestionnaireContainerComponent from "../../../../components/content/listQuestionnaireContainer/component";

function ListQuestionnairePage(props) {
    const {roles} = useSelector(state => state.user)
    const isModerator = roles.includes(MODERATOR);

    return isModerator ? (
        <ListQuestionnaireContainerComponent />
    ) : (
        <Navigate to="/account" />
    )
}

export default ListQuestionnairePage;