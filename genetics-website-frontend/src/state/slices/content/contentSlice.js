import {createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {ARTICLE, NEWS} from "../../consts/contentTypes";
import {
    clearContentErrorStatusSuccessReducer, clearContentReducer,
    clearPreviewContentReducer, clearSingleContentReducer, setPreviewContentForSliderReducer,
    setPreviewContentTextReducer,
    setPreviewContentTitleReducer, setPreviewContentTypeReducer
} from "./reducers";
import {articleCreation, fetchContent, fetchSingleContent} from "./asyncActions";
import {setArticleCreationError, setFetchContentError, setFetchSingleContentError} from "./errorHandlers";

const contentPersistConfig = {
    key: 'content',
    storage: storage,
    blacklist: [
        "newsList",
        "articleList",
        "eventList",
        "contentListSlider",
        "content"
    ]
};

const contentSlice = createSlice({
    name: "content",
    initialState: {
        newsList: [
            {
                id: null,
                createdAt: null,
                title: null,
                shortDesc: "",
                uploadedBy: null,
                reviewImage: null
            }
        ],
        articleList: [
            {
                id: null,
                createdAt: null,
                title: null,
                shortDesc: "",
                uploadedBy: null,
                reviewImage: null
            }
        ],
        contentListSlider: [
            {
                id: 0,
                sliderImage: "http://localhost:3000/slidePreview.jpg",
                title: "Открытие сайта кафедры генетики и фундаментальной медицины"
            }
        ],
        eventList: [],
        content: {
            id: null,
            createdAt: null,
            title: null,
            shortDesc: "",
            uploadedBy: null,
            reviewImage: null,
            content: "",
            imageList: [],
            mediaFilesMap: {},
            type: null
        },
        previewContent: {
            type: NEWS,
            forSlider: false,
            title: "",
            text: "<p><br></p>"
        },
        status: null,
        error: null,
        success: null
    },
    reducers: {
        clearContent: clearContentReducer,
        clearSingleContent: clearSingleContentReducer,
        clearContentErrorStatusSuccess: clearContentErrorStatusSuccessReducer,
        setPreviewContentType: setPreviewContentTypeReducer,
        setPreviewContentForSlider: setPreviewContentForSliderReducer,
        setPreviewContentTitle: setPreviewContentTitleReducer,
        setPreviewContentText: setPreviewContentTextReducer,
        clearPreviewContent: clearPreviewContentReducer
    },
    extraReducers: builder => {
        builder.addCase(articleCreation.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(articleCreation.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.success = "Контент успешно создан";
        })
        builder.addCase(articleCreation.rejected, setArticleCreationError)


        builder.addCase(fetchContent.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchContent.fulfilled, (state, action) => {
            state.status = 'resolved';
            /** @namespace action.meta **/
            if (action.meta.arg.type === ARTICLE) {
                state.articleList = action.payload;
            } else if (action.meta.arg.type === NEWS) {
                state.newsList = action.payload;
            }
            state.error = null;
            state.success = "Контент успешно загружен";
        })
        builder.addCase(fetchContent.rejected, setFetchContentError)


        builder.addCase(fetchSingleContent.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchSingleContent.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.content = action.payload;
            state.error = null;
            state.success = "Контент успешно загружен";
        })
        builder.addCase(fetchSingleContent.rejected, setFetchSingleContentError)
    }
})

export const {
    clearContent,
    clearSingleContent,
    clearPreviewContent,
    setPreviewContentType,
    setPreviewContentForSlider,
    setPreviewContentTitle,
    setPreviewContentText,
    clearContentErrorStatusSuccess} = contentSlice.actions;

const persistedContentReducer = persistReducer(contentPersistConfig, contentSlice.reducer);
export default persistedContentReducer;