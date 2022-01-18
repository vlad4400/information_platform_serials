import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import AuthService from '../services/AuthService';

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    resetUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const selectAuth = (state) => state.auth;

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;

// Thunks
export const register = (email, password) => async (dispatch) => {
  try {
    // const csrf = await authAxios.get('/sanctum/csrf-cookie');
    const { data } = await AuthService.register(email, password);
    console.log('Register data', data);
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('auth_name', data.username);
    dispatch(setUser(data.username));
    swal('Success', data.message, 'success');
  } catch (e) {
    console.log(e.message);
    swal('Warning', e.message, 'warning');
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await AuthService.login(email, password);
    dispatch(setUser(data.username));
    console.log('Login data', data);
  } catch (e) {
    console.log(e.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    // await AuthService.logout()
    // localStorage.removeItem('auth_token', data.token);
    dispatch(resetUser());
  } catch (e) {
    console.log(e);
  }
};
