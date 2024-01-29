import React from 'react';

import './style.css';
import news_list from '../../../state/news_list'

function OtherNewsComponent() {
    return (
        <div className="other-news-container">
            <div className="other-news-column-1">
                <h2 className="other-news-heading">Новости</h2>
                <div className="other-news-list">
                    {news_list.map((news, newsIndex) => (
                        <div className="other-news-item" key={newsIndex}>
                            <div className="other-news-card">
                                <div className="other-news-card-date">
                                    {news_list[newsIndex].date}
                                </div>
                                <div className="other-news-card-title">
                                    {news_list[newsIndex].title}
                                </div>
                                <img className="other-news-card-image"
                                     src={news_list[newsIndex].image_url}
                                     alt={"news_image_" + newsIndex}
                                />
                                <div className="other-news-card-content">
                                    {news_list[newsIndex].content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="other-news-column-2">
                <h2 className="other-news-heading">События</h2>
            </div>
        </div>
    )
}

export default OtherNewsComponent;