import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";

import './style.css';
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import AccountPageInputComponent from "../../common/accountPageInput/component";
import CreateQuestionnaireQuestionContainerComponent from "../createQuestionnaireQuestionContainer/component";
import AccountPageButtonComponent from "../../common/accountPageButton/component";
import ErrorAndSuccessWindowComponent from "../../common/errorAndSuccessWindow/component";
import PlusButtonComponent from "../../common/plusButton/component";
import { FREE, SELECT } from "../../../../state/consts/contentTypes";
import {clearContentErrorStatusSuccess} from "../../../../state/slices/content/contentSlice";
import {useLocation} from "react-router-dom";
import {questionnaireCreation} from "../../../../state/slices/content/asyncActions";

function CreateQuestionnaireContainerComponent(props) {

    const { error, success, status } = useSelector(state => state.content);
    const dispatch = useDispatch();
    const location = useLocation();

    const [title, setTitle] = useState("")
    const [noMatchAnswer, setNoMatchAnswer] = useState("")
    const [questionList, setQuestionList] = useState([{
            questionText: "",
            questionWeight: 1,
            questionType: FREE,
            questionNumber: 1,
            answerRequired: false,
            answerForUser: "",
            answerTriggeringWeight: ""
        }]
    )

    useEffect(() => {
        dispatch(clearContentErrorStatusSuccess());
    }, [dispatch, location]);

    const createNewQuestion = (questionNumber) => ({
        questionText: "",
        questionWeight: 1,
        questionType: FREE,
        questionNumber,
        answerRequired: false,
        answerForUser: "",
        answerTriggeringWeight: ""
    });

    const addQuestion = () => {
        setQuestionList([...questionList, createNewQuestion(questionList.length + 1)]);
    }

    const removeQuestion = (questionIndex) => {
        if (questionList.length === 1) {
            return;
        }
        const newQuestionList = questionList.filter((_, i) => i !== questionIndex);
        const updatedQuestionList = newQuestionList.map((question, index) => ({
            ...question,
            questionNumber: index + 1,
        }));

        setQuestionList(updatedQuestionList);
    };

    const updateQuestionText = (index, newQuestionText) => {
        const newQuestionList = questionList.map((question, i) =>
            i === index ? { ...question, questionText: newQuestionText } : question
        );
        setQuestionList(newQuestionList);
    };

    const updateQuestionWeight = (index, newQuestionWeight) => {
        const newQuestionList = questionList.map((question, i) =>
            i === index ? { ...question, questionWeight: newQuestionWeight } : question
        );
        setQuestionList(newQuestionList);
    };

    const updateQuestionType = (index, newQuestionType) => {
        const newQuestionList = questionList.map((question, i) => {
            if (i === index) {
                const updatedQuestion = {
                    ...question,
                    questionType: newQuestionType,
                };

                if (newQuestionType === SELECT) {
                    updatedQuestion.answerList = [{ text: "" }];
                } else {
                    delete updatedQuestion.answerList;
                }

                return updatedQuestion;
            }
            return question;
        });
        setQuestionList(newQuestionList);
    };

    const updateAnswerRequired = (index, newAnswerRequired) => {
        const newQuestionList = questionList.map((question, i) =>
            i === index ? { ...question, answerRequired: newAnswerRequired } : question
        );
        setQuestionList(newQuestionList);
    };

    const updateAnswerForUser = (index, newAnswerForUser) => {
        const newQuestionList = questionList.map((question, i) =>
            i === index ? { ...question, answerForUser: newAnswerForUser } : question
        );
        setQuestionList(newQuestionList);
    };

    const updateAnswerTriggeringWeight = (index, newAnswerTriggeringWeight) => {
        const newQuestionList = questionList.map((question, i) =>
            i === index ? { ...question, answerTriggeringWeight: newAnswerTriggeringWeight } : question
        );
        setQuestionList(newQuestionList);
    };

    const updateAnswerList = (questionIndex, answerIndex, newAnswerText) => {
        const newQuestionList = questionList.map((question, i) => {
            if (i === questionIndex) {
                const newAnswerList = question.answerList.map((answer, j) =>
                    j === answerIndex ? { ...answer, text: newAnswerText } : answer
                );
                return { ...question, answerList: newAnswerList };
            }
            return question;
        });
        setQuestionList(newQuestionList);
    };

    const addAnswer = (questionIndex) => {
        const newQuestionList = questionList.map((question, i) => {
            if (i === questionIndex) {
                return {
                    ...question,
                    answerList: [...question.answerList, { text: "" }]
                };
            }
            return question;
        });
        setQuestionList(newQuestionList);
    };

    const removeAnswer = (questionIndex, answerIndex) => {
        const newQuestionList = questionList.map((question, i) => {
            if (i === questionIndex) {
                const newAnswerList = question.answerList.filter((_, j) => j !== answerIndex);
                if (newAnswerList.length === 0) {
                    return question;
                }
                return { ...question, answerList: newAnswerList };
            }
            return question;
        });
        setQuestionList(newQuestionList);
    };

    const handleButtonConfirm = () => {
        const questionnaire = {
            title: title,
            noMatchAnswer: noMatchAnswer,
            questionList: questionList
        }
        dispatch(questionnaireCreation(questionnaire))
    }

    return (
        <div className="create-questionnaire-container">
            <div className="create-questionnaire-container-row-1">
                <AccountPageTitleComponent
                    title="Создание опроса"/>
            </div>
            <div className="create-questionnaire-container-row-2">
                <AccountPageSubtitleComponent
                    title={"Название опроса *"}/>
                <div className="create-questionnaire-title-input">
                    <AccountPageInputComponent
                        type="text"
                        value={title}
                        handle={(e) => setTitle(e.target.value)}
                        disabled={false}/>
                </div>
                <AccountPageSubtitleComponent
                    title={"Стандартное сообщение *"}/>
                <div className="create-questionnaire-title-input">
                    <AccountPageInputComponent
                        type="text"
                        value={noMatchAnswer}
                        handle={(e) => setNoMatchAnswer(e.target.value)}
                        disabled={false}/>
                </div>
                <AccountPageSubtitleComponent
                    title={"Вопросы"}/>
                {questionList.map((question, index) => (
                    <CreateQuestionnaireQuestionContainerComponent
                        key={index}
                        index={index}
                        question={question}
                        questionListLength={questionList.length}
                        isLastQuestion={index === questionList.length - 1}
                        removeQuestion={removeQuestion}
                        updateQuestionText={updateQuestionText}
                        updateQuestionWeight={updateQuestionWeight}
                        updateQuestionType={updateQuestionType}
                        updateAnswerRequired={updateAnswerRequired}
                        updateAnswerForUser={updateAnswerForUser}
                        updateAnswerTriggeringWeight={updateAnswerTriggeringWeight}
                        updateAnswerList={updateAnswerList}
                        addAnswer={addAnswer}
                        removeAnswer={removeAnswer}
                    />
                ))}
                <div className="create-questionnaire-button-plus-wrapper">
                    <PlusButtonComponent
                        handle={addQuestion}/>
                </div>
                <div className="create-questionnaire-button-wrapper">
                    <AccountPageButtonComponent
                        status={status}
                        handle={handleButtonConfirm}
                        title={"Подтвердить"}/>
                </div>
                <ErrorAndSuccessWindowComponent error={error} success={success} />
            </div>
        </div>
    )
}

export default CreateQuestionnaireContainerComponent;
