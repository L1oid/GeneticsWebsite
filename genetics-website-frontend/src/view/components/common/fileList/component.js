import React from "react";

import "./style.css"
import AccountPageSubtitleComponent from "../accountPageSubtitle/component";
import {AUDIO, DOCUMENT, IMAGE, TEXT, VIDEO} from "../../../../state/consts/contentTypes";

function FileListComponent(props) {
    return (
        <div className="file-list">
            {props.files.length > 0 && (
                <div>
                    <AccountPageSubtitleComponent
                        title={"Прилагаемые файлы"}
                    />
                    {props.files.map((file, fileIndex) => (
                        <div className="file-list-item" key={fileIndex}>
                            {file.mediaType === VIDEO && <span className="material-symbols-outlined icon">video_file</span>}
                            {file.mediaType === DOCUMENT && <span className="material-symbols-outlined icon">description</span>}
                            {file.mediaType === TEXT && <span className="material-symbols-outlined icon">description</span>}
                            {file.mediaType === AUDIO && <span className="material-symbols-outlined icon">audio_file</span>}
                            {file.mediaType === IMAGE && <span className="material-symbols-outlined icon">image</span>}
                            <a href={file.url} className="file-list-item-name">{file.fileName}</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FileListComponent;