import React, {useEffect, useState} from 'react';

import ListContentComponent from "../../../components/content/listContent/component";
import {useDispatch, useSelector} from "react-redux";
import {fetchContent} from "../../../../state/slices/content/asyncActions";
import {NEWS} from "../../../../state/consts/contentTypes";
import {clearNewsList} from "../../../../state/slices/content/contentSlice";

function NewsPage() {

    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const dispatch = useDispatch();
    const contentList = useSelector(state => state.content.newsList);
    const contentListLength = useSelector(state => state.content.newsListLength);

    useEffect(() => {
        dispatch(fetchContent({ type: NEWS, page: page , pageSize: pageSize}));
    }, [page, dispatch, pageSize])

    useEffect(() => {
        dispatch(clearNewsList());
    }, [dispatch]);

    return (
        <ListContentComponent
            contentList={contentList}
            contentListLength={contentListLength}
            page={page}
            setPage={setPage}
            type={NEWS}
            titleType={"Новости"}
        />
    )
}

export default NewsPage;