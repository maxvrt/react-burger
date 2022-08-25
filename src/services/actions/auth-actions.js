import {getResponse, postForgotPassword, postRegistration, postLoginUser, postToken, postLogOut, postRequestPassword, getUser, profileUpdate, config} from '../../utils/api';
import {delCookie, getCookie, setCookie} from '../../utils/cookie';
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

export const getWithRefresh = async(url, options) => {
  try {
    const response = await fetch(url, options);
    return await getResponse(response)
  } catch (err) {
    if (err.message === 'jwt expired') {
      console.log('внутри обновления токена: '+ err.message);
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
export function runRefreshToken() {
  return fetch(`${config.baseUrl}/auth/token`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
  .then(res => getResponse(res))
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
  // return (dispatch) => {
  //   dispatch({
  //     type: POST_TOKEN
  //   });
  //   const refreshToken = getCookie('refreshToken');
  //   console.log('получаем refreshToken');
  //   postToken(refreshToken)
  //   .then(res => getResponse(res))
  //   .then((data) => {
  //     dispatch({
  //       type: POST_TOKEN_SUCCESS,
  //       payload: data
  //     });
  //     delCookie('token');
  //     delCookie('refreshToken');
  //     const accessToken = data.accessToken.split('Bearer ')[1];
  //     const refreshToken = data.refreshToken;
  //     setCookie('token', accessToken);
  //     setCookie('refreshToken', refreshToken);
  //     console.log('обновление токена' + data.accessToken);
  //     return data
  //   }).catch((err) => {
  //     console.log('ошибка внутри runRefreshToken ' + err.message);
  //     dispatch({
  //       type: POST_TOKEN_ERROR
  //     });
  //   })
  // }
};
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
  return function (dispatch) {
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
