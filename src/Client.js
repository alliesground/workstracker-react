import URLSeachParams from 'url-search-params';
import jwt_decode from 'jwt-decode';

const LOCAL_TOKEN_STORAGE_KEY = 'sameer';
const LOCAL_JWT_EXP_STORAGE_KEY = 'token-exp-time';

class Client {
  constructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_TOKEN_STORAGE_KEY);
      this.jwtExpTime = localStorage.getItem(LOCAL_JWT_EXP_STORAGE_KEY);
    }
  }

  isTokenExpired = () => {
    const currentTime = new Date().getTime() / 1000;
    return (currentTime > this.jwtExpTime);
  }

  isLoggedIn() {
    /*
    const result = (!this.isTokenExpired() && !!this.token);
    console.log('Is logged In', result);
    return result;*/
    return (!this.isTokenExpired() && !!this.token);
  }

  getProjects() {
    return fetch(`/api/projects`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': this.token
      }
    }).then(this.checkStatus)
      .then(this.parseJson);
  }

  createProject(project) {
    return fetch(`/api/projects`, {
      body: JSON.stringify(project),
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': this.token
      }
    }).then(this.checkStatus)
      .then(this.parseJson);
  }

  handleLoginError(error) {
    this.removeToken();
    return Promise.reject(error);
  }

  login(email, password) {
    const data = new URLSearchParams();
    data.set('user[email]', email);
    data.set('user[password]', password);

    return fetch(`/users/sign_in`, {
      method: 'post',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: data
    }).then(this.checkStatus)
      .then(
        (response) => {
          this.setToken(this.getTokenFromHeader(response));
          this.setJwtExpTime();
        }
      )
      .catch(error => this.handleLoginError(error));
  }

  getTokenFromHeader = (response) => (
    response.headers.get('authorization').split(' ')[1]
  )

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

  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) { 
      return response;

    } else if (response.status == 422) {

      const error = this.parseValidationErrorJson(response);
      return Promise.reject(error);

    } else if (response.status == 401) {
      this.removeToken();
      return response.json()
        .then(json => {
          const error = Object.assign({}, json, {
            status: response.status,
            statusText: response.statusText
          })
          console.log('Json error', error);
          return Promise.reject(error);
        });
    } else {

      return response.json()
        .then(json => {
          const error = Object.assign({}, json, {
            status: response.status,
            statusText: response.statusText
          })
          console.log('Json error', error);
          return Promise.reject(error);
        });
    }
  }

  parseValidationErrorJson = (response) => {
    console.log('Response', response);
    const error = {}

    response.json()
      .then(json => {
        console.log('JSON', json);
        json.errors.forEach((e) => {
          error[this.getValidationErrorSource(e.source)] = e.detail;
        });
      });

    return error;
  }

  getValidationErrorSource = (errorSource) => {
    return (errorSource.pointer.split('/').pop());
  }

  parseJson(response) {
    return response.json();
  }

  setToken(token) {
    this.token = 'Bearer ' + token;
    console.log(this.token);

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_TOKEN_STORAGE_KEY, this.token);
    }
  }

  setJwtExpTime = () => {
    this.jwtExpTime = jwt_decode(this.token).exp;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_JWT_EXP_STORAGE_KEY, this.jwtExpTime)
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_TOKEN_STORAGE_KEY);
    }
  }
}

export const client = new Client();
