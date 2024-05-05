export const api = {
    url: "http://genetic.kemsu.ru/genetics/",
    authorization: "api/users/submissions",
    changePassword: "api/users/",
    registrationUser: "api/users",
    articleCreation: "api/articles",
    getArticles: function(page, pageSize, type, author, title, date) {
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

        return queryParams;
    },
    getAmountArticles: function(author, type, title, date) {
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

        return queryParams;
    },
    getImage: function(id) {
        return `api/files/images/${id}`
    },
    getSingleArticle: function(id) {
        return `api/articles/${id}`
    }
}