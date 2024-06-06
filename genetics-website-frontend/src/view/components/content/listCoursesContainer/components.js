import React, {useEffect, useState} from 'react';

import './style.css';

import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {articleDeletion, fetchContent, fetchCourses} from "../../../../state/slices/content/asyncActions";
import {
    clearArticleList,
    clearCloseCoursesList,
    clearFreeCoursesList,
    clearNewsList, setRerenderAfterDeleteFalse
} from "../../../../state/slices/content/contentSlice";
import {ARTICLE, NEWS} from "../../../../state/consts/contentTypes";
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import TypeContentSelectComponent from "../typeContentSelect/component";
import ListTableComponent from "../../common/listTable/component";
import ValuesSelectorComponent from "../../common/valuesSelector/component";

function ListCoursesContainerComponent(props) {

    const [courseProtection, setCourseProtection] = useState(false);

    const [searchSearchQuery, setSearchSearchQuery] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const [tempSearchSearchQuery, setTempSearchSearchQuery] = useState("");
    const [tempSearchAuthor, setTempSearchAuthor] = useState("");
    const [tempSearchDate, setTempSearchDate] = useState("");

    const [showDate, setShowDate] = useState("");

    const [searchPage, setSearchPage] = useState(1);
    const [page, setPage] = useState(1);

    const [refresh, setRefresh] = useState(0);

    const [orderByTitleAuthor, setOrderByTitleAuthor] = useState("");
    const [dateFilter, setDateFilter] = useState("eq");

    const [pageSize] = useState(6);
    const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const freeCoursesList = useSelector(state => state.content.freeCoursesList);
    const closeCoursesList = useSelector(state => state.content.closeCoursesList);
    const freeCoursesListLength = useSelector(state => state.content.freeCoursesListLength);
    const closeCoursesListLength = useSelector(state => state.content.closeCoursesListLength);
    const {status, rerenderAfterDelete} = useSelector(state => state.content);

    useEffect(() => {
        if (searchSearchQuery.trim() === '' && searchAuthor.trim() === '' && searchDate.trim() === '') {
            dispatch(fetchCourses({ courseProtection: courseProtection, page: page, pageSize: pageSize, orderByTitleAuthor: orderByTitleAuthor, dateFilter: dateFilter}));
        } else {
            dispatch(fetchCourses({ courseProtection: courseProtection, page: searchPage, pageSize: pageSize, searchQuery: searchSearchQuery, date: searchDate, author: searchAuthor, orderByTitleAuthor: orderByTitleAuthor, dateFilter: dateFilter}));
        }
    }, [page, searchDate, searchAuthor, searchSearchQuery, searchPage, dispatch, pageSize, courseProtection, orderByTitleAuthor, dateFilter, refresh]);

    useEffect(() => {
        dispatch(clearFreeCoursesList());
    }, [dateFilter, orderByTitleAuthor, courseProtection, dispatch]);

    useEffect(() => {
        dispatch(clearCloseCoursesList());
    }, [dateFilter, orderByTitleAuthor, courseProtection, dispatch]);

    useEffect(() => {
        if (showDate === "") {
            setDateFilter("eq")
        }
    }, [showDate]);

    useEffect(() => {
        if (courseProtection === false) {
            if (freeCoursesList.length === freeCoursesListLength) {
                setIsLoadMoreDisabled(true)
            } else if (freeCoursesList.length === 0) {
                setIsLoadMoreDisabled(true)
            } else {
                setIsLoadMoreDisabled(false)
            }
        } else {
            if (closeCoursesList.length === closeCoursesListLength) {
                setIsLoadMoreDisabled(true)
            } else if (closeCoursesList.length === 0) {
                setIsLoadMoreDisabled(true)
            } else {
                setIsLoadMoreDisabled(false)
            }
        }
    }, [freeCoursesList.length, freeCoursesListLength, courseProtection, closeCoursesList.length, closeCoursesListLength]);

    const handleLoadMore = () => {
        if (searchSearchQuery.trim() === '' && searchAuthor.trim() === '' && searchDate.trim() === '') {
            setPage(page + 1);
        } else {
            setSearchPage(searchPage + 1);
        }
    };

    const handleChangeCourseProtection = (e) => {
        if (e.target.value === "true") {
            setCourseProtection(true)
        } else {
            setCourseProtection(false)
        }
        setPage(1)
        setSearchPage(1)
    };

    const searchButtonHandle = () => {
        if (courseProtection === false) {
            dispatch(clearFreeCoursesList());
        } else {
            dispatch(clearCloseCoursesList());
        }
        setSearchSearchQuery(tempSearchSearchQuery)
        setSearchDate(tempSearchDate)
        setSearchAuthor(tempSearchAuthor)
        setSearchPage(1);
        setPage(1);
        setRefresh(refresh => refresh + 1);
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
            setTempSearchDate('');
        } else {
            const date = new Date(`${dateString}T12:00:00`);
            const formattedDate = date.toISOString().slice(0, 10);
            setShowDate(dateString);
            setTempSearchDate(formattedDate);
        }
    };

    const handleTitleSort = () => {
        setSearchPage(1);
        setPage(1);
        if (orderByTitleAuthor === "") {
            setOrderByTitleAuthor('asc');
        } else if (orderByTitleAuthor=== 'asc') {
            setOrderByTitleAuthor('desc');
        } else {
            setOrderByTitleAuthor("");
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

    const deleteButtonHandle = (id) => {
        console.log("Delete id: " + id)
    }

    return (
        <div className="list-courses-container">
            <div className="list-courses-container-row-1">
                <AccountPageTitleComponent
                    title="Список курсов"/>
            </div>
            <div className="list-courses-container-row-2">
                <div className="list-courses-content-type">
                    <AccountPageSubtitleComponent
                        title={"Тип"}/>
                    <ValuesSelectorComponent
                        handle={handleChangeCourseProtection}
                        value={courseProtection}
                        optionValueOne={false}
                        titleSelectOne={"Общедоступный"}
                        optionValueTwo={true}
                        titleSelectTwo={"Для студентов"}/>
                </div>
                <AccountPageSubtitleComponent
                    title={"Список"}/>
                <ListTableComponent
                    status={status}
                    courseProtection={courseProtection}
                    freeCoursesList={freeCoursesList}
                    closeCoursesList={closeCoursesList}
                    handleLoadMore={handleLoadMore}
                    isLoadMoreDisabled={isLoadMoreDisabled}
                    handleTitleSort={handleTitleSort}
                    handleDateFilter={handleDateFilter}
                    showDate={showDate}
                    handleDateChange={handleDateChange}
                    tempSearchSearchQuery={tempSearchSearchQuery}
                    setTempSearchSearchQuery={(e) => setTempSearchSearchQuery(e.target.value)}
                    tempSearchAuthor={tempSearchAuthor}
                    setTempSearchAuthor={(e) => setTempSearchAuthor(e.target.value)}
                    searchButtonHandle={searchButtonHandle}
                    deleteButtonHandle={deleteButtonHandle}
                    dateFilter={dateFilter}
                />
            </div>
        </div>
    )
}

export default ListCoursesContainerComponent;
