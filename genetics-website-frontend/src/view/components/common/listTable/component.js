import React, {useState} from 'react';

import './style.css';
import {ARTICLE, EVENTS, NEWS} from "../../../../state/consts/contentTypes";
import {formatDate} from "../../../../state/functions/formatDate";
import AccountPageButtonComponent from "../accountPageButton/component";
import AccountPageInputComponent from "../accountPageInput/component";
import AccountLoadMoreButtonComponent from "../accountLoadMoreButton/component";
import parse from "html-react-parser";
import {convertDateTime} from "../../../../state/functions/formatEventDate";

function ListTableComponent(props) {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const renderSortIndicator = () => {
        switch (props.orderByTitle) {
            case 'asc':
                return 'Название ⯅';
            case 'desc':
                return 'Название ⯆';
            default:
                return 'Название';
        }
    };

    const renderDateFilterIndicator = () => {
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
                {(props.contentType === ARTICLE || props.contentType === NEWS) && (
                    <tr>
                        <th onClick={props.status === "loading" ? undefined : props.handleTitleSort}
                            className="list-table-filter-button hoverable">{renderSortIndicator()}
                        </th>
                        <th
                            onClick={props.status === "loading" || props.secondInputValue === "" ? undefined : props.handleDateFilter}
                            className={`list-table-filter-button ${props.secondInputValue === "" ? "" : "hoverable"}`}>{renderDateFilterIndicator()}
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
                {(props.contentType === ARTICLE || props.contentType === NEWS) && (
                    <tr>
                        <td colSpan="4">
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
