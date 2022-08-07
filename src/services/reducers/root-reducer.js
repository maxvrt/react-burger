import { combineReducers } from 'redux';
import { ingredientsReducer, authReducer } from './reducers';


export const rootReducer = combineReducers({ rootIngredients: ingredientsReducer, rootAuth: authReducer });
