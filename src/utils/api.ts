import { getCookie, setCookie } from './cookie'

export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export type TRegResponse<T> = {
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
  json(): Promise<T>;
};

export function postRegistration(name:string, email:string, pass:string): Promise<TRegResponse<unknown>> {
  return fetch(`${config.baseUrl}/auth/register`, {method: 'POST', headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: pass,
      name: name
    })
  })
}
export const postLoginUser = (email:string, pass:string) => {
  return fetch(`${config.baseUrl}/auth/login`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
        email: email,
        password: pass
     }),
  })
}
export const postToken = (refreshToken:string) => {
  return fetch(`${config.baseUrl}/auth/token`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
      token: refreshToken
     }),
  })
}
export function postForgotPassword(email:string) {
  return fetch(`${config.baseUrl}/password-reset`, { method: 'POST', headers: config.headers,
    body: JSON.stringify({
      email: email
    })
  })
}
export function postRequestPassword(password:string, token:string) {
  return fetch(`${config.baseUrl}/password-reset/reset`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
        password: password,
        token: token
     })
  })
}
export function postLogOut(refreshToken:string) {
  return fetch(`${config.baseUrl}/auth/logout`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
        token: refreshToken
     })
  })
}
export function getUser() {
  return fetch(`${config.baseUrl}/auth/user`, { method: 'GET',  headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('token')
     }
  })
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
  })
}
export function getIngredients() {
  return fetch(`${config.baseUrl}/ingredients`, {headers: config.headers})
}
export function postOrder(arr: Array<string>) {
  return fetch(`${config.baseUrl}/orders`, {method: 'POST', headers: {...config.headers, Authorization: 'Bearer ' + getCookie('token')},
  body: JSON.stringify({
    ingredients: arr
  })
  })
}

// ответ и ошибка
export const getResponse = <TRegResponse>(res: Response): Promise<TRegResponse> => {
  if (res.ok) {
    console.log('if (res.ok) res:');
    console.log(res);
    return res.json();
  } else {
    return res.json().then((err:string) => Promise.reject(err));
  }
}
export function catchError(err:string) {
  console.log('Ошибка. Запрос не выполнен: ', err);
}
