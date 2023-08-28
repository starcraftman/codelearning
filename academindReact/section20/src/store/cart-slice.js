import { createSlice } from "@reduxjs/toolkit";

const defaultCart = {
    items: []
};
const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultCart,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const foundItem = state.items.find((item) => item.id === newItem.id);
            if (foundItem) {
                foundItem.quantity += 1;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1
                })
            }
        },
        removeItem(state, action) {
            const itemId = action.payload.id;
            const foundItem = state.items.find((item) => item.id === itemId);
            if (!foundItem) {
                return;
            }

            if (foundItem.quantity > 1) {
                foundItem.quantity -= 1;
            } else {
                state.items = state.items.filter((item) => item.id !== itemId)
            }
        }
    }
})

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
