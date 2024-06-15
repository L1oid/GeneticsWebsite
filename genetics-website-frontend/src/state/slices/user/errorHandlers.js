import {
    USER_CANT_CHANGE_OTHER_PEOPLES_ROLES,
    USER_CHANGE_OTHER_USER_PASSWORD,
    USER_COULD_NOT_GET_USER_ID,
    USER_DOES_NOT_EXIST,
    USER_DOESNT_HAVE_ADMIN_RIGHTS,
    USER_FIELDS_CANT_BE_NULL,
    USER_INTERNAL_ERROR,
    USER_INTERNAL_SERVER_ERROR,
    USER_INVALID_CREATION_DATE_FORMAT,
    USER_INVALID_DATE_FORMAT,
    USER_INVALID_EMAIL_FORMAT,
    USER_INVALID_TYPE_VALUE_PAGE_OR_PAGE_SIZE,
    USER_INVALID_USER_ID,
    USER_INVALID_VALUE_PAGE_OR_PAGE_SIZE,
    USER_NEW_PASSWORDS_NOT_EQUAL,
    USER_NO_AUTH_HEADER,
    USER_NOT_FOUND,
    USER_OLD_PASSWORD_DONT_MATCH,
    USER_PASSWORD_CANT_BE_NULL,
    USER_PASSWORD_DONT_MATCH,
    USER_PASSWORD_INCLUDES_SPACES,
    USER_ROLE_DOESNT_EXIST,
    USER_ROLES_CANT_BE_EMPTY, USER_SERVER_ERROR,
    USER_SHORT_PASSWORD,
    USER_SHORT_USERNAME,
    USER_USER_CANT_BE_NULL,
    USER_USER_DONT_HAVE_ADMIN_PRIVILEGES,
    USER_USER_NOT_FOUND,
    USER_USERNAME_INCLUDES_SPACES,
    USER_WRONG_CREDENTIALS,
    USER_YOU_MUST_PROVIDE_NEW_PASSWORD_AND_REPEAT_IT
} from "../../consts/errorText/user";
import {
    SERVER_IS_NOT_RESPONDING,
} from "../../consts/errorText/common";
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

export const setDeleteUserError = (state, action) => {
    state.status = "rejected";
    state.success = null;
    switch (action.payload.status) {
        case 401:
            switch (action.payload.text) {
                case USER_COULD_NOT_GET_USER_ID:
                    state.error = "Невозможно найти пользователя по данному ID";
                    break;
                case USER_DOES_NOT_EXIST:
                    state.error = "Данный пользователь не существует";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 403:
            switch (action.payload.text) {
                case USER_NO_AUTH_HEADER:
                    state.error = "Отсутствует заголовок авторизации";
                    break;
                case USER_DOESNT_HAVE_ADMIN_RIGHTS:
                    state.error = "Отсутствуют права администратора";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 500:
            switch (action.payload.text) {
                case USER_SERVER_ERROR:
                    state.error = "Внутренняя ошибка сервера";
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

export const setEditUserInfoError = (state, action) => {
    state.status = "rejected";
    state.success = null;
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case USER_FIELDS_CANT_BE_NULL:
                    state.error = "Необходимо заполнить все поля"
                    break;
                case USER_INVALID_EMAIL_FORMAT:
                    state.error = "Неверный формат почты"
                    break;
                default:
                    state.error = "Неизвестная ошибка"
                    break;
            }
            break;
        case 401:
            switch (action.payload.text) {
                case USER_COULD_NOT_GET_USER_ID:
                    state.error = "Не удалось получить ID пользователя";
                    break;
                case USER_DOES_NOT_EXIST:
                    state.error = "Такого пользователя не существует";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 403:
            switch (action.payload.text) {
                case USER_NO_AUTH_HEADER:
                    state.error = "Отсутсвтует заголовок авторизации";
                    break;
                case USER_CANT_CHANGE_OTHER_PEOPLES_ROLES:
                    state.error = "Вы не можете изменять роли других пользователей";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 500:
            switch (action.payload.text) {
                case USER_INTERNAL_ERROR:
                    state.error = "Внутренняя ошибка сервера";
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
                case USER_NEW_PASSWORDS_NOT_EQUAL:
                    state.error = "Введённые пароли не совпадают"
                    break;
                case USER_YOU_MUST_PROVIDE_NEW_PASSWORD_AND_REPEAT_IT:
                    state.error = "Необходимо ввести новый пароль и повторить его"
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
                    break;
                case USER_USER_DONT_HAVE_ADMIN_PRIVILEGES:
                    state.error = "У вас нет прав на это действие"
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

export const setGetUserInfoError = (state, action) => {
    state.status = "rejected";
    state.success = null;
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case USER_INVALID_USER_ID:
                    state.error = "Неверный ID пользователя";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 401:
            switch (action.payload.text) {
                case USER_NO_AUTH_HEADER:
                    state.error = "Отсутствует заголовок авторизации";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 403:
            switch (action.payload.text) {
                case USER_DOESNT_HAVE_ADMIN_RIGHTS:
                    state.error = "Отсутствуют права на данное действие";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 404:
            switch (action.payload.text) {
                case USER_NOT_FOUND:
                    state.error = "Данного пользователя не существует";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 500:
            switch (action.payload.text) {
                default:
                    state.error = "Внутренняя ошибка сервера";
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