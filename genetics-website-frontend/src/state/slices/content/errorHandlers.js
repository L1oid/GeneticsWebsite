import {
    CONTENT_ARTICLE_DONT_FIND_BY_ID,
    CONTENT_COULD_NOT_FIND_ARTICLES,
    CONTENT_COULD_NOT_GET_USER_ID, CONTENT_COULD_NOT_INITIALIZE_ARTICLES,
    CONTENT_EMPTY_ARTICLE_FIELDS,
    CONTENT_FAILED_TO_SAVE_ARTICLE,
    CONTENT_FILES_IS_NOT_SUPPORTED_FORMAT,
    CONTENT_FILES_SIZE_TOO_MANY,
    CONTENT_IN_FILE_LIST_FILES_LACKS_FILE_NAME, CONTENT_INCORRECT_SINGLE_ARTICLE_ID,
    CONTENT_INVALID_AMOUNT_TYPE, CONTENT_INVALID_AMOUNT_VALUE,
    CONTENT_NO_AUTH_HEADER_PRESENT,
    CONTENT_NULL_ARTICLE_FIELDS,
    CONTENT_PREVIEW_IMAGE_IS_NOT_SUPPORTED_FORMAT,
    CONTENT_PREVIEW_IMAGE_LACKS_FILE_NAME,
    CONTENT_SLIDER_IMAGE_IS_NOT_SUPPORTED_FORMAT,
    CONTENT_SLIDER_IMAGE_IS_NULL,
    CONTENT_SLIDER_IMAGE_LACKS_FILE_NAME,
    CONTENT_TOO_MANY_FILES,
    CONTENT_USER_DONT_HAVE_MODERATOR_PRIVILEGES,
    SERVER_IS_NOT_RESPONDING
} from "../../consts/errorText";
import {globalExit} from "../../functions/globalExit";

export const setFetchSingleContentError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_INCORRECT_SINGLE_ARTICLE_ID:
                    state.error = "Некорректный ID контента"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 204:
            switch (action.payload.text) {
                case CONTENT_ARTICLE_DONT_FIND_BY_ID:
                    state.error = "Контент по ID не найден"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
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

export const setFetchContentError = (state, action) => {
    state.status = "rejected";
    state.success = null;
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_INVALID_AMOUNT_TYPE:
                    state.error = "Неверный тип размерности списка контента";
                    break;
                case CONTENT_INVALID_AMOUNT_VALUE:
                    state.error = "Неверная размерность списка контента";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 204:
            switch (action.payload.text) {
                case CONTENT_COULD_NOT_FIND_ARTICLES:
                    state.error = "Список указанного контента пуст";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 500:
            switch (action.payload.text) {
                case CONTENT_COULD_NOT_INITIALIZE_ARTICLES:
                    state.error = "Не удалось инициализировать список контента";
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

export const setArticleCreationError = (state, action) => {
    state.status = "rejected";
    state.success = null;
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_FILES_SIZE_TOO_MANY:
                    state.error = "Размер загружаемых файлов не должен превышать 1 GB";
                    break;
                case CONTENT_TOO_MANY_FILES:
                    state.error = "Количество изображений не может превышать - 10, не включая титульное изображение";
                    break;
                case CONTENT_NULL_ARTICLE_FIELDS:
                    state.error = "Некоторые поля не заполнены";
                    break;
                case CONTENT_EMPTY_ARTICLE_FIELDS:
                    state.error = "Некоторые поля не заполнены";
                    break;
                case CONTENT_PREVIEW_IMAGE_IS_NOT_SUPPORTED_FORMAT:
                    state.error = "Титульное изображение имеет неверный формат";
                    break;
                case CONTENT_FILES_IS_NOT_SUPPORTED_FORMAT:
                    state.error = "Одно или более остальных изображений имеет неверный формат";
                    break;
                case CONTENT_SLIDER_IMAGE_IS_NOT_SUPPORTED_FORMAT:
                    state.error = "Изображение слайдера имеет неверный формат";
                    break;
                case CONTENT_SLIDER_IMAGE_IS_NULL:
                    state.error = "Отсутствет изображение слайдера";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 401:
            switch (action.payload.text) {
                case CONTENT_COULD_NOT_GET_USER_ID:
                    state.error = "Отсутствует ID пользователя";
                    globalExit();
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 403:
            switch (action.payload.text) {
                case CONTENT_NO_AUTH_HEADER_PRESENT:
                    state.error = "Отсутствует заголовок авторизации";
                    globalExit();
                    break;
                case CONTENT_USER_DONT_HAVE_MODERATOR_PRIVILEGES:
                    state.error = "Отсутствуют права на данное действие";
                    globalExit();
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 500:
            switch (action.payload.text) {
                case CONTENT_FAILED_TO_SAVE_ARTICLE:
                    state.error = "Ошибка создания контента";
                    break;
                case CONTENT_IN_FILE_LIST_FILES_LACKS_FILE_NAME:
                    state.error = "Ошибка именований остальных изображений";
                    break;
                case CONTENT_PREVIEW_IMAGE_LACKS_FILE_NAME:
                    state.error = "Ошибка именования титульного изображения";
                    break;
                case CONTENT_SLIDER_IMAGE_LACKS_FILE_NAME:
                    state.error = "Ошибка именования изображения слайдера";
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