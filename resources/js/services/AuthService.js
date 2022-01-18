import authAxios from '../api/authAxios';

export default class AuthService {
  static async register(email, password, name = 'test_user') {
    return authAxios.post('register', { name, email, password });
  }
  static async login(email, password, name = 'test_user') {
    return authAxios.post('login', { name, email, password });
  }
  static async logout() {
    return authAxios.post('logout');
  }
}
