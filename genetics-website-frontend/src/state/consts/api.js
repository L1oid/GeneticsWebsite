export const api = {
    //url: "http://genetic.kemsu.ru/genetics/",
    url: "http://webschedulekemsu.ddnsking.com:2023/GeneticsWebBackend-1.0-SNAPSHOT/",
    authorization: "api/users/submissions",
    changePassword: "api/users/",
    registrationUser: "api/users",
    articleCreation: "api/articles",
    createEvents: "api/events",
    createQuestionnaire: "api/questionnaires",
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
        return `api/files/images/${id}`
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
}