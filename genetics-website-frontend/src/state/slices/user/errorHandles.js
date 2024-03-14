import {
    CHANGE_OTHER_USER_PASSWORD, OLD_PASSWORD_DONT_MATCH,
    PASSWORD_CANT_BE_NULL, PASSWORD_DONT_MATCH,
    PASSWORD_INCLUDES_SPACES,
    SERVER_IS_NOT_RESPONDING,
    SHORT_PASSWORD,
    USER_NOT_FOUND,
    WRONG_CREDENTIALS
} from "../../consts/errorText";
import {removeUserReducer} from "./reducers";

export const setAuthError = (state, action) => {
    state.status = "rejected";
    state.success = null;
    switch (action.payload.status) {
        case 401:
            switch (action.payload.text) {
                case WRONG_CREDENTIALS:
                    state.error = "Неверный пароль";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 404:
            switch (action.payload.text) {
                case USER_NOT_FOUND:
                    state.error = "Такого пользователя не существует";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 504:
            switch (action.payload.text) {
                case SERVER_IS_NOT_RESPONDING:
                    state.error = "Сервер не отвечает"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        default:
            state.error = "Неизвестная ошибка";
            break;
    }
}

export const setChangePasswordError = (state, action) => {
    state.status = "rejected";
    state.success = null;
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case SHORT_PASSWORD:
                    state.error = "Длина пароля должна быть не менее 6 символов";
                    break;
                case PASSWORD_INCLUDES_SPACES:
                    state.error = "Пароль не должен содержать пробелы";
                    break;
                case PASSWORD_CANT_BE_NULL:
                    state.error = "Пароль не может быть пустым";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 403:
            switch (action.payload.text) {
                case PASSWORD_DONT_MATCH:
                    state.error = "Введённые пароли не совпадают";
                    break;
                case CHANGE_OTHER_USER_PASSWORD:
                    state.error = "Попытка изменить пароль другого пользователя";
                    removeUserReducer(state);
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 500:
            switch (action.payload.text) {
                case OLD_PASSWORD_DONT_MATCH:
                    state.error = "Неверный старый пароль"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 504:
            switch (action.payload.text) {
                case SERVER_IS_NOT_RESPONDING:
                    state.error = "Сервер не отвечает"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        default:
            state.error = "Неизвестная ошибка"
            break;
    }
}