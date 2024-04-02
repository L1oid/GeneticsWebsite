import React from 'react';
import './style.css';
import FileLoaderComponent from "../fileLoader/component";
import {useSelector} from "react-redux";

function ImageListComponent(props) {

    const forSlider = useSelector(state => state.content.previewContent.forSlider)

    return (
        <div className="image-list-container">
            {forSlider === true && props.sliderImage === null && (
                <div className="image-list-item-wrapper">
                    <div className="title-image-temp"></div>
                    <span className="title-image-label">Слайдер</span>
                </div>
            )}
            {props.sliderImage !== null && (
                <div className="image-list-item-wrapper">
                    <img
                        src={URL.createObjectURL(props.sliderImage)}
                        alt={"slider_image"}
                        className="image-list-item"
                    />
                    <span className="title-image-label">Слайдер</span>
                    <button
                        className="image-list-item-close-button"
                        onClick={props.handleSliderImageDelete}>
                        <span className="material-symbols-outlined close-image">close</span>
                    </button>
                </div>
            )}
            {props.images.length === 0 && (
                <div className="image-list-item-wrapper">
                    <div className="title-image-temp"></div>
                    <span className="title-image-label">Титульное</span>
                </div>
            )}
            {props.images.map((image, imageIndex) => (
                <div key={imageIndex} className="image-list-item-wrapper">
                    <img
                        src={URL.createObjectURL(image)}
                        alt={"image_" + imageIndex}
                        className="image-list-item"
                    />
                    {imageIndex === 0 && <span className="title-image-label">Титульное</span>}
                    <button
                        className="image-list-item-close-button"
                        onClick={() => props.handleImageDelete(imageIndex)}>
                        <span className="material-symbols-outlined close-image">close</span>
                    </button>
                </div>
            ))}
            <FileLoaderComponent handleImage={props.handleImageChange} accept={"image/*"}/>
            <span className={props.warningVisible === true ? "image-list-warning visible" : "image-list-warning"}>
                <p className="image-list-warning-text">{props.imageWarning}</p>
            </span>
        </div>
    );
}

export default ImageListComponent;