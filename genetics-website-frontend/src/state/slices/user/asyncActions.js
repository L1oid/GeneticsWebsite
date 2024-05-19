import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../consts/api";
import {jwtDecode} from "jwt-decode";
import {
    USER_FIELDS_CANT_BE_NULL, USER_INVALID_EMAIL_FORMAT,
    USER_PASSWORD_DONT_MATCH,
    USER_PASSWORD_INCLUDES_SPACES,
    USER_SHORT_PASSWORD, USER_SHORT_USERNAME, USER_USERNAME_INCLUDES_SPACES
} from "../../consts/errorText/user";
import {
    SERVER_IS_NOT_RESPONDING,
} from "../../consts/errorText/common";
import {setUser} from "./userSlice";

export const authUser = createAsyncThunk(
    "user/authUser",
    async function({login, password}, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(api.url + api.authorization, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userName: login,
                    password: password
                })
            });

            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            } else {
                const token = response.headers.get('Authorization');
                let decodedToken = {};
                decodedToken = await jwtDecode(token);
                dispatch(setUser({
                    login: decodedToken.sub,
                    token: token,
                    id: decodedToken.id,
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastName,
                    roles: decodedToken.roles
                }));
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const changePassword = createAsyncThunk(
    "user/changePassword",
    async function({oldPassword, password, repeatPassword}, {rejectWithValue, getState, dispatch}) {
        try {
            if (oldPassword === "" ||
                password === "" ||
                repeatPassword === "") {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: USER_FIELDS_CANT_BE_NULL
                });
            }
            if (password.length < 6) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: USER_SHORT_PASSWORD
                });
            }
            if (password !== repeatPassword) {
                return rejectWithValue({
                    status: 403,
                    statusText: 'Forbidden',
                    text: USER_PASSWORD_DONT_MATCH
                });
            }
            if (password.includes(' ')) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: USER_PASSWORD_INCLUDES_SPACES
                });
            }
            const state = getState();
            /** @namespace state.user **/
            const response = await fetch(api.url + api.changePassword + state.user.id, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json', 'Authorization': state.user.token},
                body: JSON.stringify({
                    newPassword : password,
                    newPasswordRepeat: repeatPassword,
                    oldPassword : oldPassword
                })
            });
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const registrationUser = createAsyncThunk(
    "user/registrationUser",
    async function({username, password, roleNames, firstName, lastName, email}, {rejectWithValue, getState, dispatch}) {
        try {
            if (username === "" ||
                password === "" ||
                roleNames === [] ||
                firstName === "" ||
                lastName === "" ||
                email === "") {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: USER_FIELDS_CANT_BE_NULL
                });
            }
            if (username.length < 6) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: USER_SHORT_USERNAME
                });
            }
            if (username.includes(' ')) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: USER_USERNAME_INCLUDES_SPACES
                });
            }
            if (password.length < 6) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: USER_SHORT_PASSWORD
                });
            }
            if (password.includes(' ')) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: USER_PASSWORD_INCLUDES_SPACES
                });
            }
            if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(email)) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: USER_INVALID_EMAIL_FORMAT
                });
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: USER_INVALID_EMAIL_FORMAT
                });
            }
            const state = getState();
            /** @namespace state.user **/
            const response = await fetch(api.url + api.registrationUser, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': state.user.token},
                body: JSON.stringify({
                    username: username,
                    password: password,
                    roleNames: roleNames,
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                })
            });
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async function({page, pageSize, username, email, firstNamePlusLastName, date, dateFilter, orderBy, roleName}, {rejectWithValue, getState}) {
        try {
            const state = getState();
            /** @namespace state.user **/
            const responseAmountUsers = await fetch(api.url + api.getAmountUsers(username, email, firstNamePlusLastName, date, dateFilter, roleName), {
                method: 'GET',
                headers: {'Authorization': state.user.token}});
            if (!responseAmountUsers.ok) {
                const text = await responseAmountUsers.text();
                return rejectWithValue({
                    status: responseAmountUsers.status,
                    statusText: responseAmountUsers.statusText,
                    text: text
                });
            }
            const responseUsers = await fetch(api.url + api.getUsers(page, pageSize, username, email, firstNamePlusLastName, date, dateFilter, orderBy, roleName), {
                method: 'GET',
                headers: {'Authorization': state.user.token}});
            if (!responseUsers.ok) {
                const text = await responseUsers.text();
                return rejectWithValue({
                    status: responseUsers.status,
                    statusText: responseUsers.statusText,
                    text: text
                });
            }
            let users = await responseUsers.json()
            const amountUsers = await responseAmountUsers.text();
            return {
                users: users,
                amountUsers: amountUsers
            };
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);