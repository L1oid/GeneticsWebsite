import {createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {NEWS} from "../../consts/contentTypes";
import {
    clearNewsReducer,
    clearPreviewContentReducer, setPreviewContentForSliderReducer,
    setPreviewContentTextReducer,
    setPreviewContentTitleReducer, setPreviewContentTypeReducer
} from "./reducers";
import {articleCreation, fetchNews} from "./asyncActions";
import {setArticleCreationError, setFetchNewsError} from "./errorHandlers";

const newsPersistConfig = {
    key: 'news',
    storage: storage,
    blacklist: [
        "news_list",
    ]
};

const contentSlice = createSlice({
    name: "content",
    initialState: {
        news_list: [],
        previewContent: {
            type: NEWS,
            forSlider: false,
            title: "",
            text: "<p><br></p>",
        },
        status: null,
        error: null,
        success: null
    },
    reducers: {
        clearNews: clearNewsReducer,
        setPreviewContentType: setPreviewContentTypeReducer,
        setPreviewContentForSlider: setPreviewContentForSliderReducer,
        setPreviewContentTitle: setPreviewContentTitleReducer,
        setPreviewContentText: setPreviewContentTextReducer,
        clearPreviewContent: clearPreviewContentReducer
    },
    extraReducers: builder => {

        builder.addCase(fetchNews.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.news_list = action.payload;
            state.error = null;
            state.success = "Всё круто";
        })
        builder.addCase(fetchNews.rejected, setFetchNewsError)


        builder.addCase(articleCreation.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(articleCreation.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.success = "Всё круто";
        })
        builder.addCase(articleCreation.rejected, setArticleCreationError)
    }
})

export const {
    clearNews,
    clearPreviewContent,
    setPreviewContentType,
    setPreviewContentForSlider,
    setPreviewContentTitle,
    setPreviewContentText} = contentSlice.actions;

const persistedContentReducer = persistReducer(newsPersistConfig, contentSlice.reducer);
export default persistedContentReducer;