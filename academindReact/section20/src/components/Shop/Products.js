import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [{
  id: "p01",
  title: 'Test',
  price: 6.99,
  description: 'This is a first product - amazing!'
},
{
  id: "p02",
  title: 'Second Book',
  price: 9.99,
  description: 'This is a second book.' 
}]

const Products = (props) => {
  const productItems = DUMMY_PRODUCTS.map(item => <ProductItem key={item.id} {...item} />)

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productItems}
      </ul>
    </section>
  );
};

export default Products;
