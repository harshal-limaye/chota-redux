function createStore(reducer) {
    let state;
    const listeners = [];

    function getState() {
        return state;
    }

    function subscribe(listener) {
        listeners.push(listener);

        return () => {
            listeners.splice(listeners.indexOf(listener), 1);
        }
    }

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => {
            listener();
        });
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

function combineReducers(reducers) {
    return (state, action) => {
        state = state ? state : {};
        const newState = {};

        Object.keys(reducers).forEach((key) => {
            newState[key] = reducers[key](state[key], action);
        });

        return newState;
    }
}
