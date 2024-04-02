import {createAsyncThunk} from "@reduxjs/toolkit";
import news_list from "../../../data/news_list";
import {SERVER_IS_NOT_RESPONDING} from "../../consts/errorText";
import {api} from "../../consts/api";

export const articleCreation = createAsyncThunk(
    "news/articleCreation",
    async function({title, type, content, forSlider, sliderImage, previewImage, fileList}, {rejectWithValue, getState, dispatch}) {
        try {
            console.log("Kek1")
            console.log({title, type, content, forSlider, sliderImage, previewImage, fileList})
            const state = getState();
            /** @namespace state.user **/
            const formData = new FormData();

            formData.append('title', title);
            formData.append('type', type);
            formData.append('content', content);
            formData.append('forSlider', forSlider);
            formData.append('sliderImage', sliderImage);
            formData.append('previewImage', previewImage);
            formData.append('fileList', fileList);

            const response = await fetch(api.url + api.articleCreation, {
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data', 'Authorization': state.user.token},
                body: formData // Отправляем formData
            });

            console.log(response)
            console.log(response.status)
            console.log(response.statusText)
            console.log("Kek2")
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


