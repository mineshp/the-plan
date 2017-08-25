import React from 'react';
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import reducer from './reducers'
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line no-underscore-dangle, no-undef
const envHasReduxDevToolsExtension = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);

function resolveComposerFunction() {
    return (envHasReduxDevToolsExtension) ?
        // eslint-disable-next-line no-underscore-dangle, no-undef
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
        compose;
}

const composeEnhancers = resolveComposerFunction();

function configureStore(preloadedState) {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeEnhancers(...storeEnhancers);

    const store = createStore(
        reducer,
        preloadedState,
        composedEnhancer,
    );

    return store;
}

const store = configureStore({});
render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();



