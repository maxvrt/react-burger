import { getCookie, setCookie } from './cookie'

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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err:string) => Promise.reject(err));
    }
  })
}
export const postLoginUser = (email:string, pass:string) => {
  return fetch(`${config.baseUrl}/auth/login`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
        email: email,
        password: pass
     }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err:string) => Promise.reject(err));
    }
  })
}
export const postToken = (refreshToken:string) => {
  return fetch(`${config.baseUrl}/auth/token`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
      token: refreshToken
     }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err:string) => Promise.reject(err));
    }
  })
}
export function postForgotPassword(email:string) {
  return fetch(`${config.baseUrl}/password-reset`, { method: 'POST', headers: config.headers,
    body: JSON.stringify({
      email: email
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err:string) => Promise.reject(err));
    }
  })
}
export function postRequestPassword(password:string, token:string) {
  return fetch(`${config.baseUrl}/password-reset/reset`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
        password: password,
        token: token
     })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err:string) => Promise.reject(err));
    }
  })
}
export function postLogOut(refreshToken:string) {
  return fetch(`${config.baseUrl}/auth/logout`, { method: 'POST', headers: config.headers,
     body: JSON.stringify({
        token: refreshToken
     })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err:string) => Promise.reject(err));
    }
  })
}
export function getUser() {
  return fetch(`${config.baseUrl}/auth/user`, { method: 'GET',  headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('token')
     }
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err:string) => Promise.reject(err));
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err:string) => Promise.reject(err));
    }
  })
}
export function getIngredients() {
  return fetch(`${config.baseUrl}/ingredients`, {headers: config.headers}).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err:string) => Promise.reject(err));
    }
  })
}
export function postOrder(arr: Array<string>) {
  return fetch(`${config.baseUrl}/orders`, {method: 'POST', headers: {...config.headers, Authorization: 'Bearer ' + getCookie('token')},
    body: JSON.stringify({
      ingredients: arr
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err:string) => Promise.reject(err));
    }
  })
}

//ответ и ошибка
export const getResponse = <TRegResponse>(res: Response): Promise<TRegResponse> => {
  if (res.ok) {
    console.log('if (res.ok) res:');
    console.log(res);
    return res.json();
  } else {
    return res.json().then((err:string) => Promise.reject(err));
  }
}
// export function catchError(err:string) {
//   console.log('Ошибка. Запрос не выполнен: ', err);
// }
