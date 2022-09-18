import { TAuthActions } from  '../services/actions/auth-actions';
import { TBurgerActions } from  '../services/actions/burger-actions';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { TRootState } from '../index';

export type TUser = {
  email: string;
  name: string;
};
export type Actions = TAuthActions | TBurgerActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, Actions>>;
export type AppDispatch = Dispatch<Actions>;

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
