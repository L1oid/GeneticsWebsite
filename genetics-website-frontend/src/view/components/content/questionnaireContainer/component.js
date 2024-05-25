import React from 'react';

import './style.css';
import BreadcrumpComponent from "../../common/breadcrump/component";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import SingleContentHeadingComponent from "../../common/singleContentHeading/component";

function QuestionnaireComponent(props) {
    const {id} = useParams();

    const questionnaire = useSelector(state => state.content.questionnaire);

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: "/questionnaires",
            name: "Анкетирование"
        },
        {
            link: "/questionnaires/" + id,
            name: questionnaire.title
        },
    ]

    return (
        <div className="page-container">
            <div className="questionnaire-container">
                <BreadcrumpComponent ways={ways}/>
                <SingleContentHeadingComponent title={questionnaire.title} />
            </div>
        </div>
    )
}

export default QuestionnaireComponent;