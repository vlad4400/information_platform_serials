import { createSlice } from '@reduxjs/toolkit';
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
    setSearchSerials: (state, {payload: {userId, serials} }) => {
      state.searchSerials = serials.map(
        serial => {
          if (serial.favorite) {
            return {
              ...serial,
              isFavorite: !!serial.favorite.find(({user_id}) => user_id == userId),
              isLoading: false,
            }
          } else {
            return serial;
          }
        }
      );
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
    switchFavorite: (state, {payload: id}) => {
      let serial = state.searchSerials.find(serial => serial.id === id);
      if (serial) {
        serial.isFavorite = !serial.isFavorite;
      }
    },
    startLoadingOne: (state, {payload: id}) => {
      let serial = state.searchSerials.find(serial => serial.id === id);
      if (serial) {
        serial.isLoading = true;
      }
    },
    stopLoadingOne: (state, {payload: id}) => {
      let serial = state.searchSerials.find(serial => serial.id === id);
      if (serial) {
        serial.isLoading = false;
      }
    },
  },
});

// Selectors

export const selectSearchSerials = (state) => state.searchSerials;

// Actions
export const {
  setSearchSerials,
  setLoading,
  setLoadingComplete,
  setSearchSerialsFailure,
  switchFavorite,
  startLoadingOne,
  stopLoadingOne,
} = searchSerialsSlice.actions;
export default searchSerialsSlice.reducer;

// Thunks

export const getSearchSerials = ({key, userId}) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await authAxios.get(`search/${key}`)
    dispatch(setSearchSerials({userId, serials: data}));
  } catch (err) {
    dispatch(setSearchSerialsFailure());
  } finally {
    dispatch(setLoadingComplete());
  }
};
