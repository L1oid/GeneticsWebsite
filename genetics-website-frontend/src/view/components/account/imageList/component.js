import React from 'react';

import './style.css';
import FileLoaderComponent from "../fileLoader/component";

function ImageListComponent(props) {

    return (
        <div className="image-list-container">
            {props.images.map((image, imageIndex) => (
                <img
                    key={imageIndex}
                    src={URL.createObjectURL(image)}
                    alt={"image_" + imageIndex}
                    className="image-list-item"
                />
            ))}
            <FileLoaderComponent handle={props.handle} accept={"image/*"}/>
        </div>
    )
}

export default ImageListComponent;
