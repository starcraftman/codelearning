import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counter-slice";
import { authReducer } from "./auth-slice"
// Means to re-export an import, bit odd
export { counterActions } from "./counter-slice";
export { authActions } from "./auth-slice"
const store = configureStore({
    // Method for merging many reducers
    reducer: {
        counter: counterReducer,
        auth: authReducer
    }
});
export default store;