import React, {useEffect, useState} from 'react';

import "./style.css"
import news_list from '../../../back-end/news_list'
import {Link} from "react-router-dom";

function SliderNewsComponent() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeDot, setActiveDot] = useState(0);

    const slideStyles = {
        backgroundImage: `url(${news_list[currentIndex].slide_url})`
    }

    useEffect(() => {
        function goToNext() {
            const isLastSlide = currentIndex === news_list.length - 1;
            const newIndex = isLastSlide ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
            setActiveDot(newIndex);
        }

        let interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    });

    function goToSlide(slideIndex) {
        setCurrentIndex(slideIndex);
        setActiveDot(slideIndex);
    }

    return (
        <div className="slider-container">
            <div className="slider">
                <div className="slide" style={slideStyles}></div>
                <div className="dots-container">
                    {news_list.map((slide, slideIndex) => (
                        <div className={`dot ${activeDot === slideIndex ? 'active' : ''}`}
                             key={slideIndex}
                             onClick={() => goToSlide(slideIndex)}>
                        </div>
                    ))}
                </div>
                <div className="slide-plate">
                    <div className="slide-header">
                        {news_list[currentIndex].title}
                    </div>
                    <div className="slide-footer">
                        <Link className="slide-button" to={`/news/${news_list[currentIndex].id}`}>Подробнее</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderNewsComponent;