import React, {useEffect, useState} from 'react';
import './style.css';
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import ValuesSelectorComponent from "../../common/valuesSelector/component";
import AccountPageInputComponent from "../../common/accountPageInput/component";
import TextEditorComponent from "../../common/textEditor/component";
import UploadedFileListComponent from "../../common/uploadedFileList/component";
import AccountPageButtonComponent from "../../common/accountPageButton/component";
import ErrorAndSuccessWindowComponent from "../../common/errorAndSuccessWindow/component";
import {useDispatch, useSelector} from "react-redux";
import {courseCreation} from "../../../../state/slices/content/asyncActions";

function CreateCourseContainerComponent(props) {

    const { error, success, status } = useSelector(state => state.content);
    const dispatch = useDispatch();

    const [course, setCourse] = useState({
        accessible: false,
        title: "",
        description: "",
        chapters: [],
        files: []
    });

    const createNewChapter = (orderNumber) => ({
        title: "",
        orderNumber: orderNumber,
        description: "",
        files: []
    });

    const addChapter = () => {
        setCourse(prevCourse => ({
            ...prevCourse,
            chapters: [...prevCourse.chapters, createNewChapter(course.chapters.length + 1)]
        }));
    };

    const deleteChapter = (chapterIndex) => {
        setCourse(prevCourse => {
            const updatedChapters = prevCourse.chapters
                .filter((_, index) => index !== chapterIndex)
                .map((chapter, index) => ({ ...chapter, orderNumber: index + 1 }));

            return {
                ...prevCourse,
                chapters: updatedChapters
            };
        });
    };

    const handleTypeChange = (event) => {
        const value = event.target.value === 'true';
        setCourse(prevCourse => ({
            ...prevCourse,
            accessible: value
        }));
    };

    const handleTitleChange = (event) => {
        setCourse(prevCourse => ({
            ...prevCourse,
            title: event.target.value
        }));
    };

    const handleDescriptionChange = (value) => {
        setCourse(prevCourse => ({
            ...prevCourse,
            description: value
        }));
    };

    const handleUploadFile = (file) => {
        if (file === undefined) {
            return;
        }
        const fileType = file.type;
        const fileName = file.name;
        const newFile = {
            type: fileType,
            name: fileName,
            file: file
        };
        setCourse(prevCourse => ({
            ...prevCourse,
            files: [...prevCourse.files, newFile]
        }));
    };

    const handleFileDelete = (index) => {
        setCourse(prevCourse => ({
            ...prevCourse,
            files: prevCourse.files.filter((_, i) => i !== index)
        }));
    };

    const handleChapterTitleChange = (event, chapterIndex) => {
        const newTitle = event.target.value;
        setCourse(prevCourse => {
            const updatedChapters = prevCourse.chapters.map((chapter, index) => {
                if (index === chapterIndex) {
                    return { ...chapter, title: newTitle };
                }
                return chapter;
            });

            return {
                ...prevCourse,
                chapters: updatedChapters
            };
        });
    };

    const handleChapterDescriptionChange = (value, chapterIndex) => {
        setCourse(prevCourse => {
            const updatedChapters = prevCourse.chapters.map((chapter, index) => {
                if (index === chapterIndex) {
                    return { ...chapter, description: value };
                }
                return chapter;
            });

            return {
                ...prevCourse,
                chapters: updatedChapters
            };
        });
    };

    const handleUploadChapterFile = (file, chapterIndex) => {
        if (file === undefined) {
            return;
        }
        const fileType = file.type;
        const fileName = file.name;
        const newFile = {
            type: fileType,
            name: fileName,
            file: file
        };
        setCourse(prevCourse => {
            const updatedChapters = prevCourse.chapters.map((chapter, index) => {
                if (index === chapterIndex) {
                    return {
                        ...chapter,
                        files: [...chapter.files, newFile]
                    };
                }
                return chapter;
            });

            return {
                ...prevCourse,
                chapters: updatedChapters
            };
        });
    };

    const handleChapterFileDelete = (fileIndex, chapterIndex) => {
        setCourse(prevCourse => {
            const updatedChapters = prevCourse.chapters.map((chapter, index) => {
                if (index === chapterIndex) {
                    return {
                        ...chapter,
                        files: chapter.files.filter((_, i) => i !== fileIndex)
                    };
                }
                return chapter;
            });

            return {
                ...prevCourse,
                chapters: updatedChapters
            };
        });
    };

    const handleConfirmButton = () => {
        dispatch(courseCreation(course));
    };

    return (
        <div className="create-course-container">
            <div className="create-course-container-row-1">
                <AccountPageTitleComponent
                    title="Создание курса"/>
            </div>
            <div className="create-course-container-row-2">
                <AccountPageSubtitleComponent
                    title={"Тип"}/>
                <div className="create-course-title-input">
                    <ValuesSelectorComponent
                        handle={handleTypeChange}
                        value={course.accessible}
                        optionValueOne="false"
                        titleSelectOne="Общедоступный"
                        optionValueTwo="true"
                        titleSelectTwo="Для студентов"
                    />
                </div>
                <AccountPageSubtitleComponent
                    title={"Название *"}/>
                <div className="create-course-title-input">
                    <AccountPageInputComponent
                        type="text"
                        value={course.title}
                        handle={handleTitleChange}
                        disabled={false}/>
                </div>
                <AccountPageSubtitleComponent
                    title={"Описание *"}/>
                <TextEditorComponent
                    value={course.description}
                    setValue={handleDescriptionChange}/>
                <AccountPageSubtitleComponent
                    title={"Прилагаемые файлы"}/>
                <UploadedFileListComponent
                    files={course.files}
                    handleUploadFile={handleUploadFile}
                    handleFileDelete={handleFileDelete}
                    inputId="course-files-upload"
                />
                <AccountPageSubtitleComponent
                    title={"Главы"}/>
                {course.chapters.map((chapter, chapterIndex) => (
                    <div className="create-course-chapter-container" key={chapterIndex}>
                        <div className="create-course-chapter-title-panel">
                            <AccountPageSubtitleComponent
                                title={"Название *"}/>
                            <button
                                className="create-course-chapter-remove-answer-button"
                                onClick={() => deleteChapter(chapterIndex)}>
                                <span className="material-symbols-outlined remove">close</span>
                            </button>
                        </div>
                        <div className="create-course-title-input">
                            <AccountPageInputComponent
                                type="text"
                                value={course.chapters[chapterIndex].title || ""}
                                handle={(event) => handleChapterTitleChange(event, chapterIndex)}
                                disabled={false}/>
                        </div>
                        <AccountPageSubtitleComponent
                            title={"Описание *"}/>
                        <TextEditorComponent
                            value={course.chapters[chapterIndex].description || ""}
                            setValue={(value) => handleChapterDescriptionChange(value, chapterIndex)}/>
                        <AccountPageSubtitleComponent
                            title={"Прилагаемые файлы"}/>
                        <UploadedFileListComponent
                            files={course.chapters[chapterIndex].files || []}
                            handleUploadFile={(file) => handleUploadChapterFile(file, chapterIndex)}
                            handleFileDelete={(fileIndex) => handleChapterFileDelete(fileIndex, chapterIndex)}
                            inputId={`chapter-files-upload-${chapterIndex}`}
                        />
                    </div>
                ))}
                <button className="plus-course-chapter-button"
                        onClick={addChapter}>
                    Добавить главу
                </button>
                <div className="create-course-button-wrapper">
                    <AccountPageButtonComponent
                        status={status}
                        handle={handleConfirmButton}
                        title={"Подтвердить"}/>
                </div>
                <ErrorAndSuccessWindowComponent error={error} success={success}/>
            </div>
        </div>
    )
}

export default CreateCourseContainerComponent;
