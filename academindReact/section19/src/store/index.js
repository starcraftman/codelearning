import { createSlice, configureStore } from "@reduxjs/toolkit";

const defaultState = {
    counter: 0,
    showCounter: true
};

const counterSlice = createSlice({
    name: 'counter',
    initialState: defaultState,
    reducers: {
        increment(state, action) {
            console.log(action);
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



const store = configureStore({
    // Method for merging many reducers
    reducer: {
        counter: counterSlice.reducer
    }
});
export default store;

export const counterActions = counterSlice.actions;