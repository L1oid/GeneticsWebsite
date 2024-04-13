import {removeUserReducer} from "../slices/user/reducers";
import {clearPreviewContentReducer} from "../slices/content/reducers";

export const globalExit = (state) => {
    removeUserReducer(state);
    clearPreviewContentReducer(state);
}