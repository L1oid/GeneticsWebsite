import React, {useEffect} from 'react';

import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleContent} from "../../../../../state/slices/content/asyncActions";
import SingleContentComponent from "../../../../components/content/singleContent/component";
import {NEWS} from "../../../../../state/consts/contentTypes";
import {clearSingleContent, setArticleNotFound} from "../../../../../state/slices/content/contentSlice";

function OneNewsPage() {
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
        <Navigate to="/news" />
    ) : (
        <SingleContentComponent
            id={id}
            images={content.imageList}
            title={content.title}
            date={content.createdAt}
            content={content.content}
            contactInfo={content.contactInfo}
            type={NEWS}
            titleType={"Новости"}/>
    )
}

export default OneNewsPage;