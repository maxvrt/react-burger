import {getResponse, postForgotPassword, postRegistration, postLoginUser, postToken, postLogOut, postRequestPassword, getUser, profileUpdate, config} from '../../utils/api';
import {delCookie, getCookie, setCookie} from '../../utils/cookie';
import type { TUser, AppThunk, AppDispatch } from '../../types/types';

export const POST_FORGOT_PASS: 'POST_FORGOT_PASS' = 'POST_FORGOT_PASS';
export const POST_FORGOT_PASS_SUCCESS: 'POST_FORGOT_PASS_SUCCESS' = 'POST_FORGOT_PASS_SUCCESS';
export const POST_FORGOT_PASS_ERROR: 'POST_FORGOT_PASS_ERROR' = 'POST_FORGOT_PASS_ERROR';
export const POST_REQUEST_PASS: 'POST_REQUEST_PASS' = 'POST_REQUEST_PASS';
export const POST_REQUEST_PASS_SUCCESS: 'POST_REQUEST_PASS_SUCCESS' = 'POST_REQUEST_PASS_SUCCESS';
export const POST_REQUEST_PASS_ERROR: 'POST_REQUEST_PASS_ERROR' = 'POST_REQUEST_PASS_ERROR';
export const POST_REGISTER: 'POST_REGISTER' = 'POST_REGISTER';
export const POST_REGISTER_SUCCESS: 'POST_REGISTER_SUCCESS' = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_ERROR: 'POST_REGISTER_ERROR' = 'POST_REGISTER_ERROR';
export const POST_LOGIN: 'POST_LOGIN' = 'POST_LOGIN';
export const POST_LOGIN_SUCCESS: 'POST_LOGIN_SUCCESS' = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_ERROR: 'POST_LOGIN_ERROR' = 'POST_LOGIN_ERROR';
export const POST_LOGOUT: 'POST_LOGOUT' = 'POST_LOGOUT';
export const POST_LOGOUT_SUCCESS: 'POST_LOGOUT_SUCCESS' = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_ERROR: 'POST_LOGOUT_ERROR' = 'POST_LOGOUT_ERROR';
export const POST_TOKEN: 'POST_TOKEN' = 'POST_TOKEN';
export const POST_TOKEN_SUCCESS: 'POST_TOKEN_SUCCESS' = 'POST_TOKEN_SUCCESS';
export const POST_TOKEN_ERROR: 'POST_TOKEN_ERROR' = 'POST_TOKEN_ERROR';
export const GET_USER: 'GET_USER' = 'GET_USER';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_ERROR: 'GET_USER_ERROR' = 'GET_USER_ERROR';
export const UPDATE_PROFILE: 'UPDATE_PROFILE' = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS' = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR: 'UPDATE_PROFILE_ERROR' = 'UPDATE_PROFILE_ERROR';
export const AUTH_CHECKED: 'AUTH_CHECKED' = 'AUTH_CHECKED';

export interface IPostForgotPass {
  readonly type: typeof POST_FORGOT_PASS;
}
export interface IPostForgotPassSuccess {
  readonly type: typeof POST_FORGOT_PASS_SUCCESS;
  readonly payload: object;
}
export interface IPostForgotPassError {
  readonly type: typeof POST_FORGOT_PASS_ERROR;
}
export interface IPostRequestPass {
  readonly type: typeof POST_REQUEST_PASS;
}
export interface IPostRequestPassSuccess {
  readonly type: typeof POST_REQUEST_PASS_SUCCESS;
  readonly payload: object;
}
export interface IPostRequestPassError {
  readonly type: typeof POST_REQUEST_PASS_ERROR;
}
export interface IPostRegister {
  readonly type: typeof POST_REGISTER;
}
export interface IPostRegisterSuccess {
  readonly type: typeof POST_REGISTER_SUCCESS;
  readonly payload: {refreshToken:string; accessToken:string};
}
export interface IPostRegisterError {
  readonly type: typeof POST_REGISTER_ERROR;
}
export interface IPostLogin {
  readonly type: typeof POST_LOGIN;
}
export interface IPostLoginSuccess {
  readonly type: typeof POST_LOGIN_SUCCESS;
  readonly payload: {user:TUser};
}
export interface IPostLoginError {
  readonly type: typeof POST_LOGIN_ERROR;
}
export interface IPostLogout {
  readonly type: typeof POST_LOGOUT;
}
export interface IPostLogoutSuccess {
  readonly type: typeof POST_LOGOUT_SUCCESS;
}
export interface IPostLogoutError {
  readonly type: typeof POST_LOGOUT_ERROR;
}
export interface IPostToken {
  readonly type: typeof POST_TOKEN;
}
export interface IPostTokenSuccess {
  readonly type: typeof POST_TOKEN_SUCCESS;
  readonly payload: object;
}
export interface IPostTokenError {
  readonly type: typeof POST_TOKEN_ERROR;
}
export interface GetUser {
  readonly type: typeof GET_USER;
}
export interface GetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: object;
}
export interface GetUserError {
  readonly type: typeof GET_USER_ERROR;
  readonly payload: object;
}
export interface UpdateProfile {
  readonly type: typeof UPDATE_PROFILE;
}
export interface UpdateProfileSuccess {
  readonly type: typeof UPDATE_PROFILE_SUCCESS;
  readonly payload: object;
}
export interface UpdateProfileError {
  readonly type: typeof UPDATE_PROFILE_ERROR;
}
export interface AuthChecked {
  readonly type: typeof AUTH_CHECKED;
  readonly payload: boolean;
}
export type TAuthActions =
IPostForgotPass|
IPostForgotPassSuccess|
IPostForgotPassError|
IPostRequestPass|
IPostRequestPassSuccess|
IPostRequestPassError|
IPostRegister|
IPostRegisterSuccess|
IPostRegisterError|
IPostLogin|
IPostLoginSuccess|
IPostLoginError|
IPostLogout|
IPostLogoutSuccess|
IPostLogoutError|
IPostToken|
IPostTokenSuccess|
IPostTokenError|
GetUser|
GetUserSuccess|
GetUserError|
UpdateProfile|
UpdateProfileSuccess|
UpdateProfileError|
AuthChecked;


