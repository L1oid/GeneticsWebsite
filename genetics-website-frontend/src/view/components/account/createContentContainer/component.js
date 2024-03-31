import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import './style.css';

import {clearErrorAndStatus} from "../../../../state/slices/user/userSlice";
import {
    setPreviewContentForSlider,
    setPreviewContentText,
    setPreviewContentTitle,
    setPreviewContentType
} from "../../../../state/slices/content/contentSlice";
import {ARTICLE, NEWS} from "../../../../state/consts/contentTypes";

import AccountPageTitleComponent from "../accountPageTitle/component";
import TextEditorComponent from "../textEditor/component";
import AccountPageSubtitleComponent from "../accountPageSubtitle/component";
import AccountPageInputComponent from "../accountPageInput/component";
import ImageListComponent from "../imageList/component";
import TypeContentSelectComponent from "../typeContentSelect/component";
import SliderCheckboxComponent from "../sliderCheckbox/component";
import AccountPageButtonComponent from "../accountPageButton/component";
import PreviewContentComponent from "../../news/previewContent/component";
import SliderImageComponent from "../sliderImage/component";

function CreateContentContainerComponent(props) {

    const location = useLocation();
    const dispatch = useDispatch();

    const previewContent = useSelector(state => state.content.previewContent)

    const [contentText, setContentText] = useState(previewContent.text);
    const [contentImages, setContentImages] = useState([]);
    const [contentSliderImage, setContentSliderImage] = useState(null);

    useEffect(() => {
        dispatch(clearErrorAndStatus());
    }, [dispatch, location]);

    useEffect(() => {
        dispatch(setPreviewContentText(contentText));
    }, [dispatch, contentText]);

    const handleSliderImageChange = (file) => {
        setContentSliderImage(file);
    };

    const handleSliderImageDelete = () => {
        setContentSliderImage(null)
    };

    const handleImageChange = (fileList) => {
        const imagesArray = Array.from(fileList);
        setContentImages(prevImages => [...prevImages, ...imagesArray]);
    };

    const handleImageDelete = (imageIndex) => {
        setContentImages(prevImages => {
            return prevImages.filter((_, index) => index !== imageIndex);
        });
    };

    const handleButtonConfirm = () => {
        if (previewContent.type === NEWS) {

        } else if (previewContent.type === ARTICLE) {

        }
    }

    return (
        <div className="create-content-container">
            <div className="create-content-container-row-1">
                <AccountPageTitleComponent
                    title="Создание контента" />
            </div>
            <div className="create-content-container-row-2">
                <AccountPageSubtitleComponent
                    title={"Тип"}/>
                <div className="create-content-type">
                    <TypeContentSelectComponent
                        setContentType={(e) => dispatch(setPreviewContentType(e.target.value))}
                        contentType={previewContent.type}/>
                    <div
                        className={previewContent.type === NEWS ? "create-content-news-options visible" : "create-content-news-options"}>
                        <SliderCheckboxComponent
                            checked={previewContent.forSlider}
                            handle={() => dispatch(setPreviewContentForSlider(!previewContent.forSlider))}/>
                    </div>
                </div>
                <AccountPageSubtitleComponent
                    title={"Заголовок"}/>
                <div className="create-content-title-input">
                    <AccountPageInputComponent
                        type="text"
                        value={previewContent.title}
                        handle={(e) => dispatch(setPreviewContentTitle(e.target.value))}
                        disabled={false}/>
                </div>
                <AccountPageSubtitleComponent
                    title={"Содержание"}/>
                <TextEditorComponent
                    value={contentText}
                    setValue={setContentText}/>
                <div className={previewContent.forSlider === true ? "create-content-news-for-slider visible" : "create-content-news-for-slider"}>
                    <AccountPageSubtitleComponent
                        title={"Изображение для слайдера"}/>
                    <SliderImageComponent
                        sliderImage={contentSliderImage}
                        handleSliderImageChange={handleSliderImageChange}
                        handleSliderImageDelete={handleSliderImageDelete}/>
                </div>
                <AccountPageSubtitleComponent
                    title={"Основные изображения"}/>
                <ImageListComponent
                    images={contentImages}
                    handleImageChange={handleImageChange}
                    handleImageDelete={handleImageDelete}/>
                <p className="create-content-image-warning">Для корректного отображения, все изображения должны быть
                    одного размера</p>
                <AccountPageSubtitleComponent
                    title={"Предпросмотр"}/>
                <PreviewContentComponent
                    images={contentImages.map(image => URL.createObjectURL(image))}/>
                <AccountPageButtonComponent
                    title={"Подтвердить"}
                    handle={handleButtonConfirm}/>
            </div>
        </div>
    )
}

export default CreateContentContainerComponent;
