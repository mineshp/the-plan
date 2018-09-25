/* istanbul ignore next not testing file */
import React from 'react';
import { render } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import reducer from './reducers';
import setAuthorisationToken from './utils/setAuthorisationToken';
import Auth from './HOC/Authentication/Auth';
import { setCurrentUser } from './actions/authentication';

/* istanbul ignore next not testing redux-store-boiler-plate */
// eslint-disable-next-line no-underscore-dangle, no-undef
const envHasReduxDevToolsExtension = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);
/* istanbul ignore next not testing redux-store-boiler-plate */
function resolveComposerFunction() {
    return (envHasReduxDevToolsExtension) ?
        // eslint-disable-next-line no-underscore-dangle, no-undef
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
        compose;
}

/* istanbul ignore next not testing redux-store-boiler-plate */
const composeEnhancers = resolveComposerFunction();

/* istanbul ignore next not testing redux-store-boiler-plate */
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
/* istanbul ignore next not testing redux-store-boiler-plate */
const store = configureStore({});
const auth = new Auth();

if (auth.getToken()) {
    if (auth.isTokenExpired(auth.getToken())) {
        auth.logout();
        window.location = '/user/login';
    } else {
        // Set this as default headers
        setAuthorisationToken(auth.getToken());
        store.dispatch(setCurrentUser(auth.getUserProfile()));
    }
}

// TODO: To update the store for state persistence on every action update
// store.subscribe((() => {
//     console.log('calling set state with data ', store.getState().authentication.user.profilesToDisplay);
//     auth.saveProfileDataForUser(store.getState().authentication.user.profilesToDisplay);
// }));

/* istanbul ignore next not testing redux-store-boiler-plate */
render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
/* istanbul ignore next not testing redux-store-boiler-plate */
registerServiceWorker();

