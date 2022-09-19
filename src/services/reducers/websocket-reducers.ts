import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_MESSAGE,
} from '../actions/websocket-actions';
import type { TWebsocketActions } from '../actions/websocket-actions';
import type { TOrder } from '../../types/types';
type TInitialState = {
  wsConnected: boolean,
  data: {orders?:Array<TOrder>},
  isData: boolean,
  error: object,
};
type TInitialStateAuth = {
  wsUserConnected: boolean,
  userData: {orders?:Array<TOrder>},
  isUserData: boolean,
  error: object
};

const initialState:TInitialState = {
  wsConnected: false,
  data: {},
  isData: false,
  error: {}
};
const initialStateAuth:TInitialStateAuth = {
  wsUserConnected: false,
  userData: {},
  isUserData: false,
  error: {}
};
export const wsReducer = (state = initialState, action:TWebsocketActions):TInitialState => {
  switch (action.type) {
    // Установим флаг wsConnected в состояние true
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: {},
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: {},
        wsConnected: false
      };
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: {},
        data: action.payload,
        isData: true
      };

    default:
      return state;
  }
};
export const wsAuthReducer = (state = initialStateAuth, action:TWebsocketActions):TInitialStateAuth => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        error: {},
        wsUserConnected: true
      };
    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsUserConnected: false
      };
    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        error: {},
        wsUserConnected: false
      };
    case WS_AUTH_GET_MESSAGE:
      return {
        ...state,
        error: {},
        userData: action.payload,
        isUserData: true
      };
    default:
      return state;
  }
};
