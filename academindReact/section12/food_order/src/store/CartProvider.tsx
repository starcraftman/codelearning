import React from "react";

import CartContext from "./cart-context";

interface CartContextType {
    items : string[];
    totalAmount: number;
    addItem: (item: string) => void;
    removeItem: (id: string) => void;
};

interface PropsType {
    children: string | number | React.ReactNode | React.ReactNode[];
}

const CartProvider = (props: PropsType) => {
    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: (item: string) => {

        },
        removeItem: (id: string) => {

        }
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;