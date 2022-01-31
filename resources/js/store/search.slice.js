import { createSlice } from '@reduxjs/toolkit';
//import serialsAPI from '../api/serialsAPI';
import authAxios from '../services/authAxios';

const initialState = {
  searchSerials: [],
  loading: false,
  hasErrors: false,
};

const searchSerialsSlice = createSlice({
  name: 'searchSerials',
  initialState,
  reducers: {
    setSearchSerials: (state, { payload }) => {
      state.searchSerials = payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingComplete: (state) => {
      state.loading = false;
    },
    setSearchSerialsFailure: (state) => {
      state.hasErrors = true;
    },
  },
});

// Selectors
export const selectSearchSerials = (state) => state.searchSerials;

// Actions
export const { setSearchSerials, setLoading, setLoadingComplete, setSearchSerialsFailure } =
  searchSerialsSlice.actions;
export default searchSerialsSlice.reducer;

// Thunks
export const getSearchSerials = (key) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await authAxios.get(`search/${key}`)
    console.log(data)
    dispatch(setSearchSerials(data));
  } catch (err) {
    dispatch(setSearchSerialsFailure());
  } finally {
    dispatch(setLoadingComplete());
  }
};
