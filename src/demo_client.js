class Client {
  constructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');
    this.subscribers = [];

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (this.token) {
        this.isTokenValid().then((bool) => {
          if (!bool) {
            this.token = null;
          }
        });
      }
    }
  }

  isLoggedIn() {
    return !!this.token;
  }

  subscribe(cb) {
    this.subscribers.push(cb);
  }

  notifySubscribers() {
    this.subscribers.forEach((cb) => cb(this.isLoggedIn()));
  }

  setToken(token) {
    this.token = token;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  isTokenValid() {
    // See note about tokens above
    const url = '/api/check_token?token=' + this.token;
    return fetch(url, {
      method: 'get',
      headers: {
        accept: 'application/json',
      },
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((json) => json.valid === true);
  }

  getAlbum(albumId) {
    return this.getAlbums([ albumId ], albums => albums[0]);
  }

  getAlbums(albumIds) {
    // See note about tokens above
    const url = (
      '/api/albums?ids=' + albumIds.join(',') + '&token=' + this.token
    );
    return fetch(url, {
      method: 'get',
      headers: {
        accept: 'application/json',
      },
    }).then(this.checkStatus)
      .then(this.parseJson);
  }

  login() {
    return fetch('/api/login', {
      method: 'post',
      headers: {
        accept: 'application/json',
      },
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((json) => this.setToken(json.token));
  }

  logout() {
    this.removeToken();
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  parseJson(response) {
    return response.json();
  }
}

export const client = new Client();
