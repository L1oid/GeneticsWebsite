export const api = {
    url: "http://genetic.kemsu.ru/",
    authorization: "api/users/submissions",
    changePassword: function (id) {
        return `api/users/${id}/password`
    },
    registrationUser: "api/users",
    articleCreation: "api/articles",
    createEvents: "api/events",
    createQuestionnaire: "api/questionnaires",
    solveQuestionnaire: "api/questionnaires/submissions",
    createCourse: "api/courses",
    getArticles: function(page, pageSize, type, author, title, date, dateFilter, orderByTitle) {
        let queryParams = `api/articles/filters?page=${page}&pageSize=${pageSize}&type=${type}`;

        if (author !== undefined && author !== "") {
            queryParams += `&author=${author}`;
        }
        if (title !== undefined && title !== "") {
            queryParams += `&title=${title}`;
        }
        if (date !== undefined && date !== "") {
            queryParams += `&date=${date}`;
        }
        if (dateFilter !== undefined && dateFilter !== "") {
            queryParams += `&dateFilter=${dateFilter}`;
        }
        if (orderByTitle !== undefined && orderByTitle !== "") {
            queryParams += `&orderByTitle=${orderByTitle}`;
        }

        return queryParams;
    },
    deleteArticle: function (id) {
        return `api/articles?id=${id}`
    },
    deleteUser: function (id) {
        return `api/users/${id}`
    },
    getAmountArticles: function(author, type, title, date, dateFilter) {
        let queryParams = `api/articles/amounts?type=${type}`

        if (author !== undefined && author !== "") {
            queryParams += `&author=${author}`;
        }
        if (title !== undefined && title !== "") {
            queryParams += `&title=${title}`;
        }
        if (date !== undefined && date !== "") {
            queryParams += `&date=${date}`;
        }
        if (dateFilter !== undefined && dateFilter !== "") {
            queryParams += `&dateFilter=${dateFilter}`;
        }

        return queryParams;
    },
    getImage: function(id) {
        return `api/files/${id}`
    },
    getVideo: function(id) {
        return `api/files/stream/${id}`
    },
    getAudio: function(id) {
        return `api/files/${id}`
    },
    getDocs: function(id) {
        return `api/files/${id}`
    },
    getSingleArticle: function(id) {
        return `api/articles/${id}`
    },
    getSliders: function(amount) {
        return `api/articles/sliders/${amount}`
    },
    getEvents: function(amount) {
        return `api/events?amount=${amount}`
    },
    deleteEvent: function (id) {
        return `api/events?id=${id}`
    },
    getUsers: function(page, pageSize, username, email, firstNamePlusLastName, date, dateFilter, orderBy, roleName) {
        let queryParams = `api/users/filters?page=${page}&pageSize=${pageSize}`

        if (username !== undefined && username !== "") {
            queryParams += `&username=${username}`;
        }
        if (email !== undefined && email !== "") {
            queryParams += `&email=${email}`;
        }
        if (firstNamePlusLastName !== undefined && firstNamePlusLastName !== "") {
            queryParams += `&firstNamePlusLastName=${firstNamePlusLastName}`;
        }
        if (date !== undefined && date !== "") {
            queryParams += `&creationDate=${date}`;
        }
        if (dateFilter !== undefined && dateFilter !== "") {
            queryParams += `&dateFilter=${dateFilter}`;
        }
        if (orderBy !== undefined && orderBy !== "") {
            queryParams += `&orderBy=${orderBy}`;
        }
        if (roleName !== undefined && roleName !== "") {
            queryParams += `&roleName=${roleName}`;
        }

        return queryParams;
    },
    getAmountUsers: function(username, email, firstNamePlusLastName, date, dateFilter, roleName) {
        let queryParams = `api/users/amounts?`

        if (username !== undefined && username !== "") {
            queryParams += `&username=${username}`;
        }
        if (email !== undefined && email !== "") {
            queryParams += `&email=${email}`;
        }
        if (firstNamePlusLastName !== undefined && firstNamePlusLastName !== "") {
            queryParams += `&firstNamePlusLastName=${firstNamePlusLastName}`;
        }
        if (date !== undefined && date !== "") {
            queryParams += `&creationDate=${date}`;
        }
        if (dateFilter !== undefined && dateFilter !== "") {
            queryParams += `&dateFilter=${dateFilter}`;
        }
        if (roleName !== undefined && roleName !== "") {
            queryParams += `&roleName=${roleName}`;
        }

        return queryParams;
    },
    getQuestionnaires: function(page, pageSize, title, createdBy, createdAt, dateFilter, orderByTitle) {
        let queryParams = `api/questionnaires?page=${page}&pageSize=${pageSize}`

        if (createdBy !== undefined && createdBy !== "") {
            queryParams += `&createdBy=${createdBy}`;
        }
        if (title !== undefined && title !== "") {
            queryParams += `&title=${title}`;
        }
        if (createdAt !== undefined && createdAt !== "") {
            queryParams += `&createdAt=${createdAt}`;
        }
        if (dateFilter !== undefined && dateFilter !== "") {
            queryParams += `&dateFilter=${dateFilter}`;
        }
        if (orderByTitle !== undefined && orderByTitle !== "") {
            queryParams += `&orderByTitle=${orderByTitle}`;
        }

        return queryParams;
    },
    getAmountQuestionnaires: function(title, createdBy, createdAt, dateFilter) {
        let queryParams = `api/questionnaires/amounts?`

        if (createdBy !== undefined && createdBy !== "") {
            queryParams += `&createdBy=${createdBy}`;
        }
        if (title !== undefined && title !== "") {
            queryParams += `&title=${title}`;
        }
        if (createdAt !== undefined && createdAt !== "") {
            queryParams += `&createdAt=${createdAt}`;
        }
        if (dateFilter !== undefined && dateFilter !== "") {
            queryParams += `&dateFilter=${dateFilter}`;
        }

        return queryParams;
    },
    deleteQuestionnaire: function (questionnaireId) {
        return `api/questionnaires/${questionnaireId}`
    },
    getQuestionnaire: function (id) {
        return `api/questionnaires/ids/${id}`
    },
    getQuestionnaireQuestions: function (questionnaireId) {
        return `api/questionnaires/questions?questionnaireId=${questionnaireId}`
    },
    getQuestionnaireQuestionsAnswers: function (questionId) {
        return `api/questionnaires/questions/answers-to-choose?questionId=${questionId}`
    },
    getQuestionnaireResults: function (id) {
        return `api/questionnaires/results/export?id=${id}`
    },
    getCourses: function (page, pageSize, courseProtection, searchQuery, author, date, dateFilter, orderByTitleAuthor) {
        let queryParams = `api/courses/filters?courseProtection=${courseProtection}`

        if (page !== undefined && page !== "") {
            queryParams += `&page=${page}`;
        }
        if (pageSize !== undefined && pageSize !== "") {
            queryParams += `&pageSize=${pageSize}`;
        }
        if (searchQuery !== undefined && searchQuery !== "") {
            queryParams += `&searchQuery=${searchQuery}`;
        }
        if (author !== undefined && author !== "") {
            queryParams += `&author=${author}`;
        }
        if (date !== undefined && date !== "") {
            queryParams += `&date=${date}`;
        }
        if (dateFilter !== undefined && dateFilter !== "") {
            queryParams += `&dateFilter=${dateFilter}`;
        }
        if (orderByTitleAuthor !== undefined && orderByTitleAuthor !== "") {
            queryParams += `&orderByTitleAuthor=${orderByTitleAuthor}`;
        }

        return queryParams;
    },
    getCoursesAmount: function (courseProtection, searchQuery, author, date, dateFilter) {
        let queryParams = `api/courses/count?courseProtection=${courseProtection}`


        if (searchQuery !== undefined && searchQuery !== "") {
            queryParams += `&searchQuery=${searchQuery}`;
        }
        if (author !== undefined && author !== "") {
            queryParams += `&author=${author}`;
        }
        if (date !== undefined && date !== "") {
            queryParams += `&date=${date}`;
        }
        if (dateFilter !== undefined && dateFilter !== "") {
            queryParams += `&dateFilter=${dateFilter}`;
        }

        return queryParams;
    },
    getCourse: function (id) {
        return `api/courses?id=${id}`;
    },
    deleteCourse: function (id) {
        return `api/courses?id=${id}`
    },
    getUserInfo: function (id) {
        return `api/users?id=${id}`;
    },
    editUserInfo: function (id) {
        return `api/users/${id}/information`;
    }
}