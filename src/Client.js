class Client { 
  constructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');
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
    /* Coming soon... */
    return true;
  }
}

export const client = new Client();
