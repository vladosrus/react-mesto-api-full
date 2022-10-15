class Api {
  constructor(options) {
    this._baseURL = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getProfileInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._getResponseData);
  }

  changeProfileInfo(data) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: data["name"],
        about: data["about"],
      }),
    }).then(this._getResponseData);
  }

  changeProfileImg(data) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        avatar: data["avatar"],
      }),
    }).then(this._getResponseData);
  }

  addNewCard(data) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: data["name"],
        link: data["link"],
      }),
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
        credentials: this._credentials,
      }).then(this._getResponseData);
    } else {
      return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
        credentials: this._credentials,
      }).then(this._getResponseData);
    }
  }
}

export const baseURL = "https://api.mesto-chikov.students.nomoredomains.icu";
export const headers = {
  'Content-Type': 'application/json',
  'origin': baseURL,
};
export const credentials = 'include';

const api = new Api({
  baseUrl: baseURL,
  headers: headers,
  credentials: credentials,
});

export default api;
