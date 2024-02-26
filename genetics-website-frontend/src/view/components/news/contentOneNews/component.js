import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import parse from 'html-react-parser';

import './style.css';

import news_list from '../../../../back-end/news_list'

function ContentOneNewsComponent() {
    const {id} = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        function goToNext() {
            const isLastImage = currentIndex === news_list[id].image_url.length - 1;
            const newIndex = isLastImage ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
        }

        let interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    });

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? news_list[id].image_url.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastImage = currentIndex === news_list[id].image_url.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="page-container">
            <div className="news-content-container">
                <h1 className="news-content-heading">
                    {news_list[id].title}
                </h1>
                <h2 className="news-content-date">
                    {news_list[id].date}
                </h2>
                <p className="news-content-text">
                    {parse(news_list[id].content)}
                </p>
                <h2 className="news-content-count-images">
                    {currentIndex + 1}/{news_list[id].image_url.length}
                </h2>
                <div className="news-content-slider">
                    <div className="news-content-slider-left" onClick={goToPrevious}>
                        ❮
                    </div>
                    <div className="news-content-slider-right" onClick={goToNext}>
                        ❯
                    </div>
                    <img className="news-content-slider-image"
                         src={news_list[id].image_url[currentIndex]}
                         alt={"news_image_" + currentIndex}
                    />
                </div>
            </div>
        </div>
    )
}

export default ContentOneNewsComponent;