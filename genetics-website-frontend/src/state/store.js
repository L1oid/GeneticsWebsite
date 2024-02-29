import {configureStore} from "@reduxjs/toolkit";

import newsReducer from "./slices/newsSlice"
import layoutReducer from "./slices/layoutSlice"

export default configureStore({
    reducer: {
        news: newsReducer,
        layout: layoutReducer
    }
});