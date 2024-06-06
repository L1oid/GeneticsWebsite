import {
    CONTENT_ADD_TOO_MANY_FILES,
    CONTENT_ARTICLE_DOESNT_EXIST,
    CONTENT_COULD_NOT_GET_USER_ID,
    CONTENT_COULD_NOT_INITIALIZE_ARTICLES,
    CONTENT_COURSE_FAILED_TO_PARSE_CHAPTER_JSON,
    CONTENT_COURSE_FAILED_TO_PARSE_COURSE_JSON,
    CONTENT_COURSE_FAILED_TO_PARSE_CREATE_CURSE, CONTENT_COURSE_INVALID_DATE_FORMAT,
    CONTENT_COURSE_INVALID_PAGE_OF_PAGE_SIZE, CONTENT_COURSE_INVALID_PAGE_OR_PAGE_SIZE,
    CONTENT_COURSE_IS_NOT_PROVIDED,
    CONTENT_COURSE_UNKNOWN_FILE_TYPE,
    CONTENT_COURSE_USER_DONT_HAVE_TEACHER_RIGHTS,
    CONTENT_DATE_SHOULD_BE_SPECIFIED,
    CONTENT_DELETE_MEDIA_ID_IS_0,
    CONTENT_DELETE_TOO_MANY_FILES,
    CONTENT_DESCRIPTION_SHOULD_BE_SPECIFIED,
    CONTENT_EDIT_INTERNAL_ERROR,
    CONTENT_EMPTY_ARTICLE_FIELDS,
    CONTENT_EVENT_DOESNT_EXIST,
    CONTENT_EVENT_INCORRECT_ID_DELETE,
    CONTENT_EVENT_NO_RIGHTS_EVENT,
    CONTENT_FAILED_TO_SAVE_ARTICLE,
    CONTENT_FILES_IS_NOT_SUPPORTED_FORMAT,
    CONTENT_FILES_SIZE_TOO_MANY,
    CONTENT_IN_FILE_LIST_FILES_LACKS_FILE_NAME,
    CONTENT_INCORRECT_REQUEST,
    CONTENT_INCORRECT_SINGLE_ARTICLE_ID,
    CONTENT_INTERNAL_ERROR,
    CONTENT_INVALID_AMOUNT_EVENTS,
    CONTENT_INVALID_DATE_FORMAT,
    CONTENT_INVALID_PAGE_OR_PAGE_SIZE_TYPE,
    CONTENT_INVALID_PAGE_OR_PAGE_SIZE_VALUE,
    CONTENT_NO_AUTH_HEADER_PRESENT,
    CONTENT_NO_MATCH_ANSWER_INCLUDES_SYMBOLS,
    CONTENT_NO_MATCH_ANSWER_IS_EMPTY,
    CONTENT_NO_RIGHTS_TO_DELETE_ARTICLE,
    CONTENT_NULL_ARTICLE_FIELDS,
    CONTENT_NULL_COURSE_FIELDS,
    CONTENT_NULL_QUESTIONNAIRE_FIELDS,
    CONTENT_PREVIEW_IMAGE_IS_NOT_SUPPORTED_FORMAT,
    CONTENT_PREVIEW_IMAGE_LACKS_FILE_NAME,
    CONTENT_PREVIEW_IMAGE_LACKS_FILENAME,
    CONTENT_QUESTION_LIST_IS_EMPTY,
    CONTENT_QUESTIONNAIRE_ANSWER_FOR_A_USER_INCLUDES_SYMBOLS,
    CONTENT_QUESTIONNAIRE_ANSWER_FOR_A_USER_IS_SMALL,
    CONTENT_QUESTIONNAIRE_ANSWER_FOR_USER_INVALID_CHARACTERS,
    CONTENT_QUESTIONNAIRE_ANSWER_LIST_IS_EMPTY,
    CONTENT_QUESTIONNAIRE_ANSWER_LIST_TEXT_INCLUDES_SYMBOLS,
    CONTENT_QUESTIONNAIRE_ANSWER_LIST_TEXT_IS_EMPTY,
    CONTENT_QUESTIONNAIRE_ANSWER_TO_CHOOSE_INVALID_CHARACTERS,
    CONTENT_QUESTIONNAIRE_ANSWER_TRIGGERING_WEIGHT_INCLUDES_SYMBOLS,
    CONTENT_QUESTIONNAIRE_ANSWER_TRIGGERING_WEIGHT_INVALID_CHARACTERS,
    CONTENT_QUESTIONNAIRE_ANSWER_TRIGGERING_WEIGHT_IS_NULL,
    CONTENT_QUESTIONNAIRE_ANSWERS_NOT_FOUND,
    CONTENT_QUESTIONNAIRE_AUTHOR_NOT_FOUND,
    CONTENT_QUESTIONNAIRE_COULD_NOT_FETCH_DATA,
    CONTENT_QUESTIONNAIRE_ERROR_GENERATING_EXCEL_FILE,
    CONTENT_QUESTIONNAIRE_ID_IS_0,
    CONTENT_QUESTIONNAIRE_INVALID_ID,
    CONTENT_QUESTIONNAIRE_NO_ANSWERS_PROVIDED,
    CONTENT_QUESTIONNAIRE_NO_MATCH_ANSWER_INVALID_CHARACTERS,
    CONTENT_QUESTIONNAIRE_NO_PROVIDE_ANSWER_FOR_QUESTION,
    CONTENT_QUESTIONNAIRE_NOT_FOUND,
    CONTENT_QUESTIONNAIRE_NOT_FOUND_FOR_DOWNLOAD,
    CONTENT_QUESTIONNAIRE_QUESTION_NUMBER_SHOULD_START_FROM_1,
    CONTENT_QUESTIONNAIRE_QUESTION_TEXT_INCLUDES_SYMBOLS,
    CONTENT_QUESTIONNAIRE_QUESTION_TEXT_INVALID_CHARACTERS,
    CONTENT_QUESTIONNAIRE_QUESTION_TEXT_IS_NULL,
    CONTENT_QUESTIONNAIRE_QUESTIONS_NOT_FOUND,
    CONTENT_QUESTIONNAIRE_TITLE_INCLUDES_SYMBOLS,
    CONTENT_QUESTIONNAIRE_TITLE_INVALID_CHARACTERS,
    CONTENT_QUESTIONNAIRE_TITLE_IS_NULL,
    CONTENT_QUESTIONNAIRE_TITLE_IS_SMALL,
    CONTENT_QUESTIONNAIRE_TYPE_INCLUDES_SYMBOLS,
    CONTENT_QUESTIONNAIRE_TYPE_IS_NULL,
    CONTENT_SLIDER_IMAGE_IS_NOT_SUPPORTED_FORMAT,
    CONTENT_SLIDER_IMAGE_IS_NULL,
    CONTENT_SLIDER_IMAGE_LACKS_FILE_NAME,
    CONTENT_TITLE_SHOULD_BE_SPECIFIED,
    CONTENT_TOO_MANY_FILES,
    CONTENT_USER_DONT_HAVE_EDIT_RIGHTS,
    CONTENT_USER_DONT_HAVE_MODERATOR_PRIVILEGES,
    CONTENT_USER_DONT_HAVE_MODERATOR_RIGHTS,
    CONTENT_USER_TOKEN_ERROR,
} from "../../consts/errorText/content";
import {SERVER_IS_NOT_RESPONDING} from "../../consts/errorText/common";
import {globalExit} from "../../functions/globalExit";

