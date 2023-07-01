class TokenService {
  static setAccessToken(accessToken) {
    localStorage.setItem('access_token', accessToken);
  }

  static getAccessToken() {
    return localStorage.getItem('access_token');
  }

  static removeAccessToken() {
    localStorage.removeItem('access_token');
  }

  static getExpirationTime() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return null;
    }

    const tokenParts = accessToken.split('.');

    if (tokenParts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(tokenParts[1]));

    if (!payload || !payload.exp) {
      return null;
    }

    const expirationInSeconds = payload.exp;
    const expirationInMilliseconds = expirationInSeconds * 1000;
    const expirationTimestamp = new Date(expirationInMilliseconds);

    return expirationTimestamp;
  }
}

export default TokenService;
