import {getIngredients, postOrder, getResponse} from '../../utils/api';
import type { AppThunk, AppDispatch, TIngItem, TOrder } from '../../types/types';

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = "GET_INGREDIENTS_ERROR";
export const SET_BUN: 'SET_BUN' = "SET_BUN";
export const MASS_ADD_INGREDIENTS: 'MASS_ADD_INGREDIENTS' = "MASS_ADD_INGREDIENTS";
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = "ADD_INGREDIENT";
export const INGREDIENT_MODAL_ADD: 'INGREDIENT_MODAL_ADD' = "INGREDIENT_MODAL_ADD";
export const INGREDIENT_MODAL_DEL: 'INGREDIENT_MODAL_DEL' = "INGREDIENT_MODAL_DEL";
export const ORDER_MODAL_ADD: 'ORDER_MODAL_ADD' = "ORDER_MODAL_ADD";
export const ORDER_MODAL_DEL: 'ORDER_MODAL_DEL' = "ORDER_MODAL_DEL";
export const INGREDIENT_DESC_DEL: 'INGREDIENT_DESC_DEL' = "INGREDIENT_DESC_DEL";
export const GET_ORDER_NUMBER: 'GET_ORDER_NUMBER' = "GET_ORDER_NUMBER";
export const UPD_ORDER_NUMBER: 'UPD_ORDER_NUMBER' = "UPD_ORDER_NUMBER";
export const ORDER_ERROR: 'ORDER_ERROR' = "ORDER_ERROR";
export const MOVE_ELEMENT: 'MOVE_ELEMENT' = "MOVE_ELEMENT";
export const DELETE_ITEM: 'DELETE_ITEM' = "DELETE_ITEM";
export const UPD: 'UPD' = "UPD";

export interface IGetIngredients{
  readonly type: typeof GET_INGREDIENTS;
}
export interface IGetIngredientsSuccess{
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngItem>;
}
export interface IGetIngredientsError{
  readonly type: typeof GET_INGREDIENTS_ERROR;
}
export interface ISetBun{
  readonly type: typeof SET_BUN;
  readonly payload: TIngItem;
}
export interface IMassAddIngredients{
  readonly type: typeof MASS_ADD_INGREDIENTS;
  readonly payload: Array<TIngItem>;
}
export interface IAddIngredient{
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngItem;
}
export interface IIngredientModalAdd{
  readonly type: typeof INGREDIENT_MODAL_ADD;
  readonly payload: object;
}
export interface IIngredientModalDel{
  readonly type: typeof INGREDIENT_MODAL_DEL;
}
export interface IOrderModalAdd{
  readonly type: typeof ORDER_MODAL_ADD;
}
export interface IOrderModalDel{
  readonly type: typeof ORDER_MODAL_DEL;
}
export interface IIngredientDescDel{
  readonly type: typeof INGREDIENT_DESC_DEL;
}
export interface IGetOrderNumber{
  readonly type: typeof GET_ORDER_NUMBER;
  readonly payload: object;
}
export interface IUpdOrderNumber{
  readonly type: typeof UPD_ORDER_NUMBER;
}
export interface IOrderError{
  readonly type: typeof ORDER_ERROR;
}
export interface IMoveElement{
  readonly type: typeof MOVE_ELEMENT;
  readonly payload: {to:number, from:number};
}
export interface IDeleteItem{
  readonly type: typeof DELETE_ITEM;
  readonly payload: number;
}
export interface IUpd{
  readonly type: typeof UPD;
}
export type TBurgerActions =
IGetIngredients|
IGetIngredientsSuccess|
IGetIngredientsError|
ISetBun|
IMassAddIngredients|
IAddIngredient|
IIngredientModalAdd|
IIngredientModalDel|
IOrderModalAdd|
IOrderModalDel|
IIngredientDescDel|
IGetOrderNumber|
IUpdOrderNumber|
IOrderError|
IMoveElement|
IDeleteItem|
IUpd;

export const requestIngredients:AppThunk = () => {
  return (dispatch:AppDispatch) => {
    dispatch({
      type: GET_INGREDIENTS
    });
    getIngredients()
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
export const addOrder:AppThunk = (arrIds:number[]) => {
  return (dispatch:AppDispatch) => {
    postOrder(arrIds) // сохраняем ингредиенты на сервер
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
