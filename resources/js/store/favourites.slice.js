import { createSlice } from '@reduxjs/toolkit';
import authAxios from '../services/authAxios';

const initialState = {
  favourites: [],
  favouritesCopy: [],
  loading: false,
  hasErrors: false,
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites: (state, { payload }) => {
      state.favourites = payload.map(serial => ({...serial, isFavorite: true}));
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
    deleteFavourite: (state, {payload: {id}}) => {
      state.favouritesCopy = [...state.favourites];
      state.favourites = state.favourites.filter(serial => serial.id !== id);
    },
    restoreFavourites: (state) => {
      state.favourites = state.favouritesCopy;
    }
  },
});

// Selectors
export const selectFavourites = (state) => state.favourites;

// Actions
export const {
  setFavourites,
  setLoading,
  setLoadingComplete,
  setFavouritesFailure,
  deleteFavourite,
  restoreFavourites,
} = favouritesSlice.actions;
export default favouritesSlice.reducer;

// Thunks
export const getFavourites = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = localStorage.getItem('token');
    const { data } = await authAxios.get('/favorites',
      //  const { data } = await axios.get(API_FAVORITES,
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
