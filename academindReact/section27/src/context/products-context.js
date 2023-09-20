import React, { useState } from "react";

const DEFAULT_PRODUCTS = [
    {
        id: 'p1',
        title: 'Red Scarf',
        description: 'A pretty red scarf.',
        isFavorite: false
    },
    {
        id: 'p2',
        title: 'Blue T-Shirt',
        description: 'A pretty blue t-shirt.',
        isFavorite: false
    },
    {
        id: 'p3',
        title: 'Green Trousers',
        description: 'A pair of lightly green trousers.',
        isFavorite: false
    },
    {
        id: 'p4',
        title: 'Orange Hat',
        description: 'Street style! An orange hat.',
        isFavorite: false
    }
];

export const ProductsContext = React.createContext({
    products: [],
    toggleFav: (productId) => {}
});

const ProductsContextProvider = (props) => {
    const [products, setProducts] = useState(DEFAULT_PRODUCTS);


    const toggleFavorite = (productId) => {
        setProducts((currentProducts) => {
            const productIndex = currentProducts.findIndex((prod) => prod.id === productId);
            const updatedProducts = [...currentProducts];
            updatedProducts[productIndex] = {
                ...updatedProducts[productIndex],
                isFavorite: !updatedProducts[productIndex].isFavorite
            };

            return updatedProducts
        });
    };
    
    return (
        <ProductsContext.Provider value={{products, toggleFav: toggleFavorite}}>
            {props.children}
        </ProductsContext.Provider>
    );
};
export default ProductsContextProvider;