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

function CreateNewsContainerComponent(props) {

    const location = useLocation();
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);

    useEffect(() => {
        dispatch(clearErrorAndStatus());
    }, [dispatch, location]);

    const handleImageChange = (event) => {
        const fileList = event.target.files;
        const imagesArray = Array.from(fileList);
        setImages(prevImages => [...prevImages, ...imagesArray]);
    };

    return (
        <div className="create-news-container">
            <div className="create-news-container-row-1">
                <AccountPageTitleComponent title={"Создание новости"} />
            </div>
            <div className="create-news-container-row-2">
                <AccountPageSubtitleComponent title={"Заголовок новости"}/>
                <div className="create-news-title-input">
                    <AccountPageInputComponent/>
                </div>
                <AccountPageSubtitleComponent title={"Содержание новости"}/>
                <TextEditorComponent/>
                <AccountPageSubtitleComponent title={"Изображения"}/>
                <ImageListComponent images={images} handle={handleImageChange}/>
                <p className="create-news-image-warning">Все изображения должны быть одного размера</p>
            </div>
        </div>
    )
}

export default CreateNewsContainerComponent;
