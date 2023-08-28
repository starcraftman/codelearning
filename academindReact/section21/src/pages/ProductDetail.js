import { useParams, Link } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Product Details for id: {params.productId}</h1>
      <p>
        <Link to=".." relative="path">Back</Link>
      </p>
    </>
  );
}

export default ProductDetailPage;
