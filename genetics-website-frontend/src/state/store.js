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


import contentReducer from "./slices/content/contentSlice";
import layoutReducer from "./slices/layout/layoutSlice";
import userReducer from "./slices/user/userSlice";

const rootReducer = combineReducers({
    content: contentReducer,
    layout: layoutReducer,
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
