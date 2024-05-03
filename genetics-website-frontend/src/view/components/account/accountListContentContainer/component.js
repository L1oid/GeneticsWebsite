import React, {useEffect, useState} from 'react';

import './style.css';
import AccountPageTitleComponent from "../accountPageTitle/component";
import ListTableComponent from "../listTable/component";
import AccountPageSubtitleComponent from "../accountPageSubtitle/component";
import TypeContentSelectComponent from "../typeContentSelect/component";
import {NEWS} from "../../../../state/consts/contentTypes";
import {fetchContent} from "../../../../state/slices/content/asyncActions";
import {useDispatch, useSelector} from "react-redux";
import {clearArticleList, clearNewsList} from "../../../../state/slices/content/contentSlice";

function AccountListContentContainerComponent(props) {

    const [contentType, setContentType] = useState(NEWS);

    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);
    const dispatch = useDispatch();

    const newsList = useSelector(state => state.content.newsList);
    const articleList = useSelector(state => state.content.articleList);
    const newsListLength = useSelector(state => state.content.newsListLength);
    const articleListLength = useSelector(state => state.content.articleListLength);

    useEffect(() => {
        dispatch(fetchContent({ type: contentType, page: page , pageSize: pageSize}));
    }, [page, dispatch, pageSize, contentType])

    useEffect(() => {
        dispatch(clearNewsList());
    }, [contentType, dispatch]);

    useEffect(() => {
        dispatch(clearArticleList());
    }, [contentType, dispatch]);

    useEffect(() => {
        if (contentType === NEWS) {
            if (newsList.length === newsListLength) {
                setIsLoadMoreDisabled(true)
            } else {
                setIsLoadMoreDisabled(false)
            }
        } else {
            if (articleList.length === articleListLength) {
                setIsLoadMoreDisabled(true)
            } else {
                setIsLoadMoreDisabled(false)
            }
        }
    }, [articleList.length, articleListLength, contentType, newsList.length, newsListLength]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const handleChangeContentType = (e) => {
        setContentType(e.target.value)
        setPage(1)
    };

    return (
        <div className="account-list-content-container">
            <AccountPageTitleComponent
                title="Список контента" />
            <div className="account-list-content-container-row-2">
                <div className="account-list-content-type">
                    <AccountPageSubtitleComponent
                        title={"Тип"}/>
                    <TypeContentSelectComponent
                        setContentType={(e) => handleChangeContentType(e)}
                        contentType={contentType} />
                </div>
                <AccountPageSubtitleComponent
                    title={"Список"}/>
                <ListTableComponent
                    contentType={contentType}
                    thead={["Название", "Дата создания", "Автор"]}
                    inputAmount={3}
                    tbodyNews={newsList}
                    tbodyArticles={articleList}
                    handleLoadMore={handleLoadMore}
                    isLoadMoreDisabled={isLoadMoreDisabled}/>
            </div>
        </div>
    )
}

export default AccountListContentContainerComponent;
