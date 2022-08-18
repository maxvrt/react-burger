import { combineReducers } from 'redux';
import { authReducer } from './auth-reducers';
import { ingredientsReducer } from './burger-reducers';

export const rootReducer = combineReducers({ rootIngredients: ingredientsReducer, rootAuth: authReducer });
