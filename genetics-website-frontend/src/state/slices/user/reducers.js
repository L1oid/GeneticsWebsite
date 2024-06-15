export const removeUserReducer = (state) => {
    state.isAuth = false;
    state.login = null;
    state.token = null;
    state.email = null;
    state.id = null;
    state.firstName = null;
    state.lastName = null;
    state.roles.splice(0, state.roles.length)
}

export const logOutErrorUserReducer = (state) => {
    state.logOutError = "Вы вышли из системы, так как ваш аккаунт был удалён. Пожалуйста, свяжитесь с нами, если у вас есть вопросы.";
}

export const clearLogOutErrorUserReducer = (state) => {
    state.logOutError = "";
}

export const setUserReducer = (state, action) => {
    state.isAuth = true;
    state.login = action.payload.login;
    state.token =  action.payload.token;
    state.email = action.payload.email;
    state.id = action.payload.id;
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
    state.roles = action.payload.roles;
}

export const setUserInfoReducer = (state, action) => {
    state.email = action.payload.email;
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
    state.roles = action.payload.roles;
}

export const clearUserErrorStatusSuccessReducer = (state) => {
    state.error = null;
    state.status = null;
    state.success = null;
}

export const clearUserInfoReducer = (state) => {
    state.userInfo = {
        firstName: "",
        email: "",
        id: null,
        lastName: "",
        roleNames: [],
        username: ""
    };
}

export const clearUsersListReducer = (state, action) => {
    state.usersList.splice(0, state.usersList.length)
}

export const setRerenderAfterDeleteFalseReducer = (state, action) => {
    state.rerenderAfterDelete = false
}