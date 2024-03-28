import React, {useEffect, useState} from 'react';
import parse from 'html-react-parser';

import './style.css';
import BreadcrumpComponent from "../../common/breadcrump/component";

function ContentOneNewsComponent(props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        function goToNext() {
            const isLastImage = currentIndex === props.images.length - 1;
            const newIndex = isLastImage ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
        }

        let interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    });

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? props.images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastImage = currentIndex === props.images.length - 1;
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
            link: "/news/" + props.id,
            name: props.title
        },
    ]

    return (
        <div className="page-container">
            <div className="news-content-container">
                <BreadcrumpComponent ways={ways}/>
                <h1 className="news-content-heading">
                    {props.title}
                </h1>
                <h2 className="news-content-date">
                    {props.date}
                </h2>
                <div className="news-content-text">
                    {parse(props.content)}
                </div>
                {props.images.length !== 0 && (
                    <div>
                        <h2 className="news-content-count-images">
                            {currentIndex + 1}/{props.images.length}
                        </h2>
                        <div className="news-content-slider">
                    <span className="material-symbols-outlined news-content-slider-left"
                          onClick={goToPrevious}>chevron_left</span>
                            <span className="material-symbols-outlined news-content-slider-right"
                                  onClick={goToNext}>chevron_right</span>
                            <img className="news-content-slider-image"
                                 src={props.images[currentIndex]}
                                 alt={"news_image_" + currentIndex}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ContentOneNewsComponent;