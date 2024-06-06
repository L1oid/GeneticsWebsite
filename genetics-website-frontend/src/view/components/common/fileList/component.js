import React from "react";

import "./style.css"
import AccountPageSubtitleComponent from "../accountPageSubtitle/component";
import {DOCUMENT, VIDEO} from "../../../../state/consts/contentTypes";

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
                            {file.type === VIDEO && <span className="material-symbols-outlined icon">video_file</span>}
                            {file.type === DOCUMENT && <span className="material-symbols-outlined icon">description</span>}
                            <a href={file.url} className="file-list-item-name">{file.name}</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FileListComponent;