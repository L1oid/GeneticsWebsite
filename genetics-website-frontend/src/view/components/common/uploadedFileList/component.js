import React from 'react';
import './style.css';
import FileLoaderComponent from "../fileLoader/component";
import {acceptedFileTypes} from "../../../../state/consts/fileExtensions";

function UploadedFileListComponent(props) {
    return (
        <div className="file-list-container">
            {props.files.map((file, fileIndex) => (
                <div className="file-list-item" key={fileIndex}>
                    <div className="file-list-item-wrapper">
                        {file.type.startsWith("video/") &&
                            <span className="material-symbols-outlined upload-file-icon">video_file</span>
                        }
                        {file.type.startsWith("application/") &&
                            <span className="material-symbols-outlined upload-file-icon">description</span>
                        }
                        {file.type.startsWith("text/") &&
                            <span className="material-symbols-outlined upload-file-icon">description</span>
                        }
                        {file.type.startsWith("audio/") &&
                            <span className="material-symbols-outlined upload-file-icon">audio_file</span>
                        }
                        {file.type.startsWith("image/") &&
                            <span className="material-symbols-outlined upload-file-icon">image</span>
                        }
                    </div>
                    <p className="file-list-item-file-name">{file.name}</p>
                    <button
                        className="file-list-item-close-button"
                        onClick={() => props.handleFileDelete(fileIndex)}>
                        <span className="material-symbols-outlined close-file">close</span>
                    </button>
                </div>
            ))}
            {props.files.length < 11 && (
                <FileLoaderComponent
                    handleUploadFile={props.handleUploadFile}
                    accept={acceptedFileTypes}
                    inputId={props.inputId}
                />
            )}
        </div>
    );
}

export default UploadedFileListComponent;
