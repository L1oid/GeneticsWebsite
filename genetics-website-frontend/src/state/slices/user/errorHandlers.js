import {
    CHANGE_OTHER_USER_PASSWORD, FIELDS_CANT_BE_NULL, INVALID_EMAIL_FORMAT, NO_AUTH_HEADER, OLD_PASSWORD_DONT_MATCH,
    PASSWORD_CANT_BE_NULL, PASSWORD_DONT_MATCH,
    PASSWORD_INCLUDES_SPACES, ROLES_CANT_BE_EMPTY,
    SERVER_IS_NOT_RESPONDING,
    SHORT_PASSWORD, SHORT_USERNAME, USER_CANT_BE_NULL, USER_DONT_HAVE_ADMIN_PRIVILEGES,
    USER_NOT_FOUND, USERNAME_INCLUDES_SPACES,
    WRONG_CREDENTIALS
} from "../../consts/errorText";
import {globalExit} from "../../globalExit";

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
                case FIELDS_CANT_BE_NULL:
                    state.error = "Необходимо заполнить все поля"
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
                    globalExit(state);
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

export const setRegistrationUserError = (state, action) => {
    state.status = "rejected";
    state.success = null;
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case USER_CANT_BE_NULL:
                    state.error = "Пользователь не может быть пустым"
                    break;
                case FIELDS_CANT_BE_NULL:
                    state.error = "Необходимо заполнить все поля"
                    break;
                case ROLES_CANT_BE_EMPTY:
                    state.error = "Необходимо выбрать хотя бы одну роль"
                    break;
                case SHORT_PASSWORD:
                    state.error = "Длина пароля должна быть не менее 6 символов";
                    break;
                case PASSWORD_INCLUDES_SPACES:
                    state.error = "Пароль не должен содержать пробелы";
                    break;
                case SHORT_USERNAME:
                    state.error = "Длина логина должна быть не менее 6 символов";
                    break;
                case USERNAME_INCLUDES_SPACES:
                    state.error = "Логин не должен содержать пробелы";
                    break;
                case INVALID_EMAIL_FORMAT:
                    state.error = "Неверный формат почты"
                    break;
                default:
                    state.error = "Неизвестная ошибка"
                    break;
            }
            break;
        case 403:
            switch (action.payload.text) {
                case NO_AUTH_HEADER:
                    state.error = "Отсутствует заголовок авторизации"
                    globalExit(state);
                    break;
                case USER_DONT_HAVE_ADMIN_PRIVILEGES:
                    state.error = "У вас нет прав на это действие"
                    globalExit(state);
                    break;
                default:
                    state.error = "Неизвестная ошибка"
                    break;
            }
            break;
        default:
            state.error = "Неизвестная ошибка"
            break;
    }
}