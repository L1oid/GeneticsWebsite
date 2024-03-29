import React from 'react';
import './style.css';
import FileLoaderComponent from "../fileLoader/component";
import {useSelector} from "react-redux";

function ImageListComponent(props) {

    const forSlider = useSelector(state => state.content.previewContent.forSlider)

    return (
        <div className="image-list-container">
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
            <FileLoaderComponent handle={props.handleImageChange} accept={"image/*"} />
        </div>
    );
}

export default ImageListComponent;