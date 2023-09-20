import { initStore } from "./store";

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

const configureStore = () => {
    const userActions = {
        TOGGLE_FAV: (curState, productId) => {
            const productIndex = curState.products.findIndex((prod) => prod.id === productId);
            const updatedProducts = [...curState.products];
            updatedProducts[productIndex] = {
                ...updatedProducts[productIndex],
                isFavorite: !updatedProducts[productIndex].isFavorite
            };

            return { products: updatedProducts };
        },
    };

    initStore(userActions, { products: DEFAULT_PRODUCTS });
};

export default configureStore;