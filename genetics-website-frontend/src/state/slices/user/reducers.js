export const removeUserReducer = (state) => {
    state.isAuth = false;
    state.login = null;
    state.token = null;
    state.id = null;
    state.firstName = null;
    state.lastName = null;
    state.roles.splice(0, state.roles.length)
}

export const setUserReducer = (state, action) => {
    state.isAuth = true;
    state.login = action.payload.login;
    state.token =  action.payload.token;
    state.id = action.payload.id;
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
    state.roles = action.payload.roles;
}

export const clearUserErrorStatusSuccessReducer = (state) => {
    state.error = null;
    state.status = null;
    state.success = null;
}

export const clearUsersListReducer = (state, action) => {
    state.usersList.splice(0, state.usersList.length)
}