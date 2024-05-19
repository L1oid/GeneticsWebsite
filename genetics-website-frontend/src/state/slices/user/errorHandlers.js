import {
    USER_CHANGE_OTHER_USER_PASSWORD, USER_DOESNT_HAVE_ADMIN_RIGHTS,
    USER_FIELDS_CANT_BE_NULL, USER_INTERNAL_SERVER_ERROR, USER_INVALID_CREATION_DATE_FORMAT, USER_INVALID_DATE_FORMAT,
    USER_INVALID_EMAIL_FORMAT, USER_INVALID_TYPE_VALUE_PAGE_OR_PAGE_SIZE,
    USER_INVALID_VALUE_PAGE_OR_PAGE_SIZE,
    USER_NO_AUTH_HEADER,
    USER_OLD_PASSWORD_DONT_MATCH,
    USER_PASSWORD_CANT_BE_NULL,
    USER_PASSWORD_DONT_MATCH,
    USER_PASSWORD_INCLUDES_SPACES, USER_ROLE_DOESNT_EXIST,
    USER_ROLES_CANT_BE_EMPTY,
    USER_SHORT_PASSWORD,
    USER_SHORT_USERNAME,
    USER_USER_CANT_BE_NULL,
    USER_USER_DONT_HAVE_ADMIN_PRIVILEGES,
    USER_USER_NOT_FOUND,
    USER_USERNAME_INCLUDES_SPACES,
    USER_WRONG_CREDENTIALS
} from "../../consts/errorText/user";
import {
    SERVER_IS_NOT_RESPONDING,
} from "../../consts/errorText/common";
import {globalExit} from "../../functions/globalExit";

export const setAuthError = (state, action) => {
    state.status = "rejected";
    state.success = null;
    switch (action.payload.status) {
        case 401:
            switch (action.payload.text) {
                case USER_WRONG_CREDENTIALS:
                    state.error = "Неверный пароль";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 404:
            switch (action.payload.text) {
                case USER_USER_NOT_FOUND:
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
                case USER_SHORT_PASSWORD:
                    state.error = "Длина пароля должна быть не менее 6 символов";
                    break;
                case USER_PASSWORD_INCLUDES_SPACES:
                    state.error = "Пароль не должен содержать пробелы";
                    break;
                case USER_PASSWORD_CANT_BE_NULL:
                    state.error = "Пароль не может быть пустым";
                    break;
                case USER_FIELDS_CANT_BE_NULL:
                    state.error = "Необходимо заполнить все поля"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 403:
            switch (action.payload.text) {
                case USER_PASSWORD_DONT_MATCH:
                    state.error = "Введённые пароли не совпадают";
                    break;
                case USER_CHANGE_OTHER_USER_PASSWORD:
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
                case USER_OLD_PASSWORD_DONT_MATCH:
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
                case USER_USER_CANT_BE_NULL:
                    state.error = "Пользователь не может быть пустым"
                    break;
                case USER_FIELDS_CANT_BE_NULL:
                    state.error = "Необходимо заполнить все поля"
                    break;
                case USER_ROLES_CANT_BE_EMPTY:
                    state.error = "Необходимо выбрать хотя бы одну роль"
                    break;
                case USER_SHORT_PASSWORD:
                    state.error = "Длина пароля должна быть не менее 6 символов";
                    break;
                case USER_PASSWORD_INCLUDES_SPACES:
                    state.error = "Пароль не должен содержать пробелы";
                    break;
                case USER_SHORT_USERNAME:
                    state.error = "Длина логина должна быть не менее 6 символов";
                    break;
                case USER_USERNAME_INCLUDES_SPACES:
                    state.error = "Логин не должен содержать пробелы";
                    break;
                case USER_INVALID_EMAIL_FORMAT:
                    state.error = "Неверный формат почты"
                    break;
                default:
                    state.error = "Неизвестная ошибка"
                    break;
            }
            break;
        case 403:
            switch (action.payload.text) {
                case USER_NO_AUTH_HEADER:
                    state.error = "Отсутствует заголовок авторизации"
                    globalExit(state);
                    break;
                case USER_USER_DONT_HAVE_ADMIN_PRIVILEGES:
                    state.error = "У вас нет прав на это действие"
                    globalExit(state);
                    break;
                default:
                    state.error = "Неизвестная ошибка"
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

export const setFetchUserError = (state, action) => {
    state.status = "rejected";
    state.success = null;
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case USER_INVALID_VALUE_PAGE_OR_PAGE_SIZE:
                    state.error = "Неверное значение страницы или размера страницы"
                    break;
                case USER_INVALID_CREATION_DATE_FORMAT:
                    state.error = "Неверный формат даты"
                    break;
                case USER_INVALID_TYPE_VALUE_PAGE_OR_PAGE_SIZE:
                    state.error = "Неверный тип значения страницы или размера страницы"
                    break;
                case USER_ROLE_DOESNT_EXIST:
                    state.error = "Неверная роль"
                    break;
                case USER_INVALID_DATE_FORMAT:
                    state.error = "Неверный формат даты"
                    break;
                default:
                    state.error = "Неизвестная ошибка"
                    break;
            }
            break;
        case 401:
            switch (action.payload.text) {
                case USER_NO_AUTH_HEADER:
                    state.error = "Отсутствует заголовок авторизации"
                    break;
                default:
                    state.error = "Неизвестная ошибка"
                    break;
            }
            break;
        case 403:
            switch (action.payload.text) {
                case USER_NO_AUTH_HEADER:
                    state.error = "Отсутствует заголовок авторизации"
                    break;
                case USER_DOESNT_HAVE_ADMIN_RIGHTS:
                    state.error = "Отсутствует права администратора"
                    break;
                default:
                    state.error = "Неизвестная ошибка"
                    break;
            }
            break;
        case 500:
            switch (action.payload.text) {
                case USER_INTERNAL_SERVER_ERROR:
                    state.error = "Внутренняя ошибка сервера"
                    break;
                default:
                    state.error = "Неизвестная ошибка"
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