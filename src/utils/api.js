const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};
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
