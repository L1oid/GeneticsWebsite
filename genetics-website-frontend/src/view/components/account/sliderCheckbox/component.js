import React from 'react';
import "./style.css"

function SliderCheckboxComponent(props) {

    return (
        <div className='slider-checkbox-container'>
            <label
                className="slider-checkbox-text"
                htmlFor='sliderCheckbox'>Для слайдера
            </label>
            <input
                className="slider-checkbox-input"
                type='checkbox'
                id='sliderCheckbox'
            />
        </div>
    )
}

export default SliderCheckboxComponent;