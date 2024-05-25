export const CONTENT_NO_AUTH_HEADER_PRESENT = "No Authorization header present";
export const CONTENT_USER_DONT_HAVE_MODERATOR_PRIVILEGES = "User doesn’t have moderator privileges";
export const CONTENT_COULD_NOT_GET_USER_ID = "Couldn’t get user id";
export const CONTENT_FILES_SIZE_TOO_MANY = "Request size exceeds the maximum allowed limit (1 GB)";
export const CONTENT_TOO_MANY_FILES = "Too many files, there shouldn't be more than 10 (excluding preview image)";
export const CONTENT_NULL_ARTICLE_FIELDS = "One or more of the fields for the article is null";
export const CONTENT_EMPTY_ARTICLE_FIELDS = "One or more of the fields for the article is empty";
export const CONTENT_PREVIEW_IMAGE_IS_NOT_SUPPORTED_FORMAT = "Preview image is not of a supported format";
export const CONTENT_FILES_IS_NOT_SUPPORTED_FORMAT = "One of the uploaded files is not of a supported format";
export const CONTENT_SLIDER_IMAGE_IS_NOT_SUPPORTED_FORMAT = "Slider image is not of a supported format";
export const CONTENT_SLIDER_IMAGE_IS_NULL = "sliderImage is null"
export const CONTENT_FAILED_TO_SAVE_ARTICLE = "Failed to save article"
export const CONTENT_IN_FILE_LIST_FILES_LACKS_FILE_NAME = "One or more files in fileList lacks file name, cannot parse its type"
export const CONTENT_PREVIEW_IMAGE_LACKS_FILE_NAME = "previewImage lacks file name, cannot parse its type"
export const CONTENT_SLIDER_IMAGE_LACKS_FILE_NAME = "sliderImage lacks file name, cannot parse its type"
export const CONTENT_ADD_TOO_MANY_FILES = "Too many files to be added, there shouldn't be more than 10"
export const CONTENT_DELETE_TOO_MANY_FILES = "Too many files to be deleted, there shouldn't be more than 10"
export const CONTENT_DELETE_MEDIA_ID_IS_0 = "One or more ids in mediaToDelete is 0"
export const CONTENT_USER_TOKEN_ERROR = "Couldn't get user id"
export const CONTENT_USER_DONT_HAVE_EDIT_RIGHTS = "This user doesn't have rights to edit this article"
export const CONTENT_PREVIEW_IMAGE_LACKS_FILENAME = "previewImage lacks filename, cannot parse its type"
export const CONTENT_EDIT_INTERNAL_ERROR = "An error has occurred"
export const CONTENT_INVALID_PAGE_OR_PAGE_SIZE_VALUE = "Invalid page or pageSize, they should not be less or equal to 0"
export const CONTENT_INVALID_PAGE_OR_PAGE_SIZE_TYPE = "Invalid page or pageSize, they should be of int value"
export const CONTENT_COULD_NOT_FIND_ARTICLES = "Couldn't find a single article"
export const CONTENT_INVALID_DATE_FORMAT = "provided date string is of an invalid format"
export const CONTENT_COULD_NOT_INITIALIZE_ARTICLES = "Couldn't initialize a list of articles"
export const CONTENT_INCORRECT_SINGLE_ARTICLE_ID = "Incorrect id specified"
export const CONTENT_ARTICLE_DONT_FIND_BY_ID = "No article was found for specified id"
export const CONTENT_NO_RIGHTS_TO_DELETE_ARTICLE = "No rights to delete this article"
export const CONTENT_ARTICLE_DOESNT_EXIST = "Article doesn’t exist"
export const CONTENT_INTERNAL_ERROR = "Internal error"
export const CONTENT_INVALID_AMOUNT_EVENTS = "Invalid amount, it should not be less than 0"
export const CONTENT_DATE_SHOULD_BE_SPECIFIED = "Date should be specified"
export const CONTENT_DESCRIPTION_SHOULD_BE_SPECIFIED = "Description should be specified"
export const CONTENT_TITLE_SHOULD_BE_SPECIFIED = "Title should be specified"
export const CONTENT_USER_DONT_HAVE_MODERATOR_RIGHTS = "User doesn't have moderator privileges"
export const CONTENT_INCORRECT_REQUEST = "Incorrect request"
export const CONTENT_NO_MATCH_ANSWER_IS_EMPTY = "noMatchAnswer should be provided"
export const CONTENT_QUESTION_LIST_IS_EMPTY = "questionList is necessary for questionnaire creation"
export const CONTENT_NULL_QUESTIONNAIRE_FIELDS = "One or more of the fields for the questionnaire is null"
export const CONTENT_NO_MATCH_ANSWER_INCLUDES_SYMBOLS = "noMatchAnswer should consist only of letters of both registers, numbers, and spaces"
export const CONTENT_QUESTIONNAIRE_TITLE_IS_NULL = "Title is necessary to create a questionnaire"
export const CONTENT_QUESTIONNAIRE_TITLE_IS_SMALL = "Title should consist of at least 5 characters"
export const CONTENT_QUESTIONNAIRE_TITLE_INCLUDES_SYMBOLS = "Title should consist only of letters of both registers, numbers, and spaces"
export const CONTENT_QUESTIONNAIRE_TYPE_IS_NULL = "Didn't provide a question type for one of the questions"
export const CONTENT_QUESTIONNAIRE_TYPE_INCLUDES_SYMBOLS = "question type should consist only of letters of both registers, numbers, and spaces"
export const CONTENT_QUESTIONNAIRE_QUESTION_TEXT_IS_NULL = "A question has to have a question text, but one of the provided questions doesn't have it"
export const CONTENT_QUESTIONNAIRE_QUESTION_TEXT_INCLUDES_SYMBOLS = "questionText should consist only of letters of both registers, numbers, and spaces"
export const CONTENT_QUESTIONNAIRE_QUESTION_NUMBER_SHOULD_START_FROM_1 = "Question number should start from 1"
export const CONTENT_QUESTIONNAIRE_ANSWER_FOR_A_USER_IS_SMALL = "Didn't provide an answer for a user in one of the questions or it's less than 5 symbols"
export const CONTENT_QUESTIONNAIRE_ANSWER_FOR_A_USER_INCLUDES_SYMBOLS = "answer for user should consist only of letters of both registers, numbers, and spaces"
export const CONTENT_QUESTIONNAIRE_ANSWER_LIST_IS_EMPTY = "One or more questions with question type 'select' lacks answerList"
export const CONTENT_QUESTIONNAIRE_ANSWER_TRIGGERING_WEIGHT_IS_NULL = "Didn't specify answerTriggeringWeight for one or more of the questions"
export const CONTENT_QUESTIONNAIRE_ANSWER_TRIGGERING_WEIGHT_INCLUDES_SYMBOLS = "answerTriggeringWeight should consist only of letters of both registers, numbers, and spaces"
export const CONTENT_QUESTIONNAIRE_ANSWER_LIST_TEXT_IS_EMPTY = "One of the answers' texts in answerList wasn't provided"
export const CONTENT_QUESTIONNAIRE_ANSWER_LIST_TEXT_INCLUDES_SYMBOLS = "text for answerToChoose should consist only of letters of both registers, numbers, and spaces"
export const CONTENT_EVENT_NO_RIGHTS_EVENT = "No rights to delete this event"
export const CONTENT_EVENT_INCORRECT_ID_DELETE = "incorrect event id"
export const CONTENT_EVENT_DOESNT_EXIST = "Event doesn't exist"
export const CONTENT_QUESTIONNAIRE_INVALID_ID = "Provided invalid questionnaire"
export const CONTENT_QUESTIONNAIRE_NOT_FOUND = "Could not find such questionnaire"
export const CONTENT_QUESTIONNAIRE_AUTHOR_NOT_FOUND = "A user that has created this questionnaire doesn't exist anymore or wasn't found for a different reason"
export const CONTENT_QUESTIONNAIRE_QUESTIONS_NOT_FOUND = "Couldn't find such questionnaire"
export const CONTENT_QUESTIONNAIRE_ANSWERS_NOT_FOUND = "No answers to choose for the given question"
export const CONTENT_QUESTIONNAIRE_NO_ANSWERS_PROVIDED = "No answers provided"
export const CONTENT_QUESTIONNAIRE_NO_PROVIDE_ANSWER_FOR_QUESTION = "Didn't provide an answer for a question that requires it"
export const CONTENT_QUESTIONNAIRE_ID_IS_0 = "Questionnaire id is 0"