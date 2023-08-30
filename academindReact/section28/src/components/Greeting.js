import { useState } from 'react';

import Output from "./Output";

const Greeting = () => {
    const [changedText, setChangedText] = useState(false);
    const changeHandler = () => {
        setChangedText(!changedText);
    }
    return (
        <div>
            <h2>Hello world</h2>
            <Output>{changedText ? "Changed" : "It's good to see you."}</Output>
            <button onClick={changeHandler}>Change text!</button>
        </div>
    );
}

export default Greeting;
