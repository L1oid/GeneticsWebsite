import React, {useEffect} from 'react';

import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleContent} from "../../../../state/slices/content/asyncActions";
import SingleContentComponent from "../../../components/content/singleContent/component";
import {NEWS} from "../../../../state/consts/contentTypes";
import {clearSingleContent} from "../../../../state/slices/content/contentSlice";

function OneNewsPage() {
    const {id} = useParams();

    const dispatch = useDispatch();
    const content = useSelector(state => state.content.content);

    useEffect(() => {
        dispatch(clearSingleContent());
        dispatch(fetchSingleContent({ id: id }));
    }, [dispatch, id])


    return (
        <SingleContentComponent
            id={id}
            images={content.imageList}
            title={content.title}
            date={content.createdAt}
            content={content.content}
            type={NEWS}
            titleType={"Новости"}/>
    )
}

export default OneNewsPage;