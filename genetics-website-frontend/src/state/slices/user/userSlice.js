import {createSlice} from "@reduxjs/toolkit";

import {authUser, changePassword, fetchUsers, registrationUser} from "./asyncActions";
import {setAuthError, setChangePasswordError, setFetchUserError, setRegistrationUserError} from "./errorHandlers";
import {
    clearUserErrorStatusSuccessReducer, clearUsersListReducer,
    removeUserReducer,
    setUserReducer
} from "./reducers";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {fetchContent} from "../content/asyncActions";
import {ARTICLE, NEWS} from "../../consts/contentTypes";
import {setFetchContentError} from "../content/errorHandlers";

const userPersistConfig = {
    key: 'user',
    storage: storage,
    blacklist: [
        "status",
        "error",
        "success",
        "users"
    ]
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        login: null,
        token: null,
        id: null,
        firstName: null,
        lastName: null,
        roles: [],
        status: null,
        error: null,
        success: null,
        usersList: [],
        usersListLength: null
    },
    reducers: {
        setUser: setUserReducer,
        removeUser: removeUserReducer,
        clearErrorStatusSuccess: clearUserErrorStatusSuccessReducer,
        clearUsersList: clearUsersListReducer
    },
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'resolved';
            /** @namespace action.meta **/
            state.usersListLength = parseInt(action.payload.amountUsers)
            state.usersList = [...state.usersList, ...action.payload.users];
            state.error = null;
        })
        builder.addCase(fetchUsers.rejected, setFetchUserError)

        builder.addCase(authUser.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.success = null;
        })
        builder.addCase(authUser.rejected, (setAuthError))

        builder.addCase(changePassword.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.success = "Пароль успешно изменен";
        })
        builder.addCase(changePassword.rejected, (setChangePasswordError))

        builder.addCase(registrationUser.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(registrationUser.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.success = "Пользователь успешно создан";
        })
        builder.addCase(registrationUser.rejected, (setRegistrationUserError))
    }
});

export const { setUser, removeUser , clearErrorStatusSuccess, clearUsersList} = userSlice.actions;

const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);

export default persistedUserReducer;
