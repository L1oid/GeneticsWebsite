import {NEWS} from "../../consts/contentTypes";

export const clearPreviewContentReducer = (state, action) => {
    state.previewContent.type = NEWS
    state.previewContent.forSlider = false
    state.previewContent.title = ""
    state.previewContent.text = "<p><br></p>"
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