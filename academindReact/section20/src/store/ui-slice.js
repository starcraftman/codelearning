import { createSlice } from "@reduxjs/toolkit";

const defaultUi = {
    cartVisible: false,
    notification: null
};
const uiSlice = createSlice({
    name: 'ui',
    initialState: defaultUi,
    reducers: {
        toggle(state) {
            state.cartVisible = !state.cartVisible;
        },
        showNotification(state, action) {
            state.notification = action.payload;
        },
        clearNotification(state) {
            state.notification = null;
        }
    }
})

export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;
