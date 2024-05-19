import React, {useEffect, useState} from 'react';

import './style.css';
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import ListTableComponent from "../../common/listTable/component";
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import TypeContentSelectComponent from "../typeContentSelect/component";
import {ARTICLE, NEWS} from "../../../../state/consts/contentTypes";
import {articleDeletion, fetchContent} from "../../../../state/slices/content/asyncActions";
import {useDispatch, useSelector} from "react-redux";
import {
    clearArticleList,
    clearNewsList,
    setRerenderAfterDeleteFalse
} from "../../../../state/slices/content/contentSlice";
import {useNavigate} from "react-router-dom";

function AccountListContentContainerComponent(props) {

    const [contentType, setContentType] = useState(NEWS);

    const [searchTitle, setSearchTitle] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const [showDate, setShowDate] = useState("");

    const [searchPage, setSearchPage] = useState(1);
    const [page, setPage] = useState(1);

    const [orderByTitle, setOrderByTitle] = useState("");
    const [dateFilter, setDateFilter] = useState("eq");

    const [pageSize] = useState(6);
    const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const newsList = useSelector(state => state.content.newsList);
    const articleList = useSelector(state => state.content.articleList);
    const newsListLength = useSelector(state => state.content.newsListLength);
    const articleListLength = useSelector(state => state.content.articleListLength);
    const {status, rerenderAfterDelete} = useSelector(state => state.content);
    

    useEffect(() => {
        if (searchTitle.trim() === '' && searchAuthor.trim() === '' && searchDate.trim() === '') {
            dispatch(fetchContent({ type: contentType, page: page, pageSize: pageSize, orderByTitle: orderByTitle, dateFilter: dateFilter}));
        } else {
            dispatch(fetchContent({ type: contentType, page: searchPage, pageSize: pageSize, title: searchTitle, date: searchDate, author: searchAuthor, orderByTitle: orderByTitle, dateFilter: dateFilter}));
        }
    }, [page, searchPage, dispatch, pageSize, contentType, orderByTitle, dateFilter]);

    useEffect(() => {
        dispatch(clearNewsList());
    }, [dateFilter, orderByTitle, contentType, dispatch]);

    useEffect(() => {
        dispatch(clearArticleList());
    }, [dateFilter, orderByTitle, contentType, dispatch]);

    useEffect(() => {
        if (showDate === "") {
            setDateFilter("eq")
        }
    }, [showDate]);

    useEffect(() => {
        if (contentType === NEWS) {
            if (newsList.length === newsListLength) {
                setIsLoadMoreDisabled(true)
            } else if (newsList.length === 0) {
                setIsLoadMoreDisabled(true)
            } else {
                setIsLoadMoreDisabled(false)
            }
        } else {
            if (articleList.length === articleListLength) {
                setIsLoadMoreDisabled(true)
            } else if (articleList.length === 0) {
                setIsLoadMoreDisabled(true)
            } else {
                setIsLoadMoreDisabled(false)
            }
        }
    }, [articleList.length, articleListLength, contentType, newsList.length, newsListLength]);

    const handleLoadMore = () => {
        if (searchTitle.trim() === '' && searchAuthor.trim() === '' && searchDate.trim() === '') {
            setPage(page + 1);
        } else {
            setSearchPage(searchPage + 1);
        }
    };

    const handleChangeContentType = (e) => {
        setContentType(e.target.value)
        setPage(1)
        setSearchPage(1)
    };

    const searchButtonHandle = () => {
        if (searchTitle.trim() === '' && searchAuthor.trim() === '' && searchDate.trim() === '') {
            if (contentType === ARTICLE) {
                dispatch(clearArticleList());
            } else {
                dispatch(clearNewsList());
            }
            if (page === 1) {
                dispatch(fetchContent({ type: contentType, page: 1, pageSize: pageSize, orderByTitle: orderByTitle, dateFilter: dateFilter}));
            } else {
                setPage(1)
            }
        } else {
            if (contentType === ARTICLE) {
                dispatch(clearArticleList());
            } else {
                dispatch(clearNewsList());
            }
            if (searchPage === 1) {
                dispatch(fetchContent({ type: contentType, page: 1, pageSize: pageSize, title: searchTitle, date: searchDate, author: searchAuthor, orderByTitle: orderByTitle, dateFilter: dateFilter}));
            } else {
                setSearchPage(1)
            }
        }
    };

    useEffect(() => {
        if (rerenderAfterDelete === true) {
            searchButtonHandle();
            dispatch(setRerenderAfterDeleteFalse());
        }
    }, [dispatch, rerenderAfterDelete, searchButtonHandle]);

    const handleDateChange = (event) => {
        const dateString = event.target.value;
        if (dateString === '') {
            setShowDate('');
            setSearchDate('');
        } else {
            const date = new Date(`${dateString}T12:00:00`);
            const formattedDate = date.toISOString().slice(0, 10);
            setShowDate(dateString);
            setSearchDate(formattedDate);
        }
    };

    const handleTitleSort = () => {
        if (orderByTitle === "") {
            setOrderByTitle('asc');
        } else if (orderByTitle=== 'asc') {
            setOrderByTitle('desc');
        } else {
            setOrderByTitle("");
        }
    };

    const handleDateFilter = () => {
        if (dateFilter === "eq") {
            setDateFilter('lt');
        } else if (dateFilter=== 'lt') {
            setDateFilter('gt');
        } else {
            setDateFilter("eq");
        }
    };

    const deleteButtonHandle = (id) => {
        dispatch(articleDeletion(id))
    }

    const changeButtonHandle = (id) => {
        navigate(`/account/content-list/edit-content/${id}`);
    }

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
                    status={status}
                    contentType={contentType}
                    tbodyNews={newsList}
                    tbodyArticles={articleList}
                    handleLoadMore={handleLoadMore}
                    isLoadMoreDisabled={isLoadMoreDisabled}
                    firstInputValue={searchTitle}
                    firstInputValueHandle={(e) => setSearchTitle(e.target.value)}
                    secondInputValue={showDate}
                    secondInputValueHandle={handleDateChange}
                    thirdInputValue={searchAuthor}
                    thirdInputValueHandle={(e) => setSearchAuthor(e.target.value)}
                    searchButtonHandle={searchButtonHandle}
                    deleteButtonHandle={deleteButtonHandle}
                    changeButtonHandle={changeButtonHandle}
                    handleTitleSort={handleTitleSort}
                    orderByTitle={orderByTitle}
                    handleDateFilter={handleDateFilter}
                    dateFilter={dateFilter}/>
            </div>
        </div>
    )
}

export default AccountListContentContainerComponent;
