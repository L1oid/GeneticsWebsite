import React, {useEffect, useState} from 'react';

import './style.css';
import BreadcrumpComponent from "../../common/breadcrump/component";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SingleContentHeadingComponent from "../../common/singleContentHeading/component";
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import AccountPageInputComponent from "../../common/accountPageInput/component";
import {FREE, SELECT} from "../../../../state/consts/contentTypes";
import {
    clearQuestionnaireQuestionsAnswersList
} from "../../../../state/slices/content/contentSlice";
import {
    fetchQuestionnaireQuestionsAnswers, solveQuestionnaire
} from "../../../../state/slices/content/asyncActions";
import AccountPageButtonComponent from "../../common/accountPageButton/component";
import ErrorAndSuccessWindowComponent from "../../common/errorAndSuccessWindow/component";

function QuestionnaireContainerComponent(props) {
    const {id} = useParams();

    const dispatch = useDispatch();

    const [questionnaireSolve, setQuestionnaireSolve] = useState({
        questionnaireId: id,
        answerSet: []
    })

    const {error, success, status} = useSelector(state => state.content);
    const questionnaire = useSelector(state => state.content.questionnaire);
    const questionnaireQuestionsAnswersList = useSelector(state => state.content.questionnaireQuestionsAnswersList);
    const questionnaireQuestionsList = useSelector(state => state.content.questionnaireQuestionsList).slice().sort((a, b) => a.questionNumber - b.questionNumber);

    const handleInputChange = (questionId, answerText) => {
        setQuestionnaireSolve(prevState => {
            const newAnswerSet = prevState.answerSet.filter(answer => answer.questionId !== questionId);
            newAnswerSet.push({questionId, answerText});
            return {
                ...prevState,
                answerSet: newAnswerSet
            };
        });
    };

    const getAnswerText = (questionId) => {
        const answer = questionnaireSolve.answerSet.find(answer => answer.questionId === questionId);
        return answer ? answer.answerText : '';
    };

    const getAnswersForQuestion = (questionId) => {
        return questionnaireQuestionsAnswersList.filter(answer => answer.questionId === questionId);
    };

    const handleConfirmButton = () => {
        dispatch(solveQuestionnaire(questionnaireSolve))
    };

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
                <SingleContentHeadingComponent title={questionnaire.title}/>
                <div className="questionnaire-question-list">
                    {questionnaireQuestionsList.map((question, questionIndex) => (
                        <div className="questionnaire-item" key={questionIndex}>
                            <div className="questionnaire-card">
                                <AccountPageSubtitleComponent
                                    title={"Вопрос №" + question.questionNumber + (question.answerRequired ? ' *' : '')}/>
                                <p className="questionnaire-item-question">
                                    {question.questionText}
                                </p>
                                {question.questionType === FREE && (
                                    <div>
                                        <AccountPageSubtitleComponent
                                            title={"Ответ"}/>
                                        <AccountPageInputComponent
                                            type="text"
                                            value={getAnswerText(question.questionId)}
                                            handle={(e) => handleInputChange(question.questionId, e.target.value)}
                                            placeholder="Ответ"
                                            disabled={false}/>
                                    </div>
                                )}
                                {question.questionType === SELECT && (
                                    <div>
                                        <AccountPageSubtitleComponent
                                            title={"Ответ"}/>
                                        {getAnswersForQuestion(question.questionId).map((answer, answerIndex) => (
                                            <div key={answerIndex}>
                                                <input className="questionnaire-card-radio"
                                                       type="radio"
                                                       id={`question-${question.questionId}-answer-${answerIndex}`}
                                                       name={`question-${question.questionId}`}
                                                       value={answer.text}
                                                       checked={getAnswerText(question.questionId) === answer.text}
                                                       onChange={(e) => handleInputChange(question.questionId, e.target.value)}
                                                />
                                                <label className="questionnaire-card-radio-label"
                                                       htmlFor={`question-${question.questionId}-answer-${answerIndex}`}>
                                                    {answer.text}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="questionnaire-confirm-button">
                    <AccountPageButtonComponent
                        status={status}
                        handle={handleConfirmButton}
                        title={"Подтвердить"}/>
                </div>
                <div className="questionnaire-confirm-button">
                    <ErrorAndSuccessWindowComponent error={error} success={success}/>
                </div>
            </div>
        </div>
    )
}

export default QuestionnaireContainerComponent;