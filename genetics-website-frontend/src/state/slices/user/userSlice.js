import {createSlice} from "@reduxjs/toolkit";

import {authUser, changePassword} from "./asyncActions";
import {setAuthError, setChangePasswordError} from "./errorHandles";
import {clearErrorAndStatusReducer, removeUserReducer, setUserReducer} from "./reducers";

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
        success: null
    },
    reducers: {
        setUser: setUserReducer,
        removeUser: removeUserReducer,
        clearErrorAndStatus: clearErrorAndStatusReducer
    },
    extraReducers: builder => {

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
    }
});

export const { setUser, removeUser , clearErrorAndStatus} = userSlice.actions;

export default userSlice.reducer;