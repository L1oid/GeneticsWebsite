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
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import newsReducer from "./slices/newsSlice";
import layoutReducer from "./slices/layoutSlice";
import scienceReducer from "./slices/scienceSlice";
import userReducer from "./slices/user/userSlice";

const rootReducer = combineReducers({
    news: newsReducer,
    layout: layoutReducer,
    science: scienceReducer,
    user: userReducer
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['news', 'layout', 'science']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
