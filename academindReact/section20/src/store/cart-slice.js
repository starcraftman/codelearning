import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    }, 
    reducers: {
        addItem(state, action) {
            const newItem = action.payload.item;
            const foundItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity += 1;

            if (!foundItem) {
                state.items.push({
                    itemId: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                foundItem.quantity += 1
                foundItem.totalPrice = foundItem.totalPrice + newItem.price;
            }
        },
        removeItem(state, action) {
            const newItem = action.payload.item;
            const existingItem = state.items.find(item => item.id === newItem.id); 
            state.totalQuantity -= 1;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item !== newItem.id)
            } else {
                existingItem.quantity -= 1;
                existingItem.totalPrice = existingItem.totalPrice - newItem.price;
            }
        }
    }
})

export default cartSlice;
export const cartActions = cartSlice.actions;