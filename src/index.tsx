import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { enableBatching } from 'redux-batched-actions';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { reducers } from './state/reducers';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const composeEnhancers = typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
  })
  : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const allReducers = enableBatching(combineReducers({
  ...reducers,
}));

const store = createStore(
  allReducers,
  enhancer,
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
