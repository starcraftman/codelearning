import React from "react";

const DemoOutput = (props) => {
    console.log("MyParagraph RUNNING");
    return <p>{props.children}</p>
}

export default DemoOutput;