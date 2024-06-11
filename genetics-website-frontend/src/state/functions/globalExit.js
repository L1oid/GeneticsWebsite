import {removeUserReducer} from "../slices/user/reducers";

export const globalExit = (state) => {
    removeUserReducer(state);
}