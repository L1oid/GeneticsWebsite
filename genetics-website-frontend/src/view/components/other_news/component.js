import React from 'react';

import './style.css';
import {Link, useNavigate} from "react-router-dom";

import news_list from '../../../state/news_list'
import events_list from '../../../state/events_list'

function OtherNewsComponent() {

    const navigate = useNavigate();

    const handleNavigateClick = (href) => {
        navigate(href);
    };

    return (
        <div className="other-news-container">
            <div className="other-news-container-row-1">
                <div className="other-news-column-1">
                    <h2 className="other-news-heading">Новости</h2>
                    <div className="other-news-list">
                        {news_list.map((news, newsIndex) => (
                            <div className="other-news-item" key={newsIndex}>
                                <div className="other-news-card"
                                     data-href={`/news/${news_list[newsIndex].id}`}
                                     onClick={(e) => handleNavigateClick(e.currentTarget.getAttribute('data-href'))}>
                                    <div className="other-news-card-date">
                                        {news_list[newsIndex].date}
                                    </div>
                                    <div className="other-news-card-title">
                                        {news_list[newsIndex].title}
                                    </div>
                                    <img className="other-news-card-image"
                                         src={news_list[newsIndex].image_url[0]}
                                         alt={"news_image_" + newsIndex}
                                    />
                                    <div className="other-news-card-content">
                                        {news_list[newsIndex].short_content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="other-news-column-2">
                    <h2 className="other-news-heading">События</h2>
                    <div className="other-news-events-list">
                        {events_list.map((event, eventIndex) => (
                            <div className="event-item" key={eventIndex}>
                                <div className="event-card">
                                    <div className="event-card-title">
                                        {events_list[eventIndex].title}
                                    </div>
                                    <div className="event-card-date">
                                        {events_list[eventIndex].date}
                                    </div>
                                    <div className="event-card-time">
                                        {events_list[eventIndex].time}
                                    </div>
                                    <div className="event-card-content">
                                        {events_list[eventIndex].content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="other-news-container-row-2">
                <Link className="other-news-load-more" to="/">
                    Показать ещё
                </Link>
            </div>
        </div>
    )
}

export default OtherNewsComponent;