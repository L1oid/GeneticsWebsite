import React from 'react';
import {useNavigate} from "react-router-dom";

import './style.css';

import BreadcrumpComponent from "../../common/breadcrump/component";
import {formatDate} from "../../../../state/functions/formatDate";
import parse from "html-react-parser";

function ListContentComponent(props) {
    const navigate = useNavigate();

    const handleNavigateClick = (href) => {
        navigate(href);
    };

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: `/${props.type}`,
            name: props.titleType
        }
    ]

    const handleLoadMore = () => {
        if (props.contentList.length >= props.page) {
            props.setPage(props.page + 1);
        }
    };

    return (
        <div className="page-container">
            <div className="list-content-container">
                <BreadcrumpComponent ways={ways}/>
                <h2 className="list-content-heading">{props.titleType}</h2>
                <div className="list-content-container-row-1">
                    {props.contentList.length === 0 || (props.contentList.length === 1 && props.contentList[0].id === null) ? (
                        <div className="list-content-content-empty">
                            На данный момент контент отсутствует
                        </div>
                    ) : (
                        <div className="list-content-list">
                            {props.contentList.map((content, contentIndex) => (
                                <div className="list-content-item" key={contentIndex}>
                                    <div className="list-content-card"
                                         data-href={`/${props.type}/${content.id}`}
                                         onClick={(e) => handleNavigateClick(e.currentTarget.getAttribute('data-href'))}>
                                        <div className="list-content-card-date">
                                            {formatDate(content.createdAt)}
                                        </div>
                                        <div className="list-content-card-title">
                                            {content.title}
                                        </div>
                                        <img className="list-content-card-image"
                                             src={content.previewImage}
                                             alt={"content_image_" + contentIndex}
                                        />
                                        <div className="list-content-card-content">
                                            {parse(content.shortDesc)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="list-content-container-row-2">
                    <button className="list-content-load-more" onClick={handleLoadMore}>
                        Показать ещё
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListContentComponent;