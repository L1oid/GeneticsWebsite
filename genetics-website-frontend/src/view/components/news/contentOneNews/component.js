import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import parse from 'html-react-parser';

import './style.css';
import BreadcrumpComponent from "../../common/breadcrump/component";

import news_list from '../../../../data/news_list'

function ContentOneNewsComponent(props) {
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

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: "/news",
            name: "Новости"
        },
        {
            link: "/news/" + id,
            name: news_list[id].title
        },
    ]

    return (
        <div className="page-container">
            <div className="news-content-container">
                <BreadcrumpComponent ways={ways}/>
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
                    <span className="material-symbols-outlined news-content-slider-left"
                          onClick={goToPrevious}>chevron_left</span>
                    <span className="material-symbols-outlined news-content-slider-right"
                          onClick={goToNext}>chevron_right</span>
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