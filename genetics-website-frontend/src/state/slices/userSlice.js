import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../api";

export const authUser = createAsyncThunk(
    "user/authUser",
    async function({login, password}, {rejectWithValue}) {
        console.log("Start auth");
        const response = await fetch(api.url + api.authorization, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userName: login,
                password: password
            })
        })
        if (!response.ok) {
            return rejectWithValue(response.status);
        }
        const token = response.headers.get('Authorization')
        console.log(token);
        console.log(response.status);
        console.log("End auth");
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        login: null,
        token: null,
        id: null,
        status: null,
        error: null
    },
    reducers: {
        setUser(state, action) {
            state.login = action.payload.login;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.login = null;
            state.token = null;
            state.id = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(authUser.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
        })
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.news_list = action.payload;
        })
        builder.addCase(authUser.rejected, setError)
    }
});

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
}

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;