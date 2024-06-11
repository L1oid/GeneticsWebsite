import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    CONTENT_FILES_IS_NOT_SUPPORTED_FORMAT,
    CONTENT_NULL_ARTICLE_FIELDS, CONTENT_NULL_COURSE_FIELDS,
    CONTENT_NULL_QUESTIONNAIRE_FIELDS,
} from "../../consts/errorText/content";
import {SERVER_IS_NOT_RESPONDING} from "../../consts/errorText/common";
import {api} from "../../consts/api";
import {NEWS} from "../../consts/contentTypes";
import {getMediaUrl} from "../../functions/getMediaUrl";

export const articleCreation = createAsyncThunk(
    "content/articleCreation",
    async function({title, type, content, contactUs, forSlider, sliderImage, previewImage, fileList}, {rejectWithValue, getState, dispatch}) {
        try {
            if (type === NEWS) {
                if (forSlider === true) {
                    if (title === "" || content === "<p><br></p>" || contactUs === "" || sliderImage === null || previewImage === undefined) {
                        return rejectWithValue({
                            status: 400,
                            statusText: 'Bad Request',
                            text: CONTENT_NULL_ARTICLE_FIELDS
                        });
                    }
                } else {
                    if (title === "" || content === "<p><br></p>" || contactUs === "" || previewImage === undefined) {
                        return rejectWithValue({
                            status: 400,
                            statusText: 'Bad Request',
                            text: CONTENT_NULL_ARTICLE_FIELDS
                        });
                    }
                }
            } else {
                if (title === "" || content === "<p><br></p>" || contactUs === "" || previewImage === undefined) {
                    return rejectWithValue({
                        status: 400,
                        statusText: 'Bad Request',
                        text: CONTENT_NULL_ARTICLE_FIELDS
                    });
                }
            }
            const state = getState();
            /** @namespace state.user **/
            const formData = new FormData();

            formData.append('title', title);
            formData.append('type', type);
            formData.append('content', content);
            formData.append('forSlider', forSlider);
            formData.append('sliderImage', sliderImage);
            formData.append('previewImage', previewImage);

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                let extension = '';
                switch (file.type) {
                    case 'image/jpeg':
                        extension = '.jpg';
                        break;
                    case 'image/png':
                        extension = '.png';
                        break;
                    default:
                        return rejectWithValue({
                            status: 400,
                            statusText: 'Bad Request',
                            text: CONTENT_FILES_IS_NOT_SUPPORTED_FORMAT
                        });
                }
                formData.append('fileList', file, `file${i + 1}${extension}`);
            }

            const response = await fetch(api.url + api.articleCreation, {
                method: 'POST',
                headers: {'Authorization': state.user.token},
                body: formData
            });
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const courseCreation = createAsyncThunk(
    "content/courseCreation",
    async function({accessible, title, description, chapters, files}, {rejectWithValue, getState, dispatch}) {
        try {
            if (title === "" || description === "") {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: CONTENT_NULL_COURSE_FIELDS
                });
            }
            const hasInvalidChapter = chapters.some(chapter =>
                chapter.title === "" ||
                chapter.description === ""
            );
            if (hasInvalidChapter) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: CONTENT_NULL_COURSE_FIELDS
                });
            }
            const state = getState();
            /** @namespace state.user **/
            const formData = new FormData();

            const courseJson = {
                title: title,
                description: description,
                courseProtection: accessible
            }
            formData.append('courseJson', JSON.stringify(courseJson));

            for (let i = 0; i < files.length; i++) {
                formData.append('courseMediaFiles',files[i].file, encodeURIComponent(files[i].name));
            }

            for (let i = 0; i < chapters.length; i++) {
                const chapterFiles = chapters[i].files;
                const fileNames = chapterFiles.map(file => encodeURIComponent(file.name));

                const chapter = {
                    title: chapters[i].title,
                    content: chapters[i].description,
                    order: parseInt(chapters[i].orderNumber),
                    fileNames: fileNames
                };
                formData.append('chapterJson', JSON.stringify(chapter));

                for (let j = 0; j < chapterFiles.length; j++) {
                    formData.append('chapterMediaFiles', chapterFiles[j].file, encodeURIComponent(chapterFiles[j].name));
                }
            }

            const response = await fetch(api.url + api.createCourse, {
                method: 'POST',
                headers: {'Authorization': state.user.token},
                body: formData
            });
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const eventCreation = createAsyncThunk(
    "content/eventCreation",
    async function({title, description, scheduledFor, rendezvous}, {rejectWithValue, getState, dispatch}) {
        try {
            const state = getState();

            const requestBody = {
                title: title,
                description: description,
                scheduledFor: scheduledFor,
            };

            if (rendezvous !== "") {
                requestBody.rendezvous = rendezvous;
            }

            const response = await fetch(api.url + api.createEvents, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': state.user.token},
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const questionnaireCreation = createAsyncThunk(
    "content/questionnaireCreation",
    async function({title, noMatchAnswer, questionList}, {rejectWithValue, getState, dispatch}) {
        try {
            if (title === "" || noMatchAnswer === "" || questionList.length < 1) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: CONTENT_NULL_QUESTIONNAIRE_FIELDS
                });
            }
            const hasInvalidQuestion = questionList.some(question =>
                question.questionText === "" ||
                question.answerForUser === "" ||
                question.answerTriggeringWeight === "" ||
                (question.answerList && question.answerList.some(answer => answer.text === ""))
            );
            if (hasInvalidQuestion) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: CONTENT_NULL_QUESTIONNAIRE_FIELDS
                });
            }

            const state = getState();
            const response = await fetch(api.url + api.createQuestionnaire, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': state.user.token},
                body: JSON.stringify({
                    title: title,
                    noMatchAnswer: noMatchAnswer,
                    questionList: questionList
                })
            });
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const solveQuestionnaire = createAsyncThunk(
    "content/solveQuestionnaire",
    async function({questionnaireId, answerSet}, {rejectWithValue, getState, dispatch}) {
        try {
            const request = {
                questionnaireId: questionnaireId,
                answerSet: answerSet
            }
            const response = await fetch(api.url + api.solveQuestionnaire, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(request)
            });
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            } else {
                return await response.text()
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const articleEdition = createAsyncThunk(
    "content/articleEdition",
    async function({articleId, title, type, content, previewImage, oldPreviewImage, addFileList, deleteFileList}, {rejectWithValue, getState, dispatch}) {
        try {
            if (title === "" || content === "<p><br></p>" || (previewImage === null && oldPreviewImage === null)) {
                return rejectWithValue({
                    status: 400,
                    statusText: 'Bad Request',
                    text: CONTENT_NULL_ARTICLE_FIELDS
                });
            }

            const state = getState();
            /** @namespace state.user **/

            const formData = new FormData();

            formData.append('articleId', articleId)
            formData.append('title', title);
            formData.append('type', type);
            formData.append('content', content);
            if (previewImage !== null) {
                formData.append('previewImage', previewImage);
            }

            for (let i = 0; i < addFileList.length; i++) {
                const file = addFileList[i];
                let extension = '';
                switch (file.type) {
                    case 'image/jpeg':
                        extension = '.jpg';
                        break;
                    case 'image/png':
                        extension = '.png';
                        break;
                    default:
                        return rejectWithValue({
                            status: 400,
                            statusText: 'Bad Request',
                            text: CONTENT_FILES_IS_NOT_SUPPORTED_FORMAT
                        });
                }
                formData.append('mediaFilesToAdd', file, `file${i + 1}${extension}`);
            }

            deleteFileList.forEach(id => {
                formData.append('mediaFilesToDelete', id);
            });

            const response = await fetch(api.url + api.articleCreation, {
                method: 'PUT',
                headers: {'Authorization': state.user.token},
                body: formData
            });
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const articleDeletion = createAsyncThunk(
    "content/articleDeletion",
    async function(id, {rejectWithValue, getState}) {
        try {
            const state = getState();
            /** @namespace state.user **/
            const response = await fetch(api.url + api.deleteArticle(id), {method: 'DELETE', headers: {'Authorization': state.user.token}});
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const courseDeletion = createAsyncThunk(
    "content/courseDeletion",
    async function(id, {rejectWithValue, getState}) {
        try {
            const state = getState();
            /** @namespace state.user **/
            const response = await fetch(api.url + api.deleteCourse(id), {method: 'DELETE', headers: {'Authorization': state.user.token}});
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const eventDeletion = createAsyncThunk(
    "content/eventDeletion",
    async function(id, {rejectWithValue, getState}) {
        try {
            const state = getState();
            /** @namespace state.user **/
            const response = await fetch(api.url + api.deleteEvent(id), {method: 'DELETE', headers: {'Authorization': state.user.token}});
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const questionnaireDeletion = createAsyncThunk(
    "content/questionnaireDeletion",
    async function(questionnaireId, {rejectWithValue, getState}) {
        try {
            const state = getState();
            /** @namespace state.user **/
            const response = await fetch(api.url + api.deleteQuestionnaire(questionnaireId), {method: 'DELETE', headers: {'Authorization': state.user.token}});
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const getQuestionnaireResults = createAsyncThunk(
    "content/getQuestionnaireResults",
    async function (id, { rejectWithValue, getState }) {
        try {
            const state = getState();
            const response = await fetch(api.url + api.getQuestionnaireResults(id), {
                method: 'GET',
                headers: { 'Authorization': state.user.token },
            });
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text,
                });
            }
            if (response.status === 204) {
                return response.status
            } else {
                const blob = await response.blob();
                return { blob, filename: "questionnaire_results" };
            }
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: 'SERVER_IS_NOT_RESPONDING',
            });
        }
    }
);

export const fetchContent = createAsyncThunk(
    "content/fetchContent",
    async function({page, pageSize, type, author, title, date, dateFilter, orderByTitle}, {rejectWithValue}) {
        try {
            const responseAmountContent = await fetch(api.url + api.getAmountArticles(author, type, title, date, dateFilter), {method: 'GET'});
            if (!responseAmountContent.ok) {
                const text = await responseAmountContent.text();
                return rejectWithValue({
                    status: responseAmountContent.status,
                    statusText: responseAmountContent.statusText,
                    text: text
                });
            }
            const responseContent = await fetch(api.url + api.getArticles(page, pageSize, type, author, title, date, dateFilter, orderByTitle), {method: 'GET'});
            if (!responseContent.ok) {
                const text = await responseContent.text();
                return rejectWithValue({
                    status: responseContent.status,
                    statusText: responseContent.statusText,
                    text: text
                });
            }
            let content = await responseContent.json()
            content = content.map(item => {
                if (item.previewImage) {
                    item.previewImage = api.url + api.getImage(item.previewImage);
                }
                return item;
            });
            const amountContent = await responseAmountContent.text();
            return {
                content: content,
                amountContent: amountContent
            };
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchSliderContent = createAsyncThunk(
    "content/fetchSliderContent",
    async function({amount}, {rejectWithValue}) {
        try {
            const responseContent = await fetch(api.url + api.getSliders(amount), {method: 'GET'});
            if (!responseContent.ok) {
                const text = await responseContent.text();
                return rejectWithValue({
                    status: responseContent.status,
                    statusText: responseContent.statusText,
                    text: text
                });
            }
            let content = await responseContent.json()
            content = content.map(item => {
                if (item.mediaId) {
                    item.mediaId = api.url + api.getImage(item.mediaId);
                }
                return item;
            });
            return content
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchEvents = createAsyncThunk(
    "content/fetchEvents",
    async function({amount}, {rejectWithValue}) {
        try {
            const responseContent = await fetch(api.url + api.getEvents(amount), {method: 'GET'});
            if (!responseContent.ok) {
                const text = await responseContent.text();
                return rejectWithValue({
                    status: responseContent.status,
                    statusText: responseContent.statusText,
                    text: text
                });
            }
            return await responseContent.json()
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchSingleContent = createAsyncThunk(
    "content/fetchSingleContent",
    async function({id}, {rejectWithValue}) {
        try {
            const response = await fetch(api.url + api.getSingleArticle(id), {method: 'GET'});
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
            if (response.status === 204) {
                return {
                    status: response.status,
                    data: {}
                }
            }
            let data = await response.json()
            /** @namespace data.mediaFilesMap **/
            const fieldNames = Object.keys(data.mediaFilesMap);
            data.imageList = [];
            if (data.previewImage) {
                data.imageList.push(api.url + api.getImage(data.previewImage));
            }
            for (const field of fieldNames) {
                const imageUrl = api.url + api.getImage(field);
                data.imageList.push(imageUrl);
            }
            return {
                status: response.status,
                data: data
            };
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchQuestionnaires = createAsyncThunk(
    "content/fetchQuestionnaires",
    async function({page, pageSize, title, createdBy, createdAt, dateFilter, orderByTitle}, {rejectWithValue}) {
        try {
            const responseAmountQuestionnaire = await fetch(api.url + api.getAmountQuestionnaires(title, createdBy, createdAt, dateFilter), {method: 'GET'});
            if (!responseAmountQuestionnaire.ok) {
                const text = await responseAmountQuestionnaire.text();
                return rejectWithValue({
                    status: responseAmountQuestionnaire.status,
                    statusText: responseAmountQuestionnaire.statusText,
                    text: text
                });
            }
            const responseQuestionnaire = await fetch(api.url + api.getQuestionnaires(page, pageSize, title, createdBy, createdAt, dateFilter, orderByTitle), {method: 'GET'});
            if (!responseQuestionnaire.ok) {
                const text = await responseQuestionnaire.text();
                return rejectWithValue({
                    status: responseQuestionnaire.status,
                    statusText: responseQuestionnaire.statusText,
                    text: text
                });
            }
            let questionnaire = responseQuestionnaire.status === 204 ? [] : await responseQuestionnaire.json();
            const amountQuestionnaire = responseAmountQuestionnaire.status === 204 ? 0 : await responseAmountQuestionnaire.text();
            return {
                questionnaire: questionnaire,
                amountQuestionnaire: amountQuestionnaire
            };
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchCourses = createAsyncThunk(
    "content/fetchCourses",
    async function({page, pageSize, courseProtection, searchQuery, author, date, dateFilter, orderByTitleAuthor}, {rejectWithValue, getState}) {
        try {
            const responseAmountCourses = await fetch(api.url + api.getCoursesAmount(courseProtection, searchQuery, author, date, dateFilter), {method: 'GET'});
            if (!responseAmountCourses.ok) {
                const text = await responseAmountCourses.text();
                return rejectWithValue({
                    status: responseAmountCourses.status,
                    statusText: responseAmountCourses.statusText,
                    text: text
                });
            }
            const responseCourses = await fetch(api.url + api.getCourses(page, pageSize, courseProtection, searchQuery, author, date, dateFilter, orderByTitleAuthor), {method: 'GET'});
            if (!responseCourses.ok) {
                const text = await responseCourses.text();
                return rejectWithValue({
                    status: responseCourses.status,
                    statusText: responseCourses.statusText,
                    text: text
                });
            }
            let courses = responseCourses.status === 204 ? [] : await responseCourses.json();
            const amountCourses = responseAmountCourses.status === 204 ? 0 : await responseAmountCourses.text();
            return {
                courses: courses,
                amountCourses: amountCourses
            };
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchCourse = createAsyncThunk(
    "content/fetchCourse",
    async function({id}, {rejectWithValue, getState}) {
        try {
            const state = getState();
            const response = await fetch(api.url + api.getCourse(id), {
                method: 'GET',
                headers: {'Authorization': state.user.token},
            });
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
            let data = await response.json();

            data = {
                ...data,
                chapters: data.chapters.map(chapter => ({
                    ...chapter,
                    mediaList: chapter.mediaList.map(media => ({
                        ...media,
                        fileName: decodeURIComponent(media.fileName.replace(/\.[^/.]+$/, "")),
                        mediaType: media.mediaType.split('/')[0],
                        url: getMediaUrl(media.id, media.mediaType)
                    }))
                })),
                mediaList: data.mediaList.map(media => ({
                    ...media,
                    fileName: decodeURIComponent(media.fileName.replace(/\.[^/.]+$/, "")),
                    mediaType: media.mediaType.split('/')[0],
                    url: getMediaUrl(media.id, media.mediaType)
                }))
            };

            return {
                status: response.status,
                data: data
            };
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchQuestionnaire = createAsyncThunk(
    "content/fetchQuestionnaire",
    async function({id}, {rejectWithValue}) {
        try {
            const response = await fetch(api.url + api.getQuestionnaire(id), {method: 'GET'});
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
            let data = await response.json()
            return {
                status: response.status,
                data: data
            };
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchQuestionnaireQuestions = createAsyncThunk(
    "content/fetchQuestionnaireQuestions",
    async function({questionnaireId}, {rejectWithValue}) {
        try {
            const response = await fetch(api.url + api.getQuestionnaireQuestions(questionnaireId), {method: 'GET'});
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
            return await response.json()
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);

export const fetchQuestionnaireQuestionsAnswers = createAsyncThunk(
    "content/fetchQuestionnaireQuestionsAnswers",
    async function({questionId}, {rejectWithValue}) {
        try {
            const response = await fetch(api.url + api.getQuestionnaireQuestionsAnswers(questionId), {method: 'GET'});
            if (!response.ok) {
                const text = await response.text();
                return rejectWithValue({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
            }
            return await response.json()
        } catch (error) {
            return rejectWithValue({
                status: 504,
                statusText: 'Gateway Timeout',
                text: SERVER_IS_NOT_RESPONDING
            });
        }
    }
);
