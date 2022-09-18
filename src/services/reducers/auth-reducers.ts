import type { TAuthActions } from '../actions/auth-actions';

import {
  POST_FORGOT_PASS,
  POST_FORGOT_PASS_SUCCESS,
  POST_FORGOT_PASS_ERROR,
  POST_REQUEST_PASS,
  POST_REQUEST_PASS_SUCCESS,
  POST_REQUEST_PASS_ERROR,
  POST_REGISTER,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_ERROR,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  POST_TOKEN,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_ERROR,
  POST_LOGOUT,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_ERROR,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  AUTH_CHECKED
} from '../actions/auth-actions';

type TAuthState = {
  postForgotPass: boolean,
  postForgotPassSuccess: boolean,
  postForgotPassError: boolean,
  message: object,
  postRequestPass: boolean,
  postRequestPassSuccess: boolean,
  postRequestPassError: boolean,
  postRegister: boolean,
  postRegisterSuccess: boolean,
  postRegisterError: boolean,
  postLogin: boolean,
  postLoginSuccess: boolean,
  postLoginError: boolean,
  postLogout: boolean,
  postLogoutSuccess: boolean,
  postLogoutError: boolean,
  authData: object,
  tokenData: object,
  user: object,
  tokenRefreshData: object,
  getUser: boolean,
  getUserSuccess: boolean,
  getUserError: boolean,
  updateProfile: boolean,
  updateProfileSuccess: boolean,
  updateProfileError: boolean,
  isAuthChecked:boolean,
  errorMessage: object,
  postToken:boolean,
  postTokenSuccess: boolean,
  postTokenError: boolean
}

const initialAuth:TAuthState = {
  postForgotPass: false,
  postForgotPassSuccess: false,
  postForgotPassError: false,
  message: {message:'nothing'},
  postRequestPass: false,
  postRequestPassSuccess: false,
  postRequestPassError: false,
  postRegister: false,
  postRegisterSuccess: false,
  postRegisterError: false,
  postLogin: false,
  postLoginSuccess: false,
  postLoginError: false,
  postLogout: false,
  postLogoutSuccess: false,
  postLogoutError: false,
  authData: {},
  tokenData: {},
  user: {},
  tokenRefreshData: {},
  getUser: false,
  getUserSuccess: false,
  getUserError: false,
  updateProfile: false,
  updateProfileSuccess: false,
  updateProfileError: false,
  isAuthChecked:false,
  errorMessage: {message:'nothing'},
  postToken: false,
  postTokenSuccess: false,
  postTokenError: false
};

export const authReducer = (state = initialAuth, action:TAuthActions):TAuthState => {
  switch (action.type) {
    case AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    }
    case POST_FORGOT_PASS:  {
      return {
        ...state,
        postForgotPass: true,
        postForgotPassSuccess: false,
        postForgotPassError: false
      }
    }
    case POST_FORGOT_PASS_SUCCESS:  {
      return {
        ...state,
        postForgotPass: false,
        postForgotPassSuccess: true,
        postForgotPassError: false,
        message: action.payload
      }
    }
    case POST_FORGOT_PASS_ERROR:  {
      return {
        ...state,
        postForgotPass: false,
        postForgotPassSuccess: false,
        postForgotPassError: true
      }
    }
    case POST_REQUEST_PASS:  {
      return {
        ...state,
        postRequestPass: true,
        postRequestPassSuccess: false,
        postRequestPassError: false
      }
    }
    case POST_REQUEST_PASS_SUCCESS:  {
      return {
        ...state,
        postRequestPass: false,
        postRequestPassSuccess: true,
        postRequestPassError: false,
        message: action.payload
      }
    }
    case POST_REQUEST_PASS_ERROR:  {
      return {
        ...state,
        postRequestPass: false,
        postRequestPassSuccess: false,
        postRequestPassError: true
      }
    }
    case POST_REGISTER:  {
      return {
        ...state,
        postRegister: true,
        postRegisterSuccess: false,
        postRegisterError: false
      }
    }
    case POST_REGISTER_SUCCESS:  {
      return {
        ...state,
        postRegister: false,
        postRegisterSuccess: true,
        postRegisterError: false,
        authData: action.payload
      }
    }
    case POST_REGISTER_ERROR:  {
      return {
        ...state,
        postRegister: false,
        postRegisterSuccess: false,
        postRegisterError: true
      }
    }
    case POST_LOGIN:  {
      return {
        ...state,
        postLogin: true,
        postLoginSuccess: false,
        postLoginError: false
      }
    }
    case POST_LOGIN_SUCCESS:  {
      return {
        ...state,
        postLogin: false,
        postLoginSuccess: true,
        postLoginError: false,
        authData: action.payload,
        user: action.payload.user
      }
    }
    case POST_LOGIN_ERROR:  {
      return {
        ...state,
        postLogin: false,
        postLoginSuccess: false,
        postLoginError: true
      }
    }
    case POST_TOKEN:  {
      return {
        ...state,
        postToken: true,
        postTokenSuccess: false,
        postTokenError: false
      }
    }
    case POST_TOKEN_SUCCESS:  {
      return {
        ...state,
        postToken: false,
        postTokenSuccess: true,
        postTokenError: false,
        tokenData: action.payload
      }
    }
    case POST_TOKEN_ERROR:  {
      return {
        ...state,
        postToken: false,
        postTokenSuccess: false,
        postTokenError: true
      }
    }
    case POST_LOGOUT:  {
      return {
        ...state,
        postLogout: true,
        postLogoutSuccess: false,
        postLogoutError: false,
        authData: {},
        isAuthChecked: false
      }
    }
    case POST_LOGOUT_SUCCESS:  {
      return {
        ...state,
        postLogout: false,
        postLogoutSuccess: true,
        postLogoutError: false,
        isAuthChecked: false
      }
    }
    case POST_LOGOUT_ERROR:  {
      return {
        ...state,
        postLogout: false,
        postLogoutSuccess: false,
        postLogoutError: true
      }
    }
    case GET_USER:  {
      return {
        ...state,
        getUser: true,
        getUserSuccess: false,
        getUserError: false
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUser: false,
        getUserSuccess: true,
        getUserError: false,
        authData: action.payload
      }
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        getUser: false,
        getUserSuccess: false,
        getUserError: true,
        errorMessage: action.payload
      }
    }
    case UPDATE_PROFILE:  {
      return {
        ...state,
        updateProfile: true,
        updateProfileSuccess: false,
        updateProfileError: false
      }
    }
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        updateProfile: false,
        updateProfileSuccess: true,
        updateProfileError: false,
        authData: action.payload
      }
    }
    case UPDATE_PROFILE_ERROR: {
      return {
        ...state,
        updateProfile: false,
        updateProfileSuccess: false,
        updateProfileError: true
      }
    }
    default: {
      return state;
    }
  }
}
