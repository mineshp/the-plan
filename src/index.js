import React from 'react';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import reducer from './reducers'
import { BrowserRouter } from 'react-router-dom';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
