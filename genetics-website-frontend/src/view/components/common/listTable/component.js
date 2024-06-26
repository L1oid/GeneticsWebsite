import React, {useState} from 'react';

import './style.css';
import {ARTICLE, EVENTS, NEWS, QUESTIONNAIRES, USERS} from "../../../../state/consts/contentTypes";
import {formatDate} from "../../../../state/functions/formatDate";
import AccountPageButtonComponent from "../accountPageButton/component";
import AccountPageInputComponent from "../accountPageInput/component";
import AccountLoadMoreButtonComponent from "../accountLoadMoreButton/component";
import parse from "html-react-parser";
import {convertDateTime} from "../../../../state/functions/formatEventDate";
import {convertUsersDate} from "../../../../state/functions/formatUsersDate";
import ValuesSelectorComponent from "../valuesSelector/component";
import {ADMINISTRATOR, MODERATOR, STUDENT, TEACHER} from "../../../../state/consts/roles";

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

    const renderCourseTitleSortIndicator = () => {
        switch (props.orderByTitleAuthor) {
            case 'titleAsc':
                return 'Название ⯅';
            case 'titleDesc':
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
                            {(props.contentType === USERS) && <p className="list-table-modal-content-text">Вы действительно хотите удалить выбранного пользователя?</p>}
                            {(props.contentType === QUESTIONNAIRES) && <p className="list-table-modal-content-text">Вы действительно хотите удалить выбранный опрос?</p>}
                            {(props.courseProtection === true || props.courseProtection === false) && <p className="list-table-modal-content-text">Вы действительно хотите удалить выбранный курс?</p>}
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
                        <th>Роль</th>
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
                {(props.courseProtection === true || props.courseProtection === false) && (
                    <tr>
                        <th onClick={props.status === "loading" ? undefined : props.handleTitleSort}
                            className="list-table-filter-button hoverable">{renderCourseTitleSortIndicator()}
                        </th>
                        <th
                            onClick={props.status === "loading" || props.showDate === "" ? undefined : props.handleDateFilter}
                            className={`list-table-filter-button ${props.showDate === "" ? "" : "hoverable"}`}>{renderDateCreateFilterIndicator()}
                        </th>
                        <th>Автор</th>
                        <th>Управление</th>
                    </tr>
                )}
                {props.contentType === QUESTIONNAIRES && (
                    <tr>
                        <th onClick={props.status === "loading" ? undefined : props.handleTitleSort}
                            className="list-table-filter-button hoverable">{renderTitleSortIndicator()}
                        </th>
                        <th
                            onClick={props.status === "loading" || props.searchCreatedAt === "" ? undefined : props.handleDateFilter}
                            className={`list-table-filter-button ${props.searchCreatedAt === "" ? "" : "hoverable"}`}>{renderDateCreateFilterIndicator()}
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
                {(props.courseProtection === true || props.courseProtection === false) && (
                    <tr>
                        <td>
                            <AccountPageInputComponent
                                type={"text"}
                                value={props.tempSearchSearchQuery}
                                handle={props.setTempSearchSearchQuery}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageInputComponent
                                type={"date"}
                                value={props.showDate}
                                handle={props.handleDateChange}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageInputComponent
                                type={"text"}
                                value={props.tempSearchAuthor}
                                handle={props.setTempSearchAuthor}
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
                {props.contentType === QUESTIONNAIRES && (
                    <tr>
                        <td>
                            <AccountPageInputComponent
                                type={"text"}
                                value={props.searchTitle}
                                handle={props.setSearchTitle}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageInputComponent
                                type={"date"}
                                value={props.searchCreatedAt}
                                handle={props.setSearchCreatedAt}
                                disabled={false}/>
                        </td>
                        <td>
                            <AccountPageInputComponent
                                type={"text"}
                                value={props.searchCreatedBy}
                                handle={props.setSearchCreatedBy}
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
                            <ValuesSelectorComponent
                                value={props.searchRoleName}
                                handle={props.setSearchRoleName}
                                optionValueOne={""}
                                titleSelectOne={"Без фильтра"}
                                optionValueTwo={ADMINISTRATOR}
                                titleSelectTwo={"Администратор"}
                                optionValueThree={MODERATOR}
                                titleSelectThree={"Модератор"}
                                optionValueFour={TEACHER}
                                titleSelectFour={"Учитель"}
                                optionValueFive={STUDENT}
                                titleSelectFive={"Студент"}
                            />
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
                            <div className="list-table-change-up-button">
                                <AccountPageButtonComponent
                                    title={"Изменить"}
                                    status={props.status}
                                    handle={() => handleChangeClick(user.userId)}/>
                            </div>
                            <AccountPageButtonComponent
                                title={"Удалить"}
                                status={props.status}
                                handle={() => handleDeleteClick(user.userId)}/>
                        </td>
                    </tr>
                ))}
                {props.contentType === QUESTIONNAIRES && props.questionnaireList.map((questionnaire, questionnaireIndex) => (
                    <tr key={questionnaireIndex}>
                        <td>
                            {questionnaire.title}
                        </td>
                        <td>
                            {formatDate(questionnaire.createdAt)}
                        </td>
                        <td>
                            {questionnaire.firstNamePlusLastName}
                        </td>
                        <td>
                            <div className="list-table-change-up-button">
                                <AccountPageButtonComponent
                                    title={"Результаты"}
                                    status={props.status}
                                    handle={() => props.handleDownloadButton(questionnaire.id)}/>
                            </div>
                            <AccountPageButtonComponent
                                title={"Удалить"}
                                status={props.status}
                                handle={() => handleDeleteClick(questionnaire.id)}/>
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
                {props.courseProtection === false && props.freeCoursesList.map((course, courseIndex) => (
                    <tr key={courseIndex}>
                        <td>
                            {course.title}
                        </td>
                        <td>
                            {convertUsersDate(course.creationDate)}
                        </td>
                        <td>
                            {course.firstNamePlusLastName}
                        </td>
                        <td>
                            <AccountPageButtonComponent
                                title={"Удалить"}
                                status={props.status}
                                handle={() => handleDeleteClick(course.id)}/>
                        </td>
                    </tr>
                ))}
                {props.courseProtection === true && props.closeCoursesList.map((course, courseIndex) => (
                    <tr key={courseIndex}>
                        <td>
                            {course.title}
                        </td>
                        <td>
                            {convertUsersDate(course.creationDate)}
                        </td>
                        <td>
                            {course.firstNamePlusLastName}
                        </td>
                        <td>
                            <AccountPageButtonComponent
                                title={"Удалить"}
                                status={props.status}
                                handle={() => handleDeleteClick(course.id)}/>
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
                {props.courseProtection === false && props.freeCoursesList.length === 0 && (
                    <tr>
                        <td colSpan="4">
                            Ничего не найдено
                        </td>
                    </tr>
                )}
                {props.courseProtection === true && props.closeCoursesList.length === 0 && (
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
                {(props.contentType === ARTICLE || props.contentType === NEWS || props.contentType === QUESTIONNAIRES || props.courseProtection === true || props.courseProtection === false) && (
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
