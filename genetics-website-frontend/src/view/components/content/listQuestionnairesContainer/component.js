import React from 'react';

import './style.css';
import AccountPageTitleComponent from "../../common/accountPageTitle/component";

function ListQuestionnairesContainerComponent(props) {
    return (
        <div className="list-questionnaires-container">
            <AccountPageTitleComponent
                title="Список анкет"/>
        </div>
    )
}

export default ListQuestionnairesContainerComponent;
