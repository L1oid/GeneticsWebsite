import React, {useEffect, useState} from 'react';

import './style.css';
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import ListTableComponent from "../../common/listTable/component";
import {useDispatch, useSelector} from "react-redux";
import {USERS} from "../../../../state/consts/contentTypes";
import {fetchUsers} from "../../../../state/slices/user/asyncActions";
import {clearUsersList} from "../../../../state/slices/user/userSlice";

function ListUsersContainerComponent(props) {

    const [searchUsername, setSearchUsername] = useState("");
    const [searchFirstNamePlusLastName, setSearchFirstNamePlusLastName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchRoleName, setSearchRoleName] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [showDate, setShowDate] = useState("");

    const [tempSearchUsername, setTempSearchUsername] = useState("");
    const [tempSearchFirstNamePlusLastName, setTempSearchFirstNamePlusLastName] = useState("");
    const [tempSearchEmail, setTempSearchEmail] = useState("");
    const [tempSearchRoleName, setTempSearchRoleName] = useState("");
    const [tempSearchDate, setTempSearchDate] = useState("");


    const [refresh, setRefresh] = useState(0);

    const [orderBy, setOrderBy] = useState("");
    const [dateFilter, setDateFilter] = useState("eq");

    const [searchPage, setSearchPage] = useState(1);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);
    
    const dispatch = useDispatch();
    const usersList = useSelector(state => state.user.usersList);
    const usersListLength = useSelector(state => state.user.usersListLength);
    const {status} = useSelector(state => state.user);

    useEffect(() => {
        if (searchUsername.trim() === '' && searchFirstNamePlusLastName.trim() === '' && searchEmail.trim() === '' && searchRoleName.trim() === '' && searchDate.trim() === '') {
            dispatch(fetchUsers({page: page, pageSize: pageSize, orderBy: orderBy, dateFilter: dateFilter}));
        } else {
            dispatch(fetchUsers({page: page, pageSize: pageSize, orderBy: orderBy, dateFilter: dateFilter, username: searchUsername, firstNamePlusLastName: searchFirstNamePlusLastName, email: searchEmail, roleName: searchRoleName, date: searchDate}));
        }
    }, [dispatch, page, searchPage, pageSize, orderBy, dateFilter, searchUsername, searchFirstNamePlusLastName, searchEmail, searchRoleName, searchDate, refresh]);

    useEffect(() => {
        dispatch(clearUsersList());
    }, [dispatch, orderBy, dateFilter]);

    useEffect(() => {
        if (showDate === "") {
            setDateFilter("eq")
        }
    }, [showDate]);

    useEffect(() => {
        if (usersList.length === usersListLength) {
            setIsLoadMoreDisabled(true)
        } else if (usersList.length === 0) {
            setIsLoadMoreDisabled(true)
        } else {
            setIsLoadMoreDisabled(false)
        }
    }, [usersList.length, usersListLength]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const searchButtonHandle = () => {
        dispatch(clearUsersList());
        setSearchUsername(tempSearchUsername)
        setSearchEmail(tempSearchEmail)
        setSearchFirstNamePlusLastName(tempSearchFirstNamePlusLastName)
        setSearchRoleName(tempSearchRoleName)
        setSearchDate(tempSearchDate)
        setSearchPage(1);
        setPage(1);
        setRefresh(refresh => refresh + 1);
    };

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

    const handleUsernameSort = () => {
        setSearchPage(1);
        setPage(1);
        if (orderBy === "") {
            setOrderBy('asc');
        } else if (orderBy === 'asc') {
            setOrderBy('desc');
        } else {
            setOrderBy("");
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
        console.log("Deleted: " + id)
    }

    return (
        <div className="list-users-container">
            <AccountPageTitleComponent
                title="Список пользователей"/>
            <div className="list-users-container-row-2">
                <AccountPageSubtitleComponent
                    title={"Список"}/>
                <ListTableComponent
                    status={status}
                    contentType={USERS}
                    usersList={usersList}
                    handleLoadMore={handleLoadMore}
                    isLoadMoreDisabled={isLoadMoreDisabled}
                    deleteButtonHandle={deleteButtonHandle}
                    searchButtonHandle={searchButtonHandle}
                    handleUsernameSort={handleUsernameSort}
                    handleDateFilter={handleDateFilter}
                    dateFilter={dateFilter}
                    orderBy={orderBy}
                    date={showDate}
                    setDate={handleDateChange}
                    searchUsername={tempSearchUsername}
                    setSearchUsername={(e) => setTempSearchUsername(e.target.value)}
                    searchFirstNamePlusLastName={tempSearchFirstNamePlusLastName}
                    setSearchFirstNamePlusLastName={(e) => setTempSearchFirstNamePlusLastName(e.target.value)}
                    searchEmail={tempSearchEmail}
                    setSearchEmail={(e) => setTempSearchEmail(e.target.value)}
                    searchRoleName={tempSearchRoleName}
                    setSearchRoleName={(e) => setTempSearchRoleName(e.target.value)}
                    />
            </div>
        </div>
    )
}

export default ListUsersContainerComponent;
