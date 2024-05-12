import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import './style.css';

import {
    clearContentErrorStatusSuccess,
    setPreviewContentForSlider,
    setPreviewContentText,
    setPreviewContentTitle,
    setPreviewContentType
} from "../../../../state/slices/content/contentSlice";
import {ARTICLE, NEWS} from "../../../../state/consts/contentTypes";
import {articleCreation} from "../../../../state/slices/content/asyncActions";

import AccountPageTitleComponent from "../accountPageTitle/component";
import TextEditorComponent from "../textEditor/component";
import AccountPageSubtitleComponent from "../accountPageSubtitle/component";
import AccountPageInputComponent from "../accountPageInput/component";
import ImageListComponent from "../imageList/component";
import TypeContentSelectComponent from "../typeContentSelect/component";
import SliderCheckboxComponent from "../sliderCheckbox/component";
import AccountPageButtonComponent from "../accountPageButton/component";
import PreviewContentComponent from "../../content/previewContent/component";
import ErrorAndSuccessWindowComponent from "../errorAndSuccessWindow/component";

function CreateContentContainerComponent(props) {

    const location = useLocation();
    const dispatch = useDispatch();

    const previewContent = useSelector(state => state.content.previewContent)
    const {error, success, status} = useSelector(state => state.content);

    const [imageWarning, setImageWarning] = useState(" ");
    const [warningVisible, setWarningVisible] = useState(false);

    const [contentText, setContentText] = useState(previewContent.text);
    const [contentImages, setContentImages] = useState([]);
    const [contentSliderImage, setContentSliderImage] = useState(null);

    useEffect(() => {
        if (warningVisible) {
            const timeout = setTimeout(() => {
                setWarningVisible(false);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [warningVisible]);

    useEffect(() => {
        dispatch(clearContentErrorStatusSuccess());
    }, [dispatch, location]);

    useEffect(() => {
        if (previewContent.forSlider === false) {
            setContentSliderImage(null);
        }
    }, [previewContent.forSlider]);

    useEffect(() => {
        if (previewContent.type === ARTICLE) {
            dispatch(setPreviewContentForSlider(false))
        }
    }, [dispatch, previewContent.type]);

    useEffect(() => {
        dispatch(setPreviewContentText(contentText));
    }, [dispatch, contentText]);

    const showImageWarning = (text) => {
        setImageWarning(text);
        setWarningVisible(true);
    }

    const handleImageChange = (file) => {
        if (file === undefined) {
            return
        }
        if (contentImages.length < 11) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = function() {
                if (previewContent.forSlider === true && contentSliderImage === null) {
                    if (img.height !== 500 || img.width !== 2000) {
                        showImageWarning("Размер изображения слайдера должен быть 2000 x 500 пикселей")
                    } else {
                        setContentSliderImage(file)
                    }
                } else {
                    if (contentImages.length > 0) {
                        const tempImg = new Image();
                        tempImg.src = URL.createObjectURL(contentImages[0]);
                        tempImg.onload = function () {
                            if (tempImg.height !== img.height || tempImg.width !== img.width) {
                                showImageWarning("Размер картинки не совпадает с титульной")
                            }
                            else {
                                setContentImages(prevImages => [...prevImages, file]);
                            }
                        }
                    } else {
                        setContentImages(prevImages => [...prevImages, file]);
                    }
                }
            };
        } else {
            showImageWarning("Вы загрузили максимальное количество картинок")
        }
    };

    const handleSliderImageDelete = () => {
        setContentSliderImage(null);
    };

    const handleImageDelete = (imageIndex) => {
        setContentImages(prevImages => {
            return prevImages.filter((_, index) => index !== imageIndex);
        });
    };

    const handleButtonConfirm = () => {
        const article = {
            title: previewContent.title,
            type: previewContent.type,
            content: previewContent.text,
            forSlider: previewContent.forSlider,
            sliderImage: contentSliderImage,
            previewImage: contentImages[0],
            fileList: contentImages.slice(1)
        }
        dispatch(articleCreation(article));
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
                <AccountPageSubtitleComponent
                    title={"Изображения"}/>
                <ImageListComponent
                    sliderImage={contentSliderImage}
                    images={contentImages}
                    warningVisible={warningVisible}
                    imageWarning={imageWarning}
                    handleSliderImageDelete={handleSliderImageDelete}
                    handleImageChange={handleImageChange}
                    handleImageDelete={handleImageDelete}/>
                <AccountPageSubtitleComponent
                    title={"Предпросмотр"}/>
                <PreviewContentComponent
                    title={previewContent.title}
                    text={previewContent.text}
                    images={contentImages.map(image => URL.createObjectURL(image))}/>
                <div className="create-content-button-wrapper">
                    <AccountPageButtonComponent
                        status={status}
                        title={"Подтвердить"}
                        handle={handleButtonConfirm}/>
                </div>
                <ErrorAndSuccessWindowComponent error={error} success={success} />
            </div>
        </div>
    )
}

export default CreateContentContainerComponent;
