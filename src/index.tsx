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
import { socketMiddleware } from './services/middleWares/socketMiddleWare';
import {
  WS_CONNECTION_START,
  WS_SEND_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_MESSAGE,
  WS_AUTH_SEND_MESSAGE
} from './services/actions/websocket-actions';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// указать для socketMiddleware accessToken без Bearer в качестве query-параметра.
// wss://norma.nomoreparties.space/orders/all
const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  wsOnOpen: WS_CONNECTION_SUCCESS,
  wsOnClose: WS_CONNECTION_CLOSED,
  wsOnError: WS_CONNECTION_ERROR,
  wsOnMessage: WS_GET_MESSAGE
}
const wsUserActions = {
  wsAuthInit: WS_AUTH_CONNECTION_START,
  wsAuthSendMessage: WS_AUTH_SEND_MESSAGE,
  wsAuthOnOpen: WS_AUTH_CONNECTION_SUCCESS,
  wsAuthOnClose: WS_AUTH_CONNECTION_CLOSED,
  wsAuthOnError: WS_AUTH_CONNECTION_ERROR,
  wsAuthOnMessage: WS_AUTH_GET_MESSAGE
};

export type TWsActions = {
  readonly wsInit?: typeof WS_CONNECTION_START,
  readonly wsSendMessage?: typeof WS_SEND_MESSAGE,
  readonly wsOnOpen?: typeof WS_CONNECTION_SUCCESS,
  readonly wsOnClose?: typeof WS_CONNECTION_CLOSED,
  readonly wsOnError?: typeof WS_CONNECTION_ERROR,
  readonly wsOnMessage?: typeof WS_GET_MESSAGE

 readonly wsAuthInit?: typeof WS_AUTH_CONNECTION_START,
 readonly wsAuthSendMessage?: typeof WS_AUTH_SEND_MESSAGE,
 readonly wsAuthOnOpen?: typeof WS_AUTH_CONNECTION_SUCCESS,
 readonly wsAuthOnClose?: typeof WS_AUTH_CONNECTION_CLOSED,
 readonly wsAuthOnError?: typeof WS_AUTH_CONNECTION_ERROR,
 readonly wsAuthOnMessage?: typeof WS_AUTH_GET_MESSAGE
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsAuthUrl = 'wss://norma.nomoreparties.space/orders';

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsAuthUrl, wsUserActions)));
export const store = createStore(rootReducer, enhancer);
export type TRootState = ReturnType<typeof rootReducer>;

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
