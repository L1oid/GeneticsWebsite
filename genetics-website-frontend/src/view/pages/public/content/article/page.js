import React, {useEffect} from 'react';

import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearSingleContent, setArticleNotFound} from "../../../../../state/slices/content/contentSlice";
import {fetchSingleContent} from "../../../../../state/slices/content/asyncActions";
import SingleContentComponent from "../../../../components/content/singleContent/component";
import {ARTICLE} from "../../../../../state/consts/contentTypes";

function ArticlePage(props) {
    const {id} = useParams();

    const dispatch = useDispatch();
    const content = useSelector(state => state.content.content);
    const articleNotFound = useSelector(state => state.content.articleNotFound);

    useEffect(() => {
        dispatch(clearSingleContent());
        dispatch(fetchSingleContent({ id: id }));
    }, [dispatch, id])

    useEffect(() => {
        if (articleNotFound) {
            dispatch(setArticleNotFound());
        }
    }, [articleNotFound, dispatch]);

    return articleNotFound ? (
        <Navigate to="/science" />
    ) : (
        <SingleContentComponent
            id={id}
            images={content.imageList}
            title={content.title}
            date={content.createdAt}
            content={content.content}
            type={ARTICLE}
            titleType={"Наука"}/>
    )
}

export default ArticlePage;