export const setCreateEventError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_DATE_SHOULD_BE_SPECIFIED:
                    state.error = "Поле даты не должно быть пустым"
                    break;
                case CONTENT_DESCRIPTION_SHOULD_BE_SPECIFIED:
                    state.error = "Поле описания не должно быть пустым"
                    break;
                case CONTENT_TITLE_SHOULD_BE_SPECIFIED:
                    state.error = "Поле названия не должно быть пустым"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 403:
            switch (action.payload.text) {
                case CONTENT_NO_AUTH_HEADER_PRESENT:
                    state.error = "Отсутствует заголовок авторизации"
                    break;
                case CONTENT_USER_DONT_HAVE_MODERATOR_RIGHTS:
                    state.error = "У вас отсутствуют права на данное действие"
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

export const setCreateCourseError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_COURSE_IS_NOT_PROVIDED:
                    state.error = "При создании структура курса повреждена"
                    break;
                case CONTENT_NULL_COURSE_FIELDS:
                    state.error = "Обязательные поля не заполнены"
                    break;
                case CONTENT_COURSE_UNKNOWN_FILE_TYPE:
                    state.error = "Неверное расширение файла"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 401:
            switch (action.payload.text) {
                case CONTENT_USER_TOKEN_ERROR:
                    state.error = "Ошибка токена пользователя"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 403:
            switch (action.payload.text) {
                case CONTENT_NO_AUTH_HEADER_PRESENT:
                    state.error = "Отсутствует заголовок авторизации"
                    break;
                case CONTENT_COURSE_USER_DONT_HAVE_TEACHER_RIGHTS:
                    state.error = "Отсутствуют права на создание курса"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 500:
            switch (action.payload.text) {
                case CONTENT_COURSE_FAILED_TO_PARSE_COURSE_JSON:
                    state.error = "При создании структура курса повреждена"
                    break;
                case CONTENT_COURSE_FAILED_TO_PARSE_CHAPTER_JSON:
                    state.error = "При создании структура главы курса повреждена"
                    break;
                case CONTENT_COURSE_FAILED_TO_PARSE_CREATE_CURSE:
                    state.error = "Ошибка создания курса"
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

export const setCreateQuestionnaireError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_INCORRECT_REQUEST:
                    state.error = "Некорректный запрос"
                    break;
                case CONTENT_QUESTIONNAIRE_TITLE_INVALID_CHARACTERS:
                    state.error = "В названии имеются запрещённые символы"
                    break;
                case CONTENT_QUESTIONNAIRE_NO_MATCH_ANSWER_INVALID_CHARACTERS:
                    state.error = "В стандартном сообщении имеются запрещённые символы"
                    break;
                case CONTENT_QUESTIONNAIRE_QUESTION_TEXT_INVALID_CHARACTERS:
                    state.error = "В одном из вопросов имеются запрещённые символы"
                    break;
                case CONTENT_QUESTIONNAIRE_ANSWER_FOR_USER_INVALID_CHARACTERS:
                    state.error = "В сообщении в случае совпадения имеются запрещённые символы"
                    break;
                case CONTENT_QUESTIONNAIRE_ANSWER_TRIGGERING_WEIGHT_INVALID_CHARACTERS:
                    state.error = "В ответе для совпадения имеются запрещённые символы"
                    break;
                case CONTENT_QUESTIONNAIRE_ANSWER_TO_CHOOSE_INVALID_CHARACTERS:
                    state.error = "В одном из вариантов ответов имеются запрещённые символы"
                    break;
                case CONTENT_NO_MATCH_ANSWER_IS_EMPTY:
                    state.error = "Стандартное сообщение должно быть заполненно"
                    break;
                case CONTENT_QUESTION_LIST_IS_EMPTY:
                    state.error = "Список вопросов пуст"
                    break;
                case CONTENT_NULL_QUESTIONNAIRE_FIELDS:
                    state.error = "Обязательные поля не заполнены"
                    break;
                case CONTENT_NO_MATCH_ANSWER_INCLUDES_SYMBOLS:
                    state.error = "Стандартное сообщение не должно содержать символов"
                    break;
                case CONTENT_QUESTIONNAIRE_TITLE_IS_NULL:
                    state.error = "Название анкеты должно быть заполненно"
                    break;
                case CONTENT_QUESTIONNAIRE_TITLE_IS_SMALL:
                    state.error = "Название анкеты должно быть не менее 5-ти символов"
                    break;
                case CONTENT_QUESTIONNAIRE_TITLE_INCLUDES_SYMBOLS:
                    state.error = "Название анкеты может содержать только буквы, пробелы и цифры"
                    break;
                case CONTENT_QUESTIONNAIRE_TYPE_IS_NULL:
                    state.error = "Тип анкеты должен быть заполнен"
                    break;
                case CONTENT_QUESTIONNAIRE_TYPE_INCLUDES_SYMBOLS:
                    state.error = "Тип анкеты может содержать только буквы, пробелы и цифры"
                    break;
                case CONTENT_QUESTIONNAIRE_QUESTION_TEXT_IS_NULL:
                    state.error = "Название всех вопросов должны быть заполненны"
                    break;
                case CONTENT_QUESTIONNAIRE_QUESTION_TEXT_INCLUDES_SYMBOLS:
                    state.error = "Название всех вопросов могут содержать только буквы, пробелы и цифры"
                    break;
                case CONTENT_QUESTIONNAIRE_QUESTION_NUMBER_SHOULD_START_FROM_1:
                    state.error = "Номер вопроса должен быть не менее 1"
                    break;
                case CONTENT_QUESTIONNAIRE_ANSWER_FOR_A_USER_IS_SMALL:
                    state.error = "Сообщение в случае совпадения должно быть не менее 5-ти символов"
                    break;
                case CONTENT_QUESTIONNAIRE_ANSWER_FOR_A_USER_INCLUDES_SYMBOLS:
                    state.error = "Сообщение в случае совпадения может содержать только буквы, пробелы и цифры"
                    break;
                case CONTENT_QUESTIONNAIRE_ANSWER_LIST_IS_EMPTY:
                    state.error = "Список ответов не должен быть пустым, если выбран тип Варианты"
                    break;
                case CONTENT_QUESTIONNAIRE_ANSWER_TRIGGERING_WEIGHT_IS_NULL:
                    state.error = "Ответ для совпадения должен быть заполнен"
                    break;
                case CONTENT_QUESTIONNAIRE_ANSWER_TRIGGERING_WEIGHT_INCLUDES_SYMBOLS:
                    state.error = "Ответ для совпадения может содержать только буквы, пробелы и цифры"
                    break;
                case CONTENT_QUESTIONNAIRE_ANSWER_LIST_TEXT_IS_EMPTY:
                    state.error = "Ответы на вопросы должны быть заполнены"
                    break;
                case CONTENT_QUESTIONNAIRE_ANSWER_LIST_TEXT_INCLUDES_SYMBOLS:
                    state.error = "Ответы на вопросы могут содержать только буквы, пробелы и цифры"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 401:
            switch (action.payload.text) {
                case CONTENT_USER_TOKEN_ERROR:
                    state.error = "Ошибка токена пользователя"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 403:
            switch (action.payload.text) {
                case CONTENT_NO_AUTH_HEADER_PRESENT:
                    state.error = "Отсутствует заголовок авторизации"
                    break;
                case CONTENT_USER_DONT_HAVE_MODERATOR_RIGHTS:
                    state.error = "Отсутствуют права на данное действие"
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

export const setArticleEditionError = (state, action) => {
    state.status = "rejected";
    state.success = null;
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_FILES_SIZE_TOO_MANY:
                    state.error = "Размер загружаемых файлов не должен превышать 1 GB";
                    break;
                case CONTENT_ADD_TOO_MANY_FILES:
                    state.error = "Количество изменяемых изображений не может превышать - 10, не включая титульное изображение";
                    break;
                case CONTENT_NULL_ARTICLE_FIELDS:
                    state.error = "Некоторые поля не заполнены";
                    break;
                case CONTENT_DELETE_TOO_MANY_FILES:
                    state.error = "Количество удаляемых изображений не может превышать - 10, не включая титульное изображение";
                    break;
                case CONTENT_PREVIEW_IMAGE_IS_NOT_SUPPORTED_FORMAT:
                    state.error = "Титульное изображение имеет неверный формат";
                    break;
                case CONTENT_FILES_IS_NOT_SUPPORTED_FORMAT:
                    state.error = "Одно или более остальных изображений имеет неверный формат";
                    break;
                case CONTENT_DELETE_MEDIA_ID_IS_0:
                    state.error = "Одно или более изображений имеет значение ID равное 0";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 401:
            switch (action.payload.text) {
                case CONTENT_USER_TOKEN_ERROR:
                    state.error = "Ошибка токена пользователя";
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
                    break;
                case CONTENT_USER_DONT_HAVE_EDIT_RIGHTS:
                    state.error = "Отсутствуют права на изменение контента";
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 500:
            switch (action.payload.text) {
                case CONTENT_PREVIEW_IMAGE_LACKS_FILENAME:
                    state.error = "Ошибка именования титульного изображения";
                    break;
                case CONTENT_IN_FILE_LIST_FILES_LACKS_FILE_NAME:
                    state.error = "Ошибка именований остальных изображений";
                    break;
                case CONTENT_EDIT_INTERNAL_ERROR:
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

export const setDeleteArticleError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 403:
            switch (action.payload.text) {
                case CONTENT_NO_AUTH_HEADER_PRESENT:
                    state.error = "Отсутствует токен авторизации"
                    break;
                case CONTENT_NO_RIGHTS_TO_DELETE_ARTICLE:
                    state.error = "Отсутствуют права на удаление контента"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 404:
            switch (action.payload.text) {
                case CONTENT_ARTICLE_DOESNT_EXIST:
                    state.error = "Контент с данным id отсутствует"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 500:
            switch (action.payload.text) {
                case CONTENT_INTERNAL_ERROR:
                    state.error = "Внутренняя ошибка сервера"
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

export const setDeleteQuestionnaireError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 403:
            switch (action.payload.text) {
                case CONTENT_NO_AUTH_HEADER_PRESENT:
                    state.error = "Отсутствует токен авторизации"
                    break;
                case CONTENT_USER_DONT_HAVE_MODERATOR_RIGHTS:
                    state.error = "Отсутствуют права на удаление анкеты"
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

export const setDeleteEventError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_EVENT_INCORRECT_ID_DELETE:
                    state.error = "Неверный id события для удаления"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 403:
            switch (action.payload.text) {
                case CONTENT_NO_AUTH_HEADER_PRESENT:
                    state.error = "Отсутствует токен авторизации"
                    break;
                case CONTENT_EVENT_NO_RIGHTS_EVENT:
                    state.error = "Отсутствуют права на удаление события"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break;
        case 404:
            switch (action.payload.text) {
                case CONTENT_EVENT_DOESNT_EXIST:
                    state.error = "Событие с данным id отсутствует"
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
        case 404:
            switch (action.payload.text) {
                default:
                    state.articleNotFound = true
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

export const setFetchQuestionnaireError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_QUESTIONNAIRE_INVALID_ID:
                    state.error = "Некорректный ID анкеты"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 404:
            switch (action.payload.text) {
                case CONTENT_QUESTIONNAIRE_NOT_FOUND:
                    state.error = "Данная анкета отсутствует"
                    state.articleNotFound = true
                    break;
                default:
                    state.articleNotFound = true
                    break;
            }
            break;
        case 500:
            switch (action.payload.text) {
                case CONTENT_QUESTIONNAIRE_AUTHOR_NOT_FOUND:
                    state.error = "Автор анкеты ненайден"
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

export const setFetchQuestionnaireQuestionsError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_QUESTIONNAIRE_QUESTIONS_NOT_FOUND:
                    state.error = "Вопросы по данному id не найдены"
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

export const setSolveQuestionnaireError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_QUESTIONNAIRE_NO_ANSWERS_PROVIDED:
                    state.error = "Ответы не предоставлены"
                    break;
                case CONTENT_QUESTIONNAIRE_QUESTIONS_NOT_FOUND:
                    state.error = "Данная анкета не найдена"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 500:
            switch (action.payload.text) {
                case CONTENT_QUESTIONNAIRE_NO_PROVIDE_ANSWER_FOR_QUESTION:
                    state.error = "Необходимо ответить на все вопросы со знаком *"
                    break;
                case CONTENT_QUESTIONNAIRE_ID_IS_0:
                    state.error = "Некорректный ID анкеты"
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

export const getQuestionnaireResultsError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_INCORRECT_SINGLE_ARTICLE_ID:
                    state.error = "Некорректный ID анкеты"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 401:
            switch (action.payload.text) {
                case CONTENT_NO_AUTH_HEADER_PRESENT:
                    state.error = "Отсутствует заголовок авторизации"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 403:
            switch (action.payload.text) {
                case CONTENT_USER_DONT_HAVE_MODERATOR_RIGHTS:
                    state.error = "Отсутствуют права на данное действие"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 404:
            switch (action.payload.text) {
                case CONTENT_QUESTIONNAIRE_NOT_FOUND_FOR_DOWNLOAD:
                    state.error = "Анкета для скачивания не найдена"
                    break;
                default:
                    state.error = "Неизвестная ошибка";
                    break;
            }
            break
        case 500:
            switch (action.payload.text) {
                case CONTENT_QUESTIONNAIRE_COULD_NOT_FETCH_DATA:
                    state.error = "Не удалось получить данные анкеты"
                    break;
                case CONTENT_QUESTIONNAIRE_ERROR_GENERATING_EXCEL_FILE:
                    state.error = "Ошибка генерации Exel файла анкеты"
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

export const setFetchQuestionnaireQuestionsAnswersError = (state, action) => {
    state.status = "rejected"
    state.questionnaireQuestionsListStatus = 'rejected';
    state.success = null
    switch (action.payload.status) {
        case 404:
            switch (action.payload.text) {
                case CONTENT_QUESTIONNAIRE_ANSWERS_NOT_FOUND:
                    state.error = "Ответы по данному id не найдены"
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

export const setFetchQuestionnairesError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
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

export const setFetchEventsError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_INVALID_AMOUNT_EVENTS:
                    state.error = "Некорректное значение количества эвентов"
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

export const setFetchCoursesError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
        case 400:
            switch (action.payload.text) {
                case CONTENT_COURSE_INVALID_PAGE_OR_PAGE_SIZE:
                    state.error = "Некорректное значение страницы или размерности страницы"
                    break;
                case CONTENT_COURSE_INVALID_DATE_FORMAT:
                    state.error = "Некорректное значение даты"
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

export const setFetchSliderContentError = (state, action) => {
    state.status = "rejected"
    state.success = null
    switch (action.payload.status) {
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
                case CONTENT_INVALID_PAGE_OR_PAGE_SIZE_TYPE:
                    state.error = "Неверный тип размерности списка контента";
                    break;
                case CONTENT_INVALID_PAGE_OR_PAGE_SIZE_VALUE:
                    state.error = "Неверная размерность списка контента";
                    break;
                case CONTENT_INVALID_DATE_FORMAT:
                    state.error = "Неверный формат даты";
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