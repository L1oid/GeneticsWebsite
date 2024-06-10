import React, {useEffect, useState} from 'react';

import './style.css';

import BreadcrumpComponent from "../../common/breadcrump/component";
import LoadMoreButtonComponent from "../../common/loadMoreButton/component";
import {useDispatch, useSelector} from "react-redux";
import {fetchQuestionnaires} from "../../../../state/slices/content/asyncActions";
import {clearQuestionnaireList} from "../../../../state/slices/content/contentSlice";
import {useNavigate} from "react-router-dom";
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import AccountPageInputComponent from "../../common/accountPageInput/component";
import AccountPageButtonComponent from "../../common/accountPageButton/component";
import ValuesSelectorComponent from "../../common/valuesSelector/component";
import AccountPageTitleComponent from "../../common/accountPageTitle/component";

function ListQuestionnairesComponent(props) {

    const [page, setPage] = useState(1);
    const [searchPage, setSearchPage] = useState(1);
    const [pageSize] = useState(6);
    const [refresh, setRefresh] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const questionnaireList = useSelector(state => state.content.questionnaireList);
    const questionnaireListLength = useSelector(state => state.content.questionnaireListLength);
    const {status} = useSelector(state => state.content);
    const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);
    const [searchTitle, setSearchTitle] = useState("");
    const [tempSearchTitle, setTempSearchTitle] = useState("");
    const [orderByTitle, setOrderByTitle] = useState("");
    const [tempOrderByTitle, setTempOrderByTitle] = useState("");

    useEffect(() => {
        if (searchTitle.trim() === '') {
            dispatch(fetchQuestionnaires({page: page , pageSize: pageSize, orderByTitle: orderByTitle}));
        } else {
            dispatch(fetchQuestionnaires({page: searchPage , pageSize: pageSize, title: searchTitle, orderByTitle: orderByTitle}));
        }
    }, [orderByTitle, page, searchPage, searchTitle, dispatch, pageSize, refresh]);

    useEffect(() => {
        dispatch(clearQuestionnaireList());
    }, [dispatch]);

    useEffect(() => {
        if (questionnaireList.length === questionnaireListLength) {
            setIsLoadMoreDisabled(true)
        } else {
            setIsLoadMoreDisabled(false)
        }
    }, [questionnaireList.length, questionnaireListLength]);

    const handleLoadMore = () => {
        if (searchTitle.trim() === '') {
            setPage(page + 1);
        } else {
            setSearchPage(searchPage + 1);
        }
    };

    const handleNavigateClick = (href) => {
        navigate(href);
    };

    const searchButtonHandle = () => {
        dispatch(clearQuestionnaireList());
        setSearchTitle(tempSearchTitle);
        setOrderByTitle(tempOrderByTitle);
        setSearchPage(1);
        setPage(1);
        setRefresh(refresh => refresh + 1);
    };

    const handleSortChange = (e) => {
        setTempOrderByTitle(e.target.value);
    };

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: `/questionnaires`,
            name: "Опросы"
        }
    ]

    return (
        <div className="page-container">
            <div className="list-questionnaires">
                <BreadcrumpComponent ways={ways}/>
                <h2 className="list-questionnaires-heading">Опросы</h2>
                <div className="list-questionnaires-row-1">
                    <div className="list-questionnaires-column-1">
                        <div className="list-questionnaires-filter">
                            <AccountPageSubtitleComponent
                                title={"Поиск"}/>
                            <div className="list-questionnaires-input">
                                <AccountPageInputComponent
                                    type="text"
                                    placeholder="Название"
                                    value={tempSearchTitle}
                                    handle={(e) => setTempSearchTitle(e.target.value)}
                                    disabled={false}/>
                            </div>
                            <AccountPageSubtitleComponent
                                title={"Сортировка"}/>
                            <div className="list-questionnaires-input">
                                <ValuesSelectorComponent
                                    value={tempOrderByTitle}
                                    handle={handleSortChange}
                                    optionValueOne={""}
                                    titleSelectOne={"По умолчанию"}
                                    optionValueTwo={"asc"}
                                    titleSelectTwo={"От А до Я"}
                                    optionValueThree={"desc"}
                                    titleSelectThree={"От Я до А"}/>
                            </div>
                            <AccountPageButtonComponent
                                status={status}
                                title={"Подтвердить"}
                                handle={searchButtonHandle}
                            />
                        </div>
                    </div>
                    <div className="list-questionnaires-column-2">
                        <AccountPageTitleComponent
                            title={"Доступные опросы"}/>
                        {questionnaireList.length === 0 || (questionnaireList.length === 1 && questionnaireList[0].id === null) ? (
                            <div className="list-questionnaires-empty">
                                На данный момент опросы отсутствуют
                            </div>
                        ) : (
                            <div className="list-questionnaires-list">
                                {questionnaireList.map((questionnaire, questionnaireIndex) => (
                                    <div className="list-questionnaires-item" key={questionnaireIndex}>
                                        <div className="list-questionnaires-card"
                                             data-href={`/questionnaires/${questionnaire.id}`}
                                             onClick={(e) => handleNavigateClick(e.currentTarget.getAttribute('data-href'))}>
                                            <div className="list-questionnaires-card-title">
                                                {questionnaire.title}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="list-questionnaires-row-2">
                    <LoadMoreButtonComponent
                        handle={handleLoadMore}
                        isDisabled={isLoadMoreDisabled}/>
                </div>
            </div>
        </div>
    )
}

export default ListQuestionnairesComponent;