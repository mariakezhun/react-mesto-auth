class Auth {
  constructor({ BASE_URL }) {
    this._BASE_URL = BASE_URL;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register ({ password, email }) {
    console.log({ password, email })
    return fetch(`${this._BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    })
    .then(this._checkResponse);
  };
  authorize (email, password) {
    return fetch(`${this._BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("jwt", data.jwt);
          return data;
        }
      })
      .catch((err) => console.log(err));
  };
  checkToken (token)  {
    return fetch(`${this._BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkResponse);
  };
}

export const auth = new Auth({ BASE_URL: "https://auth.nomoreparties.co" });