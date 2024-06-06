import React from 'react';

import './style.css';

function ImageLoaderComponent(props) {

    return (
        <div className="image-loader-container">
            <label htmlFor="image-upload" className="image-loader-label">
                <span className="material-symbols-outlined image-loader-icon">photo_camera</span>
            </label>
            <input className="image-loader-input"
                   id="image-upload"
                   type="file"
                   accept={props.accept}
                   onChange={e => props.handleImage(e.target.files[0])}
                   onClick={(e)=> {e.target.value = null}}
            />
        </div>
    )
}

export default ImageLoaderComponent;
