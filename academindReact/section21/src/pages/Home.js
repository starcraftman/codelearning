import React from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    const navHandler = () => {
        navigate("/products");
    }
    
  return (
    <React.Fragment>
      <h1>My home page!</h1>
      <p>
        Go to <Link to="/products">the list of products</Link>
      </p>
      <p>
        <button onClick={navHandler} >Nvaigate</button>
      </p>
    </React.Fragment>
  );
}

export default HomePage;
