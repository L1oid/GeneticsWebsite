import React from 'react';
import './style.css';

function FileLoaderComponent(props) {
    return (
        <div className="file-loader-container">
            <label htmlFor={props.inputId} className="file-loader-label">
                <span className="material-symbols-outlined file-loader-icon">note_add</span>
            </label>
            <input className="file-loader-input"
                   id={props.inputId}
                   type="file"
                   accept={props.accept}
                   onChange={e => props.handleUploadFile(e.target.files[0])}
                   onClick={(e)=> {e.target.value = null}}
            />
        </div>
    )
}

export default FileLoaderComponent;
