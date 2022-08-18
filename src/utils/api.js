import { getCookie, setCookie } from './cookie'

const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export function postRegistration(name, email, pass) {
  return fetch(`${config.baseUrl}/auth/register`, {method: 'POST', headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: pass,
      name: name
    })
  })
}
export const postLoginUser = (email, pass) => {
  return fetch(`${config.baseUrl}/auth/login`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
        email: email,
        password: pass
     }),
  })
}
export const postToken = (refreshToken) => {
  return fetch(`${config.baseUrl}/auth/token`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
      token: refreshToken
     }),
  })
}
export function postForgotPassword(email) {
  return fetch(`${config.baseUrl}/password-reset`, { method: 'POST', headers: config.headers,
    body: JSON.stringify({
      email: email
    })
  })
}
export function postRequestPassword(password, token) {
  return fetch(`${config.baseUrl}/password-reset/reset`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
        password: password,
        token: token
     })
  })
}
export function postLogOut(refreshToken) {
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
export const profileUpdate = (nameUser, email, password) => {
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
export function postOrder(arr) {
  return fetch(`${config.baseUrl}/orders`, {method: 'POST', headers: config.headers,
    body: JSON.stringify({
      ingredients: arr
    })
  })
}

// ответ и ошибка
export function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}: ${res}`);
}
export function catchError(err) {
  console.log('Ошибка. Запрос не выполнен: ', err);
}
