import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals.js';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/root-reducer';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { socketMiddleware } from './services/actions/websocket-actions';

// указать для socketMiddleware accessToken без Bearer в качестве query-параметра.
// wss://norma.nomoreparties.space/orders/all !!
// wss://norma.nomoreparties.space/api/orders
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl)));
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
      <App />
    </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
