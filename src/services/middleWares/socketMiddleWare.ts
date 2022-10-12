import { getCookie } from '../../utils/cookie'
import type { Middleware, MiddlewareAPI } from 'redux';
//import type {TWsActions} from '../../index'

export type TWsActions = {
  wsInit?: string;
  wsAuthInit?:string;
  wsSendMessage: string;
  wsOnOpen: string;
  wsOnClose: string;
  wsOnError: string;
  wsOnMessage: string;
};
export const socketMiddleware = (wsUrl:string, wsActions:TWsActions): Middleware => {
  return (store:MiddlewareAPI) => {
    let socket:WebSocket | null = null;
    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsAuthInit, wsOnOpen, wsSendMessage, wsOnClose, wsOnError, wsOnMessage } = wsActions;
      if (type && type === wsInit) {
        console.log('запускаем веб-сокет');
        socket = new WebSocket(wsUrl);
      }
      if (type && type === wsAuthInit) {
        const token = getCookie('token');
        if (token) {
          console.log('запускаем авторизованный веб-сокет');
          socket = new WebSocket(`${wsUrl}?token=${token}`);
        }
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: wsOnOpen, payload: event });
        };
        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: wsOnError, payload: event });
        };
        // получаем orders и прочее с сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsed = JSON.parse(data);
          //if (wsAuthOnMessage) dispatch({ type: wsAuthOnMessage, payload: parsed });
          if (wsOnMessage) dispatch({ type: wsOnMessage, payload: parsed });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: wsOnClose, payload: event });
        };
        if (type === wsSendMessage) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
};
