import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  SET_BUN,
  INGREDIENTS_CONSTRUCTOR,
  INGREDIENT_MODAL_ADD,
  INGREDIENT_MODAL_DEL,
  ORDER_MODAL_ADD,
  ORDER_MODAL_DEL,
  GET_ORDER_NUMBER,
  UPD_ORDER_NUMBER,
  ORDER_ERROR
} from '../actions/all-actions';
import {getIngredients, postOrder, getResponse, catchError} from '../../utils/api';

const initialIngredients = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: false,
  selectedIngredients: [],
  bun: {},
  ingredientObject: {},
  bunType:'',
  ingredientModal: false,
  ingredientDesc: {},
  orderModal: false,
  orderError: false,
  orderData: {},
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
      const selectedIng = data.data.filter((item) => item.type !== "bun").slice(0, 6);
      dispatch({
        type: INGREDIENTS_CONSTRUCTOR,
        payload: selectedIng
      });
    }).catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_ERROR
      });
      console.log('Ошибка. Запрос не выполнен: ' + err);
    })
  }
};
export function addOrder(arrIds) {
  return (dispatch) => {
    console.log(arrIds);
    postOrder(arrIds) // сохраняем ингредиенты на сервер
    .then(res => getResponse(res))
    .then(data => {
      dispatch({
        type: GET_ORDER_NUMBER,
        payload: data
      });
      dispatch({
        type: ORDER_MODAL_ADD
      });
      //setModalData(data); // полученный ответ помещаем в стейт для модалки
      //setIsOrderDetails(true);
    }).catch((err) => {
      dispatch({
        type: ORDER_ERROR
      });
      console.log('Ошибка. Запрос не выполнен: ' + err);
    })
  }
}

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
    case INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        selectedIngredients: action.payload,
      };
    }
    case INGREDIENT_MODAL_ADD: {
      return {
        ...state,
        ingredientModal: true,
        ingredientDesc: action.payload,
      };
    }
    case INGREDIENT_MODAL_DEL: {
      return {
        ...state,
        ingredientModal: false,
        ingredientDesc: {},
      };
    }
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderData: action.payload,
      };
    }
    case ORDER_MODAL_ADD: {
      return {
        ...state,
        orderModal: true
      };
    }
    case ORDER_MODAL_DEL: {
      return {
        ...state,
        orderModal: false
      };
    }
    default: {
      return state;
    }
  }
}
