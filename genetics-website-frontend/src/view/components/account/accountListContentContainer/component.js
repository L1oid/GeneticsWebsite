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

    const [page, ] = useState(1);
    const [pageSize] = useState(6);
    const dispatch = useDispatch();

    const newsList = useSelector(state => state.content.newsList);
    const articleList = useSelector(state => state.content.articleList);

    useEffect(() => {
        dispatch(fetchContent({ type: contentType, page: page , pageSize: pageSize}));
    }, [page, dispatch, pageSize, contentType])

    useEffect(() => {
        dispatch(clearNewsList());
    }, [contentType, dispatch]);

    useEffect(() => {
        dispatch(clearArticleList());
    }, [contentType, dispatch]);

    return (
        <div className="account-list-content-container">
            <AccountPageTitleComponent
                title="Список контента" />
            <div className="account-list-content-container-row-2">
                <div className="account-list-content-type">
                    <AccountPageSubtitleComponent
                        title={"Тип"}/>
                    <TypeContentSelectComponent
                        setContentType={(e) =>setContentType(e.target.value)}
                        contentType={contentType} />
                </div>
                <AccountPageSubtitleComponent
                    title={"Список"}/>
                <ListTableComponent
                    contentType={contentType}
                    thead={["Название", "Дата создания", "Автор"]}
                    tbodyNews={newsList}
                    tbodyArticles={articleList}/>

            </div>
        </div>
    )
}

export default AccountListContentContainerComponent;
