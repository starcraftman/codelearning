import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "First Book",
    description: "First book"
  },
  {
    id: "p2",
    price: 9,
    title: "Second Book",
    description: "Second book"
  }
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => {
          return <ProductItem {...product} />
        })
        }
      </ul>
    </section>
  );
};

export default Products;
