import { getCookie } from '../../utils/cookie'

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export const WS_AUTH_CONNECTION_START = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_SEND_MESSAGE = 'WS_AUTH_SEND_MESSAGE';
export const WS_AUTH_CONNECTION_SUCCESS = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_CLOSED = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_AUTH_CONNECTION_ERROR = 'WS_AUTH_CONNECTION_ERROR';
export const WS_AUTH_GET_MESSAGE = 'WS_AUTH_GET_MESSAGE';

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;
    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsAuthInit, wsOnOpen, wsSendMessage, wsOnClose, wsOnError, wsOnMessage } = wsActions;
      if (type === wsInit) {
        console.log('запускаем вебсокет');
        socket = new WebSocket(wsUrl);
      }
      if (type === wsAuthInit) {
        const token = getCookie('token');
        if (token) {
          console.log('запускаем авторизованный вебсокет');
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
          console.log(event);
          const { data } = event;
          const parsed = JSON.parse(data);
          dispatch({ type: wsOnMessage, payload: parsed });
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
