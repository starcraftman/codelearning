const redux = require('redux');

const defaultState = { counter: 0 };
const counterReducer = (state = defaultState, action) => {
    return {
        counter: state.counter + 1
    };
};
const store = redux.createStore(counterReducer);

const counterSub = () => {
    const latestState = store.getState();
    console.log(latestState);
}
store.subscribe(counterSub);
store.dispatch({type: 'add'});

console.log('hello');
