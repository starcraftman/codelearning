import React from "react";
import MyParagraph from "./MyParagraph"

const DemoOutput = (props) => {
    console.log("DemoOutput RUNNING");
    return <MyParagraph>{props.show ? "This is new" : ""}</MyParagraph>
}

// Only re-evaluate if props change.
export default React.memo(DemoOutput);