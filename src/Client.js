import URLSeachParams from 'url-search-params';

const LOCAL_STORAGE_KEY = 'sameer';

class Client {
  constructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_KEY);

      /*if (this.token) {
        this.isTokenValid().then((bool) => {
          if (!bool) {
            this.token = null;
          }
        });
      }*/
    }
  }

  isLoggedIn() {
    return !!this.token;
  }

  getProjects(successHandler, errorHandler) {
    return fetch(`/api/v1/projects`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.token
      }
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then(successHandler)
      .catch(error => this.handleError(error, errorHandler));
  }

  handleLoginError(error) {
    this.removeToken();
    return Promise.reject(error);
  }

  login(email, password) {
    const searchParams = new URLSearchParams();
    searchParams.set('user[email]', email);
    searchParams.set('user[password]', password);

    return fetch(`/users/sign_in`, {
      method: 'post',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: searchParams
    }).then(this.checkStatus)
      .then(
        (response) => {
          this.setToken(response.headers.get('authorization'))
        }
      )
      .catch(error => this.handleLoginError(error));
  }

  logout() {
    return fetch(`/users/sign_out`, {
      method: 'delete',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.token
      }
    }).then(this.checkStatus)
      .then(this.removeToken());
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return response.json()
        .then((json) => {
          const error = Object.assign({}, json, {
            status: response.status,
            statusText: response.statusText
          })
          return Promise.reject(error);
        });
      /*const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;*/
    }
  }

  parseJson(response) {
    return response.json();
  }

  setToken(token) {
    this.token = token;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_KEY, this.token);
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
}

export const client = new Client();