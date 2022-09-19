import { TAuthActions } from  '../services/actions/auth-actions';
import { TBurgerActions } from  '../services/actions/burger-actions';
import { TWebsocketActions } from  '../services/actions/websocket-actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { TRootState } from '../index';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import 'redux-thunk/extend-redux';
import { store } from  '../index';

export type TIngItem = {
  // _id для разметки в order-component.tsx
  _id: any;
  uuid: number;
  name: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

export type TOrder = {
  _id: string;
  ingredients: Array<TIngItem>;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  status: 'created' | 'pending' | 'done';
};
// export type ObjectItem = {
//   uuid?:number
// }
export type TUser = {
  email: string;
  name: string;
};
export type Actions = TAuthActions | TBurgerActions | TWebsocketActions;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = Promise<any> | void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, Actions>
  >;

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

//export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, Actions>>;
// export type AppDispatch = Dispatch<Actions>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   TRootState,
//   unknown,
//   Actions
// >;
//export type AppThunk<ReturnType = Promise<any> | void> = ActionCreator< ThunkAction<ReturnType, Action, TRootState, Actions> >;
//export type AppDispatch = ThunkDispatch<TRootState, never, Actions>;






export type TResponseBody = {
  success: boolean;
  message?: string;
  headers?: Headers;
  data:{data:object}
};
export interface CustomResponse<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  accessToken: string;
  response: T;
  readonly user: object;
  data: {data:object};
  clone(): Response;
  json(): Promise<T>;
}


