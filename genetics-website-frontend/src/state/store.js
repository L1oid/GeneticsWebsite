import {configureStore} from "@reduxjs/toolkit";

import newsReducer from "./newsSlice"
import layoutReducer from "./layoutSlice"

export default configureStore({
    reducer: {
        news: newsReducer,
        layout: layoutReducer
    }
});