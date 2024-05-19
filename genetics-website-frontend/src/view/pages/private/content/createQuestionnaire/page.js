import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {MODERATOR} from "../../../../../state/consts/roles";
import CreateQuestionnaireContainerComponent from "../../../../components/content/createQuestionnaireContainer/component";

function CreateQuestionnairePage(props) {
    const {roles} = useSelector(state => state.user)
    const isModerator = roles.includes(MODERATOR);

    return isModerator ? (
        <CreateQuestionnaireContainerComponent />
    ) : (
        <Navigate to="/account" />
    )
}

export default CreateQuestionnairePage;