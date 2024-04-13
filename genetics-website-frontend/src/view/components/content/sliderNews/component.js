import React, {useEffect, useState} from 'react';

import "./style.css"
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function SliderNewsComponent() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeDot, setActiveDot] = useState(0);

    const navigate = useNavigate();
    const contentListSlider = useSelector(state => state.content.contentListSlider);

    const slideStyles = {
        backgroundImage: `url(${contentListSlider[currentIndex].sliderImage})`
    }

    useEffect(() => {
        function goToNext() {
            const isLastSlide = currentIndex === contentListSlider.length - 1;
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

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? contentListSlider.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setActiveDot(newIndex);
    };
    const goToNext = () => {
        const isLastImage = currentIndex === contentListSlider.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setActiveDot(newIndex);
    };

    const handleNavigateClick = (href) => {
        navigate(href);
    };

    return (
        <div className="slider-container">
            <div className="slider">
                <div className="slide" style={slideStyles}></div>
                <div className="dots-container">
                    {contentListSlider.map((slide, slideIndex) => (
                        <div className={`dot ${activeDot === slideIndex ? 'active' : ''}`}
                             key={slideIndex}
                             onClick={() => goToSlide(slideIndex)}>
                        </div>
                    ))}
                </div>
                <span className="material-symbols-outlined slider-news-left"
                      onClick={goToPrevious}>chevron_left</span>
                <span className="material-symbols-outlined slider-news-right"
                      onClick={goToNext}>chevron_right</span>
                <div className="slide-plate">
                    <div className="slide-header">
                        {contentListSlider[currentIndex].title}
                    </div>
                    <div className="slide-footer">
                        <button
                            className="slide-button"
                            data-href={`/news/${contentListSlider[currentIndex].id}`}
                            onClick={(e) => handleNavigateClick(e.currentTarget.getAttribute('data-href'))}
                            disabled={true}>
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderNewsComponent;