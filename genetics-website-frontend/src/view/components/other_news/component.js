import React from 'react';

import './style.css';

function OtherNewsComponent() {
    const news_list = [
        {
            url: "http://localhost:3000/slide1.jpg",
            title: "Генетики Кузбасса открыли новый ген у птицы",
            date: "20.01.2024",
            content: "Новый ген предоставил науке новые возможности для развития исследований рыб"
        },
        {
            url: "http://localhost:3000/slide2.jpg",
            title: "Генетики Кузбасса открыли новый ген у человека",
            date: "21.01.2024",
            content: "Новый ген предоставил науке новые возможности для развития исследований людей"
        }
    ]

    return (
        <div className="other-news-container">
            <div className="other-news-column-1">
                <h2 className="other-news-heading">Новости</h2>
                <div className="other-news-list">
                    {news_list.map((news, newsIndex) => (
                        <div className="other-news-item" key={newsIndex}>
                            <div className="other-news-card">
                                {news_list[newsIndex].date}
                                <br/>
                                {news_list[newsIndex].title}
                                <br/>
                                {news_list[newsIndex].content}
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