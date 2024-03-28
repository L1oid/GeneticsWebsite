import {NEWS} from "../../consts/contentTypes";

export const setPreviewContentReducer = (state, action) => {
    state.previewContent.type = action.payload.type
    state.previewContent.forSlider = action.forSlider
    state.previewContent.title = action.payload.title
    state.previewContent.text = action.payload.text
}

export const clearPreviewContentReducer = (state, action) => {
    state.previewContent.type = NEWS
    state.previewContent.forSlider = false
    state.previewContent.title = "Заголовок"
    state.previewContent.text = "Содержание"
}

export const clearNewsReducer = (state, action) => {
    state.news_list.splice(0, state.news_list.length)
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