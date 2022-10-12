export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_AUTH_CONNECTION_START: 'WS_AUTH_CONNECTION_START' = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_SEND_MESSAGE: 'WS_AUTH_SEND_MESSAGE' = 'WS_AUTH_SEND_MESSAGE';
export const WS_AUTH_CONNECTION_SUCCESS: 'WS_AUTH_CONNECTION_SUCCESS' = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_CLOSED: 'WS_AUTH_CONNECTION_CLOSED' = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_AUTH_CONNECTION_ERROR: 'WS_AUTH_CONNECTION_ERROR' = 'WS_AUTH_CONNECTION_ERROR';
export const WS_AUTH_GET_MESSAGE: 'WS_AUTH_GET_MESSAGE' = 'WS_AUTH_GET_MESSAGE';

export interface IWsConnectionStart{
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionSuccess{
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError{
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: object;
}
export interface IWsConnectionClosed{
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessage{
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: object;
}
export interface IWsSendMessage{
  readonly type: typeof WS_SEND_MESSAGE;
}
export interface IWsAuthConnectionStart{
  readonly type: typeof WS_AUTH_CONNECTION_START;
}
export interface IWsAuthSendMessage{
  readonly type: typeof WS_AUTH_SEND_MESSAGE;
}
export interface IWsAuthConnectionSuccess{
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}
export interface IWsAuthConnectionClosed{
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}
export interface IWsAuthConnectionError{
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
  readonly payload: object;
}
export interface IWsAuthGetMessage{
  readonly type: typeof WS_AUTH_GET_MESSAGE;
  readonly payload: object;
}


export type TWebsocketActions =
IWsConnectionStart|
IWsConnectionSuccess|
IWsConnectionError|
IWsConnectionClosed|
IWsGetMessage|
IWsSendMessage|
IWsAuthConnectionStart|
IWsAuthSendMessage|
IWsAuthConnectionSuccess|
IWsAuthConnectionClosed|
IWsAuthConnectionError|
IWsAuthGetMessage;
