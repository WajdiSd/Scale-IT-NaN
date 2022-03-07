// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export function configureStore(initialState: {}) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)));
    // sagaMiddleware.run(sagas);
    return store;
}
