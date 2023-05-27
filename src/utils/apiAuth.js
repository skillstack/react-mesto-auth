class ApiAuth {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`${res.status} - ${res.statusText}`)
  }

  registerUser(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      }),
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  loginUser(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      }),
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }
}

const apiAuth = new ApiAuth({
  url: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiAuth;