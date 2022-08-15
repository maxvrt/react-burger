import {getIngredients, postOrder, getResponse} from '../../utils/api';

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";
export const SET_BUN = "SET_BUN";
export const MASS_ADD_INGREDIENTS = "MASS_ADD_INGREDIENTS";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const INGREDIENT_MODAL_ADD = "INGREDIENT_MODAL_ADD";
export const INGREDIENT_MODAL_DEL = "INGREDIENT_MODAL_DEL";
export const ORDER_MODAL_ADD = "ORDER_MODAL_ADD";
export const ORDER_MODAL_DEL = "ORDER_MODAL_DEL";
export const INGREDIENT_DESC_DEL = "INGREDIENT_DESC_DEL";
export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const UPD_ORDER_NUMBER = "UPD_ORDER_NUMBER";
export const ORDER_ERROR = "ORDER_ERROR";
export const MOVE_ELEMENT = "MOVE_ELEMENT";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPD = "UPD";

export function requestIngredients() {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS
    });
    getIngredients()
    .then(res => getResponse(res))
    .then((data) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: data.data
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
    }).catch((err) => {
      dispatch({
        type: ORDER_ERROR,
        payload: 'Ошибка. Попробуйте добавить больше ингредиентов.'
      });
      console.log('Ошибка. Запрос не выполнен: ' + err);
    })
  }
};
