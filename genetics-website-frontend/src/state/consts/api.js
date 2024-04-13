export const api = {
    url: "http://genetic.kemsu.ru:8082/geneticsWar/",
    authorization: "api/users/submissions",
    changePassword: "api/users/",
    registrationUser: "api/users",
    articleCreation: "api/articles",
    getArticles: function(amount, type) {
        return `api/articles/amount=${amount}&type=${type}`;
    },
    getImage: function(id) {
        return `api/files/images/${id}`
    },
    getSingleArticle: function(id) {
        return `api/articles/${id}`
    }
}