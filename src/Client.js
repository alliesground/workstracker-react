import URLSeachParams from 'url-search-params';
import jwt_decode from 'jwt-decode';

const LOCAL_AUTH_TOKEN_STORAGE_KEY = 'sameer';

const LOCAL_ACCESS_TOKEN_STORAGE_KEY = 'access-token';
const LOCAL_CLIENT_ID_STORAGE_KEY = 'client-id';
const LOCAL_UID_STORAGE_KEY = 'uid';
const LOCAL_TOKEN_EXP_STORAGE_KEY = 'token-exp-time';


class Client {
  constructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');

    if (this.useLocalStorage) {
      this.accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN_STORAGE_KEY);
      this.clientId = localStorage.getItem(LOCAL_CLIENT_ID_STORAGE_KEY);
      this.uId = localStorage.getItem(LOCAL_UID_STORAGE_KEY);
      this.tokenExpiry = localStorage.getItem(LOCAL_TOKEN_EXP_STORAGE_KEY);
      //this.token = localStorage.getItem(LOCAL_TOKEN_STORAGE_KEY);
      //this.tokenExpTime = localStorage.getItem(LOCAL_TOKEN_EXP_STORAGE_KEY);
    }
  }

  isTokenExpired = () => {
    //const currentTime = new Date().getTime() / 1000;
    return (this.currentTime() > this.jwtExpTime);
  }

  isLoggedIn() {
    //return (!this.isTokenExpired() && !!this.token);
    console.log('Is logged in: ', this.accessToken);
    return !!this.accessToken;
  }

  getToken() {
    console.log('Getting Token');
    if (this.token && (!this.isTokenExpired() || this.tokenTimeToExpireInMinutes() > 1)) {
      return this.token;
    }
    return this.refreshToken();
  }

  currentTime () {
    return new Date().getTime() / 1000;
  }

  tokenTimeToExpireInMinutes() {
    const diffInSeconds = this.jwtExpTime - this.currentTime();
    return Math.floor(diffInSeconds/60);
  }

  refreshToken() {
    //return fetch(`/api`)
    console.log('Token: ', this.tokenTimeToExpireInMinutes());
  }

  getProjects() {
    return fetch(`/api/projects`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': this.authToken
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

  /*handleLoginError(error) {
    this.removeToken();
    return Promise.reject(error);
  }*/

  login(email, password) {
    const data = {email, password}
    /*const data = new URLSearchParams();
    data.set('user[email]', email);
    data.set('user[password]', password);*/

    return fetch(`/auth/sign_in`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: JSON.stringify(data)
    }).then(this.checkStatus);
  }

  getTokenFromHeader = (response) => (
    response.headers.get('access-token')
  )

  logout() {
    return fetch(`/auth/sign_out`, {
      method: 'delete',
      headers: {
        'access-token': this.accessToken,
        'uid': this.uId,
        'client': this.clientId,
        'Accept': 'application/json',
      }
    }).then(this.checkStatus)
      .then(this.removeAuthHeaders());
  }

  setAuthHeaders = (response) => {
    this.accessToken = response.headers.get('access-token');
    this.clientId = response.headers.get('client');
    this.uId = response.headers.get('uid');
    this.tokenExpiry = response.headers.get('expirty');

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_ACCESS_TOKEN_STORAGE_KEY, this.accessToken);
      localStorage.setItem(LOCAL_CLIENT_ID_STORAGE_KEY, this.clientId);
      localStorage.setItem(LOCAL_TOKEN_EXP_STORAGE_KEY, this.tokenExpiry);
      localStorage.setItem(LOCAL_UID_STORAGE_KEY, this.uId);
    }
  }

  /*authHeaders = () => ({
    'access-token': this.authToken.accessToken,
    'client': this.authToken.client,
    'uid': this.authToken.uid,
    'expiry': this.authToken.expiry
  })*/

  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) { 
      if (response.headers.get('access-token')) {
        this.setAuthHeaders(response);
      }

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

  /*setToken(token) {
    this.token = token
    console.log(this.token);

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_TOKEN_STORAGE_KEY, token);
    }
  }*/

  setTokenExpTime = (expTime) => {
    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_TOKEN_EXP_STORAGE_KEY, expTime);
    }
  }

  removeToken() {
    //this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_AUTH_TOKEN_STORAGE_KEY);
    }
  }

  removeAuthHeaders = () => {
    this.accessToken = null;
    this.clientId = null;
    this.uId = null;
    this.tokenExpiry = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_ACCESS_TOKEN_STORAGE_KEY);
      localStorage.removeItem(LOCAL_CLIENT_ID_STORAGE_KEY);
      localStorage.removeItem(LOCAL_UID_STORAGE_KEY);
      localStorage.removeItem(LOCAL_TOKEN_EXP_STORAGE_KEY);
    }
  }
}

export const client = new Client();
