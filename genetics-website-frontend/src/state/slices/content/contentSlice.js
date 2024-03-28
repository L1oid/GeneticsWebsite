import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import news_list from "../../../data/news_list";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {NEWS} from "../../consts/contentTypes";
import {
    clearNewsReducer,
    clearPreviewContentReducer, setPreviewContentForSliderReducer,
    setPreviewContentReducer,
    setPreviewContentTextReducer,
    setPreviewContentTitleReducer, setPreviewContentTypeReducer
} from "./reducers";

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
        error: null
    },
    reducers: {
        clearNews: clearNewsReducer,
        setPreviewContentType: setPreviewContentTypeReducer,
        setPreviewContentForSlider: setPreviewContentForSliderReducer,
        setPreviewContentTitle: setPreviewContentTitleReducer,
        setPreviewContentText: setPreviewContentTextReducer,
        setPreviewContent: setPreviewContentReducer,
        clearPreviewContent: clearPreviewContentReducer
    },
    extraReducers: builder => {
        builder.addCase(fetchNews.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
        })
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.news_list = action.payload;
        })
        builder.addCase(fetchNews.rejected, setError)
    }
})

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
}

export const {
    clearNews,
    setPreviewContent,
    clearPreviewContent,
    setPreviewContentType,
    setPreviewContentForSlider,
    setPreviewContentTitle,
    setPreviewContentText} = contentSlice.actions;

const persistedContentReducer = persistReducer(newsPersistConfig, contentSlice.reducer);
export default persistedContentReducer;