import React, { useState } from 'react';

import './style.css';
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import parse from "html-react-parser";
import FileListComponent from "../../common/fileList/component";

function CourseContainerComponent(props) {
    const initialOpenChapters = props.course.chapters.reduce((acc, chapter, index) => {
        acc[index] = true;
        return acc;
    }, {});

    const [openChapters, setOpenChapters] = useState(initialOpenChapters);

    const sortedChapters = [...props.course.chapters].sort((a, b) => a.orderNumber - b.orderNumber);

    const toggleChapter = (index) => {
        setOpenChapters((prevOpenChapters) => ({
            ...prevOpenChapters,
            [index]: !prevOpenChapters[index],
        }));
    };

    return (
        <div className="course-container">
            <div className="course-container-container-row-1">
                <AccountPageTitleComponent
                    title={props.course.title}/>
            </div>
            <div className="course-container-container-row-2">
                <div className="course-container-description">
                    {parse(props.course.description)}
                </div>
                <FileListComponent
                    files={props.course.files}
                />
            </div>
            {sortedChapters.length > 0 && (
                <div className="course-container-container-row-3">
                    {sortedChapters.map((chapter, chapterIndex) => (
                        <div key={chapterIndex} className="course-container-chapter">
                            {openChapters[chapterIndex] ? (
                                <p className="course-container-chapter-title" onClick={() => toggleChapter(chapterIndex)}>
                                    {chapter.title}
                                    <span className="material-symbols-outlined">keyboard_arrow_up</span>
                                </p>
                            ) : (
                                <p className="course-container-chapter-title" onClick={() => toggleChapter(chapterIndex)}>
                                    {chapter.title}
                                    <span className="material-symbols-outlined">keyboard_arrow_down</span>
                                </p>
                            )}
                            {openChapters[chapterIndex] && (
                                <div className="course-container-chapter-content">
                                    <div className="course-container-description">
                                        {parse(chapter.description)}
                                    </div>
                                    <div className="course-container-file-list">
                                        <FileListComponent
                                            files={chapter.files}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CourseContainerComponent;
