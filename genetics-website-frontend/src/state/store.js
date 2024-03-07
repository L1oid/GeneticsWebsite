import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'

import newsReducer from "./slices/newsSlice";
import layoutReducer from "./slices/layoutSlice";
import scienceReducer from "./slices/scienceSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
    news: newsReducer,
    layout: layoutReducer,
    science: scienceReducer,
    user: userReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
