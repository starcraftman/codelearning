import React from "react";

import Concept from "./ConceptItem";

const Concepts = (props) => {
  const conceptItems = props.concepts.map((con) => {
    return (
      <Concept title={con.title} image={con.image} description={con.description} />
    );
  });

  return (
    <ul id="concepts">
      {conceptItems}
    </ul>
  );
}

export default Concepts;
