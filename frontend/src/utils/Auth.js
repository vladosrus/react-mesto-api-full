import { baseURL, headers } from './Api'

function checkResponse(result) {
  if (result.ok) {
    return result.json();
  } else {
    return Promise.reject(`Ошибка: ${result.status}`);
  }
}

export function registration (email, password) {
  return fetch(`${baseURL}/signup`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
};

export function authorization (email, password) {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
}

export function getEmail () {
  return fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: headers,
  })
  .then(checkResponse)
}
