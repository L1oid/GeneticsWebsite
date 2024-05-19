import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import "./style.css"

function TextEditorComponent(props) {

    const modules = {
        toolbar: [
            ["bold", "italic", "underline"],
            [
                {list: "ordered"},
                {list: "bullet"},
            ],
            ["link"]
        ]
    }

    return (
        <div className="text-editor">
            <ReactQuill
                className="editor-input"
                theme="snow"
                value={props.value}
                onChange={props.setValue}
                modules={modules}/>
        </div>
    );
}

export default TextEditorComponent;
