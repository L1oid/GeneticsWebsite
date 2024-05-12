import {NEWS} from "../../consts/contentTypes";

export const clearPreviewContentReducer = (state, action) => {
    state.previewContent.type = NEWS
    state.previewContent.forSlider = false
    state.previewContent.title = ""
    state.previewContent.text = "<p><br></p>"
}

export const setRerenderAfterDeleteFalseReducer = (state, action) => {
    state.rerenderAfterDelete = false
}

export const clearNewsListReducer = (state, action) => {
    state.newsList.splice(0, state.newsList.length)
}

export const clearArticleListReducer = (state, action) => {
    state.articleList.splice(0, state.articleList.length)
}

export const clearSingleContentReducer = (state, action) => {
    state.content.id = null
    state.content.createdAt = null
    state.content.title = ""
    state.content.shortDesc = ""
    state.content.uploadedBy = null
    state.content.reviewImage = null
    state.content.content = ""
    state.content.imageList = []
    state.content.mediaFilesMap = {}
    state.content.type = null
}

export const setPreviewContentTypeReducer = (state, action) => {
    state.previewContent.type = action.payload
}

export const setPreviewContentForSliderReducer = (state, action) => {
    state.previewContent.forSlider = action.payload
}

export const setPreviewContentTitleReducer = (state, action) => {
    state.previewContent.title = action.payload
}

export const setPreviewContentTextReducer = (state, action) => {
    state.previewContent.text = action.payload
}

export const clearContentErrorStatusSuccessReducer = (state) => {
    state.error = null;
    state.status = null;
    state.success = null;
}