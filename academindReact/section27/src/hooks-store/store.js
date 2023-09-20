import { useState, useEffect } from "react";

let globalState = {};
let listeners =  [];
let actions = {};

export const useStore = (shouldListen = true) => {
    const setState = useState(globalState)[1];
    const dispatch = (actionId, payload) => {
        const newState = actions[actionId](globalState, payload);
        globalState = {...globalState, ...newState};
        for (const listener of listeners) {
            listener(globalState);
        }
    }

    useEffect(() => {
        if (shouldListen) {
            listeners.push(setState);
        }

        return () => {
            listeners = listeners.filter((lis) => lis !== setState);
        }
    }, [setState]);

    return [globalState, dispatch];
};

export const initStore = (userActions, initState) => {
    if (initState) {
        globalState = {...globalState, ...initState}
    }

    actions = {...actions, ...userActions};
};