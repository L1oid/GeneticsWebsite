import React from 'react';

import './style.css';

function SliderImageLoaderComponent(props) {

    return (
        <div className="file-loader-container for-slider">
            <label htmlFor="file-upload" className="file-loader-label">
                <span className="material-symbols-outlined file-loader-icon">photo_camera</span>
            </label>
            <input className="file-loader-input"
                   id="file-upload"
                   type="file"
                   accept={props.accept}
                   onChange={e => props.handleSliderImage(e.target.files[0])}
            />
        </div>
    )
}

export default SliderImageLoaderComponent;
