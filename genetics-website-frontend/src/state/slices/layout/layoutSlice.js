import {createSlice} from "@reduxjs/toolkit";

const layoutSlice = createSlice({
    name: "layout",
    initialState: {
        burgerMenuStatus: null,
        footerInfo: {
            address: "650000, г. Кемерово, пр-т Советский, д.73, корпус 2, № 422",
            phone: "+7 (3842) 58-01-66",
            email: "Fund.med2021@mail.ru",
            copyright: "2024 Кафедра генетики и фундаментальной медицины"
        }
    },
    reducers: {
        saveBurgerMenuStatus(state, action) {
            state.burgerMenuStatus = action.payload;
        }
    },
})

export const {saveBurgerMenuStatus} = layoutSlice.actions;
export default layoutSlice.reducer;