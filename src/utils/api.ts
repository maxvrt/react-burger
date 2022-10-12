import { getCookie, setCookie } from './cookie'
import type { CustomResponse, TResponseBody } from '../types/types';
export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export type TRegResponse = {
  user: {
    email: string;
    name: string;
  };
  success: boolean;
  ok?: boolean;
  accessToken: string;
  refreshToken: string;
  status?: number;
  message?: string;
};

export function postRegistration(name:string, email:string, pass:string): Promise<TRegResponse> {
  return fetch(`${config.baseUrl}/auth/register`, {method: 'POST', headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: pass,
      name: name
    })
  }).then(checkResponse)
}
export const postLoginUser = (email:string, pass:string) => {
  return fetch(`${config.baseUrl}/auth/login`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
        email: email,
        password: pass
     }),
  }).then(checkResponse)
}
export const postToken = (refreshToken:string|undefined) => {
  return fetch(`${config.baseUrl}/auth/token`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: refreshToken
    }),
  }).then(checkResponse)
}
export function postForgotPassword(email:string) {
  return fetch(`${config.baseUrl}/password-reset`, { method: 'POST', headers: config.headers,
    body: JSON.stringify({
      email: email
    })
  }).then(checkResponse)
}
export function postRequestPassword(password:string, token:string) {
  return fetch(`${config.baseUrl}/password-reset/reset`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
        password: password,
        token: token
     })
  }).then(checkResponse)
}
export function postLogOut(refreshToken:string) {
  return fetch(`${config.baseUrl}/auth/logout`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
        token: refreshToken
     })
  }).then(checkResponse)
}
export function getUser() {
  return fetch(`${config.baseUrl}/auth/user`, { method: 'GET',  headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('token')
     }
  }).then(checkResponse)
}
export const profileUpdate = (nameUser:string, email:string, password:string) => {
  return fetch(`${config.baseUrl}/auth/user`, { method: 'PATCH', headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('token')
     },
     body: JSON.stringify({
        email: email,
        name: nameUser,
        password: password,
     })
  }).then(checkResponse)
}
export function getIngredients() {
  return fetch(`${config.baseUrl}/ingredients`, {headers: config.headers})
  .then(checkResponse)
}
export function postOrder(arr:number[]) {
  return fetch(`${config.baseUrl}/orders`, {method: 'POST', headers: {...config.headers, Authorization: 'Bearer ' + getCookie('token')},
    body: JSON.stringify({
      ingredients: arr
    })
  }).then(checkResponse)
}

//ответ и ошибка
export const getResponse = <TResponseBody>(res: Response): Promise<CustomResponse<TResponseBody>> => {
  if (res.ok) {
    console.log('if (res.ok) res:');
    console.log(res);
    return res.json();
  } else {
    return res.json().then((err:string) => Promise.reject(err));
  }
}

function checkResponse(res:Response) {
  if (res.ok) {
    console.log('if (res.ok) res:');
    console.log(res);
    return res.json();
  } else {
    return res.json().then((err:string) => Promise.reject(err));
  }
}
