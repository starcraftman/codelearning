import React from "react";
import { Link } from "react-router-dom";
const DUMMY_PRODUCTS = [
    {id: 'p1', title: "Product 1"},
    {id: 'p2', title: "Product 2"},
    {id: 'p3', title: "Product 3"},
]
function ProductsPage() {

  const productElements = DUMMY_PRODUCTS.map((item) => {
    return (
        <li key={item.id}><Link to={item.id}>{item.title}</Link></li>
    );
  })
  return (
    <>
      <h1>My products page!</h1>
      <ul>
        {productElements}
      </ul>
    </>
  );
}

export default ProductsPage;
