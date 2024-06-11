import {createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {ARTICLE, NEWS} from "../../consts/contentTypes";
import {
    clearArticleListReducer, clearCloseCoursesListReducer,
    clearContentErrorStatusSuccessReducer, clearCourseReducer, clearFreeCoursesListReducer,
    clearNewsListReducer,
    clearPreviewContentReducer,
    clearQuestionnaireListReducer,
    clearQuestionnaireQuestionsAnswersListReducer, clearQuestionnaireQuestionsListReducer,
    clearQuestionnaireReducer,
    clearSingleContentReducer,
    setArticleNotFoundFalseReducer, setPreviewContactUsReducer,
    setPreviewContentForSliderReducer,
    setPreviewContentTextReducer,
    setPreviewContentTitleReducer,
    setPreviewContentTypeReducer,
    setRerenderAfterDeleteFalseReducer, setSolveQuestionnaireSuccessFalseReducer
} from "./reducers";
import {
    articleCreation,
    articleDeletion,
    articleEdition, courseCreation, courseDeletion,
    eventCreation,
    eventDeletion,
    fetchContent, fetchCourse, fetchCourses,
    fetchEvents,
    fetchQuestionnaire,
    fetchQuestionnaireQuestions,
    fetchQuestionnaireQuestionsAnswers,
    fetchQuestionnaires,
    fetchSingleContent,
    fetchSliderContent, getQuestionnaireResults,
    questionnaireCreation,
    questionnaireDeletion, solveQuestionnaire
} from "./asyncActions";
import {
    getQuestionnaireResultsError,
    setArticleCreationError,
    setArticleEditionError, setCreateCourseError,
    setCreateEventError,
    setCreateQuestionnaireError,
    setDeleteArticleError, setDeleteCourseError,
    setDeleteEventError,
    setDeleteQuestionnaireError,
    setFetchContentError, setFetchCourseError, setFetchCoursesError,
    setFetchEventsError,
    setFetchQuestionnaireError, setFetchQuestionnaireQuestionsAnswersError,
    setFetchQuestionnaireQuestionsError,
    setFetchQuestionnairesError,
    setFetchSingleContentError,
    setFetchSliderContentError,
    setSolveQuestionnaireError,
} from "./errorHandlers";
import {api} from "../../consts/api";

const contentPersistConfig = {
    key: 'content',
    storage: storage,
    blacklist: [
        "newsList",
        "articleList",
        "questionnaireList",
        "questionnaireListLength",
        "newsListLength",
        "articleListLength",
        "rerenderAfterDelete",
        "questionnaireQuestionsList",
        "questionnaireQuestionsAnswersList",
        "eventList",
        "freeCoursesList",
        "closeCoursesList",
        "freeCoursesListLength",
        "closeCoursesListLength",
        "course",
        "contentListSlider",
        "sliderDefaultImage",
        "questionnaire",
        "content",
        "aboutContent",
        "articleNotFound",
        "solveQuestionnaireSuccess",
        "status",
        "error",
        "success"
    ]
};

const contentSlice = createSlice({
    name: "content",
    initialState: {
        newsList: [],
        articleList: [],
        questionnaireList: [],
        questionnaireQuestionsList: [],
        questionnaireQuestionsAnswersList: [],
        questionnaireListLength: null,
        newsListLength: null,
        articleListLength: null,
        rerenderAfterDelete: false,
        contentListSlider: [],
        solveQuestionnaireSuccess: false,
        sliderDefaultImage: api.url + api.getImage(4),
        freeCoursesListLength: null,
        freeCoursesList: [],
        closeCoursesListLength: null,
        closeCoursesList: [],
        course: {
            chapters: [
                {
                    title: "",
                    content: "",
                    mediaList: []
                }
            ],
            courseProtection: false,
            creationDate: "",
            creatorId: null,
            description: "",
            id: null,
            mediaList: [],
            title: ""
        },
        aboutContent: {
            title1: "Заведующий кафедрой",
            content1: "Минина Варвара Ивановна<br><em>доктор биологических наук, доцент</em>",
            title2: "Историческая справка",
            content2: "Профессорско-преподавательский состав кафедры включает 3 профессоров, докторов наук; 12 доцентов, кандидатов наук, одного старшего преподавателя, одного ассистента.\n" +
                "В октябре 1967 г. на химико-биологическом факультете Кемеровского педагогического института была организована кафедра анатомии и физиологии человека и животных. Огромную роль в создании кафедры сыграл выпускник Новокузнецкого пединститута и аспирантуры ГИДУВа Эдуард Михайлович Казин. Доктор биологических наук, профессор, заслуженный деятель науки Российской Федерации, почетный профессор Кузбасса Э. М. Казин более 40 лет возглавлял кафедру.<br><br>" +
                "Благодаря поддержке со стороны ректора Кемеровского пединститута профессора Н. Н. Чистякова и под влиянием школы сибирских физиологов были созданы необходимые предпосылки для развертывания целого ряда экспериментальных и скриннинговых исследований: своими силами построен виварий, создано и приобретено лабораторное оборудование и измерительная аппаратура для реализации эндокринных и биоритмологических подходов к проблеме онтогенеза и адаптации.<br><br>" +
                "Группой преподавателей и сотрудников кафедры была разработана модель центра научных основ здоровья и развития (валеологической службы), предусматривающая использование комплекса автоматизированных программно-технических средств диагностики, прогноза, профилактики и реабилитации детей и взрослых. По инициативе кафедры и при поддержке Департамента образования АКО в 1996 г. создан и успешно функционирует Кемеровский областной психолого-валеологический центр.<br><br>" +
                "В 1971 году на биологическом факультете была основана лаборатория генетики. Организатором и бессменным руководителем лаборатории до 1991 г. был к.м.н., доцент Борис Викторович Лавряшин, который определил основные научные приоритеты для этого коллектива на многие годы. Среди научных направлений в области генетики человека, разрабатываемых в лаборатории на начальных этапах ее становления, можно выделить следующие: популяционная генетика коренных малочисленных народностей Южной Сибири, медицинская генетика нарушений физического и умственного развития, экологическая генетика.<br><br>" +
                "Коллективом сотрудников лаборатории с 1986 г. выполнены популяционно-цитогенетические исследования групп населения Кемеровской области, дифференцированных по районам проживания, этнической принадлежности и профессиональной занятости. В октябре 2003 г. на базе лаборатории организована кафедра генетики (зав. кафедрой — профессор В. Г. Дружинин).<br><br>" +
                "В 2020 году создается объединенная кафедра физиологии и генетики (зав. кафедрой — профессор Дружинин В. Г.). В 2021 году в связи с развитием медицинских направлений кафедра физиологии и генетики преобразуется в кафедру генетики и фундаментальной медицины (зав. кафедрой — профессор Минина В. И.)",
            title3: "Научная деятельность кафедры",
            content3: "<ul><li>Промышленная геномика и транскриптомика: изучение геномных основ индивидуальной чувствительности организма человека к действию производственных мутагенов; генетические основы развития профессиональных заболеваний</li>" +
                "<li>Метагеномика и метатранскриптомика</li>" +
                "<li>Онкогенетика</li>" +
                "<li>Иммуногенетические механизмы в хемокоммуникации людей</li>" +
                "<li>Влияние эндогенных и экзогенных факторов на особенности адаптации человека в разные периоды онтогенеза</li>" +
                "<li>Особенности ЭЭГ у людей в разных функциональных состояниях</li></ul>",
            title4: "Задачи кафедры",
            content4: "<ul><li>Углубленная подготовка широкопрофильных специалистов-биологов для работы в специализированных медицинских, медико-биологических, экологических и природоохранных научных и образовательных учреждениях</li>" +
                "<li>Внедрение педагогических инноваций и прогрессивных форм обучения</li>" +
                "<li>Разработка и выполнение научно-исследовательских фундаментальных и прикладных проектов в области физиологии, молекулярной биологии и генетики с использованием современных методов исследования</li></ul>",
            title5: "Научные связи",
            content5: "<ul><li>Институт экологии человека ФИЦ УУХ СО РАН (г. Кемерово) – создана совместная лаборатория цитогенетики на базе КемГУ, совместные публикации;</li>" +
                "<li>Научно-исследовательский институт комплексных проблем сердечно-сосудистых заболеваний СО РАМН (г. Кемерово);</li>" +
                "<li>Научно-исследовательский институт комплексных проблем гигиены и профессиональных заболеваний СО РАМН (г. Новокузнецк);</li>" +
                "<li>ГАУЗ КО Областной клинический центр охраны здоровья шахтеров (г. Ленинск-Кузнецкий);</li>" +
                "<li>Институт химической биологии и фундаментальной медицины СО РАН;</li>" +
                "<li>ФГБУ Научно-исследовательский институт экологии человека и гигиены окружающей среды им. А.Н. Сысина (г. Москва);</li>" +
                "<li>ФГБНУ Медико-генетический научный центр РАН (г. Москва);</li>" +
                "<li>ФГБНУ Институт медицинской генетики томского национального исследовательского центра РАН (г. Томск);</li>" +
                "<li>Сибирский медицинский университет (г. Томск);</li>" +
                "<li>Институт общей генетики им. Н.И. Вавилова (г. Москва);</li>" +
                "<li>ФГБУН «Институт цитологии и генетики СО РАН»</li>" +
                "<li>Научно-исследовательский центр проблем безопасности дорожного движения МВД России;</li>" +
                "<li>ГОО «Кузбасский Региональный центр психолого-педагогической, медицинской и социальной помощи «Здоровье и развитие личности»</li>" +
                "<li>ГОУ ДПО (ПК) «Кузбасский региональный институт повышения квалификации и переподготовки работников образования»</li><br>" +
                "<li>Institute for Medical Research and Occupational Health (Zagreb, Croatia);</li>" +
                "<li>Department of Microbiology, Tumor and Cell Biology, Karolinska Institutet (Stockholm, Sweden);</li>" +
                "<li>University Rennes, EHESP, Inserm, Irset (Institut de recherche en santé, environnement et travail) (Rennes, France);</li>" +
                "<li>Institute of Health and Society, Federal University of São Paulo, (São Paulo, Brazil);</li>" +
                "<li>7CSIR-National Environmental Engineering Research Institute, (Nagpur, India).</li></ul>",
            image1: api.url + api.getImage(1),
            image2: api.url + api.getImage(2),
            image3: api.url + api.getImage(3),
            image4: api.url + api.getImage(5)
        },
        eventList: [],
        questionnaire: {},
        content: {
            id: null,
            createdAt: null,
            title: null,
            shortDesc: "",
            uploadedBy: null,
            reviewImage: null,
            content: "",
            contactInfo: "",
            imageList: [],
            mediaFilesMap: {},
            type: null
        },
        previewContent: {
            type: NEWS,
            forSlider: false,
            title: "",
            text: "<p><br></p>",
            contactUs: "<p><br></p>"
        },
        articleNotFound: false,
        status: null,
        error: null,
        success: null
    },
    reducers: {
        clearNewsList: clearNewsListReducer,
        setArticleNotFound: setArticleNotFoundFalseReducer,
        setRerenderAfterDeleteFalse: setRerenderAfterDeleteFalseReducer,
        clearQuestionnaireList: clearQuestionnaireListReducer,
        clearArticleList: clearArticleListReducer,
        clearSingleContent: clearSingleContentReducer,
        clearContentErrorStatusSuccess: clearContentErrorStatusSuccessReducer,
        setPreviewContentType: setPreviewContentTypeReducer,
        setPreviewContentForSlider: setPreviewContentForSliderReducer,
        setPreviewContentTitle: setPreviewContentTitleReducer,
        setPreviewContentText: setPreviewContentTextReducer,
        clearPreviewContent: clearPreviewContentReducer,
        clearQuestionnaire: clearQuestionnaireReducer,
        clearQuestionnaireQuestionsList: clearQuestionnaireQuestionsListReducer,
        clearQuestionnaireQuestionsAnswersList: clearQuestionnaireQuestionsAnswersListReducer,
        setSolveQuestionnaireSuccessFalse: setSolveQuestionnaireSuccessFalseReducer,
        clearFreeCoursesList: clearFreeCoursesListReducer,
        clearCloseCoursesList: clearCloseCoursesListReducer,
        setPreviewContactUs: setPreviewContactUsReducer,
        clearCourse: clearCourseReducer
    },
    extraReducers: builder => {
        builder.addCase(articleCreation.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(articleCreation.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.success = "Контент успешно создан";
        })
        builder.addCase(articleCreation.rejected, setArticleCreationError)

        builder.addCase(courseCreation.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(courseCreation.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.success = "Образовательный материал успешно создан";
        })
        builder.addCase(courseCreation.rejected, setCreateCourseError)

        builder.addCase(questionnaireCreation.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(questionnaireCreation.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.success = "Анкета успешно создана";
        })
        builder.addCase(questionnaireCreation.rejected, setCreateQuestionnaireError)

        builder.addCase(eventCreation.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(eventCreation.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.success = "Событие успешно создано";
        })
        builder.addCase(eventCreation.rejected, setCreateEventError)

        builder.addCase(solveQuestionnaire.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(solveQuestionnaire.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.solveQuestionnaireSuccess = true;
            state.error = null;
            state.success = action.payload;
        })
        builder.addCase(solveQuestionnaire.rejected, setSolveQuestionnaireError)

        builder.addCase(articleEdition.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(articleEdition.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.success = "Контент успешно изменён";
        })
        builder.addCase(articleEdition.rejected, setArticleEditionError)


        builder.addCase(fetchContent.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchContent.fulfilled, (state, action) => {
            state.status = 'resolved';
            /** @namespace action.meta **/
            if (action.meta.arg.type === ARTICLE) {
                state.articleListLength = parseInt(action.payload.amountContent)
                state.articleList = [...state.articleList, ...action.payload.content];
            } else if (action.meta.arg.type === NEWS) {
                state.newsListLength = parseInt(action.payload.amountContent)
                state.newsList = [...state.newsList, ...action.payload.content];
            }
            state.error = null;
        })
        builder.addCase(fetchContent.rejected, setFetchContentError)

        builder.addCase(fetchCourses.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchCourses.fulfilled, (state, action) => {
            state.status = 'resolved';
            /** @namespace action.meta **/
            if (action.meta.arg.courseProtection === true) {
                state.closeCoursesListLength = parseInt(action.payload.amountCourses)
                state.closeCoursesList = [...state.closeCoursesList, ...action.payload.courses];
            } else if (action.meta.arg.courseProtection === false) {
                state.freeCoursesListLength = parseInt(action.payload.amountCourses)
                state.freeCoursesList = [...state.freeCoursesList, ...action.payload.courses];
            }
            state.error = null;
        })
        builder.addCase(fetchCourses.rejected, setFetchCoursesError)

        builder.addCase(fetchQuestionnaires.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchQuestionnaires.fulfilled, (state, action) => {
            state.status = 'resolved';
            /** @namespace action.meta **/
            state.questionnaireListLength = parseInt(action.payload.amountQuestionnaire)
            state.questionnaireList = [...state.questionnaireList, ...action.payload.questionnaire];
            state.error = null;
        })
        builder.addCase(fetchQuestionnaires.rejected, setFetchQuestionnairesError)

        builder.addCase(fetchSliderContent.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchSliderContent.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.contentListSlider = action.payload
            state.error = null;
        })
        builder.addCase(fetchSliderContent.rejected, setFetchSliderContentError)


        builder.addCase(fetchEvents.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.eventList = action.payload
            state.error = null;
        })
        builder.addCase(fetchEvents.rejected, setFetchEventsError)


        builder.addCase(fetchSingleContent.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchSingleContent.fulfilled, (state, action) => {
            state.status = 'resolved';
            if (action.payload.status === 200) {
                state.content = action.payload.data;
            } else {
                state.articleNotFound = true
            }
            state.error = null;
        })
        builder.addCase(fetchSingleContent.rejected, setFetchSingleContentError)

        builder.addCase(fetchCourse.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchCourse.fulfilled, (state, action) => {
            state.status = 'resolved';
            if (action.payload.status === 200) {
                state.course = action.payload.data;
            } else {
                state.articleNotFound = true
            }
            state.error = null;
        })
        builder.addCase(fetchCourse.rejected, setFetchCourseError)

        builder.addCase(fetchQuestionnaire.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchQuestionnaire.fulfilled, (state, action) => {
            state.status = 'resolved';
            if (action.payload.status === 200) {
                state.questionnaire = action.payload.data;
            } else {
                state.articleNotFound = true
            }
            state.error = null;
        })
        builder.addCase(fetchQuestionnaire.rejected, setFetchQuestionnaireError)

        builder.addCase(getQuestionnaireResults.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(getQuestionnaireResults.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            if (action.payload === 204) {
                state.success = "У данной анкеты нет прохождений";
            } else {
                const url = window.URL.createObjectURL(action.payload.blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = action.payload.filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        })
        builder.addCase(getQuestionnaireResults.rejected, getQuestionnaireResultsError)

        builder.addCase(fetchQuestionnaireQuestions.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchQuestionnaireQuestions.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.questionnaireQuestionsList = action.payload;
            state.error = null;
        })
        builder.addCase(fetchQuestionnaireQuestions.rejected, setFetchQuestionnaireQuestionsError)

        builder.addCase(fetchQuestionnaireQuestionsAnswers.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchQuestionnaireQuestionsAnswers.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.questionnaireQuestionsAnswersList = [...state.questionnaireQuestionsAnswersList, ...action.payload];
            state.error = null;
        })
        builder.addCase(fetchQuestionnaireQuestionsAnswers.rejected, setFetchQuestionnaireQuestionsAnswersError)

        builder.addCase(articleDeletion.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(articleDeletion.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.rerenderAfterDelete = true;
        })
        builder.addCase(articleDeletion.rejected, setDeleteArticleError)

        builder.addCase(courseDeletion.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(courseDeletion.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.rerenderAfterDelete = true;
        })
        builder.addCase(courseDeletion.rejected, setDeleteCourseError)

        builder.addCase(eventDeletion.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(eventDeletion.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.rerenderAfterDelete = true;
        })
        builder.addCase(eventDeletion.rejected, setDeleteEventError)

        builder.addCase(questionnaireDeletion.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(questionnaireDeletion.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.rerenderAfterDelete = true;
        })
        builder.addCase(questionnaireDeletion.rejected, setDeleteQuestionnaireError)
    }
})

export const {
    clearNewsList,
    setArticleNotFound,
    setRerenderAfterDeleteFalse,
    clearArticleList,
    clearSingleContent,
    clearPreviewContent,
    setPreviewContentType,
    setPreviewContentForSlider,
    setPreviewContentTitle,
    setPreviewContentText,
    clearQuestionnaireList,
    clearQuestionnaire,
    clearQuestionnaireQuestionsAnswersList,
    clearQuestionnaireQuestionsList,
    setSolveQuestionnaireSuccessFalse,
    clearFreeCoursesList,
    clearCloseCoursesList,
    clearCourse,
    setPreviewContactUs,
    clearContentErrorStatusSuccess} = contentSlice.actions;

const persistedContentReducer = persistReducer(contentPersistConfig, contentSlice.reducer);
export default persistedContentReducer;