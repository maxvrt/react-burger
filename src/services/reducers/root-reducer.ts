import { combineReducers } from 'redux';
import { authReducer } from './auth-reducers';
import { ingredientsReducer } from './burger-reducers';
import { wsReducer, wsAuthReducer } from './websocket-reducers';

export const rootReducer = combineReducers({ rootIngredients: ingredientsReducer, rootAuth: authReducer, rootWs: wsReducer,  rootWsAuth: wsAuthReducer});
