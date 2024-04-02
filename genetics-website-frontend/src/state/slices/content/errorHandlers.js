export const setFetchNewsError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
    state.success = null;
}

export const setArticleCreationError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
    state.success = null;
}