import {createSlice} from "@reduxjs/toolkit";

const layoutSlice = createSlice({
    name: "layout",
    initialState: {
        burgerMenuStatus: null,
    },
    reducers: {
        saveBurgerMenuStatus(state, action) {
            state.burgerMenuStatus = action.payload;
        }
    },
})

export const {saveBurgerMenuStatus} = layoutSlice.actions;
export default layoutSlice.reducer;