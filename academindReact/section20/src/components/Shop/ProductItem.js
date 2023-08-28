import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const ProductItem = (props) => {
  const { id, title, price, description } = props;
  const dispatch = useDispatch();

  const addItemHandler = () => {
    console.log("Add item", title);
    dispatch(cartActions.addItem({
      id,
      title,
      price
    }))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItemHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;


// Suboptimal code provided for study.

// import Card from '../UI/Card';
// import classes from './ProductItem.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { cartActions } from '../../store/cart-slice';

// const ProductItem = (props) => {
//   const cart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const { id, title, price, description } = props;

//   const addItemHandler = () => {
//     const updatedItems = cart.items.slice(); // create copy via slice to avoid mutating original state
//     const existingItem = updatedItems.find((item) => item.id === id);
//     if (existingItem) {
//       const updatedItem = { ...existingItem }; // new object + copy existing properties to avoid state mutation
//       updatedItem.quantity++;
//       const existingItemIndex = updatedItems.findIndex(
//         (item) => item.id === id
//       );
//       updatedItems[existingItemIndex] = updatedItem;
//     } else {
//       updatedItems.push({
//         id,
//         price,
//         title,
//         quantity: 1,
//       });
//     }

//     const newCart = {
//       items: updatedItems,
//     };
//     dispatch(cartActions.replaceCart(newCart));

//     // and then send Http request
//     // fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })

//     // dispatch(
//     //   cartActions.addItemToCart({
//     //     id,
//     //     title,
//     //     price,
//     //   })
//     // );
//   };

//   return (
//     <li className={classes.item}>
//       <Card>
//         <header>
//           <h3>{title}</h3>
//           <div className={classes.price}>${price.toFixed(2)}</div>
//         </header>
//         <p>{description}</p>
//         <div className={classes.actions}>
//           <button onClick={addItemHandler}>Add to Cart</button>
//         </div>
//       </Card>
//     </li>
//   );
// };

// export default ProductItem;