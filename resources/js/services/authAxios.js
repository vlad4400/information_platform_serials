// Конфиг axios для аутентификации пользователя
import axios from 'axios';
import { SIGN_IN } from '../constants/routes';
import { showAlert } from '../utilities/showAlert';

export const API_URL = '/api';

const authAxios = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});


authAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

// Интерцептор показывает ошибки во всплывающем окне
authAxios.interceptors.response.use(
  (response) => {
    //   console.log(response);
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  },
  (error) => {
    const { response, request } = error;
    if (response) {
      if (response.status == 401) {
        window.location = `${window.location.protocol}//${window.location.host}${SIGN_IN}`;
      }
      if (response.status >= 400 && response.status < 500) {
        const message =
          response.data?.error || response.data?.message || error.toString();
        showAlert(message, 'error');
      }
    } else if (request) {
      showAlert('Ошибка запроса. Попробуйте снова.', 'error');
    }
    return Promise.reject(error);
  }
);

export default authAxios;
