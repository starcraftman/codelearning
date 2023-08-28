import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart-slice"
import { uiReducer } from "./ui-slice";

const store = configureStore({
    // Method for merging many reducers
    reducer: {
        cart: cartReducer,
        ui: uiReducer
    }
});
export default store;
