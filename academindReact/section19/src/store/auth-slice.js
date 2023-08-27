import { createSlice } from "@reduxjs/toolkit";

const defaultAuth = {
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState: defaultAuth,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
})

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;