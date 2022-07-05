import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  INGREDIENTS_CONSTRUCTOR,
  INGREDIENT_DESC_ADD,
  INGREDIENT_DESC_DEL,
  GET_ORDER_NUMBER,
  UPD_ORDER_NUMBER,
} from '../actions/components';


const initialIngredients = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: false,
  selectedIngredients: [],
  ingredientObject: {},
  order: {},
  bunType:'',
  orderLoading: false,
  orderError: false,
};

export const ingredientsReducer = (state = initialIngredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
        return {
          ...state,
          ingredientsLoading: true,
          ingredientsError: false,
        };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsLoading: false,
        ingredientsError: false,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsLoading: false,
        ingredientsError: true,
      };
    }
    default: {
      return state;
    }
  }
}
