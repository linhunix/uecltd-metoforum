export class ln4CookieManager {
  private static instance: ln4CookieManager;

  constructor() {}

  /**
   * Singleton
   */
  public static GetInstance(): ln4CookieManager {
    if (this.instance == null) {
      this.instance = new ln4CookieManager();
    }
    return this.instance;
  }

  setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
  }

  getCookie(name) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
          if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
      }
      return null;
  }

  getUserData() {
    const rawUserData = this.getCookie('userData');

    console.log('rawUserData: ', rawUserData);

    if (rawUserData == null) {
      return null;
    }

    return JSON.parse(atob(rawUserData));
  }

  saveUserData(userData: object) {
    this.setCookie('userData', btoa(JSON.stringify(userData)), 30);
  }

  // Remove User Cookie
  Logout() {
    this.eraseCookie('userData');
  }

  eraseCookie(name) {
      document.cookie = name + '=; Max-Age=-99999999;';
  }
}
