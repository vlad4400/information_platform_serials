import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import authAxios from '../services/authAxios';

const initialState = {
  favourites: [],
  loading: false,
  hasErrors: false,
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites: (state, { payload }) => {
      state.favourites = payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingComplete: (state) => {
      state.loading = false;
    },
    setFavouritesFailure: (state) => {
      state.hasErrors = true;
    },
  },
});

// Selectors
export const selectFavourites = (state) => state.favourites;

// Actions
export const { setFavourites, setLoading, setLoadingComplete, setFavouritesFailure } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;

// Thunks
export const getFavourites = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = localStorage.getItem('token');
    const { data } = await authAxios.get('/favorites',
      {
        headers: { Authorization: `Bearer ${token}` }
      });
    dispatch(setFavourites(data));
  } catch (err) {
    dispatch(setFavouritesFailure());
  } finally {
    dispatch(setLoadingComplete());
  }
};