//export function postRegister(name:string, email:string, pass:string) {
export const postRegister:AppThunk = (name:string, email:string, pass:string) => {
  return (dispatch:AppDispatch) => {
    dispatch({
      type: POST_REGISTER
    });
    postRegistration(name, email, pass)
    .then((data) => {
      dispatch({
        type: POST_REGISTER_SUCCESS,
        payload: data
      });
      const accessToken = data.accessToken.split('Bearer ')[1];
      const refreshToken = data.refreshToken;
      setCookie('token', accessToken);
      setCookie('refreshToken', refreshToken);
    }).catch((err) => {
      dispatch({
        type: POST_REGISTER_ERROR
      });
      console.log('Ошибка. Запрос не выполнен: ' + err);
    })
  }
};

export const getWithRefresh = async(url:string, options:{headers:{authorization:string}}):Promise<{user:object}> => {
  try {
    const response = await fetch(url, options);
    return await getResponse(response)
  } catch (err) {
    const error = err as Error;
    if (error.message === 'jwt expired') {
      console.log('внутри обновления токена: '+ error.message);
      const refreshData = await runRefreshToken();
      console.log(refreshData);
      options.headers.authorization = refreshData.accessToken;
      const response = await fetch(url, options);
      return await getResponse(response);
    } else {
      return Promise.reject(err);
    }
  }
}
export interface CustomResponse<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly type: ResponseType;
  readonly url: string;
  accessToken: string;
  response: T;
}
export type TResponseBody = {
  success: boolean;
  message?: string;
  headers?: Headers;
};

export function runRefreshToken():Promise<CustomResponse<TResponseBody>> {
  return fetch(`${config.baseUrl}/auth/token`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err:string) => Promise.reject(err));
    }
  })
  .then((response) => {
    if (!response.success) {
      return Promise.reject(response)
    }
    delCookie('token');
    delCookie('refreshToken');
    setCookie('refreshToken', response.refreshToken)
    setCookie('token', response.accessToken.split('Bearer ')[1])
    return response
  })
};
export const checkUserAuth:AppThunk = () => (dispatch:AppDispatch) => {
  if (getCookie("token")) {
      console.log('AUTH_CHECKED - true');
      dispatch({ type: AUTH_CHECKED, payload: true });
    } else {
    console.log('AUTH_CHECKED - false');
    dispatch({ type: AUTH_CHECKED, payload: false });
  }
};

export function postLogin(email: string, pass: string) {
  return (dispatch:AppDispatch) => {
    dispatch({
      type: POST_LOGIN
    });
    postLoginUser(email, pass)
    .then((data) => {
      dispatch({
        type: POST_LOGIN_SUCCESS,
        payload: data
      });
      const accessToken = data.accessToken.split('Bearer ')[1];
      const refreshToken = data.refreshToken;
      setCookie('token', accessToken);
      setCookie('refreshToken', refreshToken);
    }).catch((err) => {
      dispatch({
        type: POST_LOGIN_ERROR
      });
      console.log('Ошибка. Запрос ЛОГИНА не выполнен: ' + err);
    })
  }
};


export function getUserProfile() {
  return function (dispatch:AppDispatch) {
    dispatch({ type: GET_USER });//getUser()
    getWithRefresh(`${config.baseUrl}/auth/user`, {
      headers: {
        ...config.headers,
        'authorization': `Bearer ${getCookie('token')}`
      }
    })
    .then((data) => {
      console.log(data);
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data.user
      });
    })
    .catch(err => {
        dispatch({ type: GET_USER_ERROR, payload: err });
        console.log('Ошибка. Запрос ПОЛЬЗОВАТЕЛЯ не выполнен:');
        console.log(err);
    });
  }
};

export function updateProfile(name: string, email: string, password: string) {
  return function (dispatch:AppDispatch) {
     dispatch({ type: UPDATE_PROFILE })
     profileUpdate(name, email, password)
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
export function postForgotPass(email: string) {
  return (dispatch:AppDispatch) => {
    dispatch({
      type: POST_FORGOT_PASS
    });
    postForgotPassword(email)
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
export function postRequestPass(password: string, code: string) {
  return (dispatch:AppDispatch) => {
    dispatch({
      type: POST_REQUEST_PASS
    });
    postRequestPassword(password, code)
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
export function runLogOut(refreshToken: string) {
  return function (dispatch:AppDispatch) {
    dispatch({ type: POST_LOGOUT });
    postLogOut(refreshToken)
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
