import {createSlice} from "@reduxjs/toolkit";

import {authUser, changePassword, editUserInfo, fetchUsers, getUserInfo, registrationUser} from "./asyncActions";
import {
    setAuthError,
    setChangePasswordError, setEditUserInfoError,
    setFetchUserError,
    setGetUserInfoError,
    setRegistrationUserError
} from "./errorHandlers";
import {
    clearUserErrorStatusSuccessReducer, clearUserInfoReducer, clearUsersListReducer,
    removeUserReducer,
    setUserReducer
} from "./reducers";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

const userPersistConfig = {
    key: 'user',
    storage: storage,
    blacklist: [
        "status",
        "error",
        "success",
        "users",
        "usersList",
        "usersListLength",
        "userInfo"
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
        usersListLength: null,
        userInfo: {
            firstName: "",
            email: "",
            id: null,
            lastName: "",
            roleNames: [],
            username: ""
        }
    },
    reducers: {
        setUser: setUserReducer,
        removeUser: removeUserReducer,
        clearErrorStatusSuccess: clearUserErrorStatusSuccessReducer,
        clearUsersList: clearUsersListReducer,
        clearUserInfo: clearUserInfoReducer
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

        builder.addCase(getUserInfo.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.userInfo = action.payload
            state.error = null;
        })
        builder.addCase(getUserInfo.rejected, setGetUserInfoError)

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

        builder.addCase(editUserInfo.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(editUserInfo.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.success = "Данные пользователя успешно изменены";
        })
        builder.addCase(editUserInfo.rejected, (setEditUserInfoError))
    }
});

export const { clearUserInfo, setUser, removeUser , clearErrorStatusSuccess, clearUsersList} = userSlice.actions;

const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);

export default persistedUserReducer;
