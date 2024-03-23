import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";

import './style.css';

import {clearErrorAndStatus} from "../../../../state/slices/user/userSlice";

import AccountPageTitleComponent from "../accountPageTitle/component";
import TextEditorComponent from "../textEditor/component";
import AccountPageSubtitleComponent from "../accountPageSubtitle/component";
import AccountPageInputComponent from "../accountPageInput/component";
import ImageListComponent from "../imageList/component";
import TypeContentSelectComponent from "../typeContentSelect/component";
import {NEWS} from "../../../../state/consts/contentTypes";
import SliderCheckboxComponent from "../sliderCheckbox/component";

function CreateContentContainerComponent(props) {

    const location = useLocation();
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [contentType, setContentType] = useState(NEWS);
    const [contentTypeText, setContentTypeText] = useState("");

    useEffect(() => {
        if (contentType === NEWS) {
            setContentTypeText("новости")
        } else {
            setContentTypeText("статьи")
        }
    }, [contentType]);

    useEffect(() => {
        dispatch(clearErrorAndStatus());
    }, [dispatch, location]);


    const handleImageChange = (event) => {
        const fileList = event.target.files;
        const imagesArray = Array.from(fileList);
        setImages(prevImages => [...prevImages, ...imagesArray]);
    };

    return (
        <div className="create-content-container">
            <div className="create-content-container-row-1">
                <AccountPageTitleComponent title={"Создание " + contentTypeText} />
            </div>
            <div className="create-content-container-row-2">
                <AccountPageSubtitleComponent title={"Тип"}/>
                <div className="create-content-type">
                    <TypeContentSelectComponent
                        setContentType={setContentType}
                        contentType={contentType}/>
                    <div className={contentType === NEWS ? "create-content-news-options visible" : "create-content-news-options"}>
                        <SliderCheckboxComponent/>
                    </div>
                </div>
                <AccountPageSubtitleComponent title={"Заголовок"}/>
                <div className="create-content-title-input">
                    <AccountPageInputComponent/>
                </div>
                <AccountPageSubtitleComponent title={"Содержание"}/>
                <TextEditorComponent/>
                <AccountPageSubtitleComponent title={"Изображения"}/>
                <ImageListComponent images={images} handle={handleImageChange} setImages={setImages}/>
                <p className="create-content-image-warning">Для корректного отображения, все изображения должны быть
                    одного размера</p>
            </div>
        </div>
    )
}

export default CreateContentContainerComponent;
