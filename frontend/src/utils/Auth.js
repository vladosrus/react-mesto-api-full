const baseURL = "https://auth.nomoreparties.co";

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
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
};

export function authorization (email, password) {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
}

export function getEmail (token) {
  return fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(checkResponse)
}
