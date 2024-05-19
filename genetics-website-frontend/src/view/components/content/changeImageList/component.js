import React from 'react';
import './style.css';
import FileLoaderComponent from "../../common/fileLoader/component";

function ChangeImageListComponent(props) {
    return (
        <div className="image-list-container">
            {props.oldPreviewImage !== null && (
                <div className="image-list-item-wrapper">
                    <img
                        src={props.oldPreviewImage}
                        alt={"old_preview_image"}
                        className="image-list-item"
                    />
                    <span className="title-image-label">Титульное</span>
                    <button
                        className="image-list-item-close-button"
                        onClick={props.handleOldPreviewImageDelete}>
                        <span className="material-symbols-outlined close-image">close</span>
                    </button>
                </div>
            )}
            {props.previewImage == null && props.oldPreviewImage == null && (
                <div className="image-list-item-wrapper">
                    <div className="title-image-temp"></div>
                    <span className="title-image-label">Титульное</span>
                </div>
            )}
            {props.previewImage !== null && (
                <div className="image-list-item-wrapper">
                    <img
                        src={URL.createObjectURL(props.previewImage)}
                        alt={"preview_image"}
                        className="image-list-item"
                    />
                    <span className="title-image-label">Титульное</span>
                    <button
                        className="image-list-item-close-button"
                        onClick={props.handlePreviewImageDelete}>
                        <span className="material-symbols-outlined close-image">close</span>
                    </button>
                </div>
            )}
            {props.oldImages.map((image, imageIndex) => (
                <div key={imageIndex} className="image-list-item-wrapper">
                    <img
                        src={image}
                        alt={"image_" + imageIndex}
                        className="image-list-item"
                    />
                    <button
                        className="image-list-item-close-button"
                        onClick={() => props.handleOldImageDelete(imageIndex)}>
                        <span className="material-symbols-outlined close-image">close</span>
                    </button>
                </div>
            ))}
            {props.images.map((image, imageIndex) => (
                <div key={imageIndex} className="image-list-item-wrapper">
                    <img
                        src={URL.createObjectURL(image)}
                        alt={"image_" + imageIndex}
                        className="image-list-item"
                    />
                    <button
                        className="image-list-item-close-button"
                        onClick={() => props.handleImageDelete(imageIndex)}>
                        <span className="material-symbols-outlined close-image">close</span>
                    </button>
                </div>
            ))}
            {(props.images.length + props.oldImages.length + (props.previewImage ? 1 : 0) + (props.oldPreviewImage ? 1 : 0) < 11) && (
                <FileLoaderComponent handleImage={props.handleImageChange} accept={"image/jpeg, image/png"}/>
            )}
            <span className={props.warningVisible === true ? "image-list-warning visible" : "image-list-warning"}>
                <p className="image-list-warning-text">{props.imageWarning}</p>
            </span>
        </div>
    );
}

export default ChangeImageListComponent;