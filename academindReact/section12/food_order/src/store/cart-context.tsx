import React from "react";

import { CartItemType } from "../components/Cart/Cart";

const DEFAULT_CONTEXT = {
    items: [] as CartItemType[],
    totalAmount: 0,
    addItem: (item: CartItemType) => {},
    removeItem: (id: string) => {},
    getNumItems: () => 0,
}
const CartContext = React.createContext(DEFAULT_CONTEXT);

export default CartContext;
