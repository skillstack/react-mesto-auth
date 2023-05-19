class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  setUserInfo(formData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  updateAvatar(formData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(formData)
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  getInitialCard() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  postNewCard(cardInfo) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardInfo)
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    'Content-Type': 'application/json',
    Authorization: '125408be-5dc1-412d-9828-ab11ebb03270'
  }
})

export default api;