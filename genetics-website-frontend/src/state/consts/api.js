export const api = {
    url: "http://genetic.kemsu.ru/genetics/",
    authorization: "api/users/submissions",
    changePassword: "api/users/",
    registrationUser: "api/users",
    articleCreation: "api/articles",
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
    createEvents: function() {
        return `api/events`
    },
    createQuestionnaire: function() {
        return `api/questionnaires`
    }
}