import React from 'react';

import './style.css';
import AccountPageTitleComponent from "../../common/accountPageTitle/component";

function ListQuestionnaireContainerComponent(props) {
    return (
        <div className="list-questionnaire-container">
            <AccountPageTitleComponent
                title="Список анкет"/>
        </div>
    )
}

export default ListQuestionnaireContainerComponent;
