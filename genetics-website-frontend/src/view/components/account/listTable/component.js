import React from 'react';

import './style.css';
import {ARTICLE, NEWS} from "../../../../state/consts/contentTypes";
import {formatDate} from "../../../../state/functions/formatDate";
import AccountPageButtonComponent from "../accountPageButton/component";
import AccountPageInputComponent from "../accountPageInput/component";

function ListTableComponent(props) {

    return (
        <div className="list-table-container">
            <table className="list-table">
                <thead>
                <tr>
                    {props.thead.map((th, thIndex) => (
                        <th key={thIndex}>{th}</th>
                    ))}
                    <th>Управление</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <AccountPageInputComponent/>
                    </td>
                    <td>
                        <AccountPageInputComponent/>
                    </td>
                    <td>
                        <AccountPageInputComponent/>
                    </td>
                    <td>
                        <AccountPageButtonComponent title={"Поиск"}/>
                    </td>
                </tr>
                {props.contentType === NEWS && props.tbodyNews.map((tbody, tbodyIndex) => (
                    <tr key={tbodyIndex}>
                        <td>
                            {tbody.title}
                        </td>
                        <td>
                            {formatDate(tbody.createdAt)}
                        </td>
                        <td>
                            {tbody.uploadedBy}
                        </td>
                        <td>
                            <div className="list-table-change-up-button">
                                <AccountPageButtonComponent title={"Изменить"}/>
                            </div>
                            <AccountPageButtonComponent title={"Удалить"}/>
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
                            {tbody.uploadedBy}
                        </td>
                        <td>
                            <div className="list-table-change-up-button">
                                <AccountPageButtonComponent title={"Изменить"}/>
                            </div>
                            <AccountPageButtonComponent title={"Удалить"}/>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="4">
                        1 2 3 4 5
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ListTableComponent;
