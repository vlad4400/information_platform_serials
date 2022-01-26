import authAxios from './authAxios';

export default class AuthService {
  static async register(name, email, password, password_confirmation) {
    return authAxios
      .post('register', {
        name,
        email,
        password,
        password_confirmation,
      })
      .then((res) => {
        if (res.data) {
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem('token', res.data.token);
        }
        return res;
      });
  }
  static async login(name, password) {
    return authAxios
      .post('login', {
        name,
        password,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem('token', res.data.token);
        }
        return res;
      });
  }
  static async logout() {
    return authAxios.post('logout').then((res) => {
      if (res.data) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
      return res;
    });
  }
  static getCurrentUser() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return null;
    }
  }
}
