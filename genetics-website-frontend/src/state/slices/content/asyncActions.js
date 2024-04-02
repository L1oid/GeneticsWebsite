import {createAsyncThunk} from "@reduxjs/toolkit";
import news_list from "../../../data/news_list";
import {
    CONTENT_FILES_IS_NOT_SUPPORTED_FORMAT,
    CONTENT_NULL_ARTICLE_FIELDS,
    SERVER_IS_NOT_RESPONDING
} from "../../consts/errorText";
import {api} from "../../consts/api";
import {NEWS} from "../../consts/contentTypes";

export const articleCreation = createAsyncThunk(
    "news/articleCreation",
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


export const fetchNews = createAsyncThunk(
    "news/fetchNews",
    async function(_, {rejectWithValue}) {
        const response = news_list;
        if (response == null) {
            return rejectWithValue("Server Error !");
        }
        const data = response;
        return data;
    }
);


