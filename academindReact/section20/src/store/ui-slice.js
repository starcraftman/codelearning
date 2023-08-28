import { createSlice } from "@reduxjs/toolkit";

const defaultUi = {
    cartVisible: false
};
const uiSlice = createSlice({
    name: 'ui',
    initialState: defaultUi,
    reducers: {
        toggle(state) {
            state.cartVisible = !state.cartVisible;
        }
    }
})

export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;
