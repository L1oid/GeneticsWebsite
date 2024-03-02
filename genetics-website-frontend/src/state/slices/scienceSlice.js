import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import articles_list from "../../data/articles_list";

export const fetchArticles = createAsyncThunk(
    "science/fetchArticles",
    async function(_, {rejectWithValue}) {
        const response = articles_list;
        if (response == null) {
            return rejectWithValue("Server Error !");
        }
        const data = response;
        return data;
    }
);

const scienceSlice = createSlice({
    name: "science",
    initialState: {
        articles_list: [],
        status: null,
        error: null
    },
    reducers: {
        clearArticles(state, action) {
            state.articles_list.splice(0, state.articles_list.length)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchArticles.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
        })
        builder.addCase(fetchArticles.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.articles_list = action.payload;
        })
        builder.addCase(fetchArticles.rejected, setError)
    }
})

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
}

export const {clearArticles} = scienceSlice.actions;
export default scienceSlice.reducer;