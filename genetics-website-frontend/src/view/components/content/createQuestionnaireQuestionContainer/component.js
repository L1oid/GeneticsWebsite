import React, { useState } from 'react';
import './style.css';
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import AccountPageInputComponent from "../../common/accountPageInput/component";
import ValuesSelectorComponent from "../../common/valuesSelector/component";
import { FREE, SELECT } from "../../../../state/consts/contentTypes";
import PlusButtonComponent from "../../common/plusButton/component";

function CreateQuestionnaireQuestionContainerComponent(props) {

    const [minWeight] = useState(1);
    const [maxWeight] = useState(999999);

    const handleQuestionTextChange = (e) => {
        props.updateQuestionText(props.index, e.target.value);
    };

    const handleQuestionWeightChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= minWeight && value <= maxWeight) {
            props.updateQuestionWeight(props.index, value);
        } else {
            if (value < minWeight) {
                props.updateQuestionWeight(props.index, minWeight);
            } else if (value > maxWeight) {
                props.updateQuestionWeight(props.index, minWeight);
            }
        }
    };

    const handleQuestionTypeChange = (e) => {
        props.updateQuestionType(props.index, e.target.value);
    };

    const handleAnswerRequiredChange = (e) => {
        props.updateAnswerRequired(props.index, e.target.value);
    };

    const handleAnswerForUserChange = (e) => {
        props.updateAnswerForUser(props.index, e.target.value);
    };

    const handleAnswerTriggeringWeight = (e) => {
        props.updateAnswerTriggeringWeight(props.index, e.target.value);
    };

    const handleAnswerTextChange = (answerIndex, e) => {
        props.updateAnswerList(props.index, answerIndex, e.target.value);
    };

    const addNewAnswer = () => {
        props.addAnswer(props.index);
    };

    return (
        <div className={`create-questionnaire-question-container ${props.isLastQuestion ? 'last' : ''}`}>
            <div className="create-questionnaire-title-panel">
                <AccountPageSubtitleComponent
                    title={`Вопрос №${props.question.questionNumber}`}/>
                {props.questionListLength > 1 && (
                    <button
                        className="create-questionnaire-remove-answer-button"
                        onClick={() => props.removeQuestion(props.index)}>
                        <span className="material-symbols-outlined remove">close</span>
                    </button>
                )}
            </div>
            <AccountPageSubtitleComponent
                title="Текст *"/>
            <div className="create-questionnaire-question-title-input">
                <AccountPageInputComponent
                    type="text"
                    value={props.question.questionText || ""}
                    handle={handleQuestionTextChange}
                    disabled={false}/>
            </div>
            <AccountPageSubtitleComponent
                title="Вес"/>
            <div className="create-questionnaire-question-title-input">
                <AccountPageInputComponent
                    type="number"
                    value={props.question.questionWeight || 1}
                    handle={handleQuestionWeightChange}
                    disabled={false}
                    min={minWeight}
                    max={maxWeight}/>
            </div>
            <AccountPageSubtitleComponent
                title="Тип ответа"/>
            <div className="create-questionnaire-question-title-input">
                <ValuesSelectorComponent
                    value={props.question.questionType}
                    handle={handleQuestionTypeChange}
                    optionValueOne={FREE}
                    titleSelectOne={"Свободный"}
                    optionValueTwo={SELECT}
                    titleSelectTwo={"Варианты"}/>
            </div>
            <AccountPageSubtitleComponent
                title="Требуется ответ"/>
            <div className="create-questionnaire-question-title-input">
                <ValuesSelectorComponent
                    value={props.question.answerRequired}
                    handle={handleAnswerRequiredChange}
                    optionValueOne={false}
                    titleSelectOne={"Нет"}
                    optionValueTwo={true}
                    titleSelectTwo={"Да"}/>
            </div>
            <AccountPageSubtitleComponent
                title="Сообщение в случае совпадения *"/>
            <div className="create-questionnaire-question-title-input">
                <AccountPageInputComponent
                    type="text"
                    value={props.question.answerForUser}
                    handle={handleAnswerForUserChange}
                    disabled={false}/>
            </div>
            <AccountPageSubtitleComponent
                title="Ответ для совпадения *"/>
            <div className="create-questionnaire-question-title-input">
                <AccountPageInputComponent
                    type="text"
                    value={props.question.answerTriggeringWeight}
                    handle={handleAnswerTriggeringWeight}
                    disabled={false}/>
            </div>
            {props.question.questionType === SELECT && (
                <div>
                    <AccountPageSubtitleComponent
                        title="Варианты ответов"/>
                    <div className="create-questionnaire-answers">
                        {props.question.answerList.map((answer, answerIndex) => (
                            <div key={answerIndex}
                                 className={`create-questionnaire-question-title-input ${answerIndex === props.question.answerList.length - 1 ? 'last' : ''}`}>
                                <div className="create-questionnaire-title-panel">
                                    <AccountPageSubtitleComponent
                                        title={`Вариант №${answerIndex + 1} *`}/>
                                    {props.question.answerList.length > 1 && (
                                        <button
                                            className="create-questionnaire-remove-answer-button"
                                            onClick={() => props.removeAnswer(props.index, answerIndex)}>
                                            <span className="material-symbols-outlined remove">close</span>
                                        </button>
                                    )}
                                </div>
                                <AccountPageInputComponent
                                    type="text"
                                    value={answer.text}
                                    handle={(e) => handleAnswerTextChange(answerIndex, e)}
                                    disabled={false}/>
                            </div>
                        ))}
                        <div className="create-questionnaire-question-button-plus-wrapper">
                            <PlusButtonComponent
                                handle={addNewAnswer}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateQuestionnaireQuestionContainerComponent;
