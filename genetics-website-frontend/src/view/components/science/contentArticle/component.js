import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import parse from 'html-react-parser';

import './style.css';
import BreadcrumpComponent from "../../common/breadcrump/component";

import articles_list from "../../../../data/articles_list";

function ContentArticleComponent(props) {
    const {id} = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        function goToNext() {
            const isLastImage = currentIndex === articles_list[id].image_url.length - 1;
            const newIndex = isLastImage ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
        }

        let interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    });

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? articles_list[id].image_url.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastImage = currentIndex === articles_list[id].image_url.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const ways = [
        {
            link: "/",
            name: "Главная"
        },
        {
            link: "/science",
            name: "Наука"
        },
        {
            link: "/science/" + id,
            name: articles_list[id].title
        },
    ]

    return (
        <div className="page-container">
            <div className="article-content-container">
                <BreadcrumpComponent ways={ways}/>
                <h1 className="article-content-heading">
                    {articles_list[id].title}
                </h1>
                <h2 className="article-content-date">
                    {articles_list[id].date}
                </h2>
                <p className="article-content-text">
                    {parse(articles_list[id].content)}
                </p>
                <h2 className="article-content-count-images">
                    {currentIndex + 1}/{articles_list[id].image_url.length}
                </h2>
                <div className="article-content-slider">
                    <span className="material-symbols-outlined article-content-slider-left"
                          onClick={goToPrevious}>chevron_left</span>
                    <span className="material-symbols-outlined article-content-slider-right"
                          onClick={goToNext}>chevron_right</span>
                    <img className="article-content-slider-image"
                         src={articles_list[id].image_url[currentIndex]}
                         alt={"article_image_" + currentIndex}
                    />
                </div>
            </div>
        </div>
    )
}

export default ContentArticleComponent;