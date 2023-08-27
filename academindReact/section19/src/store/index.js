import { createStore } from "redux";

const defaultState = {
    counter: 0,
    showCounter: true
};
const reducer = (prevState, action) => {
    console.log('act', action);
    if (action.type === "inc") {
        return {
            ...prevState,
            counter: prevState.counter + (action.amt ? action.amt : 1),
        }
    } else if (action.type === "dec") {
        return {
            ...prevState,
            counter: prevState.counter - (action.amt ? action.amt : 1),
        }
    } else if (action.type === "toggle") {
        return {
            ...prevState,
            showCounter: !prevState.showCounter
        }
    }

    return defaultState;
}

const store = createStore(reducer);
export default store;
