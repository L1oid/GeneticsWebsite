export const SERVER_IS_NOT_RESPONDING = "Server is not responding";

//user
export const PASSWORD_DONT_MATCH = "passwords do not match";
export const CHANGE_OTHER_USER_PASSWORD = "you can’t change other peoples’ passwords";
export const SHORT_PASSWORD = "the password must be at least 6 characters long";
export const PASSWORD_INCLUDES_SPACES = "the password must not contain spaces";
export const PASSWORD_CANT_BE_NULL = "password cannot be null";
export const OLD_PASSWORD_DONT_MATCH = "Old password doesn’t match";


export const WRONG_CREDENTIALS = "wrong credentials";
export const USER_NOT_FOUND = "user with such username was not found";


export const USER_CANT_BE_NULL = "User cannot be null";
export const FIELDS_CANT_BE_NULL = "One or more fields are null";
export const ROLES_CANT_BE_EMPTY = "Set of roles cannot be empty";
export const NO_AUTH_HEADER = "No authorization header present";
export const USER_DONT_HAVE_ADMIN_PRIVILEGES = "User doesn’t have admin privileges";
export const SHORT_USERNAME = "the username must be at least 6 characters long";
export const USERNAME_INCLUDES_SPACES = "the username must not contain spaces";
export const INVALID_EMAIL_FORMAT = "invalid email format"


//content
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



export const CONTENT_INVALID_PAGE_OR_PAGE_SIZE_VALUE = "Invalid page or pageSize, they should not be less or equal to 0"
export const CONTENT_INVALID_PAGE_OR_PAGE_SIZE_TYPE = "Invalid page or pageSize, they should be of int value"
export const CONTENT_COULD_NOT_FIND_ARTICLES = "Couldn't find a single article"
export const CONTENT_INVALID_DATE_FORMAT = "provided date string is of an invalid format"
export const CONTENT_COULD_NOT_INITIALIZE_ARTICLES = "Couldn't initialize a list of articles"



export const CONTENT_INCORRECT_SINGLE_ARTICLE_ID = "Incorrect id specified"
export const CONTENT_ARTICLE_DONT_FIND_BY_ID = "No article was found for specified id"