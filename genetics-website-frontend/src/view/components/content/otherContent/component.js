import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import parse from 'html-react-parser';

import './style.css';

import {fetchContent} from "../../../../state/slices/content/asyncActions";
import {NEWS} from "../../../../state/consts/contentTypes";
import {formatDate} from "../../../../state/functions/formatDate";

function OtherContentComponent() {

    const navigate = useNavigate();
    const contentList = useSelector(state => state.content.newsList);
    const eventList = useSelector(state => state.content.eventList);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(6);

    useEffect(() => {
        dispatch(fetchContent({ type: NEWS, amount: amount }));
    }, [amount, dispatch])


    const handleNavigateClick = (href) => {
        navigate(href);
    };

    const handleLoadMore = () => {
        if (contentList.length >= amount) {
            setAmount(amount + 6);
        }
    };

    return (
        <div className="page-container">
            <div className="other-content-container-row-1">
                <div className="other-content-column-1">
                    <h2 className="other-content-heading">Новости</h2>
                    {contentList.length === 0 || (contentList.length === 1 && contentList[0].id === null) ? (
                        <div className="other-content-content-empty">
                            На данный момент новости отсутствуют
                        </div>
                    ) : (
                        <div className="other-content-list">
                            {contentList.map((content, contentIndex) => (
                                <div className="other-content-item" key={contentIndex}>
                                    <div className="other-content-card"
                                         data-href={`/news/${content.id}`}
                                         onClick={(e) => handleNavigateClick(e.currentTarget.getAttribute('data-href'))}>
                                        <div className="other-content-card-date">
                                            {formatDate(content.createdAt)}
                                        </div>
                                        <div className="other-content-card-title">
                                            {content.title}
                                        </div>
                                        <img className="other-content-card-image"
                                             src={content.previewImage}
                                             alt={"content_image_" + contentIndex}
                                        />
                                        <div className="other-content-card-content">
                                            {parse(content.shortDesc)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="other-content-container-row-3">
                    <button className="other-content-load-more" onClick={handleLoadMore}>
                        Показать ещё
                    </button>
                </div>
                <div className="other-content-column-2">
                    <h2 className="other-content-heading">События</h2>
                    {eventList.length > 0 ? (
                        <div className="other-content-events-list">
                            {eventList.map((event, eventIndex) => (
                                <div className="event-item" key={eventIndex}>
                                    <div className="event-card">
                                        <div className="event-card-title">
                                            {eventList[eventIndex].title}
                                        </div>
                                        <div className="event-card-date">
                                            {eventList[eventIndex].date}
                                        </div>
                                        <div className="event-card-time">
                                            {eventList[eventIndex].time}
                                        </div>
                                        <div className="event-card-content">
                                            {eventList[eventIndex].content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="other-content-content-empty">
                            На данный момент ближайшие события отсутствуют
                        </div>
                    )}
                </div>
            </div>
            <div className="other-content-container-row-2">
                <button className="other-content-load-more" onClick={handleLoadMore}>
                    Показать ещё
                </button>
            </div>
        </div>
    )
}

export default OtherContentComponent;