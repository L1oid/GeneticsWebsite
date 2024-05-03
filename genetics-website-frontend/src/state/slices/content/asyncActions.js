import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    CONTENT_FILES_IS_NOT_SUPPORTED_FORMAT,
    CONTENT_NULL_ARTICLE_FIELDS,
    SERVER_IS_NOT_RESPONDING
} from "../../consts/errorText";
import {api} from "../../consts/api";
import {NEWS} from "../../consts/contentTypes";

export const articleCreation = createAsyncThunk(
    "content/articleCreation",
    async function({title, type, content, forSlider, sliderImage, previewImage, fileList}, {rejectWithValue, getState, dispatch}) {
        try {
            if (type === NEWS) {
                if (forSlider === true) {
                    if (title === "" || content === "<p><br></p>" || sliderImage === null || previewImage === undefined) {
                        return rejectWithValue({
                            status: 400,
                            statusText: 'Bad Request',
                            text: CONTENT_NULL_ARTICLE_FIELDS
                        });
                    }
                } else {
                    if (title === "" || content === "<p><br></p>" || previewImage === undefined) {
                        return rejectWithValue({
                            status: 400,
                            statusText: 'Bad Request',
                            text: CONTENT_NULL_ARTICLE_FIELDS
                        });
                    }
                }
            } else {
                if (title === "" || content === "<p><br></p>" || previewImage === undefined) {
                    return rejectWithValue({
                        status: 400,
                        statusText: 'Bad Request',
                        text: CONTENT_NULL_ARTICLE_FIELDS
                    });
                }
            }
            const state = getState();
            /** @namespace state.user **/
            const formData = new FormData();

            formData.append('title', title);
            formData.append('type', type);
            formData.append('content', content);
            formData.append('forSlider', forSlider);
            formData.append('sliderImage', sliderImage);
            formData.append('previewImage', previewImage);

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                let extension = '';
                switch (file.type) {
                    case 'image/jpeg':
                        extension = '.jpg';
                        break;
                    case 'image/png':
                        extension = '.png';
                        break;
                    default:
                        return rejectWithValue({
                            status: 400,
                            statusText: 'Bad Request',
                            text: CONTENT_FILES_IS_NOT_SUPPORTED_FORMAT
                        });
                }
                formData.append('fileList', file, `file${i + 1}${extension}`);
            }

            const response = await fetch(api.url + api.articleCreation, {
                method: 'POST',
                headers: {'Authorization': state.user.token},
                body: formData
            });
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchContent = createAsyncThunk(
    "content/fetchContent",
    async function({page, pageSize, type, author, title, date}, {rejectWithValue}) {
        try {
            const responseAmountContent = await fetch(api.url + api.getAmountArticles(author, type, title, date), {method: 'GET'});
            if (!responseAmountContent.ok) {
                const text = await responseAmountContent.text();
                return rejectWithValue({
                    status: responseAmountContent.status,
                    statusText: responseAmountContent.statusText,
                    text: text
                });
            }
            const responseContent = await fetch(api.url + api.getArticles(page, pageSize, type, author, title, date), {method: 'GET'});
            if (!responseContent.ok) {
                const text = await responseContent.text();
                return rejectWithValue({
                    status: responseContent.status,
                    statusText: responseContent.statusText,
                    text: text
                });
            }
            let content = await responseContent.json()
            content = content.map(item => {
                if (item.previewImage) {
                    item.previewImage = api.url + api.getImage(item.previewImage);
                }
                return item;
            });
            const amountContent = await responseAmountContent.text();
            return {
                content: content,
                amountContent: amountContent
            };
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchSingleContent = createAsyncThunk(
    "content/fetchSingleContent",
    async function({id}, {rejectWithValue}) {
        try {
            const response = await fetch(api.url + api.getSingleArticle(id), {method: 'GET'});
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
            let data = await response.json()
            /** @namespace data.mediaFilesMap **/
            const fieldNames = Object.keys(data.mediaFilesMap);
            data.imageList = [];
            if (data.previewImage) {
                data.imageList.push(api.url + api.getImage(data.previewImage));
            }
            for (const field of fieldNames) {
                const imageUrl = api.url + api.getImage(field);
                data.imageList.push(imageUrl);
            }
            return data;
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);
