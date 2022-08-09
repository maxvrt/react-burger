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

export function postForgotPassword(email) {
  return fetch(`${config.baseUrl}/password-reset`, {method: 'POST', headers: config.headers,
    body: JSON.stringify({
      email: email
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
