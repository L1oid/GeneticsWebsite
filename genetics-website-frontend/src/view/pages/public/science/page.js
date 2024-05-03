import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {fetchContent} from "../../../../state/slices/content/asyncActions";
import {ARTICLE} from "../../../../state/consts/contentTypes";
import ListContentComponent from "../../../components/content/listContent/component";
import {clearArticleList} from "../../../../state/slices/content/contentSlice";

function SciencePage() {

    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const dispatch = useDispatch();
    const contentList = useSelector(state => state.content.articleList);
    const contentListLength = useSelector(state => state.content.articleListLength);

    useEffect(() => {
        dispatch(fetchContent({ type: ARTICLE, page: page , pageSize: pageSize}));
    }, [page, dispatch, pageSize])

    useEffect(() => {
        dispatch(clearArticleList());
    }, [dispatch]);


    return (
        <ListContentComponent
            contentList={contentList}
            contentListLength={contentListLength}
            page={page}
            setPage={setPage}
            type={ARTICLE}
            titleType={"Наука"}
        />
    )
}

export default SciencePage;