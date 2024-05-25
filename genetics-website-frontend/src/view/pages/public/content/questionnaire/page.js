import React, {useEffect} from 'react';

import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    clearQuestionnaire,
    setArticleNotFound
} from "../../../../../state/slices/content/contentSlice";
import {fetchQuestionnaire, fetchQuestionnaireQuestions} from "../../../../../state/slices/content/asyncActions";
import QuestionnaireContainerComponent from "../../../../components/content/questionnaireContainer/component";

function QuestionnairePage(props) {
    const {id} = useParams();

    const dispatch = useDispatch();
    const articleNotFound = useSelector(state => state.content.articleNotFound);

    useEffect(() => {
        dispatch(clearQuestionnaire());
        dispatch(fetchQuestionnaire({ id: id }));
        dispatch(fetchQuestionnaireQuestions({ questionnaireId: id }));
    }, [dispatch, id])

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