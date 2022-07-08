import { combineReducers } from 'redux';
import { ingredientsReducer } from './reducers';


export const rootReducer = combineReducers({ rootIngredients: ingredientsReducer });
