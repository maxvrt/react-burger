import {getIngredients, postOrder, getResponse, postForgotPassword, postRegistration, postLoginUser, postToken, postLogOut, postRequestPassword, getUser, profileUpdate} from '../../utils/api';
import {delCookie, getCookie, setCookie} from '../../utils/cookie';

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

export const POST_FORGOT_PASS = "POST_FORGOT_PASS";
export const POST_FORGOT_PASS_SUCCESS = "POST_FORGOT_PASS_SUCCESS";
export const POST_FORGOT_PASS_ERROR = "POST_FORGOT_PASS_ERROR";
export const POST_REQUEST_PASS = "POST_REQUEST_PASS";
export const POST_REQUEST_PASS_SUCCESS = "POST_REQUEST_PASS_SUCCESS";
export const POST_REQUEST_PASS_ERROR = "POST_REQUEST_PASS_ERROR";
export const POST_REGISTER = "POST_REGISTER";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_ERROR = "POST_REGISTER_ERROR";
export const POST_LOGIN = "POST_LOGIN";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_ERROR = "POST_LOGIN_ERROR";
export const POST_LOGOUT = "POST_LOGOUT";
export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
export const POST_LOGOUT_ERROR = "POST_LOGOUT_ERROR";
export const POST_TOKEN = "POST_TOKEN";
export const POST_TOKEN_SUCCESS = "POST_TOKEN_SUCCESS";
export const POST_TOKEN_ERROR = "POST_TOKEN_ERROR";
export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";
export const AUTH_CHECKED = "AUTH_CHECKED";

export const checkUserAuth = () => (dispatch) => {
  if (getCookie("token")) {
      console.log('AUTH_CHECKED - true');
      dispatch({ type: AUTH_CHECKED, payload: true });
    } else {
    console.log('AUTH_CHECKED - false');
    dispatch({ type: AUTH_CHECKED, payload: false });
  }
};

export function postRegister(name, email, pass) {
  return (dispatch) => {
    dispatch({
      type: POST_REGISTER
    });
    postRegistration(name, email, pass)
    .then(res => getResponse(res))
    .then((data) => {
      dispatch({
        type: POST_REGISTER_SUCCESS,
        payload: data
      });
    }).catch((err) => {
      dispatch({
        type: POST_REGISTER_ERROR
      });
      console.log('Ошибка. Запрос не выполнен: ' + err);
    })
  }
};

export function postLogin(email, pass) {
  return (dispatch) => {
    dispatch({
      type: POST_LOGIN
    });
    postLoginUser(email, pass)
    .then(res => getResponse(res))
    .then((data) => {
      dispatch({
        type: POST_LOGIN_SUCCESS,
        payload: data
      });
    }).catch((err) => {
      dispatch({
        type: POST_LOGIN_ERROR
      });
      console.log('Ошибка. Запрос ЛОГИНА не выполнен: ' + err);
    })
  }
};

export function runRefreshToken(refreshToken) {
  return (dispatch) => {
    dispatch({
      type: POST_TOKEN
    });
    postToken(refreshToken)
    .then(res => getResponse(res))
    .then((data) => {
      dispatch({
        type: POST_TOKEN_SUCCESS,
        payload: data
      });
      const accessToken = data.accessToken.split('Bearer ')[1];
      const refreshToken = data.refreshToken;
      setCookie('token', accessToken);
      setCookie('refreshToken', refreshToken);
      console.log('обновление токена' + data);
    }).catch((err) => {
      dispatch({
        type: POST_TOKEN_ERROR
      });
      console.log(err);
    })
  }
};
export function getUserProfile() {
  return function (dispatch) {
    dispatch({ type: GET_USER });
    getUser()
    .then(res => getResponse(res))
    .then((data) => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data.user
      });
    })
    .catch(err => {
        dispatch({ type: GET_USER_ERROR });
        console.log('Ошибка. Запрос ПОЛЬЗОВАТЕЛЯ не выполнен: ' + err);
        const refreshToken = getCookie('refreshToken');
        if (refreshToken) {
          console.log('Найден токен, обновляем '+refreshToken);
          dispatch(runRefreshToken(refreshToken));
          dispatch(getUserProfile());
        }
    });
  }
};
export function updateProfile(name, email, password) {
  return function (dispatch) {
     dispatch({ type: UPDATE_PROFILE })
     profileUpdate(name, email, password)
     .then(res => getResponse(res))
     .then((data) => {
      console.log('Обновляем пользователя ' + data.user.name);
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data.user
      });
    }).catch((err) => {
      dispatch({
        type: UPDATE_PROFILE_ERROR
      });
      console.log('Ошибка. Обновление ПРОФИЛЯ не выполнено: ' + err);
    })
  }
};
export function postForgotPass(email) {
  return (dispatch) => {
    dispatch({
      type: POST_FORGOT_PASS
    });
    postForgotPassword(email)
    .then(res => getResponse(res))
    .then((data) => {
      dispatch({
        type: POST_FORGOT_PASS_SUCCESS,
        payload: data.message
      });
    }).catch((err) => {
      dispatch({
        type: POST_FORGOT_PASS_ERROR
      });
      console.log('Ошибка. Запрос ВОССТАНОВЛЕНИЯ П. не выполнен: ' + err);
    })
  }
};
export function postRequestPass(password, code) {
  return (dispatch) => {
    dispatch({
      type: POST_REQUEST_PASS
    });
    postRequestPassword(password, code)
    .then(res => getResponse(res))
    .then((data) => {
      dispatch({
        type: POST_REQUEST_PASS_SUCCESS,
        payload: data.message
      });
    }).catch((err) => {
      dispatch({
        type: POST_REQUEST_PASS_ERROR
      });
      console.log('Ошибка. Запрос ИЗМЕНЕНИЯ П. не выполнен: ' + err);
    })
  }
};
export function runLogOut(refreshToken) {
  return function (dispatch) {
    dispatch({ type: POST_LOGOUT });
    postLogOut(refreshToken)
    .then(res => getResponse(res))
    .then(() => {
      dispatch({
        type: POST_LOGOUT_SUCCESS,
      });
      delCookie('token');
      delCookie('refreshToken');
    })
    .catch(err => {
        dispatch({ type: POST_LOGOUT_ERROR })
        console.log('Ошибка. Запрос ВЫХОДА не выполнен: ' + err);
    });
  }
};
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
