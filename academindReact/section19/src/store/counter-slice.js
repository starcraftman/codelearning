import { createSlice } from "@reduxjs/toolkit";

const defaultCounter = {
    counter: 0,
    showCounter: true
};

const counterSlice = createSlice({
    name: 'counter',
    initialState: defaultCounter
,
    reducers: {
        increment(state, action) {
            state.counter = state.counter + (action.payload ? action.payload.amt : 1);
        },
        decrement(state, action) {
            state.counter = state.counter - (action.payload ? action.payload.amt : 1);
        },
        toggle(state) {
            state.showCounter = !state.showCounter;
        },
        reset(state) {
            state.counter = 0;
        },
    }
})

export const counterReducer = counterSlice.reducer;
export const counterActions = counterSlice.actions;