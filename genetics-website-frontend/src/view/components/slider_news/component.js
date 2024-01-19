import React, {useState} from 'react';

import "./style.css"

function SliderNewsComponent() {
    const slides = [
        {url: "http://localhost:3000/slide1.jpg", title: "ГЕНЕТИКИ КУЗБАССА ОТКРЫЛИ НОВЫЙ ГЕН У ПТИЦЫ"},
        {url: "http://localhost:3000/slide2.jpg", title: "ГЕНЕТИКИ КУЗБАССА ОТКРЫЛИ НОВЫЙ ГЕН У ЧЕЛОВАКА"},
        {url: "http://localhost:3000/slide3.jpg", title: "ГЕНЕТИКИ КУЗБАССА ОТКРЫЛИ НОВЫЙ ГЕН У РЫБЫ"}
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeDot, setActiveDot] = useState(0);

    const slideStyles = {
        backgroundImage: `url(${slides[currentIndex].url})`
    }

    function goToPrev() {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setActiveDot(newIndex);
    }

    function goToNext() {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setActiveDot(newIndex);
    }

    function goToSlide(slideIndex) {
        setCurrentIndex(slideIndex);
        setActiveDot(slideIndex);
    }

    return (
        <div className="container">
            <div className="slider">
                <div className="left-arrow" onClick={goToPrev}>❰</div>
                <div className="right-arrow" onClick={goToNext}>❱</div>
                <div className="slide" style={slideStyles}></div>
                <div className="dots-container">
                    {slides.map((slide, slideIndex) => (
                        <div className={`dot ${activeDot === slideIndex ? 'active' : ''}`}
                             key={slideIndex}
                             onClick={() => goToSlide(slideIndex)}>
                        </div>
                    ))}
                </div>
                <div className="slide-plate">
                    <div className="slide-header">
                        {slides[currentIndex].title}
                    </div>
                    <div className="slide-footer">
                        <button className="slide-button">Подробнее</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderNewsComponent;