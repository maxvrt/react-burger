import { TAuthActions } from  '../services/actions/auth-actions';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { TRootState } from '../index';

export type TUser = {
  email: string;
  name: string;
};
export type Actions = TAuthActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, Actions>>;
export type AppDispatch = Dispatch<Actions>;
