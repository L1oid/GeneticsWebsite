import {configureStore} from "@reduxjs/toolkit";

import newsReducer from "./slices/newsSlice"
import layoutReducer from "./slices/layoutSlice"
import scienceReducer from "./slices/scienceSlice"
import userReducer from "./slices/userSlice"

export default configureStore({
    reducer: {
        news: newsReducer,
        layout: layoutReducer,
        science: scienceReducer,
        user: userReducer
    }
});