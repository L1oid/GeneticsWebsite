import React, {useEffect, useState} from 'react';

import './style.css';
import AccountPageTitleComponent from "../../common/accountPageTitle/component";
import AccountPageSubtitleComponent from "../../common/accountPageSubtitle/component";
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearContentErrorStatusSuccess, clearSingleContent} from "../../../../state/slices/content/contentSlice";
import {articleEdition, fetchSingleContent} from "../../../../state/slices/content/asyncActions";
import AccountPageInputComponent from "../../common/accountPageInput/component";
import TextEditorComponent from "../../common/textEditor/component";
import ChangeImageListComponent from "../changeImageList/component";
import PreviewContentComponent from "../previewContent/component";
import ErrorAndSuccessWindowComponent from "../../common/errorAndSuccessWindow/component";
import AccountPageButtonComponent from "../../common/accountPageButton/component";

function ChangeContentContainerComponent(props) {

    const {id} = useParams();

    const dispatch = useDispatch();
    const location = useLocation();

    const {error, success, status} = useSelector(state => state.content);

    const [imageWarning, setImageWarning] = useState(" ");
    const [warningVisible, setWarningVisible] = useState(false);
    
    const [title, setTitle] = useState("");
    const [contentText, setContentText] = useState("");
    const [contentType, setContentType] = useState("");

    const [allImages, setAllImages] = useState([]);

    const [previewImage, setPreviewImage] = useState(null);
    const [oldPreviewImage, setOldPreviewImage] = useState(null);

    const [contentImages, setContentImages] = useState([]);
    const [oldContentImages, setOldContentImages] = useState([]);
    const [deletedOldContentImages, setDeletedOldContentImages] = useState([]);
    
    const content = useSelector(state => state.content.content);

    useEffect(() => {
        dispatch(clearContentErrorStatusSuccess());
    }, [dispatch, location]);

    useEffect(() => {
        dispatch(clearSingleContent());
        dispatch(fetchSingleContent({ id: id }));
    }, [dispatch, id])

    useEffect(() => {
        setTitle(content.title)
        setContentText(content.content)
        setOldContentImages(content.imageList.slice(1));
        setOldPreviewImage(content.imageList[0])
        setContentType(content.type)
    }, [content.content, content.imageList, content.previewImage, content.title, content.type])


    useEffect(() => {
        if (warningVisible) {
            const timeout = setTimeout(() => {
                setWarningVisible(false);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [warningVisible]);

    useEffect(() => {
        const imagesArray = [];
        if (oldPreviewImage !== null) {
            imagesArray.push(oldPreviewImage);
        }
        if (previewImage !== null) {
            imagesArray.push(previewImage);
        }
        imagesArray.push(...oldContentImages);
        imagesArray.push(...contentImages);
        
        const imageURLs = imagesArray.map(image => {
            if (image instanceof File) {
                return URL.createObjectURL(image);
            }
            return image;
        });

        setAllImages(imageURLs);
    }, [contentImages, oldContentImages, oldPreviewImage, previewImage]);

    const handleOldPreviewImageDelete = () => {
        setOldPreviewImage(null);
    };

    const handlePreviewImageDelete = () => {
        setPreviewImage(null);
    };

    const handleOldImageDelete = (imageIndex) => {
        const deletedImage = oldContentImages[imageIndex];
        const deletedImageId = extractImageId(deletedImage);
        setDeletedOldContentImages(prevDeletedImages => [...prevDeletedImages, deletedImageId]);

        setOldContentImages(prevImages => {
            return prevImages.filter((_, index) => index !== imageIndex);
        });
    };

    const handleImageDelete = (imageIndex) => {
        setContentImages(prevImages => {
            return prevImages.filter((_, index) => index !== imageIndex);
        });
    };

    const extractImageId = (imageUrl) => {
        const idIndex = imageUrl.lastIndexOf('/');
        return imageUrl.substring(idIndex + 1);
    };

    const showImageWarning = (text) => {
        setImageWarning(text);
        setWarningVisible(true);
    }

    const handleImageChange = (file) => {
        if (file === undefined) {
            return
        }
        if ((contentImages.length + oldContentImages.length + (previewImage ? 1 : 0) + (oldPreviewImage ? 1 : 0)) < 11) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = function() {
                if (previewImage == null && oldPreviewImage == null) {
                    setPreviewImage(file);
                } else {
                    const tempImg = new Image();
                    if (oldPreviewImage !== null) {
                        tempImg.src = oldPreviewImage;
                        tempImg.onload = function () {
                            if (tempImg.height !== img.height || tempImg.width !== img.width) {
                                showImageWarning("Размер картинки не совпадает с титульной")
                            }
                            else {
                                setContentImages(prevImages => [...prevImages, file]);
                            }
                        }
                    } else {
                        tempImg.src = URL.createObjectURL(previewImage);
                        tempImg.onload = function () {
                            if (tempImg.height !== img.height || tempImg.width !== img.width) {
                                showImageWarning("Размер картинки не совпадает с титульной")
                            }
                            else {
                                setContentImages(prevImages => [...prevImages, file]);
                            }
                        }
                    }
                }
            };
        } else {
            showImageWarning("Вы загрузили максимальное количество картинок")
        }
    };

    const handleButtonConfirm = () => {
        const article = {
            articleId: id,
            title: title,
            type: contentType,
            content: contentText,
            previewImage: previewImage,
            oldPreviewImage: oldPreviewImage,
            addFileList: contentImages,
            deleteFileList: deletedOldContentImages
        }
        dispatch(articleEdition(article));
    }

    return (
        <div className="change-content-container">
            <div className="change-content-container-row-1">
                <AccountPageTitleComponent
                    title="Изменение контента"/>
            </div>
            <div className="change-content-container-row-2">
                <AccountPageSubtitleComponent
                    title={"Заголовок"}/>
                <div className="change-content-title-input">
                    <AccountPageInputComponent
                        type="text"
                        value={title}
                        handle={(e) => setTitle(e.target.value)}
                        disabled={false}/>
                </div>
                <AccountPageSubtitleComponent
                    title={"Содержание"}/>
                <TextEditorComponent
                    value={contentText}
                    setValue={setContentText}/>
                <AccountPageSubtitleComponent
                    title={"Изображения"}/>
                <ChangeImageListComponent
                    warningVisible={warningVisible}
                    imageWarning={imageWarning}
                    oldPreviewImage={oldPreviewImage}
                    oldImages={oldContentImages}
                    images={contentImages}
                    previewImage={previewImage}
                    handleOldPreviewImageDelete={handleOldPreviewImageDelete}
                    handleOldImageDelete={handleOldImageDelete}
                    handlePreviewImageDelete={handlePreviewImageDelete}
                    handleImageDelete={handleImageDelete}
                    handleImageChange={handleImageChange}/>
                <AccountPageSubtitleComponent
                    title={"Предпросмотр"}/>
                <PreviewContentComponent
                    title={title}
                    text={contentText}
                    images={allImages}/>
                <div className="change-content-button-wrapper">
                    <AccountPageButtonComponent
                        status={status}
                        title={"Подтвердить"}
                        handle={handleButtonConfirm}/>
                </div>
                <ErrorAndSuccessWindowComponent error={error} success={success}/>
            </div>
        </div>
    )
}

export default ChangeContentContainerComponent;
