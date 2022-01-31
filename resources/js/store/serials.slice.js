import { createSlice } from '@reduxjs/toolkit';
import serialsAPI from '../api/serialsAPI';
import authAxios from '../services/authAxios';
import { getSerialsByRate } from '../services/SerialsService';

const initialState = {
  serials: [],
  loading: false,
  hasErrors: false,
};

const serialsSlice = createSlice({
  name: 'serials',
  initialState,
  reducers: {
    setSerials: (state, {payload}) => {
      state.serials = payload.serials.map(
        serial => ({
          ...serial,
          isFavorite: !!serial.favorite.find(id => id == payload.userId)
        })
      );
    },
    switchSerialIsFavoriteById: (state, {payload}) => {
      const id = payload;
      state.serials.forEach((serial, ri) => {
        if (serial.id == id) {
          state.serials[ri] = {...serial, isFavorite: !serial.isFavorite}
        }
      })
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingComplete: (state) => {
      state.loading = false;
    },
    setSerialsFailure: (state) => {
      state.hasErrors = true;
    },
  },
});

// Selectors
export const selectSerials = (state) => state.serials;
export const getSerialById = (state, id) => {
  return state.serials.find(serial => serial.id == 714);
}

// Actions
export const { setSerials, switchSerialIsFavoriteById, setLoading, setLoadingComplete, setSerialsFailure } =
  serialsSlice.actions;
export default serialsSlice.reducer;

// Thunks
export const getSerials = (userId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await serialsAPI.get('serials');
    dispatch(setSerials({data, userId}));
  } catch (err) {
    dispatch(setSerialsFailure());
  } finally {
    dispatch(setLoadingComplete());
  }
}

export const getTop50Serials = (userId) => async (dispatch) => {
  dispatch(setLoading());
  getSerialsByRate(1, 50, 'DESC')
  .then(({data}) => {
    dispatch(setSerials({serials: data, userId}));
  })
  .catch(() => {
    dispatch(setSerialsFailure());
  })
  .finally(() => {
    dispatch(setLoadingComplete());
  });
}
