import { createStore } from "redux";

const defaultState = {
    counter: 0
};
const reducer = (prevState, action) => {
    console.log('act', action);
    if (action.type === "inc") {
        return {
            counter: prevState.counter + 1,
        }
    } else if (action.type === "dec") {
        return {
            counter: prevState.counter - 1,
        } 
    }

    return defaultState;
}

const store = createStore(reducer);
export default store;