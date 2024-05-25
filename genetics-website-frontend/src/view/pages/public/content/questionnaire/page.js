import React, {useEffect} from 'react';

import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    clearQuestionnaire, clearQuestionnaireQuestionsAnswersList, clearQuestionnaireQuestionsList,
    setArticleNotFound
} from "../../../../../state/slices/content/contentSlice";
import {
    fetchQuestionnaire,
    fetchQuestionnaireQuestions,
    fetchQuestionnaireQuestionsAnswers
} from "../../../../../state/slices/content/asyncActions";
import QuestionnaireContainerComponent from "../../../../components/content/questionnaireContainer/component";
import {SELECT} from "../../../../../state/consts/contentTypes";

function QuestionnairePage(props) {
    const {id} = useParams();

    const dispatch = useDispatch();
    const articleNotFound = useSelector(state => state.content.articleNotFound);
    const questionnaireQuestionsList = useSelector(state => state.content.questionnaireQuestionsList);

    useEffect(() => {
        dispatch(clearQuestionnaire());
        dispatch(clearQuestionnaireQuestionsList());
        dispatch(fetchQuestionnaire({ id: id }));
        dispatch(fetchQuestionnaireQuestions({ questionnaireId: id }));
    }, [dispatch, id])

    useEffect(() => {
        dispatch(clearQuestionnaireQuestionsAnswersList());
        questionnaireQuestionsList.forEach(question => {
            if (question.questionType === SELECT) {
                dispatch(fetchQuestionnaireQuestionsAnswers({questionId: question.questionId}));
            }
        });
    }, [dispatch, questionnaireQuestionsList.length]);

    useEffect(() => {
        if (articleNotFound) {
            dispatch(setArticleNotFound());
        }
    }, [articleNotFound, dispatch]);

    return articleNotFound ? (
        <Navigate to="/questionnaires" />
    ) : (
        <QuestionnaireContainerComponent />
    )
}

export default QuestionnairePage;