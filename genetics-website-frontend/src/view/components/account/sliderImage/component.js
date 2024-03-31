import React from 'react';
import './style.css';
import SliderImageLoaderComponent from "../silderImageLoader/component";

function SliderImageComponent(props) {

    return (
        <div className="image-list-container">
            {props.sliderImage !== null && (
                <div className="image-list-item-wrapper for-slider">
                    <img
                        src={URL.createObjectURL(props.sliderImage)}
                        alt={"slider_image"}
                        className="image-list-item"
                    />
                    <button
                        className="image-list-item-close-button"
                        onClick={props.handleSliderImageDelete}>
                        <span className="material-symbols-outlined close-image">close</span>
                    </button>
                </div>
            )}
            {props.sliderImage === null && (
                <SliderImageLoaderComponent handleSliderImage={props.handleSliderImageChange} accept={"image/*"}/>
            )}
        </div>
    );
}

export default SliderImageComponent;