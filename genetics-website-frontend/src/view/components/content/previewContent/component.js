import React, {useEffect, useState} from 'react';
import parse from 'html-react-parser';

import './style.css';
import {useSelector} from "react-redux";

function PreviewContentComponent(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const previewContent = useSelector(state => state.content.previewContent)

    useEffect(() => {
        if (currentIndex >= props.images.length && props.images.length > 0) {
            setCurrentIndex(props.images.length - 1);
        }
    }, [props.images, currentIndex]);

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

    return (
        <div className="preview-content-container">
            <h1 className="single-content-heading preview-content-padding">
                {previewContent.title === "" ? "Заголовок" : previewContent.title}
            </h1>
            <h2 className="single-content-date preview-content-padding">
                {new Date().toLocaleDateString()}
            </h2>
            <div className="single-content-text preview-content-padding">
                {previewContent.text === "<p><br></p>" ? "Содержание" : parse(previewContent.text)}
            </div>
            {props.images.length !== 0 && (
                <div>
                    <h2 className="single-content-count-images preview-content-padding">
                        {currentIndex + 1}/{props.images.length}
                    </h2>
                    <div className="single-content-slider preview-content-padding">
                    <span className="material-symbols-outlined single-content-slider-left"
                          onClick={goToPrevious}>chevron_left</span>
                        <span className="material-symbols-outlined single-content-slider-right"
                              onClick={goToNext}>chevron_right</span>
                        <img className="single-content-slider-image"
                             src={props.images[currentIndex]}
                             alt={"content_image_" + currentIndex}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default PreviewContentComponent;