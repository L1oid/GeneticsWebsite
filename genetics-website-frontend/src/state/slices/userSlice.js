import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { api } from "../api";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const authUser = createAsyncThunk(
    "user/authUser",
    async function({login, password}, {rejectWithValue, dispatch}) {
        const response = await fetch(api.url + api.authorization, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userName: login,
                password: password
            })
        })
        if (!response.ok) {
            const text = await response.text();
            return rejectWithValue({
                status: response.status,
                statusText: response.statusText,
                text: text
            });
        }
        else {
            const token = response.headers.get('Authorization');
            let decodedToken = {};
            decodedToken = await jwtDecode(token);
            dispatch(setUser({
                login: decodedToken.sub,
                token: token,
                id: decodedToken.id,
                firstName:decodedToken.firstName,
                lastName: decodedToken.lastName,
                roles: decodedToken.roles
            }));
        }
    }
);

const userPersistConfig = {
    key: 'user',
    storage: storage,
    blacklist: ['status', 'error'],
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
        error: null
    },
    reducers: {
        setUser(state, action) {
            state.isAuth = true;
            state.login = action.payload.login;
            state.token =  action.payload.token;
            state.id = action.payload.id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.roles = action.payload.roles;
        },
        removeUser(state) {
            state.isAuth = false;
            state.login = null;
            state.token = null;
            state.id = null;
            state.firstName = null;
            state.lastName = null;
            state.roles.splice(0, state.roles.length)
        },
        clearErrorAndStatus(state) {
            state.error = null;
            state.status = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(authUser.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
        })
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.status = 'resolved';
        })
        builder.addCase(authUser.rejected, (setError))
    }
});

const setError = (state, action) => {
    state.status = "rejected";
    if (action.payload.status === 401) {
        state.error = "Неверный пароль"
    } else if (action.payload.status === 404) {
        state.error = "Такого пользователя не существует"
    } else {
        state.error = "Неизветсная ошибка"
    }
}

export const { setUser, removeUser , clearErrorAndStatus} = userSlice.actions;

const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);

export default persistedUserReducer;
