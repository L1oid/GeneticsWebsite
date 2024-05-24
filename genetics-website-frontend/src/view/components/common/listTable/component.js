import React, {useState} from 'react';

import './style.css';
import {ARTICLE, EVENTS, NEWS, USERS} from "../../../../state/consts/contentTypes";
import {formatDate} from "../../../../state/functions/formatDate";
import AccountPageButtonComponent from "../accountPageButton/component";
import AccountPageInputComponent from "../accountPageInput/component";
import AccountLoadMoreButtonComponent from "../accountLoadMoreButton/component";
import parse from "html-react-parser";
import {convertDateTime} from "../../../../state/functions/formatEventDate";
import {convertUsersDate} from "../../../../state/functions/formatUsersDate";

function ListTableComponent(props) {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const renderTitleSortIndicator = () => {
        switch (props.orderByTitle) {
            case 'asc':
                return 'Название ⯅';
            case 'desc':
                return 'Название ⯆';
            default:
                return 'Название';
        }
    };

    const renderUsernameSortIndicator = () => {
        switch (props.orderBy) {
            case 'asc':
                return 'Логин ⯅';
            case 'desc':
                return 'Логин ⯆';
            default:
                return 'Логин';
        }
    };

    const renderDateCreateFilterIndicator = () => {
        switch (props.dateFilter) {
            case 'gt':
                return 'Дата создания ⯅';
            case 'lt':
                return 'Дата создания ⯆';
            default:
                return 'Дата создания';
        }
    };

    const handleDeleteClick = (itemId) => {
        setItemToDelete(itemId);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        props.deleteButtonHandle(itemToDelete);
        setShowConfirmModal(false);
        setItemToDelete(null);
    };

    const handleChangeClick = (itemId) => {
        props.changeButtonHandle(itemId);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setItemToDelete(null);
    };

    return (
        <div className="list-table-container">
            {showConfirmModal && (
                <div>
                    <div className="list-table-confirm-modal-overlay"/>
                    <div className="list-table-confirm-modal">
                        <div className="list-table-modal-content">
                            <p className="list-table-modal-content-text title">Подтвердите удаление</p>
                            {(props.contentType === ARTICLE || props.contentType === NEWS) && <p className="list-table-modal-content-text">Вы действительно хотите удалить выбранный контент?</p>}
                            {(props.contentType === EVENTS) && <p className="list-table-modal-content-text">Вы действительно хотите удалить выбранное событие?</p>}
                            <div className="list-table-modal-content-buttons">
                                <AccountPageButtonComponent
                                    title={"Удалить"}
                                    status={props.status}
                                    handle={handleConfirmDelete}/>
                                <div className="list-table-modal-content-buttons-space" />
                                <AccountPageButtonComponent
                                    title={"Отмена"}
                                    status={props.status}
                                    handle={handleCancelDelete}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <table className="list-table">
                <thead>
                {props.contentType === USERS && (
                    <tr>
                        <th onClick={props.status === "loading" ? undefined : props.handleUsernameSort}
                            className="list-table-filter-button hoverable">{renderUsernameSortIndicator()}
                        </th>
                        <th>Имя Фамилия</th>
                        <th>Почта</th>
                        <th>Роли</th>
                        <th
                            onClick={props.status === "loading" || props.date === "" ? undefined : props.handleDateFilter}
                            className={`list-table-filter-button ${props.date === "" ? "" : "hoverable"}`}>{renderDateCreateFilterIndicator()}
                        </th>
                        <th>Управление</th>
                    </tr>
                )}
                {(props.contentType === ARTICLE || props.contentType === NEWS) && (
                    <tr>
                        <th onClick={props.status === "loading" ? undefined : props.handleTitleSort}
                            className="list-table-filter-button hoverable">{renderTitleSortIndicator()}
                        </th>
                        <th
                            onClick={props.status === "loading" || props.secondInputValue === "" ? undefined : props.handleDateFilter}
                            className={`list-table-filter-button ${props.secondInputValue === "" ? "" : "hoverable"}`}>{renderDateCreateFilterIndicator()}
                        </th>
                        <th>Автор</th>
                        <th>Управление</th>
                    </tr>
                )}
                {props.contentType === EVENTS && (
                    <tr>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Дата</th>
                        <th>Место встречи</th>
                        <th>Управление</th>
                    </tr>
                )}
                </thead>
                <tbody>
                {(props.contentType === ARTICLE || props.contentType === NEWS) && (
                    <tr>
                        <td>
                        <AccountPageInputComponent
                                type={"text"}
                                value={props.firstInputValue}
                                handle={props.firstInputValueHandle}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageInputComponent
                                type={"date"}
                                value={props.secondInputValue}
                                handle={props.secondInputValueHandle}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageInputComponent
                                type={"text"}
                                value={props.thirdInputValue}
                                handle={props.thirdInputValueHandle}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageButtonComponent
                                title={"Поиск"}
                                status={props.status}
                                handle={props.searchButtonHandle}/>
                        </td>
                    </tr>
                )}
                {props.contentType === USERS && (
                    <tr>
                        <td>
                            <AccountPageInputComponent
                                type={"text"}
                                value={props.searchUsername}
                                handle={props.setSearchUsername}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageInputComponent
                                type={"text"}
                                value={props.searchFirstNamePlusLastName}
                                handle={props.setSearchFirstNamePlusLastName}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageInputComponent
                                type={"text"}
                                value={props.searchEmail}
                                handle={props.setSearchEmail}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageInputComponent
                                type={"text"}
                                value={props.searchRoleName}
                                handle={props.setSearchRoleName}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageInputComponent
                                type={"date"}
                                value={props.date}
                                handle={props.setDate}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageButtonComponent
                                title={"Поиск"}
                                status={props.status}
                                handle={props.searchButtonHandle}/>
                        </td>
                    </tr>
                )}
                {props.contentType === EVENTS && props.eventList.map((event, eventIndex) => (
                    <tr key={eventIndex}>
                        <td>
                        {event.title}
                        </td>
                        <td>
                            {parse(event.description)}
                        </td>
                        <td>
                            {parse(convertDateTime(event.scheduledFor))}
                        </td>
                        <td>
                            {event.rendezvous}
                        </td>
                        <td>
                            <AccountPageButtonComponent
                                title={"Удалить"}
                                status={props.status}
                                handle={() => handleDeleteClick(event.id)}/>
                        </td>
                    </tr>
                ))}
                {props.contentType === USERS && props.usersList.map((user, userIndex) => (
                    <tr key={userIndex}>
                        <td>
                            {user.username}
                        </td>
                        <td>
                            {user.firstName + " " + user.lastName}
                        </td>
                        <td>
                            {user.email}
                        </td>
                        <td>
                            {user.roleNames}
                        </td>
                        <td>
                            {convertUsersDate(user.createdAt)}
                        </td>
                        <td>
                            <AccountPageButtonComponent
                                title={"Удалить"}
                                status={props.status}
                                handle={() => handleDeleteClick(user.userId)}/>
                        </td>
                    </tr>
                ))}
                {props.contentType === NEWS && props.tbodyNews.map((tbody, tbodyIndex) => (
                    <tr key={tbodyIndex}>
                        <td>
                            {tbody.title}
                        </td>
                        <td>
                            {formatDate(tbody.createdAt)}
                        </td>
                        <td>
                            {tbody.lastNamePlusFirstName}
                        </td>
                        <td>
                            <div className="list-table-change-up-button">
                                <AccountPageButtonComponent
                                    title={"Изменить"}
                                    status={props.status}
                                    handle={() => handleChangeClick(tbody.id)}/>
                            </div>
                            <AccountPageButtonComponent
                                title={"Удалить"}
                                status={props.status}
                                handle={() => handleDeleteClick(tbody.id)}/>
                        </td>
                    </tr>
                ))}
                {props.contentType === ARTICLE && props.tbodyArticles.map((tbody, tbodyIndex) => (
                    <tr key={tbodyIndex}>
                        <td>
                            {tbody.title}
                        </td>
                        <td>
                            {formatDate(tbody.createdAt)}
                        </td>
                        <td>
                            {tbody.lastNamePlusFirstName}
                        </td>
                        <td>
                            <div className="list-table-change-up-button">
                                <AccountPageButtonComponent
                                    title={"Изменить"}
                                    status={props.status}
                                    handle={() => handleChangeClick(tbody.id)}/>
                            </div>
                            <AccountPageButtonComponent
                                title={"Удалить"}
                                status={props.status}
                                handle={() => handleDeleteClick(tbody.id)}/>
                        </td>
                    </tr>
                ))}
                {props.contentType === NEWS && props.tbodyNews.length === 0 && (
                    <tr>
                        <td colSpan="4">
                            Ничего не найдено
                        </td>
                    </tr>
                )}
                {props.contentType === ARTICLE && props.tbodyArticles.length === 0 && (
                    <tr>
                        <td colSpan="4">
                            Ничего не найдено
                        </td>
                    </tr>
                )}
                {props.contentType === EVENTS && props.eventList.length === 0 && (
                    <tr>
                        <td colSpan="5">
                            Ничего не найдено
                        </td>
                    </tr>
                )}
                {props.contentType === USERS && props.usersList.length === 0 && (
                    <tr>
                        <td colSpan="6">
                            Ничего не найдено
                        </td>
                    </tr>
                )}
                {(props.contentType === ARTICLE || props.contentType === NEWS) && (
                    <tr>
                        <td colSpan="4">
                            <AccountLoadMoreButtonComponent
                                handle={props.handleLoadMore}
                                isDisabled={props.isLoadMoreDisabled}/>
                        </td>
                    </tr>
                )}
                {props.contentType === USERS && (
                    <tr>
                        <td colSpan="6">
                            <AccountLoadMoreButtonComponent
                                handle={props.handleLoadMore}
                                isDisabled={props.isLoadMoreDisabled}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default ListTableComponent;
