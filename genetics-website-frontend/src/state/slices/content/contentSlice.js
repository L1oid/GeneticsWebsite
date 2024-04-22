import {createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {ARTICLE, NEWS} from "../../consts/contentTypes";
import {
    clearArticleListReducer,
    clearContentErrorStatusSuccessReducer, clearNewsListReducer,
    clearPreviewContentReducer, clearSingleContentReducer, setPreviewContentForSliderReducer,
    setPreviewContentTextReducer,
    setPreviewContentTitleReducer, setPreviewContentTypeReducer
} from "./reducers";
import {articleCreation, fetchContent, fetchSingleContent} from "./asyncActions";
import {setArticleCreationError, setFetchContentError, setFetchSingleContentError} from "./errorHandlers";
import {api} from "../../consts/api";

const contentPersistConfig = {
    key: 'content',
    storage: storage,
    blacklist: [
        "newsList",
        "articleList",
        "eventList",
        "contentListSlider",
        "content",
        "aboutContent"
    ]
};

const contentSlice = createSlice({
    name: "content",
    initialState: {
        newsList: [],
        articleList: [],
        contentListSlider: [
            {
                id: 0,
                sliderImage: api.getImage(351),
                title: "Открытие сайта кафедры генетики и фундаментальной медицины"
            }
        ],
        aboutContent: {
            title1: "Заведующая кафедрой",
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
            image1: api.getImage(348),
            image2: api.getImage(349),
            image3: api.getImage(350),
            image4: api.getImage(352)
        },
        eventList: [],
        content: {
            id: null,
            createdAt: null,
            title: null,
            shortDesc: "",
            uploadedBy: null,
            reviewImage: null,
            content: "",
            imageList: [],
            mediaFilesMap: {},
            type: null
        },
        previewContent: {
            type: NEWS,
            forSlider: false,
            title: "",
            text: "<p><br></p>"
        },
        status: null,
        error: null,
        success: null
    },
    reducers: {
        clearNewsList: clearNewsListReducer,
        clearArticleList: clearArticleListReducer,
        clearSingleContent: clearSingleContentReducer,
        clearContentErrorStatusSuccess: clearContentErrorStatusSuccessReducer,
        setPreviewContentType: setPreviewContentTypeReducer,
        setPreviewContentForSlider: setPreviewContentForSliderReducer,
        setPreviewContentTitle: setPreviewContentTitleReducer,
        setPreviewContentText: setPreviewContentTextReducer,
        clearPreviewContent: clearPreviewContentReducer
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


        builder.addCase(fetchContent.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchContent.fulfilled, (state, action) => {
            state.status = 'resolved';
            /** @namespace action.meta **/
            if (action.meta.arg.type === ARTICLE) {
                state.articleList = [...state.articleList, ...action.payload];
            } else if (action.meta.arg.type === NEWS) {
                state.newsList = [...state.newsList, ...action.payload];
            }
            state.error = null;
            state.success = "Контент успешно загружен";
        })
        builder.addCase(fetchContent.rejected, setFetchContentError)


        builder.addCase(fetchSingleContent.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.success = null;
        })
        builder.addCase(fetchSingleContent.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.content = action.payload;
            state.error = null;
            state.success = "Контент успешно загружен";
        })
        builder.addCase(fetchSingleContent.rejected, setFetchSingleContentError)
    }
})

export const {
    clearNewsList,
    clearArticleList,
    clearSingleContent,
    clearPreviewContent,
    setPreviewContentType,
    setPreviewContentForSlider,
    setPreviewContentTitle,
    setPreviewContentText,
    clearContentErrorStatusSuccess} = contentSlice.actions;

const persistedContentReducer = persistReducer(contentPersistConfig, contentSlice.reducer);
export default persistedContentReducer;