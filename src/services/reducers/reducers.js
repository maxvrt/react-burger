import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  SET_BUN,
  INGREDIENTS_CONSTRUCTOR,
  INGREDIENT_DESC_ADD,
  INGREDIENT_DESC_DEL,
  GET_ORDER_NUMBER,
  UPD_ORDER_NUMBER,
} from '../actions/all-actions';
import {getIngredients} from '../../utils/api';

const initialIngredients = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: false,
  bun: {},
  selectedIngredients: [],
  ingredientObject: {},
  order: {},
  bunType:'',
  orderLoading: false,
  orderError: false
};
export function requestIngredients() {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS
    });
    getIngredients()
    .then(res =>  {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}: ${res}`);
    }).then((data) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: data.data
      });
      const bun = data.data.find(a=> a.type === "bun");
      dispatch({
        type: SET_BUN,
        payload: bun
      });
    }).catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_ERROR
      });
      console.log('Ошибка. Запрос не выполнен: ' + err);
    })
  }
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
    case SET_BUN: {
      return {
        ...state,
        bun: action.payload
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
