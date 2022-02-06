import { createSlice } from '@reduxjs/toolkit';
import { forEach } from 'lodash';
import authAxios from '../services/authAxios';

const initialState = {
  favourites: [],
  favouritesCopy: [],
  loading: false,
  hasErrors: false,
  status: 'Все',
};

const filterFavouritesByStatus = (state, status) => {
  state.status = status;
  if (status === 'Все') {
    state.favourites = [...state.favouritesCopy];
  } else {
    state.favourites = [...state.favouritesCopy.filter(favourite => favourite.status === status)];
  }
}

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites: (state, { payload }) => {
      state.favourites = payload.map(serial => ({...serial, isFavorite: true}));
      state.favouritesCopy = [...state.favourites];
      filterFavouritesByStatus(state, state.status);
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
    deleteFavourite: (state, {payload: id}) => {
      state.favouritesCopy = state.favouritesCopy.filter(serial => serial.id !== id);
      state.favourites = state.favourites.filter(serial => serial.id !== id);
    },
    setLoadingFavouriteStatus: (state, {payload: id}) => {
      let serial = state.favourites.find(serial => serial.id === id);
      let serialCopy = state.favouritesCopy.find(serial => serial.id === id);
      if (serial) {
        serial.isLoading = true;
      }
      if (serialCopy) {
        serialCopy.isLoading = true;
      }
    },
    setLoadingFavouriteStatusComplete: (state, {payload: id}) => {
      let serial = state.favourites.find(serial => serial.id === id);
      let serialCopy = state.favouritesCopy.find(serial => serial.id === id);
      if (serial) {
        serial.isLoading = false;
      }
      if (serialCopy) {
        serialCopy.isLoading = false;
      }
    },
    selectFavouritesByStatus: (state, {payload: status}) => {
      filterFavouritesByStatus(state, status);
    },
    setFavouriteStatus: (state, {payload: {id, status}}) => {
      let serialCopy = state.favouritesCopy.find(serial => serial.id === id);
      if (serialCopy) {
        serialCopy.status = status;
      }
      filterFavouritesByStatus(state, state.status);
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
  setLoadingFavouriteStatus,
  setLoadingFavouriteStatusComplete,
  selectFavouritesByStatus,
  setFavouriteStatus,
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
