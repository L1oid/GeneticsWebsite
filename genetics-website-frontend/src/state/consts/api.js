export const api = {
    url: "http://webschedulekemsu.ddnsking.com:2023/GeneticsWebBackend-1.0-SNAPSHOT/",
    authorization: "api/users/submissions",
    changePassword: "api/users/",
    registrationUser: "api/users",
    articleCreation: "api/articles",
    getArticles: function(page, pageSize, type) {
        return `api/articles/page=${page}&pageSize=${pageSize}&type=${type}`;
    },
    getImage: function(id) {
        return `api/files/images/${id}`
    },
    getSingleArticle: function(id) {
        return `api/articles/${id}`
    }
}