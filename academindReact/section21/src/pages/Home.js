import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <React.Fragment>
      <h1>My home page!</h1>
      <p>
        Go to <Link to="/products">the list of products</Link>
      </p>
    </React.Fragment>
  );
}

export default HomePage;
