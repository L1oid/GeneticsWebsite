import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import news_list from "../../data/news_list";

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

const newsSlice = createSlice({
    name: "news",
    initialState: {
        news_list: [],
        status: null,
        error: null
    },
    reducers: {
        clearNews(state, action) {
            state.news_list.splice(0, state.news_list.length)
        }
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

export const {clearNews} = newsSlice.actions;
export default newsSlice.reducer;