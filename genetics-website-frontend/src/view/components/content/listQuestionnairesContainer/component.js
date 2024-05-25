import React, {useEffect, useState} from 'react';

import './style.css';
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchQuestionnaires,
    questionnaireDeletion
} from "../../../../state/slices/content/asyncActions";
import {clearQuestionnaireList, setRerenderAfterDeleteFalse} from "../../../../state/slices/content/contentSlice";
import ListTableComponent from "../../common/listTable/component";
import {QUESTIONNAIRES} from "../../../../state/consts/contentTypes";

function ListQuestionnairesContainerComponent(props) {

    const [searchTitle, setSearchTitle] = useState("");
    const [searchCreatedBy, setCreatedBy] = useState("");
    const [searchCreatedAt, setCreatedAt] = useState("");

    const [searchTempTitle, setTempSearchTitle] = useState("");
    const [searchTempCreatedBy, setTempSearchCreatedBy] = useState("");
    const [searchTempCreatedAt, setTempSearchCreatedAt] = useState("");

    const [orderByTitle, setOrderByTitle] = useState("");
    const [dateFilter, setDateFilter] = useState("eq");

    const [showDate, setShowDate] = useState("");
    const [refresh, setRefresh] = useState(0);

    const [searchPage, setSearchPage] = useState(1);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);

    const dispatch = useDispatch();
    const questionnaireList = useSelector(state => state.content.questionnaireList);
    const questionnaireListLength = useSelector(state => state.content.questionnaireListLength);
    const {status, rerenderAfterDelete} = useSelector(state => state.content);
    
    useEffect(() => {
        if (searchTitle.trim() === '' && searchCreatedBy.trim() === '' && searchCreatedAt.trim() === '') {
            dispatch(fetchQuestionnaires({page: page, pageSize: pageSize, orderByTitle: orderByTitle, dateFilter: dateFilter}));
        } else {
            dispatch(fetchQuestionnaires({page: searchPage, pageSize: pageSize, orderByTitle: orderByTitle, dateFilter: dateFilter, title: searchTitle, createdBy: searchCreatedBy, createdAt: searchCreatedAt}));
        }
    }, [dateFilter, dispatch, orderByTitle, page, pageSize, searchCreatedAt, searchCreatedBy, searchTitle, refresh, searchPage]);

    useEffect(() => {
        dispatch(clearQuestionnaireList());
    }, [dispatch, orderByTitle, dateFilter]);

    useEffect(() => {
        if (showDate === "") {
            setDateFilter("eq")
        }
    }, [showDate]);

    useEffect(() => {
        if (questionnaireList.length === questionnaireListLength) {
            setIsLoadMoreDisabled(true)
        } else if (questionnaireList.length === 0) {
            setIsLoadMoreDisabled(true)
        } else {
            setIsLoadMoreDisabled(false)
        }
    }, [questionnaireList.length, questionnaireListLength]);

    const handleLoadMore = () => {
        if (searchTitle.trim() === '' && searchCreatedBy.trim() === '' && searchCreatedAt.trim() === '') {
            setPage(page + 1);
        } else {
            setSearchPage(page + 1);
        }
    };

    const searchButtonHandle = () => {
        dispatch(clearQuestionnaireList());
        setSearchTitle(searchTempTitle);
        setCreatedBy(searchTempCreatedBy);
        setCreatedAt(searchTempCreatedAt);
        setSearchPage(1);
        setPage(1);
        setRefresh(refresh => refresh + 1);
    };

    const handleDateChange = (event) => {
        const dateString = event.target.value;
        if (dateString === '') {
            setShowDate('');
            setTempSearchCreatedAt('');
        } else {
            const date = new Date(`${dateString}T12:00:00`);
            const formattedDate = date.toISOString().slice(0, 10);
            setShowDate(dateString);
            setTempSearchCreatedAt(formattedDate);
        }
    };

    const handleTitleSort = () => {
        setSearchPage(1);
        setPage(1);
        if (orderByTitle === "") {
            setOrderByTitle('asc');
        } else if (orderByTitle === 'asc') {
            setOrderByTitle('desc');
        } else {
            setOrderByTitle("");
        }
    };

    const handleDateFilter = () => {
        setSearchPage(1);
        setPage(1);
        if (dateFilter === "eq") {
            setDateFilter('lt');
        } else if (dateFilter=== 'lt') {
            setDateFilter('gt');
        } else {
            setDateFilter("eq");
        }
    };

    useEffect(() => {
        if (rerenderAfterDelete === true) {
            searchButtonHandle();
            dispatch(setRerenderAfterDeleteFalse());
        }
    }, [dispatch, rerenderAfterDelete, searchButtonHandle]);

    const deleteButtonHandle = (id) => {
        dispatch(questionnaireDeletion(id))
    }

    return (
        <div className="list-questionnaires-container">
            <AccountPageTitleComponent
                title="Список анкет"/>
            <div className="list-questionnaires-container-row-2">
                <AccountPageSubtitleComponent
                    title={"Список"}/>
                <ListTableComponent
                    status={status}
                    contentType={QUESTIONNAIRES}
                    questionnaireList={questionnaireList}
                    isLoadMoreDisabled={isLoadMoreDisabled}
                    handleLoadMore={handleLoadMore}
                    searchTitle={searchTempTitle}
                    setSearchTitle={(e) => setTempSearchTitle(e.target.value)}
                    searchCreatedAt={showDate}
                    setSearchCreatedAt={handleDateChange}
                    searchCreatedBy={searchTempCreatedBy}
                    setSearchCreatedBy={(e) => setTempSearchCreatedBy(e.target.value)}
                    searchButtonHandle={searchButtonHandle}
                    deleteButtonHandle={deleteButtonHandle}
                    handleTitleSort={handleTitleSort}
                    orderByTitle={orderByTitle}
                    handleDateFilter={handleDateFilter}
                    dateFilter={dateFilter}
                />
            </div>

        </div>
    )
}

export default ListQuestionnairesContainerComponent;
